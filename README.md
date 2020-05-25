<h1 align="center"> vue-admin-template </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> 后台管理模板 repo，包含了代码风格统一的配置，为了减少重复多次配置，独立出来每次使用时单独拉取再修改 `origin` 即可。
> 暂时没有页面展示，只包含了配置和项目开发时常用目录。页面的发开留待后期。

## Install

包管理工具，必须使用`npm`.

```sh
npm install
```

## Usage

```sh
npm run serve
```

## TODO

- [ ] 第三方包单独拆解，如 `element-ui`, `axios`
- [ ] `element-ui` 按需引入
- [ ] 有一个成型的页面

## 注意事项

代码提交使用`commitizen`。（一个撰写合格 commit message 的工具），需要全局安装。

```sh
npm install -g commitizen cz-conventional-changelog
```

### `commitizen`的使用

使用`git cz`对暂存区的代码，进行 lint 并提交

```
1.Select the type of change that you're committing 选择改动类型 (<type>)

2.What is the scope of this change (e.g. component or file name)? 填写改动范围 (<scope>)

3.Write a short, imperative tense description of the change: 写一个精简的描述 (<subject>)

4.Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述 (<body>)

5.Are there any breaking changes? (y/n) 是破坏性修改吗？默认n (<footer>)

6.Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认n (<footer>)
```

### 落地

- 1.type
  <b>必填</b>

  ```
    主要type
    feat:     增加新功能
    fix:      修复bug

    特殊type
    docs:     只改动了文档相关的内容
    style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
    build:    构造工具的或者外部依赖的改动，例如webpack，npm
    refactor: 代码重构时使用
    revert:   执行git revert打印的message

    test:     添加测试或者修改现有测试
    perf:     提高性能的改动
    ci:       与CI（持续集成服务）有关的改动
    chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
  ```

  当一次改动包括`主要type`与`特殊type`时，统一采用主要 type。

- 2.scope
  <b>必填</b>

  用于描述改动的范围，格式为项目名/模块名,例如：`yd/aisle`.如果一次 commit 修改多个模块，建议拆分成多次 commit，以便更好追踪和维护。

- 3.body

  body 填写详细描述，主要描述`改动之前的情况`及`修改动机`，对于小的修改不作要求，但是重大需求、更新等必须添加 body 来作说明。

- 4.break changes

  指明是否产生了破坏性修改，涉及 break changes 的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等

- 5.affect issues

  指明是否影响了某个问题

## 代码风格统一

`vscode + vetur + eslint + prettier` 配套实现。 [@参考原文](https://trainspott.in/2018/12/07/vscode+vetur+eslint+prettier%E5%AE%9E%E7%8E%B0%E5%9B%A2%E9%98%9F%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC%E7%BB%9F%E4%B8%80/)

### 方案落地

- 编辑器 vscode

  - ESLint // 依靠它自动 fix
  - Prettier // 格式化 html/css/scss/less
  - Vetur 语法提示，格式化的工作交给上面 2 位 。

- npm package

  - eslint
  - eslint-config-airbnb-base
  - eslint-config-prettier
  - eslint-plugin-vue
  - eslint-plugin-prettier
  - prettier

- 配置文件抽离

  - .vscode/setting.json
  - .editorconfig
  - .eslintrc.js
  - .eslintignore
  - .prettierrc.js
  - .prettierignore

配置文件内容详见 repo 根目录

### 思路，为什么要这么做

1. eslint 优先级最高,装插件 `eslint-config-airbnb-base`，`eslint-config-prettier`，`eslint-plugin-vue`，可以覆盖 `prettier` 的设置
2. eslint 主要负责 vue/js 的格式化
3. prettier 主要负责 html/css/less/scss… 的格式化
4. Vetur 也有格式化功能，直接 disable 掉，我们用更高级的
5. prettier 不支持 stylus，但是 Vetur 的依赖包括了 `stylusSupremacy`,可以解决
6. 所有的配置都可以放在项目 repo 里，且优先级会高于 coder 本地的设置，保证团队所有成员提交的代码一致
7. 如果装了其他 format 插件，请在本项目中 disable 掉，我们不需要

<b>为了给后人少埋坑</b>

## Author

👤 **芬达**

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
