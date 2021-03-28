import { IGlobalSearchTypeItem, SearchType } from '@interface'

export enum StateMutations {
  TOGGLE_ASIDE_LEFT = 'TOGGLE_ASIDE_LEFT',
  OPEN_ASIDE_LEFT = 'OPEN_ASIDE_LEFT',
  CLOSE_ASIDE_LEFT = 'CLOSE_ASIDE_LEFT',
  SHOW_TOAST = 'SHOW_TOAST',
  HIDDEN_TOAST = 'HIDDEN_TOAST'
}

interface IProvideInjectKey {
  DISABLED: symbol
  CURRENT_TAB: symbol
}
export const ProvideInjectKeyMap: Readonly<IProvideInjectKey> = Object.freeze(
  Object.assign<Record<string, never>, IProvideInjectKey>(Object.create(null), {
    DISABLED: Symbol(),
    CURRENT_TAB: Symbol()
  })
)

export const TitleMap = Object.freeze({ true: '退出全屏', false: '进入全屏' })
export const IconMap = Object.freeze({ true: 'ft-minimize', false: 'ft-maximize' })
export const ComponentList = Object.freeze({
  ComponentTree: 'text-crimson ft-grid',
  VariablePool: 'text-orange ft-server'
})

export const SearchTypeMap: Record<SearchType, Readonly<IGlobalSearchTypeItem>> = Object.freeze({
  uuid: Object.freeze<IGlobalSearchTypeItem>({ next: 'displayName', label: '卡片ID' }),
  displayName: Object.freeze<IGlobalSearchTypeItem>({ next: 'uuid', label: '卡片名称' })
})
export const EmptySearch = '无搜索结果'
export const EmptyArr: ReadonlyArray<never> = Object.freeze([])
export const EmptyObj = Object.freeze(Object.create(null) as Record<string, never>)
export const EmptyStr = ''
