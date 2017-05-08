/**
 * Created by linhaifeng.
 */

import Vue from 'vue';
import App from '../pages/App';
import VueRouter from 'vue-router';

//vue组件
import Index from '../pages/page/index.vue';
import Home from '../pages/page/home.vue';
import Page from '../pages/page/page.vue';
import optionList from '../pages/page/optionList.vue';
import proTrading from '../pages/page/proTrading.vue';
import Login from '../pages/page/login.vue';
import curretOrder from '../pages/page/curretOrder.vue';
import historyOrder from '../pages/page/orderHistory.vue';
import discover from '../pages/page/discover.vue';
import my from '../pages/page/my.vue';
import timeline from '../pages/page/timeline.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '', component: Login,
    },
    {
        path: '/login', component: Login,
    },
    { path: '/my', component: my,
        children: [

            { path: '/my', name:'my', component: my }

            // { path: '/page1', name:'page1', component: Page1 },

            // { path: '/home', name:'home', component: Home},

            // { path: '/HomeUserInfo/:uid', name:'homeUserInfo', component: HomeUserInfo },

            // { path:'/article/:id', name:'article', component : Article},

            // { path:'/home/mypet', name:'myPet', component : MyPet},

            // { path:'/home/mypet/addpet', name:'addPet', component : AddPet},

        ]
    },
    { path: '/home', component: Home,
        children: [
            {   path: '/option',
                name:'option', 
                component: optionList,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                }, 
            },
            {
                path: '/curretOrder',
                name:'curretOrder', 
                component: curretOrder,
            },
            {
                path: '/historyOrder',
                name:'historyOrder', 
                component: historyOrder,
            },
        ]   
    },
    { path: '/discover', component: discover,
        children: [
        ]
    },
    { path: '/proTrading', component: proTrading,
        children: [
        ]
    },
    { path: '/timeline', component: timeline,
        children: [
        ]
    },

];

const router = new VueRouter({
    //mode:'history', //这样url就没有/#/XXX,而是常见的url形式
    routes:routes, // short for routes: routes
    linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
    history:true
});


export  default router