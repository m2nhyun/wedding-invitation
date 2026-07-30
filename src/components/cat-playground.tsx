"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { catPrototype } from "@/data/cats";

const ThreeCatScene = dynamic(
	() =>
		import("@/components/three-cat-scene").then(
			(module) => module.ThreeCatScene,
		),
	{ ssr: false },
);

type CatMode = "sticker" | "depth" | "video" | "generative" | "three";

type Position = {
	x: number;
	y: number;
};

const modeOptions: Array<{ label: string; value: CatMode }> = [
	{ label: "2D", value: "sticker" },
	{ label: "2.5D", value: "depth" },
	{ label: "영상", value: "video" },
	{ label: "AI", value: "generative" },
	{ label: "3D", value: "three" },
];

const clamp = (value: number, minimum: number, maximum: number) =>
	Math.min(Math.max(value, minimum), maximum);

export function CatPlayground() {
	const [enabled, setEnabled] = useState(false);
	const [mode, setMode] = useState<CatMode>("depth");
	const [position, setPosition] = useState<Position>({ x: 215, y: 560 });
	const [direction, setDirection] = useState(1);
	const [isMoving, setIsMoving] = useState(false);
	const [motionDuration, setMotionDuration] = useState(700);
	const [spriteIndex, setSpriteIndex] = useState(5);
	const positionRef = useRef(position);
	const reducedMotionRef = useRef(false);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const isEnabled = searchParams.get("cats") === "1";

		setEnabled(isEnabled);

		if (!isEnabled) {
			return;
		}

		reducedMotionRef.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const initialPosition = {
			x: window.innerWidth / 2,
			y: window.innerHeight - 24,
		};

		positionRef.current = initialPosition;
		setPosition(initialPosition);

		const keepCatInViewport = () => {
			const nextPosition = {
				x: clamp(positionRef.current.x, 100, window.innerWidth - 100),
				y: clamp(positionRef.current.y, 148, window.innerHeight - 18),
			};

			positionRef.current = nextPosition;
			setPosition(nextPosition);
		};

		window.addEventListener("resize", keepCatInViewport);

		[
			...Object.values(catPrototype.cutouts),
			...catPrototype.playFrames,
		].forEach((source) => {
			const image = new window.Image();
			image.src = source;
		});

		return () => window.removeEventListener("resize", keepCatInViewport);
	}, []);

	useEffect(() => {
		positionRef.current = position;
	}, [position]);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const moveCat = (event: MouseEvent) => {
			if (
				event.defaultPrevented ||
				!(event.target instanceof Element) ||
				event.target.closest(
					"a, button, input, select, textarea, [role='dialog'], [data-cat-control]",
				)
			) {
				return;
			}

			const targetPosition = {
				x: clamp(event.clientX, 100, window.innerWidth - 100),
				y: clamp(event.clientY, 148, window.innerHeight - 18),
			};
			const distance = Math.hypot(
				targetPosition.x - positionRef.current.x,
				targetPosition.y - positionRef.current.y,
			);
			const duration = reducedMotionRef.current
				? 0
				: clamp(Math.round(distance * 2.6), 420, 1_450);

			setDirection(targetPosition.x >= positionRef.current.x ? 1 : -1);
			setMotionDuration(duration);
			setIsMoving(true);
			setPosition(targetPosition);

			if (duration === 0) {
				setIsMoving(false);
			}
		};

		document.addEventListener("click", moveCat);
		return () => document.removeEventListener("click", moveCat);
	}, [enabled]);

	useEffect(() => {
		if (mode !== "video") {
			setSpriteIndex(5);
			return;
		}

		if (!isMoving || reducedMotionRef.current) {
			setSpriteIndex(5);
			return;
		}

		setSpriteIndex(0);
		const timer = window.setInterval(() => {
			setSpriteIndex((currentIndex) => (currentIndex + 1) % 3);
		}, 125);

		return () => window.clearInterval(timer);
	}, [isMoving, mode]);

	if (!enabled) {
		return null;
	}

	const source =
		mode === "generative"
			? catPrototype.cutouts.generativePair
			: mode === "video"
			? catPrototype.playFrames[spriteIndex]
			: mode === "depth" && isMoving
				? catPrototype.cutouts.resting
				: catPrototype.cutouts.sitting;
	const actorSize =
		mode === "generative"
			? 190
			: mode === "video"
				? 132
				: mode === "depth"
					? 146
					: 118;

	return (
		<>
			<div
				className="fixed top-4 left-1/2 z-[1900] flex -translate-x-1/2 flex-col items-center gap-2"
				data-cat-control>
				<div className="flex rounded-full border border-white/70 bg-[rgba(247,247,247,0.88)] p-1 shadow-[0_8px_24px_rgba(52,50,40,0.16)] backdrop-blur-md">
					{modeOptions.map((option) => (
						<button
							className={`min-w-14 rounded-full px-3 py-2 text-xs transition-colors ${
								mode === option.value
									? "bg-[var(--olive)] text-white"
									: "text-[var(--olive)]"
							}`}
							type="button"
							key={option.value}
							aria-pressed={mode === option.value}
							onClick={() => {
								setMode(option.value);
								setIsMoving(false);
							}}>
							{option.label}
						</button>
					))}
				</div>
				<p className="rounded-full bg-black/55 px-3 py-1 text-[11px] text-white">
					빈 곳을 눌러보세요
				</p>
			</div>

			<div
				className="pointer-events-none fixed z-[1800] flex items-end justify-center"
				aria-hidden="true"
				style={{
					left: position.x,
					top: position.y,
					width: actorSize,
					height: actorSize,
					opacity: mode === "three" ? 0 : 1,
					transform: "translate(-50%, -100%)",
					transition: `left ${motionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), top ${motionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
				}}
				onTransitionEnd={(event) => {
					if (event.target === event.currentTarget) {
						setIsMoving(false);
					}
				}}>
				<span
					className={`absolute right-[18%] bottom-0 left-[18%] h-3 rounded-full bg-black/25 blur-[5px] ${
						isMoving ? "cat-shadow-moving" : ""
					}`}
				/>
				<div
					className="relative h-full w-full"
					style={{
						perspective: mode === "depth" ? "420px" : undefined,
						transform:
							mode === "depth"
								? `rotateY(${direction * -12}deg) rotateX(3deg) scaleX(${direction})`
								: `scaleX(${direction})`,
						transformStyle: "preserve-3d",
					}}>
					<div
						className={`flex h-full w-full items-end justify-center ${
							isMoving && mode === "depth" ? "cat-depth-moving" : ""
						}`}>
						<Image
							className="max-h-full w-full object-contain object-bottom drop-shadow-[0_8px_8px_rgba(40,38,30,0.22)]"
							src={source}
							alt=""
							width={640}
							height={640}
							sizes={`${actorSize}px`}
							draggable={false}
						/>
					</div>
				</div>
			</div>

			{mode === "three" ? (
				<ThreeCatScene
					target={position}
					direction={direction}
					isMoving={isMoving}
				/>
			) : null}
		</>
	);
}
