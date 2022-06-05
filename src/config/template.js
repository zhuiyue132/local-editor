/*
 * @Author: chenghao
 * @Date: 2020-06-18 17:42:01
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-06-05 14:43:16
 * @Desc: 初始进入的模板配置
 */
/* eslint-disable  */

export default `

请使用 **Chrome** 浏览器，其他浏览器不保证运行正常。

以下是使用说明，如果需要进行创作，**全选=>删除本文** 即可开始。

## 0 简介

一个 \`demo\` 级别的 web版 markdown 编辑器。基于\`markdown-it\`及其\`插件集\`。  

没错，我就是api搬运工。


## 1 通用语法

### 3.1 标题

在文字写书写不同数量的\`#\`可以完成不同的标题，如下：

# 一级标题

## 二级标题

### 三级标题

### 1.2 无序列表

无序列表的使用，在符号\`-\`后加空格使用。如下：

- 无序列表 1
- 无序列表 2
- 无序列表 3

如果要控制列表的层级，则需要在符号\`-\`前使用空格。如下：

- 无序列表 1
- 无序列表 2
  - 无序列表 2.1
  - 无序列表 2.2

### 1.3 有序列表

有序列表的使用，在数字及符号\`.\`后加空格后输入内容，如下：

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

### 1.4 引用

引用的格式是在符号\` > \`后面书写文字。如下：

> 读一本好书，就是在和高尚的人谈话。 ——歌德

> 雇用制度对工人不利，但工人根本无力摆脱这个制度。 ——阮一峰

### 1.5 粗体和斜体

粗体的使用是在需要加粗的文字前后各加两个\` * \`。

而斜体的使用则是在需要斜体的文字前后各加一个\` *\`。

如果要使用粗体和斜体，那么就是在需要操作的文字前后加三个\` *\`。如下：

**这个是粗体**

*这个是斜体*

***这个是粗体加斜体***


### 1.6 链接

[点击跳转百度](http://www.baidu.com)

### 1.7 分割线

可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：

---

### 1.8 删除线

删除线的使用，在需要删除的文字前后各使用两个\`~\`，如下：

~~这是要被删除的内容。~~

### 1.9 表格

可以使用冒号来定义表格的对齐方式，如下：

| 姓名   | 年龄 |     工作 |
| :----- | :--: | -------: |
| 小可爱 |  18  | 吃可爱多 |
| 小小勇敢 |  20  | 爬棵勇敢树 |
| 小小小机智 |  22  | 看一本机智书 |

### 1.10 图片

插入图片，如果是行内图片则无图例，否则有图例，格式如下：

![alt](https://picture.zhuiyue.vip:444/images/2022/06/05/26954775.jpg)


支持 jpg、png、gif、svg 等图片格式，**其中 svg 文件仅可在微信公众平台中使用**，svg 文件示例如下：


<div style="width: 200px;margin:0 auto;">

 ![alt](https://picture.zhuiyue.vip:444/images/2022/06/05/26954775.jpg)

</div>

- 支持图片**拖拽**到编辑器中上传，上传到自建图床。



## 2 特殊语法

### 2.1  代码块


如果在一个行内需要引用代码，只要用反引号引起来就好，如下：

Use the \`printf()\` function.

在需要高亮的代码块的前一行及后一行使用三个反引号，同时**第一行反引号后面表示代码块所使用的语言**，如下：

\`\`\`java
// FileName: HelloWorld.java
public class HelloWorld {
  // Java 入口程序，程序从此入口
  public static void main(String[] args) {
    System.out.println("Hello,World!"); // 向控制台打印一条语句
  }
}
\`\`\`

支持以下语言种类：

\`\`\`
bash
clojure，cpp，cs，css
dart，dockerfile, diff
erlang
go，gradle，groovy
haskell
java，javascript，json，julia
kotlin
lisp，lua
makefile，markdown，matlab
objectivec
perl，php，python
r，ruby，rust
scala，shell，sql，swift
tex，typescript
verilog，vhdl
xml
yaml
\`\`\`

如果想要更换代码主题，可在上方挑选，不支持代码主题自定义。



diff 不能同时和其他语言的高亮同时显示，使用效果如下:

\`\`\`diff
+ 新增项
- 删除项
\`\`\`

**其他主题不带行号，可自定义是否换行，代码大小与当前编辑器一致**


## 3 其他语法

### 3.1 HTML

支持原生 HTML 语法，请写内联样式，如下：

<span style="display:block;text-align:right;color:orangered;">橙色居右</span>
<span style="display:block;text-align:center;color:orangered;">橙色居中</span>

### 3.2 UML

不支持，推荐使用开源工具\`https://draw.io/\`制作后再导入图片

### 3.3 组件图床

组件目前共支持 1 种图床和 1 种自定义图床，即自建Chevereto图床。


### 3.4 更多文档

更多文档请参考 [菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)

`
