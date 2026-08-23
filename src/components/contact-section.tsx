"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import KakaoPayIcon from "../icons/kakao_simple.svg?react";

type GiftSide = "groom" | "bride";

const giftSideLabel: Record<GiftSide, string> = {
	groom: wedding.gift.groom.title,
	bride: wedding.gift.bride.title,
};

const getAccountCopyText = (bank: string, accountNumber: string) =>
	[bank, accountNumber].filter(Boolean).join(" ");

export function ContactSection() {
	const [selectedSide, setSelectedSide] = useState<GiftSide | null>(null);
	const [toastMessage, setToastMessage] = useState("");

	useEffect(() => {
		if (!selectedSide) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setSelectedSide(null);
			}
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedSide]);

	useEffect(() => {
		if (!toastMessage) {
			return;
		}

		const timer = window.setTimeout(() => setToastMessage(""), 1800);
		return () => window.clearTimeout(timer);
	}, [toastMessage]);

	const copyTextToClipboard = async (copyText: string) => {
		if (!copyText) {
			return false;
		}

		try {
			await navigator.clipboard.writeText(copyText);
		} catch {
			const textarea = document.createElement("textarea");
			textarea.value = copyText;
			textarea.style.position = "fixed";
			textarea.style.opacity = "0";
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			textarea.remove();
		}

		return true;
	};

	const copyAccount = async (copyText: string) => {
		const didCopy = await copyTextToClipboard(copyText);

		if (didCopy) {
			setToastMessage(wedding.gift.labels.copySuccess);
		}
	};

	const openKakaoPay = (kakaoPayUrl: string) => {
		if (!kakaoPayUrl) {
			return;
		}

		window.open(kakaoPayUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<>
			<div className="contact-slide">
				<div className="relative flex flex-1 flex-col gap-[0.4em] bg-[var(--BG)] py-[1.8em] text-[var(--olive)]">
					<p className="text-[1.1em] leading-[var(--content-line-height)] text-[var(--olive)]">
						{wedding.couple.groom.parents}
					</p>
					<h2 className="text-[1.32em] leading-[var(--content-line-height)] tracking-[0.1em] text-[var(--olive)]">
						{wedding.couple.groom.name}
					</h2>
					<button
						className="absolute bottom-[1.7em] w-full cursor-pointer appearance-none border-0 bg-transparent pb-[0.1em] text-[1.1em] text-inherit underline [-webkit-tap-highlight-color:transparent]"
						type="button"
						data-scroll-motion-text
						onClick={() => setSelectedSide("groom")}>
						{wedding.gift.labels.heading}
					</button>
				</div>
				<div className="relative flex flex-1 flex-col gap-[0.4em] bg-[var(--BG)] py-[1.8em] text-[var(--olive)]">
					<p className="text-[1.1em] leading-[var(--content-line-height)] text-[var(--olive)]">
						{wedding.couple.bride.parents}
					</p>
					<h2 className="text-[1.32em] leading-[var(--content-line-height)] tracking-[0.1em] text-[var(--olive)]">
						{wedding.couple.bride.name}
					</h2>
					<button
						className="absolute bottom-[1.7em] w-full cursor-pointer appearance-none border-0 bg-transparent pb-[0.1em] text-[1.1em] text-inherit underline [-webkit-tap-highlight-color:transparent]"
						type="button"
						data-scroll-motion-text
						onClick={() => setSelectedSide("bride")}>
						{wedding.gift.labels.heading}
					</button>
				</div>
			</div>

			{selectedSide ? (
				<div
					className="fixed inset-0 z-[2000] flex items-center justify-center p-[1.4rem]"
					role="dialog"
					aria-modal="true"
					aria-labelledby="gift-modal-title">
					<button
						type="button"
						className="fixed inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-[rgba(55,54,43,0.34)] animate-[giftBackdropIn_180ms_ease-out_both]"
						aria-label={wedding.gift.labels.close}
						onClick={() => setSelectedSide(null)}
					/>
					<div className="relative z-10 flex max-h-[calc(100vh-2.8rem)] w-[min(100%,386px)] flex-col gap-[1.15rem] overflow-auto rounded-[12px] bg-[#f2f3f1] pt-[1.55rem] pr-[1.1rem] pb-[1.15rem] pl-[1.1rem] shadow-[0_1.2rem_3rem_rgba(55,54,43,0.18)] animate-[giftPanelIn_240ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
						<div className="relative flex flex-col gap-[0.15rem] px-[2.4rem]">
							<p className="text-[0.9rem] leading-[1.7] text-[var(--olive)]">
								{wedding.gift.labels.heading}
							</p>
							<h2
								className="text-[1.22rem] leading-[1.85] tracking-[0.122rem] text-[var(--olive)]"
								id="gift-modal-title">
								{giftSideLabel[selectedSide]}
							</h2>
							<button
								type="button"
								className="absolute -top-[0.21rem] right-0 h-[3.08rem] w-[3.08rem] cursor-pointer appearance-none border-0 bg-transparent text-[1.4rem] leading-none text-[var(--olive)]"
								aria-label={wedding.gift.labels.close}
								onClick={() => setSelectedSide(null)}>
								{wedding.gift.labels.closeSymbol}
							</button>
						</div>

						<div className="flex flex-col">
							{wedding.gift[selectedSide].accounts.map((account) => {
								const hasAccount = Boolean(account.accountNumber);
								const hasKakaoPay = Boolean(account.kakaoPayUrl);
								const accountCopyText = getAccountCopyText(
									account.bank,
									account.accountNumber,
								);

								return (
									<div
										className="grid grid-cols-[4.7rem_minmax(0,1fr)_auto] items-center gap-[0.7rem] py-[0.9rem]"
										key={`${selectedSide}-${account.relation}`}>
										<div className="flex flex-col gap-[0.1rem]">
											<span className="text-[0.82rem] leading-[1.45] text-[var(--olive)]">
												{account.relation}
												{account.hanja ? `(${account.hanja})` : ""}
											</span>
											<strong className="text-[1.08rem] leading-[1.45] font-[inherit] text-[var(--olive)]">
												{account.name}
											</strong>
										</div>
										<div className="flex min-w-0 flex-col gap-[0.12rem]">
											{account.bank ? (
												<span className="text-left text-[0.78rem] leading-[1.35] text-[rgba(133,129,101,0.78)]">
													{account.bank}
												</span>
											) : null}
											<p className="break-all text-left text-base leading-[1.35] text-[var(--olive)]">
												{account.accountNumber ||
													wedding.gift.labels.accountPending}
											</p>
										</div>
										<div className="flex min-w-[70px] flex-row justify-end gap-1.5">
											<button
												className="flex h-8 w-8 cursor-pointer appearance-none items-center justify-center rounded-full border border-[rgba(133,129,101,0.4)] bg-transparent text-[0.95rem] leading-none text-[var(--olive)] outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-1 focus-visible:ring-[var(--olive)] disabled:pointer-events-none disabled:cursor-default disabled:opacity-[0.34]"
												type="button"
												disabled={!hasAccount}
												onClick={() => copyAccount(accountCopyText)}
												aria-label={`${account.name} ${wedding.gift.labels.copyAccount}`}>
												{wedding.gift.labels.copySymbol}
											</button>
											{hasKakaoPay ? (
												<button
													className="flex h-8 w-8 cursor-pointer appearance-none items-center justify-center rounded-full border border-[rgba(133,129,101,0.4)] bg-transparent text-[var(--olive)] outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-1 focus-visible:ring-[var(--olive)] disabled:pointer-events-none disabled:cursor-default disabled:opacity-[0.34]"
													type="button"
													disabled={!hasAccount}
													onClick={() => openKakaoPay(account.kakaoPayUrl)}
													aria-label={`${account.name} ${wedding.gift.labels.kakaoPay}`}>
													{wedding.gift.labels.kakaoPaySymbol}
												</button>
											) : null}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			) : null}

			{toastMessage ? (
				<p className="pointer-events-none fixed bottom-12 left-1/2 z-[2100] w-max max-w-[calc(100%-2.64rem)] -translate-x-1/2 rounded-full bg-[rgba(55,54,43,0.84)] py-[0.616rem] px-[0.88rem] text-[0.88rem] leading-[1.7] text-white">
					{toastMessage}
				</p>
			) : null}
		</>
	);
}
