# 程式碼優化

<br/>

---

- <b>if / else</b>

```
const selectedStoreIds = computed(() => {
   const { store_ids } = route.query

    if (isArray(store_ids)) return store_ids.map((id) => Number(id))
    else if (isString(store_ids)) return [Number(store_ids)]
    else return storeIds.value
 })
```

<br/>

- <b>處理 null 與 undefined 時</b>

```
const keyword = null;
const result = String(keyword ?? '') || undefined;
console.log(result); // 會輸出 undefined

null -> String(null ?? '') -> String('') -> '' || undefined -> undefined ('' 為假值)
```

<br/>

- <b>防呆寫法</b>

```
 data.value = option_items?.data ?? []
```

<br/>

- <b>值不是 true/false 但要判斷 true/false</b>

```
const isShow = ref(0)
!!isShow ? '顯示':'隱藏'
```

<br/>

- <b>forEach 找到不重複的，先使用 includes 判斷</b>

```
items
   .forEach((item) => {
     const id = item.code
     const name = item.name

 // 用 includes 判斷有沒有重複，沒有重複才會進入 if 判斷式裡面。
     if (!discountIds.includes(id)) {
           discountIds.push(id)
           discountNames.push(name)
         }
      })

     discountNames.forEach((item, index) => {
        newData.push([[item, discountIds[index]]])
     })
```

<br/>

- <b>希望可選參數又有預設值，不填者即為預設值。</b>

```
// 希望 isShowHour 為可選參數，如果不填，預設值即為 1

/**
   * 新增標題區塊
   * @param { array } date - 開始時間與結束時間
   * @param { 0 | 1 } isShowHour - 時間是否要顯示
   */
  public addTitle(date: number[] ,isShowHour: 0 | 1 = 1): void {
    const DATE_FORMAT = 'YYYY/MM/DD'

    const dateDescription = !!isShowHour
      ? `${dateTimeFormat(date[0])}_${dateTimeFormat(date[1])}`
      : `${dateTimeFormat(date[0], DATE_FORMAT)} - ${dateTimeFormat(date[1], DATE_FORMAT)}`
  }
```

<br/>

- <b>function 或 method 不應該有太多 params ，如果真的需要改成用物件方式帶入較好</b>

```
錯誤：
public addSheet(name: string, title: string, id:number, data:object){}

建議修改：
const config = {
    name: '',
    title: '',
    id: 0
    ...
}

public addSheet(config){}
```

<br/>

- <b>如果值一定存在，絕對不會是 null 或是 undefined，可改為「!」 </b>

```
// ! 為 非空斷言運算符
可改為
data!.orders_price
```

<br/>

- <b>Array.from - 可以看作是處理 for 迴圈的一種更簡潔和函數式的方式。</b>

```
// 目的：生成一個陣列為一天的時間段
// ['00:00 - 00:59','01:00 - 01:59','02:00 - 02:59', ... ,'23:00 - 23:59']

const hourOfXLine = ref<string[]>([])
for (let i = 0; i < 24; i++) {
   const formattedNumber = `${i.toString().padStart(2, '0')}:00 - ${i.toString().padStart(2, '0')}:59`
   hourOfXLine.value.push(formattedNumber)
}

-------------------- 寫法優化 --------------------->
const hourOfXLine = Array.from({ length: 24 }, (_, index) => `${index.toString().padStart(2, '0')}:00 - ${index.toString().padStart(2, '0')}:59`)
```
