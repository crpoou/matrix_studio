import { SearchType } from '@interface'

export const StateMutationsMap = Object.freeze({
  /** 切换左侧边栏 */
  TOOGLE_ASIDE_LEFT: 'TOOGLE_ASIDE_LEFT',
  OPEN_ASIDE_LEFT: 'OPEN_ASIDE_LEFT',
  CLOSE_ASIDE_LEFT: 'CLOSE_ASIDE_LEFT'
})

export const ProvideInjectKeyMap = Object.freeze({
  DISABLED: 'DISABLED',
  CURRENT_TAB: 'CURRENT_TAB'
})

export const TitleMap = Object.freeze({ true: '退出全屏', false: '进入全屏' })
export const IconMap = Object.freeze({ true: 'ft-minimize', false: 'ft-maximize' })
export const ComponentList = Object.freeze({
  ComponentTree: 'text-crimson ft-grid',
  VariablePool: 'text-orange ft-server'
})

// eslint-disable-next-line no-unused-vars
export const SearchTypeMap: { [key in SearchType]: { next: SearchType; label: string } } = {
  uuid: { next: 'displayName', label: '卡片ID' },
  displayName: { next: 'uuid', label: '卡片名称' }
}
export const EmptyLabel = '无搜索结果'
export const EmptyArr: readonly any[] = Object.freeze([])
