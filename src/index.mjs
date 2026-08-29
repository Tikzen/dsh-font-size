import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import z from '@deepseek-ai/schemastery'

export const FONT_SIZE_SETTINGS_NAMESPACE = 'dsh-font-size'
export const FONT_SIZE_NAMESPACE = settingsNamespace(FONT_SIZE_SETTINGS_NAMESPACE)

export const DEFAULT_FONT_SIZES = Object.freeze({
  size11: 11,
  size12: 12,
  size13: 13,
  size14: 14,
  size15: 15,
  size16: 16,
  size20: 20,
  size22: 22,
  size24: 24,
})

export const FontSizeSettingsSchema = z.object({
  size11: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size11),
  size12: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size12),
  size13: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size13),
  size14: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size14),
  size15: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size15),
  size16: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size16),
  size20: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size20),
  size22: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size22),
  size24: z.number().step(1).min(8).max(80).default(DEFAULT_FONT_SIZES.size24),
})

export function apply(ctx) {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(FONT_SIZE_NAMESPACE, FontSizeSettingsSchema)
  })
}
