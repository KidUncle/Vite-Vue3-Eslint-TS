## 使用**Vite+Eslint**开整
### 初始化项目
```
npm init vite@latest my-vue3-app
```
根据提示选择自己的框架就行了
### 启动项目
执行 npm run dev，项目默认启动在3000端口
可以在 vite.config.ts 文件中修改开发配置
```
// vite.config.ts
export default defineConfig({
  plugins: [vue()],

  // 开发服务器配置
  server: {
    port: 11000,
  },
```
### 添加ESlint支持
**安装**
```
npm install eslint --save-dev
```
* 在VS Code中安装eslint插件，以在开发中自动进行eslint校验。
**配置ESlint**
```
module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  parserOptions: {
    ecmaVersion: 12,
  },
}
```
**引入规则**
为了规范团队成员代码格式，以及保持统一的代码风格，项目采用当前业界最火的 Airbnb规范 ，并引入代码风格管理工具 Prettier 。
**eslint-plugin-vue**ESLint官方提供的Vue插件，可以检查 .vue文件中的语法错误。
**eslint-config-airbnb-base**Airbnb基础规则的eslint插件。
**eslint-plugin-prettier**
```
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
```
配置到此时，大概率会遇到 eslint 规则和 prettier 规则冲突的情况，eslint告诉我们要使用单引号，但是改为单引号以后，prettier有告诉我们要使用双引号。

这时候就需要另一个eslint的插件 eslint-config-prettier，这个插件的作用是禁用所有与格式相关的eslint规则，也就是说把所有格式相关的校验都交给 prettier 处理。
```
npm install --save-dev eslint-config-prettier
```
```
// .eslintrc.js
plugins: ['prettier'],
extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'plugin:prettier/recommended', // ++
],
rules: {
    'prettier/prettier': 'error',
},
```
**注**plugin:prettier/recommended 的配置需要注意的是，一定要放在最后。因为extends中后引入的规则会覆盖前面的规则。

可以在根目录新建 .prettierrc.js 文件自定义 prettier 规则，保存规则后，重启编辑器的eslint服务以更新编辑器读取的配置文件。
```
// .prettierrc.js
module.exports = {
  singleQuote: true, // 使用单引号
}
```

## 增加 **husky**

### **husky** 

它的主要作用就是关联git的钩子函数，在执行相关git hooks时进行自定义操作，比如在提交前执行eslint校验，提交时校验commit message等等。

### **Install**

husky官网推荐使用自动初始化命令，因为我们就按照官网推荐的方式进行安装，以npm为例
```
npx husky-init && npm install
```  
执行完成后，项目根目录会多出来 .husky 文件夹。
内部的_文件夹我们在此无需关心，pre-commit文件便是在git提交前会执行的操作  

### **配置**

我们想要在提交前执行eslint校验代码，因此修改husky的pre-commit文件即可。我们在文件中添加如下代码
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

eslint . --ext .js,.ts,.vue --fix #++ 校验所有的.js .ts .vue文件，并修复可自动修复的问题
git add . #++ 用于将自动修复后改变的文件添加到暂存区
exit 1 #++ 终止命令，用来测试钩子
```   
此时提交代码执行commit是可以看到已经进入了pre-commit文件执行命令。
```
git commit -m '测试'
```  
但是可能会报错需要全局的eslit，执行以下代码
```
npm i eslint -g
// 用于验证 eslint 是否全局安装成功
eslint -v 
// 如果报错 可能是 node 环境配置问题 可以通过重新安装 node 解决问题
// 也有可能 powershell 不支持，推荐在 git bash 环境下执行提交代码
// eslint --init 推荐使用 npx eslint --init 方式
```  

### **思考**

通过配置husky，我们已经实现了在提交前对代码进行检查。但是eslint配置的是 eslint . --ext .js,.ts,.vue --fix，检查所有的js、ts、vue文件，随着项目代码越来越多，每次提交前校验所有代码显然是不现实的。所以需要一个办法每次只检查新增或修改的文件。

## **添加lint-staged**
lint-staged的作用就是对暂存区的文件执行lint，可以让我们每次提交时只校验自己修改的文件。
```
npm install lint-staged --save-dev
```
### **配置lint-staged**
安装完成后，在package.json文件中添加lint-staged的配置
```
// package.json
...
"scripts": {
    ...
    "lint-staged": "lint-staged"
},
"lint-staged": {
    // 校验暂存区的ts、js、vue文件
    "*.{ts,js,vue}": [
      "eslint --fix",
      "git add ."
    ]
}
```
添加scripts里的lint-staged命令，是因为不建议全局安装lint-staged，以防在其他同学电脑上没有全局安装导致运行报错。

### **修改husky**
添加lint-staged配置后，husky就不在需要直接调用eslint了。修改pre-commit文件如下：
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# eslint . --ext .js,.ts,.vue --fix
# git add .
# exit 1
npm run lint-staged
```  
lint-staged配置后，我们不再需要配置husky时全局安装的eslint，因为lint-staged可以检测项目里局部安装的脚本。同时，不建议全局安装脚本，原因同上。

### **测试**
```
git add .
git commit -m 'add lint-staged'
```  

## **引入Element-plus**  

### **安装**
```
npm install element-plus --save
```

### **配置**
```
// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus'; // ++
import 'element-plus/lib/theme-chalk/index.css'; // ++
import App from './App.vue';

createApp(App).use(ElementPlus).mount('#app'); // edit
```  
此时可以 在项目尝试使用 element-plus 组件已验证 element-plus 安装是否成功

### **修改Element主题**
1.创建文件
在src 目录下新增styles文件夹，并新增 color.sass 和 element-theme.sass 文件。其中color.sass 除了给element主题提供颜色配置，还会引入为全局变量，方便在组件中使用。
还需装 sass
```
npm i sass --save-dev
```  
2.配置主题
```
// color.sass
$--color-primary: red
```  

```
// element-theme.sass
@improt "./color.sass" // 引入主题色文件

$--font-path: 'node_modules/element-plus/lib/theme-chalk/fonts'
@import "node_modules/element-plus/packages/theme-chalk/src/index"
```  

```
// main.ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'; // --
import './styles/element-theme.sass'; // ++
import App from './App.vue';

createApp(App).use(ElementPlus).mount('#app');
```
3.配置全局变量
前面单独创建了一个color.sass是为了将文件里的颜色变量引入到全局，方便在组件中使用。
```
$--color-primary: #ff0000
$primary: #ff0000
```   
引入全局变量需要在vite.config.ts文件中配置css预处理器，并将引入的变量文件传给预处理器。配置方式如下
```
// vite.config.ts
  css: {
    preprocessorOptions: {
      sass: {
        // \n 处理文件中多个引入报换行错误的问题
        additionalData: "@import './src/styles/color.sass'\n",
      },
    },
  },
```  
引入后我们在组件内进行测试
```
// HelloWorld.vue
<style scoped lang="sass">
a
  color: $primary
</style>

```
4.修改默认语言
使用组件时会发现Element-plus的默认语言变成了英文，需要自己引入并修改默认语言为中文。
```
import { createApp } from 'vue';
import ElementPlus from 'element-plus'; 
import 'element-plus/lib/theme-chalk/index.css'; 
import './styles/element-theme.sass'; 
import locale from 'element-plus/lib/locale/lang/zh-cn'; // ++ 
import App from './App.vue';

createApp(App).use(ElementPlus).mount('#app'); 
```

## **添加 Vuex**
### **安装**
这里需要安装的是 vuex@next，它是和Vue3相匹配的版本
npm install vuex@next --save

### 初始化
创建 src/store/index.ts 文件，在文件内初始化vuex
```
// src/store/index.ts
import { createStore } from 'vuex';

const store = createStore({
  // vuex相关内容
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
});
```  
然后在 main.ts 中引入并绑定该文件到Vue实例
```
//main.ts
...
import store from './store/index'; // ++

createApp(App).use(ElementPlus, { locale }).use(store).mount('#app'); // edit
```
**引入store文件后，ESLint会报错**
这是我们第一次引入ts文件，因为airbnb-base只提供了原生js的校验，而且目前我没有找到airbnb官方的规则库。所以还是像上次一样，我们对airbnb-base的校验规则进行修改。
```
// .eslintrc.js

settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
}
rules: [
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
      },
    ],
]
```
完成初始化以后，我们会发现mutations里的方法报了ESLint错误，不要直接修改参数值。但是在vuex里，我们势必要直接修改state。
和上次处理vite的引入一样，查看airbnb-base关于这条规则的定义，然后将state加入例外就可以了。 airbnb-base规则定义。
在ESLint中添加如下规则：
```
...
ruls: {
  'no-param-reassign': [
    'error',
    {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'accumulator', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'context', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
        'staticContext', // for ReactRouter context
        'state', // for vuex state ++
      ],
    },
  ],
}
```
添加完规则后，再次查看发现依然有报错，但是报错信息已经变了。
主要因为我们没有声明state的类型，解决这个问题，我们首先创建关于state类型声明的接口。
```
// src/store/index.ts
interface State {
  count: number;
}
```  
将自定义的State接口当做泛型参数传给createStore即可。