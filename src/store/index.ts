import { Store, useStore as baseUseStore, createStore } from 'vuex'
import { InjectionKey } from 'vue'
import { StateMutationsMap } from '@constant'

interface IState {
  asideLeftOpen: boolean
}
/** 全局Store */
export const store = createStore<IState>({
  state() {
    return {
      asideLeftOpen: false
    }
  },
  getters: {},
  actions: {},
  mutations: {
    [StateMutationsMap.OPEN_ASIDE_LEFT](state) {
      state.asideLeftOpen = true
    },
    [StateMutationsMap.CLOSE_ASIDE_LEFT](state) {
      state.asideLeftOpen = false
    },
    [StateMutationsMap.TOGGLE_ASIDE_LEFT](state) {
      state.asideLeftOpen = !state.asideLeftOpen
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
