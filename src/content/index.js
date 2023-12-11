import { createApp } from "vue";
import ElementPlus from 'element-plus';
import '@/content/element-plus.scss';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import Content from "./Content.vue";


const crxApp = document.createElement("div");
crxApp.id = "CRX-containe";

document.body.appendChild(crxApp);

const app = createApp(Content);
app.mount("#CRX-containe");
