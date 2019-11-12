Webpack如何处理静态资产。在 *.vue 组件中，所有模板和CSS都会被 vue-html-loader 及 css-loader 解析，并查找资源URL。例如，在 <img src="./logo.png">
和 background: url(./logo.png) 中，"./logo.png" 是相对的资源路径，将由Webpack解析为模块依赖。

因为 logo.png 不是 JavaScript，当被视为模块依赖时，需要使用 url-loader 和 file-loader
处理它。vue-cli 的 webpack 脚手架已经配置了这些 loader，因此可以使用相对/模块路径。

由于这些资源可能在构建过程中被内联/复制/重命名，所以它们基本上是源代码的一部分。这就是为什么建议将
Webpack 处理的静态资源放在 /src 目录中和其它源文件放一起的原因。事实上，甚至不必把它们全部放在 /src/assets：可以用模块/组件的组织方式来使用它们。例如，可以在每个放置组件的目录中存放静态资源。

在ListUserCell.vue中需要引用到静态文件，这里需要用到require这个函数，将静态文件解析成浏览器可识别的形式，注意要填写正确的URL。
this.pic = require("../../../../../assets/img/handsome.jpg");
