import { createApp } from 'vue';
import ElementPlus from 'element-plus'; // ++
import 'element-plus/lib/theme-chalk/index.css'; // ++
import './styles/element-theme.sass'; // ++
import locale from 'element-plus/lib/locale/lang/zh-cn'; // ++ 支持中文
import App from './App.vue';
import { store, key } from './store/index';

// createApp(App).mount('#app');
createApp(App).use(ElementPlus, { locale }).use(store, key).mount('#app'); // edit
