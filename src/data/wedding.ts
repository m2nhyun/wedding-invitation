import { assetPath } from "@/lib/asset-path";

export const wedding = {
  site: {
    title: "김제현 송영현",
    description: "2026년 10월 17일 12시 30분",
  },
  couple: {
    groom: {
      name: "김제현",
      parents: "김명국 김정희의 아들",
    },
    bride: {
      name: "송영현",
      parents: "송두석 한정희의 딸",
    },
  },
  intro: {
    title: "결혼합니다.",
    logoAlt: "Logo",
    message: [
      [
        "유난히 따뜻했던 2017년 가을 시작된 대화는",
        "수많은 계절을 지나 지금까지 이어지고 있습니다.",
      ],
      [
        "앞으로도 서로의 곁에서 함께 장마를 보고,",
        "새하얀 크리스마스를 맞이하려 합니다.",
      ],
      [
        "2026년 가을, 소중한 약속이 시작되는 자리에 오셔서",
        "따뜻한 응원과 축복으로 자리를 빛내주세요.",
      ],
    ],
  },
  event: {
    date: "2026년 10월 17일",
    time: "12시 30분",
    venue: "한국은행, 중구 남대문로 39",
    parking: "주차 가능합니다.",
    naverMapUrl: "https://naver.me/xtNyjOgy",
    naverMapAppUrl:
      "nmap://search?query=%ED%95%9C%EA%B5%AD%EC%9D%80%ED%96%89%20%EC%A4%91%EA%B5%AC%20%EB%82%A8%EB%8C%80%EB%AC%B8%EB%A1%9C%2039&appname=www.jh-yh.kr",
    kakaoMapUrl: "https://kko.to/OTYRI91GQP",
    naverMapLabel: "네이버지도",
    kakaoMapLabel: "카카오맵",
  },
  gift: {
    labels: {
      heading: "마음 보내실 곳",
      close: "닫기",
      closeSymbol: "×",
      copySuccess: "계좌번호를 복사했어요.",
      accountPending: "계좌 정보 준비중",
      copyAccount: "계좌번호 복사",
      copySymbol: "⧉",
      kakaoPay: "카카오페이 송금",
      kakaoPaySymbol: "₩",
    },
    groom: {
      title: "신랑측",
      accounts: [
        {
          relation: "부",
          hanja: "父",
          name: "김명국",
          bank: "우리은행",
          accountNumber: "025 102712 02 2501",
          kakaoPayUrl: "",
        },
        {
          relation: "모",
          hanja: "母",
          name: "김정희",
          bank: "신한은행",
          accountNumber: "110 448 016880",
          kakaoPayUrl: "",
        },
        {
          relation: "본인",
          hanja: "",
          name: "김제현",
          bank: "카카오뱅크",
          accountNumber: "3333 02 4025793",
          kakaoPayUrl: "https://link.kakaopay.com/__/_9x4Q35",
        },
      ],
    },
    bride: {
      title: "신부측",
      accounts: [
        {
          relation: "부",
          hanja: "父",
          name: "송두석",
          bank: "",
          accountNumber: "",
          kakaoPayUrl: "",
        },
        {
          relation: "모",
          hanja: "母",
          name: "한정희",
          bank: "",
          accountNumber: "",
          kakaoPayUrl: "",
        },
        {
          relation: "본인",
          hanja: "",
          name: "송영현",
          bank: "",
          accountNumber: "",
          kakaoPayUrl: "",
        },
      ],
    },
  },
  assets: {
    glyph01: assetPath("/assets/glyph01.svg"),
    glyph02: assetPath("/assets/glyph02.svg"),
    glyph03: assetPath("/assets/glyph03.svg"),
    intro: assetPath("/assets/1_12900008_m.jpg"),
    eventBackground: assetPath("/assets/2_13130012.jpg"),
    main: assetPath("/assets/3_12900023.png"),
    gallery: [
      assetPath("/assets/4_MG_4995.png"),
      assetPath("/assets/5_20260511_8.jpg"),
      assetPath("/assets/6_12900026.jpg"),
      assetPath("/assets/7_12900039.jpg"),
      assetPath("/assets/8_13150017.jpg"),
      assetPath("/assets/div5_04.gif"),
      assetPath("/assets/9_13150018.jpg"),
      assetPath("/assets/10_20260511_5.jpg"),
    ],
  },
} as const;
