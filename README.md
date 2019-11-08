# Markdown 在线编辑器

涵盖了大多数 markdown 语法的快捷操作，实时编译实时预览，支持直接导出 md 格式文件，支持微博图床。纯前端实现，不必担心数据被后台存储。

## 背景 & 前言

市面上一些 md 编辑器 有的有实时预览，比如掘金，没有操作按钮（有快捷键的哈)，用着不是太方便，而简书的操作按钮有的受限于简书钻的数量。事实上有道词典的 md 编辑器做的很好，但最近出现了我出现了卡顿、中文难以输入上去的问题，弃之。  
所以干脆自己撸一个，可以满足自己写东西的需求。 ~~自己做的东西就算难用也得受着~~  
由于手上没有 windows 设备，滚动条的样式还请自己修改下。

---

## 技术

`vue` `less` `iview` `markdown-it` `iconfont` `hotkeys-js`

---

## 插件

`markdown-it-mark` 标记功能  
 `markdown-it-emoji` emoji 表情解析  
`highligh.js`代码高亮  
`markdown-it-task-checkbox` 复选框功能  
`markdown-it-footnote` 脚注功能

---

## 插件效果

==高亮标记==  
:smiling_imp:

- [ ] text
- [x] text  
       ^[脚注 1] ^[脚注 2]

掘金没有支持`标记`与`emoji`，贴一下图。
![](https://ws1.sinaimg.cn/mw690/0072Lfvtly1g08743vn20j302a03i0sl.jpg)

---

## 原理

在编辑器输入组件中 `watch`输入内容的变化，有变化就实时调用`markdown-it`的`render`函数，并在`localStorage`中实时更新一份，防止页面误操作被跳出再返回时辛辛苦苦写的内容没了。同时也可以达到这次没写完页面关闭了，下次打开继续写的需求。 **导出文件后草稿会被清空。**
**因为不调用接口存储数据，未做函数防抖处理，如需引入请自行添加。**
微博图床的地址是从一个工具页面上扒下来的，感觉写那个工具的兄弟也是从其他的地方扒的呢哈哈（开玩笑的），贴出工具地址：[图床工具](http://tool.mkblog.cn/tuchuang/)

---

## 下载打包

`git clone git@github.com:ch957869975/md-editor.git`  
 `npm run dev` 或 `npm run build`
打开 8080 端口即可看到预览
![](https://ws1.sinaimg.cn/mw690/0072Lfvtly1g081m8s9w9j32cm1l2qbc.jpg)

---

## 有意思的点

做的时候遇到几个点比较有意思，提一下。

### 在光标位置插入字符

ie 支持`document.selection`，而绝大多数浏览器支持`selectionStart` 与 `selectionEnd` 两个属性。利用这两个属性加上字符串的`substring`方法动态拼接起来。 **这里需要注意的是 用这个方法拼接起来的字符串，并没有触发对变量的双向绑定，所以我在这里手动触发了一下`textarea`的 input 事件，如下：**

```js
document.querySelector("textarea").dispatchEvent(new Event("input"));
```

---

### 文件在前端生成并下载

下载在前端开发中并不稀奇，但文件写入可能不常遇到，要不是写这个玩意，我也没做工文件生成。
**代码如下：**

```js
if (!this.editorContent || !window.localStorage.getItem("MarkdownDraft")) {
  return this.$Notice.error({ title: "你还没有写内容" });
}
const content = this.editorContent;
const elem = document.createElement("a");
elem.download = "draft.md";
elem.style.display = "none";
const blob = new Blob([content], { type: "text/plain" });
elem.href = URL.createObjectURL(blob);
document.body.appendChild(elem);
elem.click();
document.body.removeChild(elem);
setTimeout(() => {
  this.editorContent = "";
  window.localStorage.removeItem("MarkdownDraft");
}, 300);
```

思路还是比较清晰的：有值的时候才生成， **避免生成一个空文件**。 利用`Blob`对象生成对应内容后，再创建一个 **不可见的`a`标签并将 `href`和`download`属性添加进去，手动触发点击事件后并移除该标签。**
**但是需要考虑兼容性呀。**
这里是`a.download`的支持情况，ie 不支持！！！。
![](https://ws1.sinaimg.cn/mw690/0072Lfvtly1g0865h55q4j30z20ay40d.jpg)

木得办法，做个判断吧。

```
 if (!('download' in document.createElement('a'))) return this.$Notice.error({ title: '浏览器不支持' })
```

可能你说 ie 怎么办？  
回答：都 9102 年了，你还在用 ie，不抛弃你抛弃谁？？

---

### 组件通信

组件之间通信，因为偷懒，用了`bus.js`，实际代码就两行

```js
import Vue from "vue";
export default new Vue();
```

原理是 **挂载在同一实例上的组件都可以触发实例上的事件**，理论上是可以实现任意组件之间的通信，无视组件层级关系。但是， **并不推荐这种做法，因为这会让你的逻辑太跳跃，具体表现就是你的代码东一榔头西一棒子，A 组件在 bus 上绑定的事件经常找不到在哪里触发的，B 组件触发的事件找不到是在哪里绑定的，维护起来较为困难。**

---

## 总结

功能简单、技术简单、ui 简单、部署简单。一个简单的小项目，就看你愿不愿意去做了。

这里贴出[编辑器地址](https://ch957869975.github.io/md-editor/dist/)与[源码地址](https://github.com/ch957869975/md-editor)。**厚着脸皮求个 star**。
[博客地址](https://ch957869975.github.io/hexo-blog/)

不是所有的事情都能如愿以偿，但是任何事情都值得去尝试。加油！  
ps: 下面两个脚注对应插件效果演示，不必关心。

## feature

添加了部分的快捷键操作，快捷键的提示在页面的右上角，如下：

![](https://ws1.sinaimg.cn/mw690/0072Lfvtly1g0aisgrzqnj30660am3yu.jpg)

## FIX

修正了一位老哥在沸点中提出的问题，如下

![](https://ws1.sinaimg.cn/mw690/0072Lfvtly1g0aihw74zyj30jk05gdgw.jpg)
支持 **加粗，倾斜，删除线，下划线，高亮标记**这五种操作时 ，**选中文本的情况下点击效果按钮直接将所选内容重置成目标效果，未选中文本内容即光标闪烁时添加 一个对应效果的 text 占位符。**

---

## TODO

- [ ] 编码区域和预览区域滚动时联动
- [ ] 部分操作的快捷键更新
- [ ] 体验优化
