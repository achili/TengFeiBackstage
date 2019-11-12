### 完美的面包屑。

#### 关键API：history.state  history.replaceState  onpopstate

##### history.replaceState(state, "", url)

可以改写当前的history，并忘history中添加自定义存储内容state
利用自定义存储内容state 我们将历史面包屑放入里边，浏览器前进后退时就可以将里面的内容读出
并作为面包屑，完美解决面包屑上下文丢失问题。
兼容性：IE10 及以上。

##### history.state

读取state存储内容，只读属性。

##### onpopstate

定义浏览器返回/前进的回调钩子。
