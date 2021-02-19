import { IGlobalSearchTypeItem, SearchType } from '@interface'

export const StateMutationsMap = Object.freeze({
  /** 切换左侧边栏 */
  TOOGLE_ASIDE_LEFT: 'TOOGLE_ASIDE_LEFT',
  OPEN_ASIDE_LEFT: 'OPEN_ASIDE_LEFT',
  CLOSE_ASIDE_LEFT: 'CLOSE_ASIDE_LEFT'
})

export const ProvideInjectKeyMap = Object.freeze({
  DISABLED: Symbol(),
  CURRENT_TAB: Symbol()
})

export const TitleMap = Object.freeze({ true: '退出全屏', false: '进入全屏' })
export const IconMap = Object.freeze({ true: 'ft-minimize', false: 'ft-maximize' })
export const ComponentList = Object.freeze({
  ComponentTree: 'text-crimson ft-grid',
  VariablePool: 'text-orange ft-server'
})

// eslint-disable-next-line no-unused-vars
export const SearchTypeMap: Record<SearchType, Readonly<IGlobalSearchTypeItem>> = Object.freeze({
  uuid: Object.freeze<IGlobalSearchTypeItem>({ next: 'displayName', label: '卡片ID' }),
  displayName: Object.freeze<IGlobalSearchTypeItem>({ next: 'uuid', label: '卡片名称' })
})
export const EmptySearch = '无搜索结果'
export const EmptyArr: ReadonlyArray<never> = Object.freeze([])
export const EmptyObj: Readonly<Record<string, never>> = Object.freeze<Record<string, never>>({})
export const EmptyStr = ''
