##V-FOR 为什么要:key

使用v-for渲染元素时，
使用元素自身的id属性去指定渲染元素的key值有利于单个元素的重新渲染，
若采用其他如v-for提供的index, key等值，
在改变渲染出来的DOM结构时，
会触发所有元素的重新渲染，
当数据过大时，
可能会造成性能负担。

当我们在使用v-for进行渲染时，
尽可能使用渲染元素自身属性的id给渲染的元素绑定一个key值，
这样在当前渲染元素的DOM结构发生变化时，
能够单独响应该元素而不触发所有元素的渲染。
当可能会出现重复值时，
请使用index作为key。
