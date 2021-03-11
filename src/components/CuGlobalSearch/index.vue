<template>
  <transition name="fade-down">
    <div class="grid-column-center">
      <i class="ft-search" />
      <button class="cu-btn" @click="handleChangeSearchType">
        {{ searchTypeLabel }}
      </button>
      <input v-model="searchKey" placeholder="搜索卡片" @keyup.enter="highlightNext" />
      {{ ariaLabel }}
      <button class="cu-btn hint--top hint--rounded" :aria-label="ariaLabel" @click="highlightPrev">
        <i class="text-24 ft-chevron-up" />
      </button>
      <button class="cu-btn hint--top hint--rounded" :aria-label="ariaLabel" @click="highlightNext">
        <i class="text-24 ft-chevron-down" />
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { EmptyArr, EmptySearch, EmptyStr, SearchTypeMap } from '@constant'
import { SEARCH_BY_DISPLAY_NAME, SEARCH_BY_UUID, UuidMap } from '@store/Cube'
import { computed, defineComponent, ref, watch } from 'vue'
import { SearchType } from '@interface'
import { scrollDomIntoView } from '@utils/dom'

const SearchFunMap = { uuid: SEARCH_BY_UUID, displayName: SEARCH_BY_DISPLAY_NAME }

export default defineComponent({
  name: 'CuGlobalSearch',
  setup() {
    const searchKey = ref(EmptyStr)
    const searchType = ref<SearchType>('displayName')
    const searchTypeLabel = computed(() => SearchTypeMap[searchType.value].label)
    const ariaLabel = computed(() => {
      const size = searchResult.value.length
      return size ? `${nextIndex.value}/${size}` : EmptySearch
    })
    const nextIndex = ref(0)
    const searchResult = computed(() => {
      const searchKeyValue = searchKey.value
      if (searchKeyValue) return SearchFunMap[searchType.value](searchKeyValue)
      return EmptyArr
    })
    watch(searchResult, () => {
      nextIndex.value = 0
    })
    function handleChangeSearchType() {
      searchType.value = SearchTypeMap[searchType.value].next
    }
    function _hightLight(index: number) {
      /** 查询数据，检验uuid是否合法 */
      const item = UuidMap.get(searchResult.value[index])
      if (!item) return
      nextIndex.value = index + 1
      scrollDomIntoView(item)
    }
    function highlightPrev() {
      const nextIndexValue = nextIndex.value
      _hightLight(nextIndexValue <= 1 ? searchResult.value.length - 1 : nextIndexValue - 2)
    }
    function highlightNext() {
      const nextIndexValue = nextIndex.value
      _hightLight(nextIndexValue >= searchResult.value.length ? 0 : nextIndexValue)
    }
    return { searchKey, searchTypeLabel, ariaLabel, handleChangeSearchType, highlightPrev, highlightNext }
  }
})
</script>
