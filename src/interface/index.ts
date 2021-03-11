interface IBase {
  uuid: string
  displayName: string
  flow: Step
}

export interface Branch extends IBase {
  steps: Steps
  parent: Step
  [key: string]: any
}

export type Branchs = Set<Branch>

export interface Step extends IBase {
  branchs?: Branchs
  parent: Branch
  [key: string]: any
}

export type Steps = Set<Step>

// eslint-disable-next-line no-unused-vars
export type ReduceStepVoidCb = (step: Step) => void

// eslint-disable-next-line no-unused-vars
export type ReduceFlowsVoidCb = (item: Step | Branch) => void

export type SearchType = 'uuid' | 'displayName'

export interface IGlobalSearchTypeItem {
  next: SearchType
  label: string
}
