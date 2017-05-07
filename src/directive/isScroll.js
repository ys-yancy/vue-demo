import Vue from 'vue';

// 注册组件

Vue.directive('isScroll', {
	bind(el, binding, vnode, oldVnode) {
		
	},

	inserted(el, binding, vnode, oldVnode) {
			
	},

	update(el, binding, vnode, oldVnode) {
			
	},

	componentUpdated(el, binding, vnode, oldVnode) {
		const Bh = document.body.clientHeight || document.documentElement.clientHeight ||window.innerHeight;
		const Wh = document.body.scrollTop || document.documentElement.scrollTop;
		const Eh = el.getBoundingClientRect().height;
		console.log(this)
	},

	unbind(el, binding, vnode, oldVnode) {
	}
})