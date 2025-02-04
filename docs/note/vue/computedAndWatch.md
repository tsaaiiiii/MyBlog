# computed｜watch

<h2>computed</h2>

<b>特性：</b>

1.  一定會回傳一個值。
2.  computed **無法直接傳入參數**，而是依賴 **reactive 變數** 自動計算。
3.  computed **本身是唯讀的**，只能透過 getter 取得值，不能直接修改。
4.  響應式依賴，按照以下範例，當 price 或 num 變動時， total 也會跟著改動。

```
<script setup>
const price = ref(400);
const num = ref(1);
const total = computed(() => price.value*num.value); // 這樣的寫法只會有 getter
</script>

<template>
  <div>{{ total }}</div>
</template>

```

5. Vue 提供了一種方式，可以讓 computed 不只是唯讀，可以有 getter 和 setter

```
<script setup>
const price = ref(400);
const num = ref(1);

// 可讀寫的 computed
const total = computed({
  get: () => price.value * num.value,
  set: (newValue) => {
    num.value = newValue / price.value;
  }
});
</script>

<template>
  <div>總價: {{ total }}</div>
  <button @click="total = 2000">設定總價為 2000</button>
</template>
```

## watch

<b>特性：</b>

1. 會偵測某個值，當該值有變化時，就會執行。
2. 可傳入參數：
   - 第一個參數：更新後的值 (`newVal`)。
   - 第二個參數：更新前的值 (`oldVal`)。
3. 比起 computed，可以處理非同步工作。

```
<template>
  <div>
    <input v-model="inputValue" />
  </div>
</template>

<script setup>
const  inputValue = ref('');
watch(inputValue, (newVal, oldVal) => {
  console.log(`新值：${newVal}`);
  console.log(`舊值：${oldVal}`);
});
</script>
```

4. 因為 watch 也是在資料變更時才觸發，所以預設的初始是不會觸發的，而 **immediate 就是在需要初始就觸發時的解決方法**。

```
watch(inputValue, (newVal, oldVal) => {
       console.log(`新值：${newVal}`);
       console.log(`舊值：${oldVal}`);
     }, { immediate: true });
```

## **Watch 和 Computed 各自是同步還是異步？為什麼？**

- ### `watch` 是異步的：
  當監聽對象的資料變化時，`watch` 的回調函數（callback function）會被放入事件循環的隊列（event queue）中，確保所有數據變化已經完成後再執行回調。這避免了在數據變化過程中多次觸發回調。

> 1. 監聽器初始化，watch 會先幫監聽的值，存下初始的舊值。
> 2. 在資料修改時，vue 的響應式機制會立刻觸發（newVal 立刻產生），相應的數據會跟著一起更新。
> 3. 雖然 oldVal 與 newVal 已經更新完成了，但 watch 回調會被排入微任務隊列，等到同步的程式碼完成後，才會排隊執行回調。
> 4. 這時 DOM 才更新。
> 5. DOM 更新完成後，Vue.nextTick 才會執行。

```
# Vue 預設的 watch flush 模式為 "pre" : 讓 watch 預設回調的時機點為以上敘述。

<template>
  <div>
     <p id="count">{{ count }}</p>
     <button @click="updateCount">Click!!</button>
  </div>
</template>

<script setup lang="ts">
  const count = ref(0)

  watch(
    count,
    (newVal, oldVal) => {
      // 這裡的 watch 回調在同步程式碼結束後、但在 DOM 更新之前執行
      console.log('watch 回調執行，oldVal:', oldVal, 'newVal:', newVal)

      // 嘗試讀取 DOM 中 count 元素的內容，
      // 證明此時 DOM 尚未更新，displayElem?.textContent 的結果是 0
      const displayElem = document.getElementById('count')
      console.log('DOM 更新前 count 的文字:', displayElem?.textContent)

      // 4. 使用 nextTick 等待 DOM 更新完成後執行回調
      nextTick(() => {
        const displayAfter = document.getElementById('count')
        console.log('DOM 更新後 count 的文字:', displayAfter?.textContent)
      })
    },
    { flush: 'pre' } // 是預設值
  )

  // 點擊 button 更新 count
  const updateCount = () => {
    console.log('--- 開始更新 count ---')
    count.value += 1
    console.log('count 已更新:', count.value)
  }
</script>
```

結論：

1. watch 在預設的情況下，是比 DOM 更新還要早取得更新。
2. watch 能夠「異步」執行，主要是因為它利用了批次處理與微任務隊列處理，雖然 newVal 會即時跟著響應式數據更新，但是回調則是會被丟進微任務隊列裡，等到所有同步任務都處理好之後，再執行 watch 的回調。

- ### `computed` 是同步的：
  但它採用了 **懶執行（lazy evaluation）** 的機制。
  `computed` 的原理是基於 **getter**，在依賴的數據發生變化時，`computed` 的值不會立即重新計算，只有當它被其他地方訪問時，才會重新計算值。確保了在需要的時候，`computed` 的值總是最新的。
