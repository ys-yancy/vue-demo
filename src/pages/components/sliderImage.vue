<template>
	<div class="slider-wrapper-outer">
		<div class="slider-wrapper">
			<ul class="slider" :class='sliderClass' :style='sliderWrapperStyle'>
				<li>
					<img src="//static.invhero.com//banner/tzyh365/banner_f.1487323474.jpg">
				</li>
				<li>
					<img src="//static.invhero.com//banner/tzyh365/banner_f.1478515496.jpg">
				</li>
				<li>
					<img src="//static.invhero.com//banner/tzyh365/banner_f.1487323474.jpg">
				</li>
			</ul>
		</div>
		<div class="slider-controller">
			<ul>
				<li :class="{active: sliderClass=='first'}" @click='sliderControEvent($event, 1)'></li>
				<li :class="{active: sliderClass=='second'}" @click='sliderControEvent($event, 2)'></li>
				<li :class="{active: sliderClass=='third'}" @click='sliderControEvent($event, 3)'></li>
			</ul>
		</div>
	</div>
</template>

<style lang='less' scoped>
	@import '../style/variable.less';
	.slider-wrapper-outer{
		position: relative;
		.height(350);
		.margin-bottom(50);
		.slider-wrapper{
			overflow: hidden;
			ul{
				.font-size(0);
				/*.width(1940);*/
				transition: all .5s ease-in;
				-webkit-transition: all .5s ease-in;
				li{	
					display: inline-block;
					.width(640);
					.height(350);
					img{
						width: 100%;
						height: 100%;
					}
				}
				&.first{
					transform: translateX(0);
					-webkit-transform: translateX(0);
				}
				&.second{
					transform: translateX(-16rem);
					-webkit-transform: translateX(-16rem);
				}
				&.third{
					transform: translateX(-32rem);
					-webkit-transform: translateX(-32rem);
				}
			}
		}
		.slider-controller{
			position: absolute;
			z-index: 5;
			.width(640);
			.height(50);
			.bottom(0);
			ul{
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				li{
					.width(12);
					.height(12);
					.margin(10, 5);
					.border-radius(50%);
					.border(1, solid, rgba(0,0,0,.16));
					background-color: rgba(255,255,255,.4);
					&.active{
						background: rgba(150,123,220, .5);
					}
				}
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		name: 'sliderImage',
		data() {
			return {
				sliderClass: 'first',
				sliderController: '',
				sliderWrapperStyle: {
					width: '',
				}
			}
		},

		methods: {
			sliderImg() {
				console.log('slider start');

				if ( this.sliderClass == 'first' ) {
					this.sliderClass = 'second';
				} else if ( this.sliderClass == 'second' ) {
					this.sliderClass = 'third';
				} else {
					this.sliderClass = 'first'
				}

				this.sliderController = setTimeout(()=> {
					this.sliderImg();
				}, 2000)
			},

			sliderControEvent(el, index) {
				switch(index) {
					case 1: 
						this.sliderClass = 'first';
						break;
					case 2: 
						this.sliderClass = 'second';
						break;
					case 3:  
						this.sliderClass = 'third';
						break;
				}
				return this.sliderClass;
			},

			clearSlider() {
				this.sliderController&&clearTimeout(this.sliderController);
			}
		},

		created() {
			this.sliderImg();
			this.sliderWrapperStyle.width = 16 * 3 + 'rem';
		},

		watch: {
		    '$route' (to, from) {
		     	//这里不触发
		    }
		},
	}
</script>