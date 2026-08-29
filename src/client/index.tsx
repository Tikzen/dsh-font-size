import { defineStore } from '@deepseek-ai/dsh-client-runtime/client'
import type { SettingsScope } from '@deepseek-ai/dsh-client-runtime/client'
import type { ReactNode } from 'react'

const NAMESPACE = 'dsh-font-size'
const DEFAULTS = {
  size11: 11,
  size12: 12,
  size13: 13,
  size14: 14,
  size15: 15,
  size16: 16,
  size20: 20,
  size22: 22,
  size24: 24,
} as const
type FontSizeKey = keyof typeof DEFAULTS
type FontSizes = Record<FontSizeKey, number>

const TOKEN_DEFINITIONS: Record<string, { key: FontSizeKey; weight: string; lineHeight: number; family: string; italic?: boolean }> = {
  '--dsw-font-xl-24': { key: 'size24', weight: '600', lineHeight: 32, family: 'var(--dsw-font-family)' },
  '--dsw-font-l-20': { key: 'size20', weight: '500', lineHeight: 28, family: 'var(--dsw-font-family)' },
  '--dsw-font-m-18': { key: 'size16', weight: '500', lineHeight: 28, family: 'var(--dsw-font-family)' },
  '--dsw-font-base-16': { key: 'size16', weight: '400', lineHeight: 24, family: 'var(--dsw-font-family)' },
  '--dsw-font-base-strong-16': { key: 'size16', weight: '500', lineHeight: 24, family: 'var(--dsw-font-family)' },
  '--dsw-font-s-14': { key: 'size14', weight: '400', lineHeight: 22, family: 'var(--dsw-font-family)' },
  '--dsw-font-s-strong-14': { key: 'size14', weight: '500', lineHeight: 22, family: 'var(--dsw-font-family)' },
  '--dsw-font-xs-13': { key: 'size13', weight: '400', lineHeight: 20, family: 'var(--dsw-font-family)' },
  '--dsw-font-xs-strong-13': { key: 'size13', weight: '500', lineHeight: 20, family: 'var(--dsw-font-family)' },
  '--dsw-font-xxs-12': { key: 'size12', weight: '400', lineHeight: 18, family: 'var(--dsw-font-family)' },
  '--dsw-font-xxs-strong-12': { key: 'size12', weight: '500', lineHeight: 18, family: 'var(--dsw-font-family)' },
  '--dsw-font-xxxs-11': { key: 'size11', weight: '400', lineHeight: 14, family: 'var(--dsw-font-family)' },
  '--dsw-font-xxxs-strong-11': { key: 'size11', weight: '500', lineHeight: 14, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-h1': { key: 'size24', weight: '700', lineHeight: 34, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-h2': { key: 'size22', weight: '700', lineHeight: 32, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-h3': { key: 'size20', weight: '700', lineHeight: 30, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-h4': { key: 'size16', weight: '600', lineHeight: 28, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-base': { key: 'size16', weight: '400', lineHeight: 28, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-base-strong': { key: 'size16', weight: '600', lineHeight: 28, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-base-italic': { key: 'size16', weight: '400', lineHeight: 28, family: 'var(--dsw-font-family)', italic: true },
  '--dsw-font-markdown-base-strong-italic': { key: 'size16', weight: '600', lineHeight: 28, family: 'var(--dsw-font-family)', italic: true },
  '--dsw-font-markdown-table': { key: 'size15', weight: '400', lineHeight: 25, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-table-head': { key: 'size15', weight: '500', lineHeight: 25, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-small': { key: 'size14', weight: '400', lineHeight: 24, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-small-strong': { key: 'size14', weight: '600', lineHeight: 24, family: 'var(--dsw-font-family)' },
  '--dsw-font-markdown-small-italic': { key: 'size14', weight: '400', lineHeight: 24, family: 'var(--dsw-font-family)', italic: true },
  '--dsw-font-markdown-small-strong-italic': { key: 'size14', weight: '600', lineHeight: 24, family: 'var(--dsw-font-family)', italic: true },
  '--dsw-font-markdown-code': { key: 'size14', weight: '400', lineHeight: 22, family: 'var(--ds-font-family-code)' },
  '--dsw-font-markdown-code-block': { key: 'size13', weight: '400', lineHeight: 22, family: 'var(--ds-font-family-code)' },
  '--dsw-font-markdown-code-block-small': { key: 'size12', weight: '400', lineHeight: 18, family: 'var(--ds-font-family-code)' },
}

const CSS = String.raw`
[data-dsh-font-size-row] { padding: 16px 0; border-bottom: 1px solid var(--dsw-alias-border-l1, rgba(0,0,0,.08)); }
[data-dsh-font-size-row] h3 { margin: 0 0 4px; color: var(--dsw-alias-label-primary, #111); font-size: 14px; line-height: 22px; font-weight: 500; }
[data-dsh-font-size-row] p { margin: 0 0 12px; color: var(--dsw-alias-label-tertiary, #666); font-size: 12px; line-height: 18px; }
[data-dsh-font-size-grid] { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px 12px; }
[data-dsh-font-size-field] { display: flex; align-items: center; gap: 6px; min-width: 0; }
[data-dsh-font-size-field] label { flex: 1; min-width: 0; color: var(--dsw-alias-label-secondary, #444); font-size: 12px; line-height: 18px; }
[data-dsh-font-size-field] input { width: 64px; min-width: 0; height: 30px; padding: 0 7px; border: 1px solid var(--dsw-alias-border-l2, rgba(0,0,0,.12)); border-radius: 6px; background: var(--dsw-alias-bg-base, #fff); color: var(--dsw-alias-label-primary, #111); font: inherit; font-size: 13px; text-align: right; }
[data-dsh-font-size-field] span { color: var(--dsw-alias-label-tertiary, #666); font-size: 12px; }
[data-dsh-font-size-actions] { display: flex; justify-content: flex-end; margin-top: 12px; }
[data-dsh-font-size-actions] button { border: 0; background: transparent; color: var(--dsw-alias-state-business-primary, #416ee6); cursor: pointer; font: inherit; font-size: 12px; }
@media (max-width: 720px) { [data-dsh-font-size-grid] { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 460px) { [data-dsh-font-size-grid] { grid-template-columns: 1fr; } }
`

const patchedRules = new Map<CSSStyleRule, { value: string; priority: string }>()
const SIZE_RE = /^(\d+(?:\.\d+)?)px$/
const FONT_KEYS = Object.keys(DEFAULTS) as FontSizeKey[]

function walkRules(rules: CSSRuleList, visitor: (rule: CSSStyleRule) => void): void {
  for (const rule of Array.from(rules)) {
    if (rule.type === CSSRule.STYLE_RULE) visitor(rule as CSSStyleRule)
    if ('cssRules' in rule && rule.cssRules) walkRules(rule.cssRules, visitor)
  }
}

function patchLiteralFontSizes(): void {
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (sheet.ownerNode instanceof HTMLStyleElement && sheet.ownerNode.dataset.dshFontSize === 'true') continue
      if (sheet.cssRules) walkRules(sheet.cssRules, (rule) => {
        const raw = rule.style.getPropertyValue('font-size').trim()
        const match = SIZE_RE.exec(raw)
        if (!match) return
        const key = `size${Number(match[1])}` as FontSizeKey
        if (!FONT_KEYS.includes(key)) return
        if (!patchedRules.has(rule)) patchedRules.set(rule, { value: raw, priority: rule.style.getPropertyPriority('font-size') })
        rule.style.setProperty('font-size', `var(--dsh-font-${key})`, rule.style.getPropertyPriority('font-size'))
      })
    } catch {
      // Cross-origin sheets and transient sheets are not patchable; token overrides still apply.
    }
  }
}

function restoreLiteralFontSizes(): void {
  for (const [rule, original] of patchedRules.entries()) {
    rule.style.setProperty('font-size', original.value, original.priority)
  }
  patchedRules.clear()
}

function tokenCss(sizes: FontSizes): string {
  const lines = FONT_KEYS.map(key => `--dsh-font-${key}: ${sizes[key]}px;`)
  for (const [name, definition] of Object.entries(TOKEN_DEFINITIONS)) {
    const italic = definition.italic ? 'italic ' : ''
    lines.push(`${name}: ${italic}${definition.weight} ${sizes[definition.key]}px/${definition.lineHeight}px ${definition.family};`)
    lines.push(`${name}-font-size: ${sizes[definition.key]}px;`)
  }
  return `body { ${lines.join(' ')} }`
}

function applyFontSizes(style: HTMLStyleElement, sizes: FontSizes): void {
  style.textContent = `${tokenCss(sizes)}${CSS}`
  patchLiteralFontSizes()
}

const store = defineStore({
  init: () => ({ ...DEFAULTS, revision: -1, status: 'loading' as const, writable: false }),
  actions: {
    sync: (draft, snapshot: { value?: FontSizes; revision?: number; status: string; writable: boolean }) => {
      if (snapshot.value) Object.assign(draft, snapshot.value)
      draft.revision = snapshot.revision ?? -1
      draft.status = snapshot.status as 'loading'
      draft.writable = snapshot.writable
    },
  },
})

function FontSizeRow({ t, useStore, setFontSize, resetFontSize }: any): ReactNode {
  const state = useStore((snapshot: any) => snapshot)
  const fields: Array<{ key: FontSizeKey; label: string }> = [
    { key: 'size24', label: t('size24') }, { key: 'size22', label: t('size22') }, { key: 'size20', label: t('size20') },
    { key: 'size16', label: t('size16') }, { key: 'size15', label: t('size15') }, { key: 'size14', label: t('size14') },
    { key: 'size13', label: t('size13') }, { key: 'size12', label: t('size12') }, { key: 'size11', label: t('size11') },
  ]
  return <div data-dsh-font-size-row>
    <h3>{t('title')}</h3>
    <p>{t('description')}</p>
    <div data-dsh-font-size-grid>
      {fields.map(({ key, label }) => <div data-dsh-font-size-field key={key}>
        <label htmlFor={`dsh-font-${key}`}>{label}</label>
        <input
          key={`${key}-${state[key]}`}
          id={`dsh-font-${key}`}
          type="number"
          min={8}
          max={80}
          step={1}
          defaultValue={state[key]}
          disabled={!state.writable}
          onBlur={(event) => {
            const value = Number(event.currentTarget.value)
            if (!Number.isFinite(value)) return
            const normalized = Math.min(80, Math.max(8, Math.round(value)))
            event.currentTarget.value = String(normalized)
            void setFontSize(key, normalized)
          }}
          onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur() }}
        />
        <span>px</span>
      </div>)}
    </div>
    <div data-dsh-font-size-actions><button type="button" disabled={!state.writable} onClick={() => { void resetFontSize() }}>{t('reset')}</button></div>
  </div>
}

const zh = {
  title: '字体大小', description: '调整 DSH 界面和 Markdown 内容的字号。', reset: '恢复默认',
  size24: '特大标题', size22: 'Markdown 二级标题', size20: '大标题', size16: '正文', size15: 'Markdown 表格', size14: '小号文字', size13: '辅助文字', size12: '细节文字', size11: '极小文字',
}
const en = {
  title: 'Font size', description: 'Adjust DSH interface and Markdown text sizes.', reset: 'Reset to defaults',
  size24: 'Extra large heading', size22: 'Markdown H2', size20: 'Large heading', size16: 'Body text', size15: 'Markdown table', size14: 'Small text', size13: 'Supporting text', size12: 'Detail text', size11: 'Extra small text',
}

export const inject = ['slots', 'locale', 'connection', 'remote', 'settingsScope']

export function apply(ctx: any): void {
  const scope = ctx.settingsScope.bind({ namespace: NAMESPACE }) as SettingsScope<FontSizes>
  let bound: any
  const sync = (): void => bound?.sync(scope.getSnapshot())
  ctx.effect(() => scope.subscribe(sync), 'dsh-font-size: settings subscription')
  ctx.effect(() => ctx.locale.register('dsh-font-size', { zh, en }), 'dsh-font-size: dictionaries')

  const style = document.createElement('style')
  style.dataset.dshFontSize = 'true'
  document.head.append(style)
  const observer = new MutationObserver(() => patchLiteralFontSizes())
  observer.observe(document.head, { childList: true, subtree: true })
  ctx.effect(() => () => { observer.disconnect(); restoreLiteralFontSizes(); style.remove() }, 'dsh-font-size: styles')

  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item', id: 'font-size', order: 20, store, locale: 'dsh-font-size',
    inject: (actions: any) => {
      bound = actions
      sync()
      return {
        setFontSize: async (key: FontSizeKey, value: number) => {
          if (!Number.isFinite(value)) return
          await scope.set(key, Math.round(value))
        },
        resetFontSize: async () => { await Promise.all(FONT_KEYS.map(key => scope.unset(key))) },
      }
    },
  }, (props: any) => <FontSizeRow {...props} />))

  ctx.effect(() => {
    const dispose = scope.subscribe(() => {
      const snapshot = scope.getSnapshot()
      const values = snapshot.value ?? DEFAULTS
      applyFontSizes(style, values)
    })
    applyFontSizes(style, scope.getSnapshot().value ?? DEFAULTS)
    return dispose
  }, 'dsh-font-size: apply CSS')
}
