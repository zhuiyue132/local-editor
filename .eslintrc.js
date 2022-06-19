
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    globals: {
        document: true,
        localStorage: true,
        window: true,
        process: true,
        echarts: true,
        __dirname: true,
        defineProps: true,
        defineEmits: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // 仅允许 import export 语句出现在模块的顶层
        allowImportExportEverywhere: false,
        ecmaFeatures: {
            // Allows for the parsing of JSX
            jsx: true
        }
    },
    plugins: ['vue', 'prettier'],
    rules: {
        // debugger 关键字
        'no-debugger': 1,
        // 消除未使用的变量，函数和函数的参数
        'no-unused-vars': [
            'warn',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
        ],
        /**
         * 有默认值的参数必须放在函数参数的末尾
         */
        'default-param-last': 'error',
        /**
         * 不推荐使用 foo['bar']，建议写成 foo.bar
         * @reason 当需要写一系列属性的时候，可以更统一
         */
        'dot-notation': 'warn',
        /**
         * 禁止将 async 函数做为 new Promise 的回调函数
         * @reason 出现这种情况时，一般不需要使用 new Promise 实现异步了
         */
        'no-async-promise-executor': 'error',
        /**
         * switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
         */
        'no-case-declarations': 'error',
        /**
         * 禁止出现空代码块，允许 catch 为空代码块
         */
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true
            }
        ],
        /**
         * 禁止对函数的参数重新赋值
         */
        'no-param-reassign': 'error',
        /**
         * 禁止在 if 代码块内出现函数声明
         */
        'no-inner-declarations': ['error', 'both'],
        // 强制使用 === 和 !== 但不将此规则应用于 null
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        // 回调模式需处理 err 或 error，报告所有未处理的错误
        'handle-callback-err': [2, '^(err|error)$'],
        // 对象字面量属性中强制在冒号后放置空格，冒号前不允许空格
        'key-spacing': [
            2,
            {
                beforeColon: false, // 不允许在对象文字中的键和冒号之间使用空格
                afterColon: true // 需要在冒号和对象文字中的值之间至少有一个空格
            }
        ],
        // 关键字前后至少有一个空格
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        // 构造函数名需以大写字母开头，以下内置标识符可免除此规则：Array、Boolean、 Date、Error、Function、Number、Object、RegExp、String、Symbol
        'new-cap': [
            2,
            {
                newIsCap: true, // new 方式调用的函数需以大写开头
                capIsNew: false // 允许直接调用大写开头的函数，无需使用 new
            }
        ],
        // 使用 new 关键字调用无参构造函数，函数名后强制使用括号
        'new-parens': 2,
        // 禁止不必要的布尔转换
        'no-extra-boolean-cast': 2,
        // 禁止 switch 穿透，需使用 break 中断
        'no-fallthrough': 2,
        // 禁止使用不必要的嵌套块
        'no-lone-blocks': 2,
        // 不允许使用混合空格和制表符进行缩进
        'no-mixed-spaces-and-tabs': 2,
        // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格
        'no-multi-spaces': 2,
        // 禁止使用斜线（\）进行换行
        'no-multi-str': 2,
        // 禁止引用未声明的变量
        'no-undef': 2,
        // 禁止使用 undefined 来初始化变量
        'no-undef-init': 2,
        // 禁止使用 with 语句
        'no-with': 2,
        // 使用一致的换行符样式，将换行符放置在运算符之后
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before', // 三元运算换行符置于 ? 前
                    ':': 'before' // 三元运算换行符置于 : 前
                }
            }
        ],
        // 在 block 语句和类的开头和结尾处不允许出现空行
        'padded-blocks': [2, 'never'],
        // // // 禁用单行标签内容需换行的校验
        // 'vue/singleline-html-element-content-newline': 'off',
        // // // 禁用多行标签内容需换行的校验
        // 'vue/multiline-html-element-content-newline': 'off',
        // // 组件 name 属性值必须使用帕斯卡命名法（单词首字母大写）
        // 'vue/name-property-casing': ['error', 'PascalCase'],
        // setup 语法糖校验
        'vue/script-setup-uses-vars': 'error',
        // 对象前后要加空格 { a: 1 }
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': 'error', //箭头函数前后加空格 () => {}
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'any',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/no-v-html': 0,
        'vue/multi-word-component-names': [1, {
            "ignores": ['index']
        }]
    },
};
