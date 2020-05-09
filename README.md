# Web Components Turorial

## 前言
&emsp;&emsp;模組化是程式開發十分重要的思維，可以增加程式靈活性、降低耦合度、重複使用減少開發時間等等，然而框架的流行，像是 React 、 Vue 和 Angular 等等，提供了強大的功能方便我們迅速開發流暢的 UI ，但使得學習不同框架的我們選邊站，當然可以學習一個以上的框架，但假設你學習 Vue 後，再學習 React ，你會面臨到一樣的 Component，在 Vue 已經製作過，卻無法直接在 React 中使用，於是重新製作一個針對 React 專案的 Component，此時你不經思考：都是HTML 、 CSS 、 Javascript ，為什麼彼此之間不能共用 Components ？所幸隨著時間的流逝， Web Components 可以解決這個問題。  
&emsp;&emsp; Web Components 其實已經推出一段時間，不過初期瀏覽器支援度不高，因此接受度不高，但隨著支援度越來越高，讓我們可以製作客製化、可重複使用的 Components，且由於是單純的 HTML 、 CSS 、 Javascript ，所以可以在所有框架或是未來的新興框架使用，而且 Web Components 提供非侵入性的封裝，不用擔心引入他人的套件而影響自身專案，下面將會以 Web Components 的核心技術依序做介紹。
> 瀏覽器支援程度： Chrome 、 Firefox 、 Edge 已全面支持， IE 和 Safari 部分支援，詳細可參考 [Can I Use](https://caniuse.com/#search=web%20component)
 * Custom Elements
 * Shadow DOM
 * Templates and Slots
## 介紹
### Custom Elements
&emsp;&emsp; Web Components 的十分重要的技術，允許我們定義客製化的 HTML Tag 或是擴展別人的 Tag 。
#### CustomElementRegistry
* CustomElementRegistry.define(name, constructor, options)
    * name: 我們定義的 Custom Element 使用時的名稱
    * constructor: 我們定義的 Custom Element constructor
    * options: 目前只有一個 extends 屬性，如果設定成 { extends : p } ，表示我們定義的 Custom Element 是 p 元素的延伸，所以使用 Custom Element 時就可以寫成 ```<p is='custom element name'></p>```
#### Life cycle
* connectedCallback  
&emsp;Custom Element 首次被添加到 DOM 上面的時候觸發
* disconnectedCallback  
&emsp;Custom Element 從 DOM 被移除時觸發
* adoptedCallback  
&emsp;Custom Element 變更到新的 DOM，如 iframe
* attributesChangedCallback(attributeName, oldValue, newValue)    
&emsp;Custom Element 監聽(需要在靜態方法 observedAttributes 內設定想要監聽的 attributes )的 attributes 更新時會觸發

### Shadow DOM
&emsp;&emsp; Web Components 的核心技術，允許我們將 HTML 、 CSS 進行封裝，達到模組化，而且是獨立於  Light DOM (我們一般熟知的 DOM ，不過為了和 Shadow DOM 區別，所以用 Light DOM 稱之)，意思為選取器不會找 Shadow DOM 裡面的元素，根據下面的程式碼，介紹 Shadow DOM 的一些名詞。
```javascript
const host = document.createElement('div');
// mode 有 open 和 closed ，設定 open 可在外部透過 host.shadowRoot 抓到 shadow root， closed 則會拋出錯誤
const shadowRoot = host.attachShadow({ mode: 'open' });
```
#### Shadow Host
&emsp;&emsp;程式碼內的 host 變數就是 Shadow Host ，為 Light DOM 被 Shadow DOM 依附的元素，但不是所有元素都可以當作 Shadow Host，詳細可參考 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)，
#### Shadow Tree
&emsp;&emsp;跟原本的 DOM Tree 概念一樣，只是在 Shadow DOM 裡面
#### Shadow Root
&emsp;&emsp;Shadow Tree 根節點
#### Shadow Boundary
&emsp;&emsp; 包含整個 Shadow Tree 的範圍

<img src='https://media.prod.mdn.mozit.cloud/attachments/2018/01/29/15788/9d23f749f26b93a00f5c2aa72f00e720/shadow-dom.png' alt='shadow dom structure' />
   <p align='center'><sub>圖片取自ＭＤＮ<sub></p>

### Templates and Slots
#### Templates
&emsp;&emsp;當我們某些 DOM 架構需要重複使用的時候，秉持著 DRY 原則，我們要想辦法定義好它，並重複使用，此時就可以透過 Template 定義 DOM 架構，而且 Template 不會渲染在畫面上，我們可以透過 javascript 動態控制什麼時候要顯示，要顯示多次也很方便，
#### Slots
&emsp;&emsp; 當我們某元素希望外部動態傳入，如果沒有傳入就使用預設值的時候，就可以使用 Slots 語法， 它讓我們坐到前面所說的需求，也因為這個功能存在，使得 Web Components 具備高度靈活性
## 心得
&emsp;&emsp;剛開始學習使用 Web Components 的時候對很多功能都不懂，其中最核心的部分應該是 Shadow DOM 的概念，不過在仔細學習完一輪後，慢慢理解到 Web Components 的強大，像是跨框架的支援、針對三大語言的封裝等等，不過也有瀏覽器支援度的問題，但有很多 Polyfill 可以使用，而且也有框架的套件可以使用 Web Components 像是框架的 Components 一樣容易，關於 Web Components 的優缺點網路上有很多文章抱持著各自的想法，有興趣的可以自行搜尋。
## 使用  
&emsp;&emsp;下載 Repository 或使用 script 引入， 或直接查看 [DEMO](https://dingq84.github.io/web-components-tutorial/)
```
   git clone https://github.com/dingq84/web-components-tutorial.git
   cd web-compnents-tutorial
   yarn install
   yarn start
```
```html
  <body>
    <custom-loginform></custom-loginform>
    <script src='https://s3-ap-northeast-1.amazonaws.com/ding.bucket/custom-loginform.min.js'></script>
  </body>
```

## 參考資料
* [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
* [Web Components ORG](https://www.webcomponents.org/)
* [Web Components Tutorial for Beginners [2019]](https://www.robinwieruch.de/web-components-tutorial)
* [Duet](https://www.duetds.com/)
