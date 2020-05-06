# Web Components Turorial

## 前言

## 介紹
### Custom Elements
#### CustomElementRegistry（僅列出常用）
* CustomElementRegistry.define(name, constructor, options)
    * name: 我們定義的 Custom Element 使用時的名稱
    * constructor: 我們定義的 Custom Element constructor
    * options: 目前只有一個extends屬性，如果設定成{extends: p}，表示我們定義的 Custom Element 是p元素的延伸，所以使用 Custom Element 時就可以寫成 ```<p is='custom element name'></p>```
#### Life cycle
* connectedCallback  
&emsp;Custom Element 首次被添加到 DOM 上面的時候觸發
* disconnectedCallback  
&emsp;Custom Element 從 DOM 被移除時觸發
* adoptedCallback  
&emsp;Custom Element 變更到新的 DOM，如 iframe
* attributesChangedCallback(name, oldValue, newValue)    
&emsp;Custom Element 監聽(需要在靜態方法 observedAttributes 內設定想要監聽的 attributes)的 attributes 更新時會觸發

### Shadow DOM

### Template and Slot

## 使用  
&emsp;&emsp;下載 Repository 或是使用 script 引入  
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
* [Web Components Tutorial for Beginners [2019]](https://www.robinwieruch.de/web-components-tutorial)
* [Duet](https://www.duetds.com/)
