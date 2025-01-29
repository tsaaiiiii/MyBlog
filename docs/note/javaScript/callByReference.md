# 深拷貝淺拷貝

## call by value

```
var x = 1;
var y= "test";
var a = x;
var b = y;
a = 2;
b = "xyz";
console.log(x, y, a, b)  // -> 1, "test", 2, "xyz"

//當a = x時，實際上是把value copy 給 a，所以接著的 a & x 都是獨立的，操作不互相影響。
```

## call by reference

```
var ref1 = [1];
var ref2 = ref1;
ref1.push(2);
console.log(ref1); // -> [1, 2]
console.log(ref2); // -> [1, 2]
console.log(ref1 === ref2); // -> true
```

## call by sharing

```
function changeAge(person) {
  person.age = 25;
  person = { name: 'John', age: 50 };
  return person;
}

var personObj1 = { name: 'Charles', age: 30 };
var personObj2 = changeAge(personObj1);

console.log(personObj1); // -> { name: 'Charles', age: 25 }
console.log(personObj2); // -> { name: 'John', age: 50 }

// person.age = 25; 影響 personObj1，因為 person 指向 personObj1。
// person = { name: 'John', age: 50 }; 只是在函式內部重新賦值，並不影響 personObj1。
```

## 物件淺拷貝(Shallow Copy)、深拷貝(Deep Copy)

[參考資料](https://www.programfarmer.com/articles/2021/javascript-shallow-copy-deep-copy)

- **淺拷貝**：只要有任何一層的資料地址相同，換句話說就是「只要並非兩個完完全全獨立的 Object data」，就依然是淺拷貝。

```
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 };

obj2.b.c = 99;

console.log(obj1.b.c); // -> 99 （obj1 也受到影響）
console.log(obj2.b.c); // -> 99
```

- **深拷貝**： 是兩個完全獨立，每一層的資料地址都不同，相互不影響的深層物件，就為深拷貝(deep copy)。

```
const a = {
    name: 'John',
    id:1
}

const b = cloneDeep(a);
console.log(a===b); -> false
```
