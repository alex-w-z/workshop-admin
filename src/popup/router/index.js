import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/popup/views/home/home.vue';
import Login from '@/popup/views/login/login.vue';
import Account from '@/popup/views/account/account.vue';
import Entry from '@/popup/views/entry/entry.vue';

const routes = [
    {path: '/login', component: Login, exact: true},
    {
        path: '/',
        component: Entry,
        children: [
            {path: 'home', component: Home, exact: true},
            {path: 'account', component: Account, exact: true},
            {path: '', redirect: 'home'},
            {path: '/:pathMatch(.*)*', redirect: 'home'},
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
