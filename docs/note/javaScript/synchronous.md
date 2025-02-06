# 同步與非同步

## 同步

> 程式碼是一步一步執行的，**每一行都要執行完畢之後才繼續**，以此類推。

## 非同步

> 程式碼 **不會等待某些操作完成**（並非跳過或忽略），而是會繼續執行後續的程式碼。
> 非同步模式下，某些操作（資料請求、定時器）不會阻塞程式執行，程式會繼續執行其他程式碼。當非同步操作完成後，會透過 Callback、Promise 或 async/await 來處理結果。

<br/>

- Callback：最基本的異步處理

```
console.log('開始')

setTimeout(() => {
  console.log('資料讀取完成')
}, 1000) // 1 秒後執行

console.log('程式繼續執行')


// 執行順序：
// 開始 -> 程式繼續執行 ->（1 秒後） -> 資料讀取完成
```

<br/>

- Promise：改善 Callback 多個嵌套的問題

```
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('資料讀取完成')
    }, 1000)
  })
}

console.log('開始')

fetchData().then((data) => {
  console.log(data)
})

console.log('程式繼續執行')

// 執行順序：
// 開始 -> 程式繼續執行 ->（1 秒後） -> 資料讀取完成 -> data
```

<br/>

- async/await：Promise 的語法糖。讓非同步程式碼看起來像同步執行。

```
// 因為要等待 fetchData 完成，所以example 這個 async 函式會先暫停，
// 但是 test 這個 function 還是會繼續執行。

const example = async () => {
  console.log('開始')

  const data = await fetchData() // 這裡會等待 fetchData 完成
  console.log(data)

  console.log('程式繼續執行')
}

const test = () =>{
  console.log('123')
}

example()
test()

// 執行順序：
// 開始 -> 123 ->（ 1 秒後 fetchData 完成）-> data -> 程式繼續執行
```
