<template>
  <template v-if="isShowRead">
    <div class="bg-pink">卡片所有字段！，比作阅读模式</div>
    <section class="grid cu-form">
      <template v-for="(value, key) in step" :key="key">
        {{ key }}：<span>{{ typeof value === 'object' ? '对象类型' : value }}</span>
      </template>
    </section>
    <template v-if="childValidateCollection.size">
      <div class="bg-pink">子卡片错误</div>
      <section class="grid cu-form">
        <template v-for="[key, value] in childValidateCollection" :key="key">
          {{ key }}：
          <section class="grid cu-form">
            <template v-for="[subkey, subvalue] in value" :key="subkey">
              {{ subkey }}：<span>{{ subvalue.value }}</span>
            </template>
          </section>
        </template>
      </section>
    </template>
  </template>
  <div v-if="isShowForm || isShowBranch" v-show="isEdit">
    <template v-if="isShowForm">
      <div class="bg-pink">卡片表单！，比作编辑模式</div>
      <section class="grid cu-form">
        <template v-for="(value, key) in step.form" :key="key">
          {{ key }}:
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <input v-model="step.form[key]" type="text" :validate="!ValidateCollection.get(key)?.value" />
        </template>
      </section>
    </template>
    <template v-if="isShowBranch">
      <div class="bg-pink">子卡片区域！</div>
      <section class="grid-justify-center custom-scroll overlay-y">
        <cu-branch v-for="branch in step.branchs" :key="branch.uuid" :branch="branch" />
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { ComputedRef, computed, defineComponent, inject, onBeforeUnmount, onMounted, reactive } from 'vue'
import { ON_FORM_BEFORE_UNMOUNT, ON_FORM_MOUNTED, ValidateMap } from '@store/Cube'
import CuBranch from '@components/CuBranch/index.vue'
import { FALSE } from '@share'
import { ProvideInjectKeyMap } from '@constant'
import { Step } from '@interface'

// 空字符取反为true，校验通过，报错字符串取反为false，校验不通过，未定义错误，取反为true，校验通过

export default defineComponent({
  name: 'CuForm',
  components: { CuBranch },
  props: {
    step: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  // @ts-ignore
  setup(props: Readonly<{ step: Step; isEdit: boolean }>) {
    /** 从Flow组件接受注入，是否处于活跃的TAB页中 */
    const isInCurrentTab = inject<ComputedRef<boolean>>(ProvideInjectKeyMap.CURRENT_TAB, computed(FALSE))
    const isShowRead = computed(() => isInCurrentTab.value && !props.isEdit)
    const isShowForm = computed(() => isInCurrentTab.value && props.isEdit)
    const isShowBranch = computed(() => props.step.branchs?.size)
    /** 创建当前FORM表单的校验集合 */
    const ValidateCollection = reactive(new Map<string, ComputedRef<boolean | string>>())
    /** 第一层子卡片的全部错误 */
    const childValidateCollection = computed(() => {
      const res = new Map()
      const { branchs } = props.step
      if (branchs) {
        for (const branch of branchs) {
          for (const step of branch.steps) {
            const { uuid } = step
            ValidateMap.has(uuid) && res.set(uuid, ValidateMap.get(uuid))
          }
        }
      }
      return res
    })
    onMounted(() => {
      const { form } = props.step
      if (!form) return
      // 遍历FORM表单，生成所有字段的校验函数
      for (const key of Object.keys(form)) {
        ValidateCollection.set(
          key,
          computed(() => {
            if (props.step.form[key]) {
              return ''
            }
            return '字段不能为空'
          })
        )
      }
      ON_FORM_MOUNTED(props.step, { ValidateCollection })
    })
    onBeforeUnmount(() => ON_FORM_BEFORE_UNMOUNT(props.step))

    return { isInCurrentTab, isShowRead, isShowForm, isShowBranch, ValidateCollection, childValidateCollection }
  }
})
</script>
<style lang="scss">
.cu-form {
  grid-template-columns: auto 1fr;
  padding: 1em;
}
</style>
