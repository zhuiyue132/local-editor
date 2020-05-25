/*
 * @Author: chenghao
 * @Date: 2020-05-25 09:59:47
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-05-25 10:30:07
 * @Desc: eslint rules config
 */
/**
 *
 * 规则说明见 https://cn.eslint.org/docs/rules/
 * eslint-plugin-import 规则见 https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md
 * eslint-plugin-vue 规则见 https://github.com/vuejs/eslint-plugin-vue
 *
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 *
 */

module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'airbnb-base', // airbnb lint规范
    'plugin:vue/essential', // eslint-plugin-vue
    'plugin:prettier/recommended' // eslint-config-prettier
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: 'build/webpack.base.conf.js',
  //     },
  //   },
  // },
  // plugins: ['vue'],
  rules: {
    'prettier/prettier': 1,
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到. e.g. /* global Stomp SockJS */ in .vue file's <scrpit>
    'no-extend-native': 2, // 禁止扩展原生类型
    'no-return-assign': 2, // 禁止在 return 语句中使用赋值语句
    'import/order': 0, // Enforce a convention in module import order
    'import/no-extraneous-dependencies': 0, // 禁止导入未在package.json的依赖项，devDependencies，optionalDependencies或peerDependencies中声明的外部模块。将使用最接近的父package.json。
    'import/no-dynamic-require': 1, // CommonJS的require方法用于从不同文件导入模块。与ES6导入语法不同，可以为其提供将在运行时解析的表达式。虽然这有时是必要且有用的，但在大多数情况下并非如此。使用表达式（例如，连接路径和变量）作为参数使得工具更难以进行静态代码分析，或者在代码库中找到使用模块的位置。
    'import/extensions': 0, // 某些文件解析算法允许您在导入源路径中省略文件扩展名。例如，节点解析器可以将./foo/bar解析为绝对路径/User/someone/foo/bar.js，因为默认情况下会自动解析.js扩展名。根据解析程序，您可以配置更多扩展程序以自动解决。
    'import/no-unresolved': 0, // 确保导入的模块可以解析为本地文件系统上的模块，如标准Node require.resolve行为所定义。
    'import/prefer-default-export': 1, // 当模块中只有一个导出时，更喜欢使用默认导出而不是命名导出。
    'vue/no-async-in-computed-properties': 1, // 计算属性应该是同步的。其中的异步操作可能无法按预期工作，并可能导致意外行为，这就是您应该避免它们的原因。如果您需要异步计算属性，可能需要考虑使用其他插件[vue-async-computed]
    'vue/no-side-effects-in-computed-properties': 1, // 在计算属性中引入副作用被认为是一种非常糟糕的做法。它使代码无法预测且难以理解。
    'vue/no-reserved-keys': 1, // 此规则阻止使用保留名称以避免冲突和意外行为。
    'vue/require-v-for-key': 2, // 当v-for写在自定义组件上时，它需要同时使用v-bind：key。在其他元素上，v-bind：key也最好写。
    'vue/require-valid-default-prop': 1, // 此规则检查每个prop的默认值是否对给定类型有效。当使用函数未返回类型Array或Object的默认值时，它应报告错误。
    'no-unused-vars': 1, // 禁止出现未使用过的变量
    'generator-star-spacing': 0, // 强制 generator 函数中 * 号周围使用一致的空格
    'no-plusplus': 0, // 禁用一元操作符 ++ 和 --
    'func-names': 0, // 要求或禁止使用命名的 function 表达式
    'no-console': 0, // no-console
    radix: 0, // 强制在parseInt()使用基数参数
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-continue': 0, // 禁用 continue 语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': 0, // 禁止对 function 的参数进行重新赋值
    'no-underscore-dangle': 1, // 禁止标识符中有悬空下划线"_"
    'global-require': 1, // 要求 require() 出现在顶层模块作用域中
    'no-var': 1, // 要求使用 let 或 const 而不是 var
    'vars-on-top': 1, // 要求所有的 var 声明出现在它们所在的作用域顶部
    'prefer-destructuring': 1, // 优先使用数组和对象解构
    'no-useless-concat': 1, // 禁止不必要的字符串字面量或模板字面量的连接
    'no-shadow': 1, // 禁止变量声明与外层作用域的变量同名
    'guard-for-in': 1, // 要求 for-in 循环中有一个 if 语句,旨在防止使用for in循环而不过滤循环中的结果时可能出现的意外行为。
    'no-restricted-syntax': 1, // 禁用特定的语法
    'global-require': 1, // 要求 require() 出现在顶层模块作用域中
    'consistent-return': 1, // 要求 return 语句要么总是指定返回的值，要么不指定
    eqeqeq: 1, // 要求使用 === 和 !==
    'no-unused-expressions': 1, // 禁止出现未使用过的表达式
    camelcase: 1, // 强制使用骆驼拼写法命名约定
    'block-scoped-var': 1, // 强制把变量的使用限制在其定义的作用域范围内,旨在减少绑定上下文之外的变量的使用，并从其他语言模拟传统的块范围。这是为了帮助语言新手避免变量提升的难题。
    'no-redeclare': 1, // 禁止多次声明同一变量
    'prefer-arrow-callback': 1, // 要求回调函数使用箭头函数
    'array-callback-return': 1, // 强制数组方法的回调函数中有 return 语句,Array有几种过滤，映射和折叠的方法。如果我们忘记return在这些回调中写入语句，那可能是一个错误。
    'default-case': 1, // 要求 switch 语句中有 default 分支
    'no-loop-func': 1, // 禁止在循环中出现 function 声明和表达式
    'no-fallthrough': 1, // 禁止 case 语句落空
    'no-multi-assign': 1, // 禁止连续赋值
    'no-lonely-if': 1, // 禁止 if 作为唯一的语句出现在 else 语句中.如果一个if陈述是该else块中唯一的陈述，那么使用一个else if表格通常会更清晰。
    'no-irregular-whitespace': 1, // 禁止在字符串和注释之外不规则的空白
    'prefer-const': 1, // 要求使用 const 声明那些声明后不再被修改的变量.如果一个变量从不重新分配，使用const声明更好。const 声明告诉读者，“这个变量永远不会被重新分配，”减少认知负荷并提高可维护性。
    'no-use-before-define': 1, // 禁止在变量定义之前使用它们
    'no-useless-escape': 1, // 禁用不必要的转义字符
    'no-array-constructor': 1, // 禁用 Array 构造函数,由于单参数的缺陷以及Array全局可能被重新定义，所以通常不鼓励使用构造函数来构造新Array数组，而是倾向于使用数组文字符号。例外情况是Array构造函数用于通过给构造函数一个数字参数有意创建指定大小的稀疏数组。
    'object-shorthand': 1, // 要求或禁止对象字面量中方法和属性使用简写语法
    'no-prototype-builtins': 1, // 禁止直接调用 Object.prototypes 的内置属性.当假定对象将具有属性时，这可能导致错误Object.prototype。此规则可防止Object.prototype直接从对象调用方法。
    'no-nested-ternary': 1, // 禁用嵌套的三元表达式.嵌套三元表达式会使代码更难理解。
    'no-new-wrappers': 1, // 禁止对 String，Number 和 Boolean 使用 new 操作符.没有任何理由将这些基本包装用作构造函数
    'prefer-promise-reject-errors': 1, // 要求使用 Error 对象作为 Promise 拒绝的原因
    'no-labels': 1 // 禁用标签语句
  }
}
