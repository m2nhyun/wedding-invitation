"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

type GiftSide = "groom" | "bride";

import KakaoPayIcon from "../icons/kakaopay_ver.svg?react";

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
      setToastMessage("계좌번호를 복사했어요.");
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
      <section className="relative flex h-[11.5em] w-full flex-row">
        <img
          className="absolute -top-[1.2em] right-[1.8em] z-[1000] block h-auto w-[2.6em]"
          src={wedding.assets.glyph02}
          alt=""
        />
        <div className="relative flex flex-1 flex-col gap-[0.4em] bg-[var(--olive)] py-[1.8em] text-[var(--ivory)]">
          <p className="relative text-[1em] leading-[1.7em] text-[var(--ivory)]">
            {wedding.couple.groom.parents}
          </p>
          <h1 className="relative text-[1.42em] leading-[1.7em] tracking-[0.1em] text-[var(--ivory)]">
            {wedding.couple.groom.name}
          </h1>
          <button
            className="absolute bottom-[1.7em] w-full cursor-pointer appearance-none border-0 bg-transparent pb-[0.1em] text-inherit underline [-webkit-tap-highlight-color:transparent]"
            type="button"
            onClick={() => setSelectedSide("groom")}
          >
            마음 보내실 곳
          </button>
        </div>
        <div className="relative flex flex-1 flex-col gap-[0.4em] bg-[var(--lavender)] py-[1.8em] text-[var(--olive)]">
          <p className="relative text-[1em] leading-[1.7em] text-[var(--olive)]">
            {wedding.couple.bride.parents}
          </p>
          <h1 className="relative text-[1.42em] leading-[1.7em] tracking-[0.1em] text-[var(--olive)]">
            {wedding.couple.bride.name}
          </h1>
          <button
            className="absolute bottom-[1.7em] w-full cursor-pointer appearance-none border-0 bg-transparent pb-[0.1em] text-inherit underline [-webkit-tap-highlight-color:transparent]"
            type="button"
            onClick={() => setSelectedSide("bride")}
          >
            마음 보내실 곳
          </button>
        </div>
      </section>

      {selectedSide ? (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-[1.4em]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gift-modal-title"
        >
          <button
            type="button"
            className="fixed inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-[rgba(55,54,43,0.34)] animate-[giftBackdropIn_180ms_ease-out_both]"
            aria-label="닫기"
            onClick={() => setSelectedSide(null)}
          />
          <div className="relative z-10 flex max-h-[calc(100vh-2.8em)] w-[min(100%,386px)] flex-col gap-[1.15em] overflow-auto rounded-[12px] bg-[#f2f3f1] pt-[1.55em] pr-[1.1em] pb-[1.15em] pl-[1.1em] shadow-[0_1.2em_3em_rgba(55,54,43,0.18)] animate-[giftPanelIn_240ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
            <div className="relative flex flex-col gap-[0.15em] px-[2.4em]">
              <p className="relative text-[0.9em] leading-[1.7em] text-[var(--olive)]">
                마음 보내실 곳
              </p>
              <h2
                className="relative text-[1.22em] leading-[1.85em] tracking-[0.1em] text-[var(--olive)]"
                id="gift-modal-title"
              >
                {giftSideLabel[selectedSide]}
              </h2>
              <button
                type="button"
                className="absolute -top-[0.15em] right-0 h-[2.2em] w-[2.2em] cursor-pointer appearance-none border-0 bg-transparent text-[1.4em] leading-none text-[var(--olive)]"
                aria-label="닫기"
                onClick={() => setSelectedSide(null)}
              >
                ×
              </button>
            </div>

            <div className="relative flex flex-col">
              {wedding.gift[selectedSide].accounts.map((account) => {
                const hasAccount = Boolean(account.accountNumber);
                const hasKakaoPay = Boolean(account.kakaoPayUrl);
                const accountCopyText = getAccountCopyText(
                  account.bank,
                  account.accountNumber,
                );

                return (
                  <div
                    className="relative grid grid-cols-[4.7em_minmax(0,1fr)_auto] items-center gap-[0.7em] py-[0.9em]"
                    key={`${selectedSide}-${account.relation}`}
                  >
                    <div className="relative flex flex-col gap-[0.1em]">
                      <span className="relative text-[0.82em] leading-[1.45] text-[var(--olive)]">
                        {account.relation}
                        {account.hanja ? `(${account.hanja})` : ""}
                      </span>
                      <strong className="relative text-[1.08em] leading-[1.45] font-[100] text-[var(--olive)]">
                        {account.name}
                      </strong>
                    </div>
                    <div className="relative flex min-w-0 flex-col gap-[0.12em]">
                      {account.bank ? (
                        <span className="relative text-left text-[0.78em] leading-[1.35] text-[rgba(133,129,101,0.78)]">
                          {account.bank}
                        </span>
                      ) : null}
                      <p className="relative break-all text-left text-[1em] leading-[1.35] text-[var(--olive)]">
                        {account.accountNumber || "계좌 정보 준비중"}
                      </p>
                    </div>
                    <div className="relative flex min-w-[4.72em] flex-row justify-end gap-[0.42em]">
                      <button
                        className="relative flex h-[2.15em] w-[2.15em] cursor-pointer appearance-none items-center justify-center rounded-full border border-[rgba(133,129,101,0.4)] bg-transparent text-[0.95em] leading-none text-[var(--olive)] disabled:pointer-events-none disabled:cursor-default disabled:opacity-[0.34]"
                        type="button"
                        disabled={!hasAccount}
                        onClick={() => copyAccount(accountCopyText)}
                        aria-label={`${account.name} 계좌번호 복사`}
                      >
                        ⧉
                      </button>
                      {hasKakaoPay ? (
                        <button
                          className="relative flex h-[2.15em] w-[2.15em] cursor-pointer appearance-none items-center justify-center rounded-full border border-[rgba(133,129,101,0.4)] bg-transparent text-[0.95em] leading-none text-[var(--olive)] disabled:pointer-events-none disabled:cursor-default disabled:opacity-[0.34]"
                          type="button"
                          disabled={!hasAccount}
                          onClick={() => openKakaoPay(account.kakaoPayUrl)}
                          aria-label={`${account.name} 카카오페이 송금`}
                        >
                          <KakaoPayIcon />
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

      <p
        className={`pointer-events-none fixed bottom-12 left-1/2 z-[2100] w-max max-w-[calc(100%-3em)] -translate-x-1/2 rounded-full bg-[rgba(55,54,43,0.84)] py-[0.7em] px-[1em] text-[0.88em] leading-[1.7em] text-white transition-[opacity,transform] duration-[180ms] ease-[ease] ${
          toastMessage
            ? "translate-y-0 opacity-100"
            : "translate-y-[0.5em] opacity-0"
        }`}
      >
        {toastMessage}
      </p>
    </>
  );
}
