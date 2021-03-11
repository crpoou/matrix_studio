# step，branch 增加 parent 字段

# step，branch 增加 flow 字段

# 新增步骤：

- 生成快照，去除所有循环引用等
- `JSON.stringify`
- push 进入 history 栈
- 正常操作。

# ctrl + z

- 生成快照，去除所有循环引用
- `JSON.stringify`
- push 进入 feature 栈
- 从 history 栈中弹出一项做 `JSON.parse`
- `convertJSONToFlow`，全量替换当前 Flows

# ctrl + shift + z：

- 生成快照，去除所有循环引用
- `JSON.stringify`
- push 进入 history 栈
- 从 feature 栈中弹出一项做 `JSON.parse`
- convertJSONToFlow，全量替换当前 Flows

# 其他所有操作

- 同新增步骤示例，完成前三步，再进行后续操作

所以不能存储任何的引用类型字典 set,map，必须使用 uuid 作为唯一标识。
可以尝试 WeakMap，WeakSet

computed，递归 Flows，生成 uuid->branch or step

mounted，注册 uuid->validateCollection

每一个 step 都有自己的一个状态集，包括 validateCollection 当前表单校验状态

# 阅读模式部分可全部使用 v-if

# 表单主体可全部使用 v-if

# 某些容器卡有分支插槽，这个插槽不能使用 v-if，需要单独使用 v-show

# 插槽内的卡片同上述三条

# 当 tab 页未进行展示的时候，可静默对阅读模式和编辑模式 v-if="false"

#### 数据状态类型

- 真实数据，如 flow.json 的物理保存的数据
- 运行时状态，如选中了第几个 tab 页、流程是否校验合法、高亮了哪一张卡片，等等

##左侧边栏有动画

- 可拖动变宽，此时没有 transition 效果
- 点击切换关闭按钮，此时有渐变动画，展开或收起，能够记住上次的宽度
-

# 去除 getJSON 内多余的转换

# cu-tabs 内调用 initCurrentFlowStopHandle
