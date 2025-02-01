# Pinia 的兩種寫法

## Options Stores 的寫法

- store 是由 reactive 返回的響應式物件，如果直接解構會失去響應性。
- state 與 getters 需要使用 **storeToRefs 解構**，才不會失去響應性。

```
export const usePiniaSetting = defineStore('setting', {
  state: (): State => ({
    // 設定初始值
    name: '',
    email: null,
    phone:'',
  }),
  // computed 的特性，且一樣無法進行非同步，也不可使用箭頭函式
  getters:{
    isExistEmail(): boolean {
      return !!this.email
    }
  },
  // methods
  actions: {
    getData(data: { name: string; email: string | null; phone: string }) {
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
    }
  },
})
```

## Setup Stores 的寫法

```
export const usePiniaSetting = defineStore('setting', () => {
  const name = ref('');
  const email = ref<string | null>(null);
  const phone = ref('');

  const isExistEmail = computed(() => !!email.value);

  const getData = (data: { name: string; email: string | null; phone: string }) => {
    name.value = data.name;
    email.value = data.email;
    phone.value = data.phone;
  };

  return { name, email, phone, isExistEmail, getData };
});

```

## storeToRefs 的使用方式

```
import { storeToRefs } from 'pinia';
import { usePiniaSetting } from '@/stores/setting';

const store = usePiniaSetting();
const { name, email, phone, isExistEmail } = storeToRefs(store);
```

## 結論

> 我認為在選擇哪一種寫法上，可以根據使用情境的複雜度而決定。
>
> - **簡單場景** → 可以使用 **Options Stores**，因為 Vue 內部已經封裝了許多細節，開發者不用再做處理，使開發可以更簡單清楚。
> - **複雜場景** → 可以使用 **Setup Stores**，類似 Composition API 的設計，能將邏輯集中在同一區塊，提高可讀性和維護性。
