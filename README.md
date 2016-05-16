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

**asynchronous computations**に関しては,ECMAScript 6の**Promises**が人気.Generatorsはpromiseのクライアントとしては理想的,なぜなら結果が返ってくるまでsuspendできるから.



##### Simplifying asynchronous code via generators

いくつかのpromise basedライブラリでは非同期コードをgeneratorsを使ってシンプルにしている.

`co`にgenerators関数を渡しているコード例では,`Promise.all()`では非同期に実行される.
タスクとしてgeneratorはfunction `co` のスケジューラに対して,promiseをyieldすることで非同期呼び出しを実現する.
yieldingはgeneratorをポーズさせる.promiseが結果を返すと,スケジューラは`next()`経由で結果を渡すごとにgeneratorを再開する.

#### 5.3. The limitations fo cooperative multitasking via generators

*coroutine*と*generators*経由のマルチタスクの違い

*coroutines*は制限のない協調マルチタスキングである.*coroutine*のなかでは,どんな関数でも*coroutine*全体(すなわちactivationする関数そのものやactivationする関数のcallerやcallerのcallerなどなど)をサスペンドすることができる.

対して,*generator*の中から直接*generator*をサスペンドして,現在のactivation関数がサスペンドされる.

##### The benefits of the limitations of generators

制限に伴う*generator*によるマルチタスクのメリット

+ *generators*はevent loopsとcompatibleでbrowserにおいてはシンプルな協調マルチタスクが実現できる.
+ *generators*は相対的に実装が簡単.なぜなら,一つのactivation関数のみサスペンドされる必要があるだけということと,browserはevent loopsを使い続けることができる(協調マルチタスクのために新しいブラウザ処理実装が必要ない).

JavaScriptには既にqueueにタスクの実行をスケジュールするevent loopsというシンプルな協調マルチタスクスタイルがある.
各タスクは関数がよびだされることでスタートし,関数が終了するとそのタスクは完了される.Eventsは`setTime()`や他のメカニズムがqueueにタスクを追加する.

このスタイルのマルチタスク処理は重要な保証を与えてくれる.完了までコードが実行されると,どの関数もそれ自身が終了するまで他のタスクに鑑賞されることなく完了が保証される.

関数がトランザクションとなりそのときの状態において処理したいデータを他の処理に見られることなくアルゴリズムを完遂することができる.
共有データへの並列アクセスはマルチタスク処理を複雑にするし,JavaScriptの並列モデルでは許可されない処理.
これの理由から処理が完了されることは良いこと.

JavaScriptの並列処理モデルのシンプルさがありつつも,悲しいことに*coroutines*は実行完了を妨げる.なぜならどの関数もそのcallerからサスペンドされることができる.

```js
step1(sharedData);
step2(sharedData);
lastStep(sharedData);
```

もしstep2がアルゴリズムをサスペンドしたら,他のタスクは最後のアルゴリズムステップが実行される前に別のタスクを実行できる.
実行された別のタスクで`sharedData`を処理していることもありうるので,最終ステップでは予想していない`sharedData`を処理することにもなりうる.

*generators*は実行完了を保証する.*generators*は自身をサスペンドしcallerに値を返す.

coといったライブラリと*generators*によって

+ *generators*経由で定義されたタスクのスケジューラを定義できる.
+ *generators*でタスクを開始でき、処理だけを完全にサスペンドできる.
+ 再帰的な*generators*関数は`yield*`経由で完了されたときのみサスペンドすることができ,これによりサスペンションごしのcallers管理ができる.
