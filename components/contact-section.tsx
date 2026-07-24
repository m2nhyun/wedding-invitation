"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

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

    document.body.classList.add("is-modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("is-modal-open");
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
      <section className="div3">
        <img id="glyph02" src={wedding.assets.glyph02} alt="" />
        <div className="contact JH">
          <p>{wedding.couple.groom.parents}</p>
          <h1>{wedding.couple.groom.name}</h1>
          <button type="button" onClick={() => setSelectedSide("groom")}>
            마음 보내실 곳
          </button>
        </div>
        <div className="contact YH">
          <p>{wedding.couple.bride.parents}</p>
          <h1>{wedding.couple.bride.name}</h1>
          <button type="button" onClick={() => setSelectedSide("bride")}>
            마음 보내실 곳
          </button>
        </div>
      </section>

      {selectedSide ? (
        <div
          className="gift-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gift-modal-title"
        >
          <button
            type="button"
            className="gift-modal-backdrop"
            aria-label="닫기"
            onClick={() => setSelectedSide(null)}
          />
          <div className="gift-modal-panel">
            <div className="gift-modal-header">
              <p>마음 보내실 곳</p>
              <h2 id="gift-modal-title">{giftSideLabel[selectedSide]}</h2>
              <button
                type="button"
                className="gift-modal-close"
                aria-label="닫기"
                onClick={() => setSelectedSide(null)}
              >
                ×
              </button>
            </div>

            <div className="gift-account-list">
              {wedding.gift[selectedSide].accounts.map((account) => {
                const hasAccount = Boolean(account.accountNumber);
                const hasKakaoPay = Boolean(account.kakaoPayUrl);
                const accountCopyText = getAccountCopyText(
                  account.bank,
                  account.accountNumber,
                );

                return (
                  <div
                    className="gift-account"
                    key={`${selectedSide}-${account.relation}`}
                  >
                    <div className="gift-account-person">
                      <span>
                        {account.relation}
                        {account.hanja ? `(${account.hanja})` : ""}
                      </span>
                      <strong>{account.name}</strong>
                    </div>
                    <div className="gift-account-number">
                      {account.bank ? <span>{account.bank}</span> : null}
                      <p>{account.accountNumber || "계좌 정보 준비중"}</p>
                    </div>
                    <div className="gift-account-actions">
                      <button
                        type="button"
                        disabled={!hasAccount}
                        onClick={() => copyAccount(accountCopyText)}
                        aria-label={`${account.name} 계좌번호 복사`}
                      >
                        ⧉
                      </button>
                      {hasKakaoPay ? (
                        <button
                          type="button"
                          disabled={!hasAccount}
                          onClick={() => openKakaoPay(account.kakaoPayUrl)}
                          aria-label={`${account.name} 카카오페이 송금`}
                        >
                          ₩
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

      <p className={toastMessage ? "gift-toast is-show" : "gift-toast"}>
        {toastMessage}
      </p>
    </>
  );
}
