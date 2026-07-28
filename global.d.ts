declare module "*.css";

declare module "*.svg?react" {
	import type { FC, SVGProps } from "react";

	const SvgComponent: FC<SVGProps<SVGSVGElement>>;
	export default SvgComponent;
}
