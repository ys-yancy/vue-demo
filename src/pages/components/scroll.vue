<template>
	<div class="yo-scroll"
	:class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
	@touchstart="touchStart($event)"
	@touchmove="touchMove($event)"
	@touchend="touchEnd($event)"
	@scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
		<section class="inner" :style="{ transform: 'translate3d(1, ' + top/35 + 'rem, 1)' }">
			<div class="pull-refresh">
		        <slot name="pull-refresh">
		          <!-- <span class="down-tip">下拉更新</span>
		          <span class="up-tip">松开更新</span>
		          <span class="refresh-tip">更新中</span> -->
					
					<svg width='100' height='100' style='fill:#EC1E79;'>
						<!-- 大圆 -->
						<circle cx="50" cy="40" r="35" style="stroke-width: 5; stroke: #fff;"/>
						<!-- 眼睛 -->
						<!-- <circle cx="40" cy="25" r="2.5" style="fill: #fff;" />
						<circle cx="60" cy="25" r="2.5" style="fill: #fff;" /> -->

						<!-- 嘴巴 -->
						<circle cx="50" cy="45" r="15" style="fill: none; stroke: #fff; stroke-width: 5; stroke-linecap: round;animation:mouth 1s infinite; transform: rotate(280deg); transform-origin: 50% 50%; stroke-dashoffset: -23; stroke-dasharray: 42, 95;"/>
						
						<!-- 眼睛动画 -->		
						<path id="eyeleft"  d="M 40 35 A 15 15 180 0 1 60 35" style="fill: none; stroke-width: 0;"/>

						<path id="eyeright"  d="M 35 45 A 15 15 180 0 1 40 35" style="fill: none; stroke-width: 0;"/>

						<circle class="eye" cx="" cy="" r="2.5" style="fill: #fff;">
							<animateMotion
							    dur="1s"
							    repeatCount="indefinite"
							    keyPoints="0;0;1;1"
							    keyTimes="0;0.3;0.8;1"
							    calcMode="linear">
							    <mpath xlink:href="#eyeleft"/>
							</animateMotion>
						</circle>

						<circle class="eye" cx="" cy="" r="2.5" style="fill: #fff;">
							<animateMotion
							    dur="1s"
							    repeatCount="indefinite"
							    keyPoints="0;0;1;1"
							    keyTimes="0;0.3;0.8;1"
							    calcMode="linear">
							    <mpath xlink:href="#eyeright"/>
							</animateMotion>
						</circle>


					</svg>

		        </slot>
		    </div>
		    <slot></slot>
		    <div class="load-more">
		        <slot name="load-more">
		          <!-- <span>加载中……</span> -->
		           <!-- <div class="loader">
				        <div class="loader-inner ball-scale-multiple">
					        <div></div>
					        <div></div>
					        <div></div>
				        </div>
				    </div> -->
				    <img src="../loading/three-dots.svg">
		        </slot>
		    </div>
		</section>
	</div>
</template>

<style lang='less'  scoped>
	@import '../style/variable.less';
	.yo-scroll {
	  /*--2017-5-6   兼容Stikty；*/
	  /*  position: absolute;
	    .top(204);
	    .right(0);
	    .left(0);
	   .bottom(80);*/
	    overflow: auto;
	    -webkit-overflow-scrolling: touch;
	    background-color: #ddd;
	    .inner{
	    	/*--2017-5-6   兼容Stikty；*/
	    	/*position: absolute;
	    	width:100%;
	    	.top(-80);*/
	    	.margin-top(-80);
	    	transition-duration: 300ms;
	    	.pull-refresh{
	    		width: 100%;
	    		.height(80);
				.line-height(80);
	    		background: #ddd;
	    		text-align: center;
	    	}
	    	.up-tip,
	    	.down-tip,
	    	.refresh-tip{
	    		display: none;
	    	}
	    }
	    &.touch .inner{
	    	transition-duration: 0ms;
	    }
	    &.down .down-tip{
	    	display: block;
	    }
	    &.up .up-tip{
	    	display: block;
	    }
	    &.refresh .refresh-tip{
	    	display: block;
	    }

	    .load-more{
			.height(50);
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    /*.margin-bottom(190);*/
		    background: #1ABC9C;
		    display: none;
	    }
	}

	@keyframes mouth {
		0% {
		    transform: rotate(-80deg);
		    stroke-dasharray: 60, 95;
		    stroke-dashoffset: 0;
		}
		40% {
		    transform: rotate(280deg);
		    stroke-dasharray: 60, 95;
		    stroke-dashoffset: 0;
		}
		70%, 100% {
		    transform: rotate(280deg);
		    stroke-dashoffset: -23;
		    stroke-dasharray: 42, 95;
		}
	}



	/*@-webkit-keyframes ball-scale-multiple {
	  0% {
	    -webkit-transform: scale(0);
	            transform: scale(0);
	    opacity: 0; }
	  5% {
	    opacity: 1; }
	  100% {
	    -webkit-transform: scale(1);
	            transform: scale(1);
	    opacity: 0; } }

	@keyframes ball-scale-multiple {
		0% {
		    -webkit-transform: scale(0);
		    transform: scale(0);
		    opacity: 0; 
		}
		5% {
		    opacity: 1; 
		}
		100% {
		    -webkit-transform: scale(1);
		    ransform: scale(1);
		    opacity: 0; 
		} 
	}

	.ball-scale-multiple {
	  	position: relative;
	  	-webkit-transform: translateY(-30px);
	    transform: translateY(-30px); 
	}
	.ball-scale-multiple > div:nth-child(2) {
	    -webkit-animation-delay: -0.4s;
	    animation-delay: -0.4s; 
	}
	.ball-scale-multiple > div:nth-child(3) {
	    -webkit-animation-delay: -0.2s;
	    animation-delay: -0.2s; 
	}
	.ball-scale-multiple > div {
	    background-color: #fff;
	    width: 15px;
	    height: 15px;
	    border-radius: 100%;
	    margin: 2px;
	    -webkit-animation-fill-mode: both;
	    animation-fill-mode: both;
	    position: absolute;
	    left: -30px;
	    top: 0px;
	    opacity: 0;
	    margin: 0;
	    width: 60px;
	    height: 60px;
	    -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
        animation: ball-scale-multiple 1s 0s linear infinite; 
    }*/
	
</style>

<script type="text/javascript">
	export default {
		name: 'scroll',
		data() {
			return {
				top: 0,
		        state: 0,
		        startY: 0,
		        touching: false,
		        infiniteLoading: false
			}
		},

		props: {
			offset: {
				type: Number,
        		default: 80,
			},

			isSetWrapper: {
				type: Boolean,
		        default: false,
			},

			enableInfinite: {
		        type: Boolean,
		        default: true,
		    },

		    enableRefresh: {
		    	type: Boolean,
		        default: true,
		    },

		    onRefresh: {
		        type: Function,
		        default: undefined,
		        required: false,
		    },

		    onInfinite: {
		        type: Function,
		        default: undefined,
		        require: false,
		    },
		},

		methods: {
			touchStart(e) {
		        this.startY = e.targetTouches[0].pageY;
		        // 2017-5-6   兼容Stikty；
		        // this.startScroll = this.$el.scrollTop || 0;
		        /**
				**  应该所有的滚动都由this.startScroll = this.$el.scrollTop || 0;处理
				**  以后在做优化   friends.vue中写法正确
		        **/
		        if (this.isSetWrapper) {
		        	this.startScroll = this.$el.scrollTop || 0;
		        } else {
		        	this.startScroll = document.body.scrollTop || document.documentElement.scrollTop;
		        }     
		        this.touching = true;
		    },

		    touchMove(e) {
		    	// 如果不是向上滑动 则直接退出
		        if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
		          return;
		        }

		        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;

		        if (diff > 0) e.preventDefault();

		        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

		        if (this.state === 2) { // in refreshing
		          return;
		        }

		        if (this.top >= this.offset) {
		          this.state = 1
		        } else {
		          this.state = 0
		        }
		    },

		    touchEnd(e) {
		        if (!this.enableRefresh) return;

		        this.touching = false;

		        if (this.state === 2) { // in refreshing
		          this.state = 2;
		          this.top = this.offset;
		          return
		        }

		        if (this.top >= this.offset) { // do refresh
		          this.refresh();
		        } else { // cancel refresh
		          this.state = 0;
		          this.top = 0;
		        }
		    },

		    refresh() {
		        this.state = 2;
		        this.top = this.offset;
		        this.onRefresh(this.refreshDone);
		    },

		    refreshDone() {
		        this.state = 0;
		        this.top = 0;
		    },

		    infinite() {
		        this.infiniteLoading = true;
		        this.onInfinite(this.infiniteDone);
		    },

		    infiniteDone() {
		        this.infiniteLoading = false;
		    },

		    onScroll(e) {
		        if (!this.enableInfinite || this.infiniteLoading) {
		          return;
		        }
		        let outerHeight = this.$el.clientHeight;
		        let innerHeight = this.$el.querySelector('.inner').clientHeight;
		        let scrollTop = this.$el.scrollTop;
		        let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0;
		        let infiniteHeight = this.$el.querySelector('.load-more').clientHeight;
		        let bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
		        if (bottom < infiniteHeight) this.infinite();
		    }
		}

	}
</script>