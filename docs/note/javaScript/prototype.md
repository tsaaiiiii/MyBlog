# 原型鏈

##

 <img src="/object.png" />

**原型鏈的概念：**

在 JS 中，每個物件都有一個隱藏屬性 `[[Prototype]]`，這個屬性指向另一個物件，稱為「原型（Prototype）」。
當在存取一個物件的方法或屬性時，JS 會先在物件中尋找有沒有這個方法或屬性，如果沒有，就會沿著原型鏈再往上一層找，直到終點的 null 為止。

舉例：

```
const arr = [1,2,3]
const newArr = Object.assign([],arr)

// arr 的原型鏈會先指向 Array.prototype，
// 這個方法在 Array.prototype 找不到時，就會繼續往 Object.prototype 尋找。
// 因此雖然是陣列，但卻可以使用物件的方法。
```

---

補充：由於 `[[Prototype]]` 是隱藏屬性，所以無法直接取得，需要透過 `__proto__` 或 `Object.getPrototypeOf(obj)` 取得。

舉例：

```
const arr = [];
console.log(arr.__proto__); // 會得到 Array.prototype
console.log(arr.__proto__.__proto__); // 會得到 Object.prototype
console.log(arr.__proto__.__proto__.__proto__); // 會得到 null

// arr  →  Array.prototype  →  Object.prototype  →  null
```
