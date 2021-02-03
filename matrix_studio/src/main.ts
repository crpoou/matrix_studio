import '@styles/index.scss'
import { key, store } from '@store'
import App from './App.vue'
import CuForm from '@components/CuForm/index.vue'
import CuStep from '@components/CuStep/index.vue'
import { RefreshFlows } from '@store/Cube'
import { createApp } from 'vue'
import { router } from '@router'

createApp(App).component(CuStep.name, CuStep).component(CuForm.name, CuForm).use(store, key).use(router).mount('#app')
RefreshFlows()
