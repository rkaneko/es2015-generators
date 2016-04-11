Understanding ES2015 generators code samples
===

### References

+ [ES6 generators in depth](http://www.2ality.com/2015/03/es6-generators.html)
+ [Generator @ tc39/ecma262 - ECMAScript | 2017 Language Specification](https://tc39.github.io/ecma262/#sec-properties-of-generator-prototype)

### Run samples

```bash
# transpile using Babel
$ npm run build

# run
$ node dist/js/observers/the-first-next.js
```

### 4.7. yield\*: the full story

`yield*`は

+ generatorからgeneratorを呼び出す関数
+ `yield*`は,generatorが入れ子(caller, callee)になっていると考えれば良いので,`generator#return()`ではcallee generatorの`finally`節もcaller generatorの`finally`節もどちらも実行される. `generator#throw()`ではcallee generatorの`catch`節もcaller generatorの`catch`節もどちらも実行されうるが当然前の方の`catch`節で例外を握りつぶせば後ろの方の`catch`節は実行されない.
