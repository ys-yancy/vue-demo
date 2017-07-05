
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

	.tab-content-wrapper .highcharts-range-selector-buttons {
  		display: none;
	}
	.tab-content-wrapper svg .highcharts-range-selector-buttons,
	.tab-content-wrapper svg .highcharts-input-group,
	.tab-content-wrapper svg .highcharts-scrollbar {
		display: none;
	}

	.tab-content-wrapper .highcharts-grid path{
        border-color: #1f172c;
    }
    .tab-content-wrapper .highcharts-axis path{
        stroke: #4b425a;
        stroke-width: 2;
    }
    .tab-content-wrapper .highcharts-grid path{
        stroke: #43496a;
    }
    .tab-content-wrapper .highcharts-tracker path{
        stroke-width: 3;
        stroke: #01bdf1;
        fill: #01bdf1;
    }
    .tab-content-wrapper svg>path {
       stroke: #967adc;
    }
    .tab-content-wrapper .highcharts-data-labels tspan{
        text-shadow: none;
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
	}*/
	/*.slide-enter-active {
 		transition: all 1s cubic-bezier(0,0,0.25,1);
 		opacity: 1;
	}
 
	.slide-leave-active {
 		transition: all 1s cubic-bezier(0,0,0.25,1);
 		opacity: 1;
	}
 
	.slide-enter {
 		opacity: 0;
	}
 
	.slide-leave {
 		opacity: 0;
	}*/
	
</style>

<script type="text/javascript">
	export default {
		name: 'app',
		methods: {
			isConnectStomp(to, from) {
				let isConnentStomp = to.meta.requireStomp;
				let isConnect = this.$store.state.isConnectStompSuccess;

				isConnentStomp&&!isConnect&&this.connect_stomp();
			},

			isGetAccount() {
				/**
				 * 这里有一个bug：
				 * 手动改地址栏链接将不会触发created
				 */
				let hs = window.location.hash;
				let isLogin = this.isLogin(hs);

				console.log('isLogin:' + isLogin);

				!isLogin&&this.$store.dispatch('getAccount');
			},

			connect_stomp() {
				console.log('start: connect: stomp')
				this.$store.dispatch('getStompCurrentPrice');
				setTimeout( () => {
					let isConnect = this.$store.state.isConnectStompSuccess;
					if ( !isConnect ) {
						this.connect_stomp();
					}
				}, 2000)
			},

			isLogin(path) {
				if ( path == '#/' || path.indexOf('#/login') !== -1 ) {
					return true;
				} else {
					return false;
				}
			}
		},
		mounted() {
			console.log('App挂在完毕！');
		},
		created() {
			this.isGetAccount()
		},
		watch: {
			$route(to, from) {
				this.isConnectStomp(to, from);
			}
		}
	}
</script>