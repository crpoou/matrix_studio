import { Store, useStore as baseUseStore, createStore } from 'vuex'
import { InjectionKey } from 'vue'
import { StateMutations } from '@constant'

interface IState {
  asideLeftOpen: boolean
  loading: boolean
}
/** 全局Store */
export const store = createStore<IState>({
  state: {
    asideLeftOpen: false,
    loading: false
  },
  getters: {},
  actions: {},
  mutations: {
    [StateMutations.OPEN_ASIDE_LEFT](state) {
      state.asideLeftOpen = true
    },
    [StateMutations.CLOSE_ASIDE_LEFT](state) {
      state.asideLeftOpen = false
    },
    [StateMutations.TOGGLE_ASIDE_LEFT](state) {
      state.asideLeftOpen = !state.asideLeftOpen
    },
    [StateMutations.SHOW_TOAST](state) {
      state.loading = true
    },
    [StateMutations.HIDDEN_TOAST](state) {
      state.loading = false
    }
  },
  // modules: {
  //   debug: {
  //     namespaced: true,
  //     getters?: GetterTree<S, R>;
  //     actions?: ActionTree<S, R>;
  //     mutations?: MutationTree<S>;
  //     modules?: ModuleTree<R>;
  //   }
  // },
  /** 开发环境开启日志功能？？？ */
  // plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  strict: true,
  devtools: true
})

export const key: InjectionKey<Store<IState>> = Symbol()

export function useStore(): Store<IState> {
  return baseUseStore(key)
}
