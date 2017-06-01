import Vue from 'vue';
import App from '../pages/App';
import router from '../router/router';
import store from '../store/index';
import IO from '../service/IO';
import Cookie from '../pages/lib/cookie';
import VueTouch from 'vue-touch';
import Sticky from '../pages/common/sticky';
import { getType,

    } from '../pages/common/mixins';

Vue.config.debug = true;

window.log = console.log;

Vue.prototype.ajax = IO.ajax;

Vue.prototype.cookie = Cookie;

Object.defineProperty(Vue.prototype, '$sticky',{
    value: Sticky,
});

Object.defineProperty(Vue.prototype, '$getType',{
    value: getType,
});

Vue.use(VueTouch, {name: 'v-touch'});

let data = {
    router,
    store,
    render:h => h(App)
}

const app = new Vue(data).$mount('#app');

router.beforeEach( ( to, from, next )=> {
    if (to.meta.requireAuth) {
    	//!isEmptyObject(store.state.user)
        if (Cookie.get('token')) {
            next();
        }
        //如果没有，跳到登录页面
        else{
            next({
                path: '/login',
                query: {redirect: to.fullPath}, // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }else {
        next();
    }
});

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
