"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeCatSceneProps = {
	target: {
		x: number;
		y: number;
	};
	direction: number;
	isMoving: boolean;
};

export function ThreeCatScene({
	target,
	direction,
	isMoving,
}: ThreeCatSceneProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const targetRef = useRef(target);
	const directionRef = useRef(direction);
	const movingRef = useRef(isMoving);

	useEffect(() => {
		targetRef.current = target;
		directionRef.current = direction;
		movingRef.current = isMoving;
	}, [direction, isMoving, target]);

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			canvas,
			powerPreference: "low-power",
		});
		renderer.setClearAlpha(0);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 30);
		camera.position.set(0, 0, 8);

		scene.add(new THREE.HemisphereLight(0xfff8e8, 0x4b4c5a, 2.4));

		const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
		keyLight.position.set(-3, 5, 7);
		scene.add(keyLight);

		const cat = new THREE.Group();
		const black = new THREE.MeshStandardMaterial({
			color: 0x11131a,
			roughness: 0.78,
		});
		const white = new THREE.MeshStandardMaterial({
			color: 0xf4f2e9,
			roughness: 0.8,
		});
		const gold = new THREE.MeshStandardMaterial({
			color: 0xd9b85f,
			roughness: 0.55,
			metalness: 0.18,
		});
		const eyeColor = new THREE.MeshStandardMaterial({
			color: 0xb8c978,
			roughness: 0.35,
		});

		const body = new THREE.Mesh(
			new THREE.SphereGeometry(0.52, 24, 18),
			black,
		);
		body.scale.set(0.92, 1.35, 0.76);
		body.position.set(0, -0.08, 0);
		cat.add(body);

		const chest = new THREE.Mesh(
			new THREE.SphereGeometry(0.3, 18, 14),
			white,
		);
		chest.scale.set(0.75, 1.45, 0.28);
		chest.position.set(0, -0.08, 0.42);
		cat.add(chest);

		const head = new THREE.Mesh(
			new THREE.SphereGeometry(0.38, 24, 18),
			black,
		);
		head.scale.set(1, 0.9, 0.95);
		head.position.set(0, 0.72, 0.08);
		cat.add(head);

		const earGeometry = new THREE.ConeGeometry(0.17, 0.4, 3);
		[-1, 1].forEach((side) => {
			const ear = new THREE.Mesh(earGeometry, black);
			ear.position.set(side * 0.23, 1.08, 0.05);
			ear.rotation.z = side * -0.12;
			cat.add(ear);
		});

		const eyeGeometry = new THREE.SphereGeometry(0.055, 12, 8);
		[-1, 1].forEach((side) => {
			const eye = new THREE.Mesh(eyeGeometry, eyeColor);
			eye.scale.set(1.15, 0.9, 0.45);
			eye.position.set(side * 0.14, 0.8, 0.41);
			cat.add(eye);
		});

		const muzzle = new THREE.Mesh(
			new THREE.SphereGeometry(0.16, 16, 10),
			white,
		);
		muzzle.scale.set(1.15, 0.62, 0.38);
		muzzle.position.set(0, 0.62, 0.42);
		cat.add(muzzle);

		const collar = new THREE.Mesh(
			new THREE.TorusGeometry(0.3, 0.035, 8, 28),
			gold,
		);
		collar.rotation.x = Math.PI / 2;
		collar.position.set(0, 0.43, 0.02);
		cat.add(collar);

		const legGeometry = new THREE.CylinderGeometry(0.09, 0.11, 0.56, 12);
		const frontLegs: THREE.Mesh[] = [];

		[-1, 1].forEach((side) => {
			const leg = new THREE.Mesh(legGeometry, side === -1 ? white : black);
			leg.position.set(side * 0.25, -0.75, 0.22);
			cat.add(leg);
			frontLegs.push(leg);

			const paw = new THREE.Mesh(
				new THREE.SphereGeometry(0.12, 14, 10),
				white,
			);
			paw.scale.set(1.15, 0.55, 1.25);
			paw.position.set(side * 0.25, -1.04, 0.27);
			cat.add(paw);

			const hindLeg = new THREE.Mesh(
				new THREE.SphereGeometry(0.27, 18, 12),
				black,
			);
			hindLeg.scale.set(1.05, 0.8, 0.9);
			hindLeg.position.set(side * 0.38, -0.55, -0.08);
			cat.add(hindLeg);
		});

		const tailCurve = new THREE.CatmullRomCurve3([
			new THREE.Vector3(0.34, -0.44, -0.24),
			new THREE.Vector3(0.72, -0.32, -0.18),
			new THREE.Vector3(0.93, 0.05, -0.08),
			new THREE.Vector3(0.79, 0.38, 0),
		]);
		const tail = new THREE.Mesh(
			new THREE.TubeGeometry(tailCurve, 24, 0.075, 10, false),
			black,
		);
		cat.add(tail);

		const shadow = new THREE.Mesh(
			new THREE.CircleGeometry(0.72, 32),
			new THREE.MeshBasicMaterial({
				color: 0x111111,
				opacity: 0.18,
				transparent: true,
			}),
		);
		shadow.scale.set(1.25, 0.3, 1);
		shadow.position.set(0, -1.12, -0.5);
		cat.add(shadow);

		cat.scale.setScalar(0.68);
		scene.add(cat);

		const visibleHeight = 6;
		const desiredPosition = new THREE.Vector3();
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		let sittingAmount = 1;
		let animationFrame = 0;

		const updateProjection = () => {
			const aspect = window.innerWidth / window.innerHeight;
			const visibleWidth = visibleHeight * aspect;

			camera.left = -visibleWidth / 2;
			camera.right = visibleWidth / 2;
			camera.top = visibleHeight / 2;
			camera.bottom = -visibleHeight / 2;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight, false);
		};

		const mapTargetToScene = () => {
			const visibleWidth =
				visibleHeight * (window.innerWidth / window.innerHeight);

			desiredPosition.set(
				(targetRef.current.x / window.innerWidth - 0.5) * visibleWidth,
				(0.5 - targetRef.current.y / window.innerHeight) * visibleHeight +
					0.76,
				0,
			);
		};

		updateProjection();
		mapTargetToScene();
		cat.position.copy(desiredPosition);
		window.addEventListener("resize", updateProjection);

		const timer = new THREE.Timer();
		timer.connect(document);

		const render = () => {
			timer.update();
			const elapsed = timer.getElapsed();
			const moving = movingRef.current && !reducedMotion;

			mapTargetToScene();
			cat.position.lerp(desiredPosition, reducedMotion ? 1 : 0.1);
			sittingAmount = clamp(
				sittingAmount + (moving ? -0.08 : 0.06),
				0,
				1,
			);

			const step = Math.sin(elapsed * 12);
			const hop = moving ? Math.abs(step) * 0.1 : 0;

			cat.position.y += hop;
			cat.rotation.y = THREE.MathUtils.lerp(
				cat.rotation.y,
				directionRef.current * -0.32,
				0.12,
			);
			cat.rotation.z = moving ? step * 0.025 : 0;
			body.scale.y = THREE.MathUtils.lerp(1.35, 1.08, sittingAmount);
			body.position.y = THREE.MathUtils.lerp(-0.08, -0.23, sittingAmount);
			head.position.y = THREE.MathUtils.lerp(0.72, 0.56, sittingAmount);

			frontLegs.forEach((leg, index) => {
				const side = index === 0 ? -1 : 1;
				leg.rotation.z = moving
					? step * side * 0.42
					: side * sittingAmount * 0.5;
			});

			shadow.scale.x = moving ? 1.05 - Math.abs(step) * 0.15 : 1.25;
			renderer.render(scene, camera);
			animationFrame = window.requestAnimationFrame(render);
		};

		animationFrame = window.requestAnimationFrame(render);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			window.removeEventListener("resize", updateProjection);
			timer.disconnect();
			scene.traverse((object) => {
				if (!(object instanceof THREE.Mesh)) {
					return;
				}

				object.geometry.dispose();
				const materials = Array.isArray(object.material)
					? object.material
					: [object.material];
				materials.forEach((material) => material.dispose());
			});
			renderer.dispose();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed inset-0 z-[1800] h-full w-full"
			aria-hidden="true"
		/>
	);
}

const clamp = (value: number, minimum: number, maximum: number) =>
	Math.min(Math.max(value, minimum), maximum);
