# 建立共用的 UI 組件

##

我覺得在一個長期需要進行開發與維護的專案中，有一個屬於這個專案的組件庫，在後續開發上，以及設計上，我認爲都是有幫助的。

- 在**設計**上，我認為這可以幫助到整體專案風格的一致性，且對接手專案的設計師也可以更好的應用與上手。
- 在**開發**上，對開發人員也會很友善，因為共用組件會減少重複開發，維護也變得更集中，如果有需求更動時，只需要更新共用組件即可。不過組件需要有足夠的彈性，以供後續增加新的需求，或是在樣式上保留調整空間。

### 結論：

建立共用的 UI 組件可以

1. 讓設計達成一致性。
2. 提升開發效率並且讓維護成本降低。
3. 組件如果有足夠的彈性，不僅可以滿足開發上的基本需求，也可以讓設計師根據不同情況進行調整。進而讓開發人員與設計師可以更順利的協作。
4. 讓新接手的設計師與開發人員可以更快的上手。

### 範例：

製作一個按鈕的組件

```
<template>
  <button :class="buttonStyle" :disabled="disabled || loading">
    <slot v-if="!loading"></slot>
    <span v-else <span v-else class="loading-spinner"></span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type: 'primary' | 'secondary'
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium'
})

const buttonStyle = computed(() => [
  'btn',
  `btn-${props.type}`,
  `btn-${props.size}`,
  { 'btn-disabled': !!props.disabled, 'btn-loading': !!props.loading }
])
</script>
```
