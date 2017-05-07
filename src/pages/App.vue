
<template>
	<div id="app">
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>

<style type="text/css">
	@import './style/base.css';
	.active{
		color: orange;
	}

	.highcharts-tooltip {
	  	background: #f1375e;
	}

	.highcharts-tooltip p {
	    font-size: 0.5rem;
	    color: #fff;
	  }

	.highcharts-axis path{
		stroke: #4b425a;
	}

	.highcharts-series-group {
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
	}
	

	/*
	*   过渡动画
	*/
	
	/*#app{
		position: relative;
	}
	#app>div{
			width: 100%; 
			position: absolute;
	}
	.slide-enter-active {
 		transition: all .3s cubic-bezier(0,0,0.25,1);
 		transform: translateX(0);
	}
 
	.slide-leave-active {
 		transition: all .3s cubic-bezier(0,0,0.25,1);
 		transform: translateX(-100%);
	}
 
	.slide-enter {
 		transform: translateX(100%);
	}
 
	.slide-leave {
 		transform: translateX(100%);
	}*/
	
</style>

<script type="text/javascript">
	import Footer from '../pages/components/footer';
	import Header from '../pages/components/header';
	import { mapState, mapActions } from 'vuex';

	export default {
		name: 'app',
		data() {
			return {
				msg: 'ys',
				Stomp: '',
				body: '',
				symbolPrice: '',
			}
		},
		methods: {
			zeptoAjax() {
				$.ajax({
					url: 'http://newapi.invhero.com/v1/user/hongbao?access_token=d4ea901c-66d4-404f-ae2b-ed5220bbdd32&_f=0.4152040680259623',
					success: function(data) {
						// console.log(data)
					}
				})
			}
		},
		mounted() {
			console.log('App挂在完毕！');
		},
		created() {
			this.$store.dispatch('getStompCurrentPrice');
			this.$store.dispatch('getAccount');
		},
		components: {
			myFooter: Footer,
			myHeader: Header
		}
	}
</script>