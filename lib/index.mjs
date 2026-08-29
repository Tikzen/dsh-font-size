import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
//#region src/index.mjs
const FONT_SIZE_SETTINGS_NAMESPACE = "dsh-font-size";
const FONT_SIZE_NAMESPACE = settingsNamespace(FONT_SIZE_SETTINGS_NAMESPACE);
const DEFAULT_FONT_SIZES = Object.freeze({
	size11: 11,
	size12: 12,
	size13: 13,
	size14: 14,
	size15: 15,
	size16: 16,
	size20: 20,
	size22: 22,
	size24: 24
});
const FontSizeSettingsSchema = z.object({
	size11: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size11),
	size12: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size12),
	size13: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size13),
	size14: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size14),
	size15: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size15),
	size16: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size16),
	size20: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size20),
	size22: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size22),
	size24: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size24)
});
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(FONT_SIZE_NAMESPACE, FontSizeSettingsSchema);
	});
}
//#endregion
export { DEFAULT_FONT_SIZES, FONT_SIZE_NAMESPACE, FONT_SIZE_SETTINGS_NAMESPACE, FontSizeSettingsSchema, apply };
