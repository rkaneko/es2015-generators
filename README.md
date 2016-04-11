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

### 5.0 Generators as coroutines (cooperative multitasking)

これまでは,データ・ソースとデータ・シンクのどちらかとして使用される例をみてきた.
多くのアプリケーションにおいてはこの2つの役割を厳密にわけることはシンプルさの観点から良いプラクティス.
この章では,generatorのソースとシンクのどちらの役割も必要なアプリケーション(データの送受信のどちらもやるひつようがある協調マルチタスキング)をみる.

#### 5.1. The full generator interface

Generator objectの

+ outputを扱うIteratorとしてのGenerator object interface
+ inputを扱うObserverとしてのGenerator object interface
+ fullのGenerator object interaface
+ IteratorResult object interface

のECMAScriptの仕様が紹介されている.

#### 5.2. Cooperative multitasking

協調マルチタスキングについて見る前に,JavaScriptの並列性について整理する.

+ 参考: [ECMAScript 6 promises (1/2)](http://www.2ality.com/2014/09/es6-promises-foundations.html)

+ JavaScriptはsingle processで動く.
+ single processの制約を超える2つの方法がある.

0. **Multiprocessing**: Web Workersを使うとJavaScriptをmultiple processesで動かせる.データへの共有アクセスはマルチプロセスの一番の落とし穴のひとつ.なのでWeb Workersにデータの断片を持たせたいときは,コピーしたデータや二度とアクセスすることのないデータを送信するべき.

1. **Cooperative multitasking**: 協調マルチタスクを実現するライブラリはいくつかある.複数プロセスが実行されるが一度に動けるのは1プロセスのみ.それぞれのタスクは明示的に自身をsuspendする必要があり,他のタスクにスイッチしたときはフルコントロールを別のタスクに譲る.明示的にsuspendする分タスク間でのデータ共有に伴うリスクはない.

ほとんどsequentialでときどきのpauseによるcontrol flowになるという点で2つのユースケースでcooperative multitaskingから恩恵を受けられる.

+ 非同期演算: 処理にとても時間のかかる演算結果を受けるまでタスクをブロックするケース.
+ ストリーム: データのstreamをsequentialに処理したり,利用できるデータがない場合に処理をとめるタスクを扱うケース.

**binary streams**に関しては,WHATWGでcallbacksとpromisesをベースにした標準仕様を策定中.

**streams of data**に関しては,**Communicating Sequential Processes (CSP)** が興味深いソリューション.generatorをベースにしたCSPライブラリもある.

**asynchronous computations**に関しては,ECMAScript 6の**Promises**が人気.


