<template>
	<div v-if='realToken' class="dialog-login-wrapper-outer" @touchmove.prevent.stop>
		<div class="dialog-login-wrapper">
			<div class="title-wrapper">
				<p class="title">为保证您的实盘账户资金安全,</p>
				<p class="title">请输入交易密码</p>
				<span class="icon">
					<span class="bg-icon"></span>
				</span>
			</div>
			<div class="input-wrapper">
				<input type="text" name="" placeholder="请输入交易密码" v-model='password'>
				<p v-if='err' class="err">密码错误</p>
				<!-- <a href="#">切换全键盘输入</a> -->
			</div>
			<div class="btn-wrapper">
				<span class="btn close" @click='close'>使用模拟账户</span>
				<span class="btn confirm" @click='confirm'>确认</span>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/variable.less';
	.dialog-login-wrapper-outer{
		position: fixed;
		z-index: 20;
		.top(0);
		.left(0);
		.right(0);
		.bottom(0);
		text-align: center;
		background: rgba(0, 0, 0, .7);
		.dialog-login-wrapper{
			position: absolute;
			.width(540);
			.height(400);
			.top(200);
			.right(50);
			.border-radius(10);
			background: #fff;
			.title-wrapper{
				.font-size(30);
				.margin-top(80);
				color: #807691;
				.title{
					text-align: left;
					.padding-left(80);
				}
				.icon{
					position: absolute;
					display: inline-block;
					.width(110);
					.height(110);
					.padding-top(15);
					.top(-55);
					.left(215);
					background: #483c62;
					.border-radius(50%);
					text-align: center;
					.bg-icon{
						display: inline-block;
						.width(30);
						.height(80);
						background: url(../img/bg-icon.png) 0 0 no-repeat;
						.background-position(5, -148);
						.background-size(400, 1500);
					}
				}
			}
			.input-wrapper{
				.margin-top(20);
				input{
					display: inline-block;
					.width(480);
					.height(70);
					.border(1, solid, #bfb0e9);
					.border-radius(10);
					.padding-left(24);
					outline: 0;
				}
				.err{
					.font-size(20);
					text-align: left;
					.padding-left(40);
					color: red;
				}
			}
			.btn-wrapper{
				position: absolute;
				.left(30);
				.bottom(20);
				.width(480);
				.height(70);
				.font-size(0);
				span{
					display: inline-block;
					.width(220);
					.height(70);
					.line-height(60);
					.font-size(28);
					color: #fff;
					background: green;
					.border-radius(10);
					&.close{
						float: left;
						background: #7688ba;
						.border-top(1, solid, #b8bdda);
						.border-bottom(5, solid, #5b6aa1);
					}
					&.confirm{
						float: right;
						background: #967bdc;
						.border-top(1, solid, #c6b8ed);
						.border-bottom(5, solid, #7e64c5);
					}
				}
			}
		}
	}
</style>

<script type="text/javascript">
	import { mapMutations } from 'vuex'; 
	import md5 from '../lib/md5'
	export default {
		name: 'login-dialog',
		data() {
			return {
				password: '',
				err: false,
			}
		},

		methods: {
			...mapMutations({
				setType: 'CHANGETYPE',
				setTealToken: 'CHANGETEALTOKEN',
				setIsShowLogin: 'ISSHOWLOGIN',
			}),

			close() {
				this.setType('demo');
				this.cookie.set('type', 'demo');
				this.setTealToken('');
    			this.cookie.expire('real_token');
    			this.setIsShowLogin(false);
			},

			confirm() {
				this.ajax({
					url: 'v1/user/real/tradepassword/verify/',
					type: 'POST',
					data: {
						access_token: this.cookie.get('token'),
						password: md5(this.password),
					}
				}).then((data)=> {
    				data = data.data;
    				if (data.status == 200) {
    					this.setType('real');
    					this.cookie.set('type', 'real');
    					this.cookie.set('real_token',data.data.real_token, {
    						expires: 60*60*60,
    					});
    					this.setTealToken(data.data.real_token);
    				} else {
    					this.err = true;
    				}
				})
			}
		},

		computed: {
			realToken() {
				const real_token = this.$store.state.real_token;
				const isShowLogin = this.$store.state.isShowLogin;
				if (!real_token && isShowLogin) {
					return true;
				} else {
					return false;
				}
			}
		}
	}

</script>