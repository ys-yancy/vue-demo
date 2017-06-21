
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
			connect_stomp() {
				this.$store.dispatch('getStompCurrentPrice');
				setTimeout( () => {
					let isConnect = this.$store.state.symbolCurrentPrice;
					if ( !isConnect ) {
						this.connect_stomp();
					}
				}, 2000)
			}
		},
		mounted() {
			console.log('App挂在完毕！');
		},
		created() {
			this.$store.dispatch('getAccount');		
		},
		watch: {
			$route(to, from) {
				let _f = to.name,
					isConnect = this.$store.state.symbolCurrentPrice;

				!!_f&&!isConnect&&this.connect_stomp();
			}
		}
	}
</script>