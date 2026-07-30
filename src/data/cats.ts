import { assetPath } from "@/lib/asset-path";

export const catPrototype = {
	cutouts: {
		ready: assetPath("/cats/cutouts/tuxedo-ready.png"),
		sitting: assetPath("/cats/cutouts/black-sitting.png"),
		resting: assetPath("/cats/cutouts/black-resting.png"),
		generativePair: assetPath("/cats/cutouts/generative-pair.png"),
	},
	playFrames: [
		assetPath("/cats/sprites/play/frame-000.00.png"),
		assetPath("/cats/sprites/play/frame-000.12.png"),
		assetPath("/cats/sprites/play/frame-000.25.png"),
		assetPath("/cats/sprites/play/frame-001.00.png"),
		assetPath("/cats/sprites/play/frame-001.12.png"),
		assetPath("/cats/sprites/play/frame-001.75.png"),
	],
} as const;
