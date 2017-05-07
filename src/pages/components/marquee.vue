<template>
	<div class="marquee-wrapper-outer" v-if='isHasMarqu'>
		<ul>
			<li class="marquee-wrapper">
				<marquee loop='2' scrolldelay='1' scrollamount='' align='center'>
					<span>哈哈， 我是最帅的！</span>
				</marquee>
			</li>
		</ul>
		<div class="close-wrapper" @click.stop='closeMarqu()'>
			<span class="close_icon"></span>
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../style/variable.less';
	.marquee-wrapper-outer{
		position: relative;
		color: #fff;
		background: #7862af;
		ul{
			.height(54);
			.line-height(54);
			.font-size(28);
			marquee{
				/*
				* 解决字体模糊问题
				*/
				color: #dadbdd;
				transform: translateZ(0);
				-webkit-transform: translateZ(0);
			}
		}
		.close-wrapper{
			position: absolute;
			.top(12);
			.right(2);
			.close_icon{
				display: inline-block;
				.width(33);
				.height(33);
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA19JREFUeNq8mH1ozHEcx+9udzY3JbUYCY1NQ6LQIsM8/DF/TNmMUQyRaCJbHg+5bUok5uEP5akzj+cPD2F5nLAM5TG3GcJ/I66tbUa8P3pfXefu9/3e7e4+9Wpr+z68f9/f5+n7M3sa3pk0bQLIA1mgO0gECcAM/oBfoAO0gDvgHHijWjR9SJrJqrH5VFAKhoOX4Cp4DER9M/gJ7KA3GArGgulgKbgPdoLnRhsYiUgFe8BkPtUm8CTEWBHyHXjAJf5tEigB10A1KAO/g022hFh0PHjIp5sJVhsICGV3wWxQzJN5APrrisgBN8BpMA08M3XNroNx4CN4BAarRGTxONeDDaboWTuYQ3+qCTwRfxH9+O72gSpTbGwZeAWOhxKxC7yP8gkEs2K+ktJAERP5/ktMsTcJ63WMlr7+IhzgDPNAPOw8eMGw/ydiDMgEhxQTR4IlGhv0BKt8T2lge0FuQ2NTqoiYB15rpFgJsyPAqRh3DOwHaYpxEoVt4gZWptkrGk8oHj2IR9gJtgcZI7llFp2vTrGe1Jt6kG1l3q/XECEbb2bM72DBKvf7v4R3ITmr6RsiNM/K+tEYhlM5/X6KoN3gJJgLCuh0uvYW9PKJ+Bqmdzt5EpVgEchgnXBHEK5JForojCDMpER/BiOYjt0RrCH72iz8JSmCBVxM9RfojBsjWEP27bCwxvcJc/IpUEQfyGfElNNxwzHpWdqsfLcZbEhUZqGAQlZFXwNTAboxamxgq6YISZLfRMQPJqLLiglyWgfogAvYbfnbNop08JjlZLyKNaV1aJJJtewjzYoJBXz3C+kPwczBaizFabRiPTvH3PId70C2dEbmZrU9oRhXxr70qWLcfAbFTTNbfhdb+Pw4VdFEZulqtPwVvlJeye54SpxErGC1rfLvJ6SPOMrqZ4uxgHSwha/NG9jeOXh7csVQgJ3F7SIr7n89ZjvDTxz0cAwEJDO9t4KVRi3/F947ZjARpURJQCavhHJ3zeWd1fDy46GTJjPMirqwuY1NbS0vUTnBElioa+AnTjjIXrCGaVrXeoDlvDrK0a8Bi0NVa7PGpwFp6dbyGFv5RHU8sWYerZ3FaBjbxVGsSb7LlNfo04A5jO8TA5gxs3mNS+HmCXzCFor6AG6De1KcdL5P/BVgANRKxsP4LBrIAAAAAElFTkSuQmCC) 0 0 no-repeat;
			}
		}
	}
</style>

<script type="text/javascript">
	export default {
		name: 'marque',
		data() {
			return {
				isHasMarqu: true
			}
		},

		methods: {
			closeMarqu() {
				return this.isHasMarqu = false;
			},
		},

		created() {

		},
	}
</script>