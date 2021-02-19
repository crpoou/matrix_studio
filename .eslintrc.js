module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020, // 支持es6语法，但并不意味着同时支持新的ES6全局变量或类型（比如Set等新类型）
    sourceType: 'module', // 类型为module，因为代码使用了使用了ECMAScript模块
    ecmaFeatures: {
      jsx: true, // 启用JSX
      impliedStrict: true // 启用全局strict mode(如果ecmaVersion是5或更高)
    }
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  env: {
    browser: true, // 预定义的全局变量，这里是浏览器环境
    es6: true, // 启用ES6语法支持以及新的ES6全局变量或类型
    node: true // Node.js全局变量和Node.js作用域
  },
  rules: {
    /* Possible Errors 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关 */
    'for-direction': 2, // 不允许出现错误的for循环出现错误的移动方向，发生时建议使用while
    'getter-return': [2, { allowImplicit: true }], // 不允许在getter属性中缺少return 语句，允许隐式返回一个undefined，如 return;
    'no-async-promise-executor': 2, // 不允许使用async异步函数作为Promise的构造函数
    'no-await-in-loop': 0, // 允许在循环中出现await，某些情况下Promise.all不符合需求，需要一步一步完成异步操作
    'no-compare-neg-zero': 2, // 不允许与-0进行比较，因为JS特性这与 x === 0 没有区别，请使用 Object.is(x, -0)
    'no-cond-assign': [2, 'except-parens'], // 禁止在条件语句中出现赋值语句，除非它们（表达式）被圆括号括起来
    'no-console': 0, // 允许使用console
    'no-constant-condition': [2, { checkLoops: false }], // 禁止在条件中使用常量表达式（恒定不变的量），允许在循环中出现常量表达式，需要配合手动break
    'no-control-regex': 2, // 禁止在正则表达式中出现控制字符
    'no-debugger': { production: 2 }[process.env.NODE_ENV] || 0, // 生产环境禁止出现debugger关键字，其他环境允许出现
    'no-dupe-args': 2, // 禁止function定义中出现重名参数
    'no-dupe-keys': 2, // 禁止对象字面量中出现重复的key（属性名）
    'no-duplicate-case': 2, // 禁止switch语句中出现重复的case标签
    'no-empty': [2, { allowEmptyCatch: true }], // 禁止空语句块，但是允许出现空的catch语句块
    'no-empty-character-class': 2, // 禁止在正则表达式中使用空字符集
    'no-ex-assign': 2, // 禁止对 catch 子句的参数重新赋值
    'no-extra-boolean-cast': 2, // 禁止不必要的布尔类型转换
    'no-extra-parens': 2, // 禁止不必要的括号
    'no-extra-semi': 2, // 禁止不必要的分号
    'no-func-assign': 2, // 禁止对 function 声明重新赋值
    'no-inner-declarations': [2, 'both'], // 禁止在嵌套的块中出现变量声明和 function 声明
    'no-invalid-regexp': 2, // 禁止在RegExp构造函数中出现无效的正则表达式
    'no-irregular-whitespace': 2, // 禁止不规则的空白
    'no-misleading-character-class': 2, // 不允许在字符类语法中出现由多个代码点组成的字符
    'no-obj-calls': 2, // 禁止把全局对象作为函数调用
    'no-prototype-builtins': 2, // 禁止直接调用 Object.prototypes 的内置属性
    'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个连续空格
    'no-sparse-arrays': 2, // 禁用稀疏数组，经常表现为数组声明中出现空位逗号
    'no-template-curly-in-string': 2, // 禁止在常规字符串中出现模板字面量占位符语法
    'no-unexpected-multiline': 2, // 禁止出现令人困惑的多行表达式
    'no-unreachable': 2, // 禁止在return、throw、continue和break语句之后出现不可达代码
    'no-unsafe-finally': 2, // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-negation': 2, // 禁止对关系运算符的左操作数使用否定操作符，必要时请加括号
    'require-atomic-updates': 2, // 禁止由于await或yield的使用而可能导致出现竞态条件的赋值
    'use-isnan': 2, // 必须使用isNaN()检查NaN
    'valid-typeof': [2, { requireStringLiterals: true }], // 强制typeof表达式与有效的字符串进行比较
    /* Best Practices 这些规则是关于最佳实践的，帮助你避免一些问题 */
    'accessor-pairs': [2, { setWithoutGet: true, getWithoutSet: false }], // 不允许创建对象时，某个属性只有setter而没有对应的getter，允许只有getter而没有对应的setter
    'array-callback-return': [2, { allowImplicit: true }], // 强制数组方法的回调函数中有return语句，允许隐式使用return不包含任何表达式地返回undefined
    'block-scoped-var': 2, // 强制把变量的使用限制在其定义的作用域范围内
    'class-methods-use-this': 0, // 不强制类方法使用this
    complexity: 0, // 不限制程序中的最大环路复杂度
    'consistent-return': [1, { treatUndefinedAsUnspecified: false }], // 要求使用一致的return语句，总是指定返回值或隐式返回undefined
    curly: [1, 'multi-line'], // 要求遵循花括号风格
    'default-case': 0, // 不要求Switch语句中有Default分支，也可以使用 // no default 通过注释模式不写default代码
    'dot-location': 0, // 强制表达式中的点号操作符应该和对象部分在同一行
    'dot-notation': [1, { allowKeywords: true }], //获取对象属性的时候使用点号，对保留关键字不进行检测
    eqeqeq: [1, 'smart'], // 除了 比较两个字面量的值、比较typeof的值、与null进行比较，其他的强制使用 === 和 !==：
    'guard-for-in': 0, // 监视for in循环，防止出现不可预料的情况
    'max-classes-per-file': 0, // 强制每个文件中包含的的类的最大数量
    'no-alert': 1, // 不允许使用alert，confirm，prompt语句
    'no-caller': 2, // 不允许使用arguments.callee和arguments.caller属性
    'no-case-declarations': 2, // 禁止在case或default子句中出现词法声明
    'no-div-regex': 2, // 禁止使用看起来像除法的正则表达式
    'no-else-return': [1, { allowElseIf: true }], // 禁止在else前有return，可以出现else if语句
    'no-empty-function': 1, // 禁止出现空函数
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eq-null': 2, // 禁止在没有类型检查操作符的情况下与 null 进行比较
    'no-eval': 2, // 禁止使用eval()
    'no-extend-native': 2, // 禁止扩展原生类型
    'no-extra-bind': 2, // 禁止不必要的函数绑定
    'no-extra-label': 2, // 禁用不必要的标签
    'no-fallthrough': 2, // 禁止 case 语句落空，可以使用 /falls?\s?through/i 符合正则的注释来声明故意落空 // falls through | fall through | fallsthrough
    'no-floating-decimal': 2, // 禁止数字字面量中使用前导和末尾小数点
    'no-global-assign': 2, // 禁止对原生对象或只读的全局对象进行赋值
    'no-implicit-coercion': [2, { allow: ['!!', '~'] }], // 禁止使用短符号进行类型转换
    'no-implicit-globals': 2, // 禁止在全局范围使用变量和函数声明
    'no-implied-eval': 2, // 禁止使用隐式的eval()
    'no-invalid-this': 0, // 禁止this关键字在类或类对象之外出现
    'no-iterator': 2, // 禁止使用__iterator__迭代器
    'no-labels': [2, { allowLoop: false, allowSwitch: false }], // 禁止使用标签语句
    'no-lone-blocks': 2, // 禁用不必要的嵌套代码块
    'no-loop-func': 2, // 禁止在循环语句中出现包含不安全引用的函数声明
    'no-magic-numbers': [
      0,
      {
        ignore: [1], // 一个数字数组，指定检测中可以忽略的数字。默认为 []
        ignoreArrayIndexes: true, // 指定数字用作数组的索引是否是可以的。默认为 false。
        enforceConst: false, // 指定是否应该在数字变量的声明中检测 const 关键字。默认为false。
        detectObjects: false // 指定是否应该在设置对象属性时检测数字。默认为 false。
      }
    ], // 禁止使用魔术数字，魔术数字规则太严格，建议关闭
    'no-multi-spaces': [2, { ignoreEOLComments: false }], // 禁止出现多个空格
    'no-multi-str': 2, // 禁止多行字符串
    'no-new': 2, // 禁止使用new以避免产生副作用，不允许new一个实例后不赋值或者不比较
    'no-new-func': 2, // 禁用Function构造函数
    'no-new-wrappers': 2, // 禁止原始包装实例new String，Number和Boolean对象
    'no-octal': 2, // 禁止八进制字面量
    'no-octal-escape': 2, // 禁止在字符串中使用八进制转义序列
    'no-param-reassign': 2, // 禁止对函数参数再赋值
    'no-proto': 2, // 禁用__proto__
    'no-redeclare': 2, // 禁止重新声明变量
    'no-restricted-properties': 0, // 禁止使用对象的某些属性
    'no-return-assign': [2, 'except-parens'], // 禁止在返回语句中赋值，除非使用括号把它们括起来
    'no-return-await': 2, // 禁用不必要的return await
    'no-script-url': 2, // 禁用Script URL，比如 location.href = "javascript:void(0)";
    'no-self-assign': [2, { props: false }], // 禁止自身赋值
    'no-self-compare': 2, // 禁止自身比较
    'no-sequences': 2, // 不允许使用逗号操作符
    'no-throw-literal': 2, // 限制可以被抛出的异常，静止字面量被抛出，只允许抛出具有Error对象能力的表达式
    'no-unmodified-loop-condition': 2, // 禁用一成不变的循环条件
    'no-unused-expressions': 0, // 禁止未使用过的表达式
    'no-unused-labels': 2, // 禁用未使用过的标签
    'no-useless-call': 2, // 禁止不必要的 .call() 和 .apply()
    'no-useless-catch': 2, // 禁止不必要的catch子句
    'no-useless-concat': 2, // 禁止没有必要的字符拼接
    'no-useless-escape': 2, // 禁用不必要的转义
    'no-useless-return': 2, // 禁止多余的return语句
    'no-void': 2, // 禁用 void 操作符
    'no-warning-comments': 0, // 允许警告注释
    'no-with': 2, // 禁用 with 语句
    'prefer-named-capture-group': 1, // 建议在正则表达式中使用命名捕获组，具名匹配只在ECMAScript 2018+能用，不建议强制开启
    'prefer-promise-reject-errors': [2, { allowEmptyReject: true }], // 要求使用 Error 对象作为 Promise.reject的原因，但是可以直接调用Promise.reject()
    radix: 1, // 强制在parseInt()使用基数参数
    'require-await': 2, // 禁止使用不带await表达式的async 函数
    'require-unicode-regexp': 2, // 强制在RegExp上使用u标志
    'vars-on-top': 1, // 要求所有的var声明出现在它们所在的作用域顶部
    'wrap-iife': [2, 'any'], // 需要把立即执行的函数包裹起来
    yoda: [2, 'never', { exceptRange: true }], // 要求或者禁止Yoda条件，但是允许Yoda条件出现在被括号包裹的范围比较中
    /* Strict Mode 该规则与使用严格模式和严格模式指令有关 */
    strict: [2, 'function'], //使用严格模式
    /* Variables 这些规则与变量声明有关 */
    'init-declarations': 0, // 强制或禁止变量声明语句中初始化
    'no-delete-var': 2, // 禁止删除变量
    'no-label-var': 2, // 不允许标签和变量同名
    'no-restricted-globals': [2, 'event', 'fdescribe'], // 禁用特定的全局变量
    'no-shadow': [2, { builtinGlobals: true, hoist: 'all', allow: [] }], // 禁止变量声明覆盖外层作用域的变量
    'no-shadow-restricted-names': 2, // js关键字和保留字不能作为函数名或者变量名
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef-init': 2, // 禁止将变量初始化为undefined
    'no-undefined': 0, // 允许使用undefined变量
    'no-unused-vars': 0, // 禁止出现未使用过的变量，模块化module开发时，很多变量和方法无法追踪，关闭规则，TS的类型变量，需要TSLint支持
    '@typescript-eslint/no-unused-vars': 2,
    'no-use-before-define': 0, // 禁止在定义前使用
    /* Node.js and CommonJS 这些规则是关于Node.js 或 在浏览器中使用CommonJS 的 */
    /* Stylistic Issues 这些规则是关于风格指南的，而且是非常主观的 */
    'array-bracket-newline': 1, // 在数组开括号后和闭括号前强制换行
    'array-bracket-spacing': [1, 'never'], // 禁止或强制在括号内使用空格
    'array-element-newline': [1, 'consistent'], // 强制数组元素间出现换行
    'block-spacing': [1, 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': [1, '1tbs', { allowSingleLine: true }], // 大括号风格要求，且允许单行
    camelcase: 0, // 要求使用骆驼拼写法
    'capitalized-comments': 0, // 强制或禁止对注释的第一个字母大写
    'comma-dangle': [1, 'never'], // 要求或禁止末尾逗号
    'comma-spacing': 1, // 强制在逗号周围使用空格
    'comma-style': 1, // 逗号风格
    'computed-property-spacing': 1, // 禁止或强制在计算属性中使用空格
    'consistent-this': 0, //当获取当前环境的this是用一样的风格
    'eol-last': 1, //文件以换行符结束
    'func-call-spacing': 2, // 要求或禁止在函数标识符和其调用之间有空格
    'func-name-matching': [2, 'always', { considerPropertyDescriptor: true, includeCommonJSModuleExports: true }], // 要求函数名与赋值给它们的变量名或属性名相匹配
    'func-names': 0, // 要求或禁止命名的 function 表达式
    'func-style': 0, // 强制 function 声明或表达式的一致性
    'function-paren-newline': 0, // 强制在函数括号内使用一致的换行
    'id-blacklist': 0, // 禁止使用指定的标识符
    'id-length': 0, // 强制标识符的最大和最小长度
    'id-match': 0, // 要求标识符匹配一个指定的正则表达式
    'implicit-arrow-linebreak': 2, // 强制隐式返回的箭头函数体的位置
    indent: [
      2,
      2, // 2格缩进
      {
        SwitchCase: 1, // switch case 语句2个空格
        VariableDeclarator: 'first' // 连续声明保持和第一个一致
      }
    ], // 强制使用一致的缩进
    'jsx-quotes': [1, 'prefer-single'], // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'keyword-spacing': 2, // 强制关键字周围空格的一致性
    'line-comment-position': 0, // 强制行注释的位置，建议不开启
    'linebreak-style': 0, // 强制使用一致的换行风格
    'lines-around-comment': 0, // 要求在注释周围有空行
    'lines-between-class-members': 0, // 要求或禁止类成员之间出现空行
    'max-depth': 1, // 强制块语句的最大可嵌套深度，默认最大4层
    'max-len': [0, { code: 120, tabWidth: 2 }], // 强制行的最大长度
    'max-lines': 0, // 强制文件的最大行数
    'max-lines-per-function': 0, // 强制函数最大行数
    'max-nested-callbacks': 0, // 强制回调函数最大嵌套深度
    'max-params': 0, // 强制函数定义中最多允许的参数数量
    'max-statements': 0, // 强制函数块最多允许的的语句数量
    'max-statements-per-line': 0, // 强制每一行中所允许的最大语句数量
    'multiline-comment-style': 0, // 强制对多行注释使用特定风格
    'multiline-ternary': [1, 'always-multiline'], // 要求或禁止在三元操作数中间换行
    'new-cap': [2, { newIsCap: true, capIsNew: false }], // 要求调用new操作符时有首字母大小的函数，允许调用首字母大写的函数时没有new操作符
    'new-parens': 2, // 强制或禁止调用无参构造函数时有圆括号
    'newline-per-chained-call': 0, // 要求方法链中每个调用都有一个换行符
    'no-array-constructor': 2, // 禁止使用Array构造函数
    'no-bitwise': 0, // 禁止使用按位操作符
    'no-continue': 0, // 禁用continue
    'no-inline-comments': 0, // 禁止使用内联注释
    'no-lonely-if': 2, // 禁止if语句作为唯一语句出现在else语句块中
    'no-mixed-operators': 1, // 禁止混合使用不同的操作符，出现时需要强制添加括号()增加可读性
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'], // 禁止使用空格和tab混合缩进
    'no-multi-assign': 0, // 允许连续赋值
    'no-multiple-empty-lines': [2, { max: 2 }], // 不允许多个空行
    'no-negated-condition': 2, // 禁用否定的表达式
    'no-nested-ternary': 2, // 禁止使用嵌套的三元表达式
    'no-new-object': 2, // 禁止使用Object构造函数
    'no-plusplus': 0, // 禁用一元操作符 ++ 和 --
    'no-restricted-syntax': 0, // 禁止使用特定的语法
    'no-tabs': 0, // 禁用 tab
    'no-ternary': 0, // 禁用三元操作符
    'no-trailing-spaces': 2, // 禁用行尾空格
    'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线
    'no-unneeded-ternary': 2, // 禁止可以表达为更简单结构的三元操作符
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'nonblock-statement-body-position': 2, // 强制单个语句的位置
    'object-curly-newline': 1, // 强制在花括号内使用一致的换行符
    'object-curly-spacing': [0, 'never', { arraysInObjects: true, objectsInObjects: true }], // 不强制在花括号中使用一致的空格
    'object-property-newline': [1, { allowAllPropertiesOnSameLine: true }], // 强制将对象的属性放在不同的行上
    'one-var': 0, // 强制函数中的变量在一起声明或分开声明
    'one-var-declaration-per-line': 0, // 要求或禁止在变量声明周围换行
    'operator-assignment': 2, // 要求或禁止尽可能地简化赋值操作
    'operator-linebreak': 0, // 强制操作符使用一致的换行符风格
    'padded-blocks': [2, 'never'], // 要求或禁止块内填充
    'padding-line-between-statements': 0, // 要求或禁止在语句间填充空行
    'prefer-object-spread': 2, // 优先使用对象扩展而不是
    'quote-props': [2, 'as-needed'], // 要求对象字面量属性名称使用引号
    quotes: [2, 'single', { avoidEscape: true }], // 强制使用一致的反勾号、双引号或单引号，单引号风格
    semi: [1, 'never'], // 要求或禁止使用分号代替 ASI
    'semi-spacing': [2, { before: false, after: true }], // 强制分号之前和之后使用一致的空格
    'semi-style': 0, // 强制分号的位置
    'sort-keys': 0, // 要求对象属性按序排列
    'sort-vars': 0, // 变量排序
    'space-before-blocks': [2, 'always'], // 要求或禁止语句块之前的空格
    'space-before-function-paren': [2, { anonymous: 'always', named: 'never', asyncArrow: 'never' }], // 要求或禁止函数圆括号之前有一个空格
    'space-in-parens': 2, // 禁止或强制圆括号内的空格
    'space-infix-ops': [2, { int32Hint: true }], // 要求中缀操作符周围有空格
    'space-unary-ops': [2, { words: true, nonwords: false }], //一元运算符前后不要加空格
    'spaced-comment': 0, // 要求或禁止在注释前有空白
    'switch-colon-spacing': 2, // 强制在 switch 的冒号左右有空格
    'template-tag-spacing': 2, // 要求或禁止在模板标记和它们的字面量之间有空格
    'unicode-bom': 0, // 要求或禁止使用 Unicode 字节顺序标记 (BOM)
    'wrap-regex': 2, // 要求正则表达式被包裹起来
    /* ECMAScript 6 这些规则只与 ES6 有关, 即通常所说的 ES2015 */
    'arrow-body-style': ['off', 'as-needed'], // 要求箭头函数体使用大括号，很多情况下会和max-len校验冲突，简化箭头函数后导致超长，建议关闭
    'arrow-parens': [1, 'as-needed'], // 要求箭头函数的参数使用圆括号
    'arrow-spacing': [2, { before: true, after: true }], // 要求箭头函数的箭头之前或之后有空格
    'constructor-super': 2, // 验证构造函数中 super() 的调用
    'generator-star-spacing': [2, { before: true, after: true }], // 强制 generator 函数中 * 号周围有空格
    'no-class-assign': 2, // 不允许修改类声明的变量
    'no-confusing-arrow': [2, { allowParens: true }], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-const-assign': 2, // 不允许改变用const声明的变量
    'no-dupe-class-members': 2, // 不允许类成员中有重复的名称
    'no-duplicate-imports': 2, // 禁止重复导入
    'no-new-symbol': 2, // 禁止 Symbolnew 操作符和 new 一起使用
    'no-restricted-imports': 0, // 禁用特定的 import
    'no-this-before-super': 2, // 在构造函数中禁止在调用super()之前使用this或super
    'no-useless-computed-key': 2, // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2, // 禁用不必要的构造函数
    'no-useless-rename': 2, // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    'no-var': 2, // 要求使用 let 或 const 而不是 var
    'object-shorthand': 2, // 要求对象字面量简写语法
    'prefer-arrow-callback': 0, // 要求使用箭头函数作为回调
    'prefer-const': 2, // 建议使用const
    'prefer-destructuring': 2, // 优先使用数组和对象解构
    'prefer-numeric-literals': 0, // 禁用 parseInt() 和 Number.parseInt()，使用二进制，八进制和十六进制字面量
    'prefer-rest-params': 2, // 建议使用剩余参数代替 arguments
    'prefer-spread': 2, // 建议使用扩展语法而非.apply()
    'prefer-template': 2, // 建议使用模板字面量而非字符串连接
    'require-yield': 0, // 禁用函数内没有yield的 generator 函数
    'rest-spread-spacing': [2, 'never'], // 强制剩余和扩展运算符及其表达式之间有空格
    'sort-imports': 2, // 强制模块内的 import 排序
    'symbol-description': 0, // 要求 symbol 描述
    'template-curly-spacing': [2, 'never'], // 强制模板字符串中空格的使用
    'yield-star-spacing': [2, { before: true, after: true }], // 强制在 yield* 表达式中 * 周围使用空格
    // typescript规则
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // templete模板中>符号不换行
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': ['error', { html: { void: 'always' } }]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: { mocha: true }
    }
  ]
}
