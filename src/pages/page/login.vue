<template>
	<div class="login">
		<form>
			<div class="phone-wrap">
				<input type="number" name="" v-model='phone' placeholder="请输入手机号">
			</div>
			<div class="password-wrap">
				<input type="number" name="" v-model='password'  placeholder="请输入登录密码">
			</div>
			<div class="btn-wrap">
				<input type="submit" name="" value="登录" @click.stop.prevent='submit'>
			</div>
		</form>
	</div>
</template>

<style lang="less">
	@import '../style/variable.less';
	.login{
		background: red;
		.width(640);
		.height(1136);
		background: url('../img/login-bg.jpg');
		form{
			.height(800);
			.padding-top(800); 
			div{
				text-align: center;
				input{
					.width(350);
					.height(55);
					.border-bottom(1px, solid, #967BDB);
					.border-radius(8);
				}
				&.phone-wrap{
					.margin-bottom(30);
				}
				&.btn-wrap{
					input{
						background-color: green;
						.margin-top(50);
						border: none;
						.border-bottom(1px, solid, #967BDB);
						.border-radius(10);
					}
				}
			}
		}
	}
	
</style>

<script type="text/javascript">
	import { mapMutations } from 'vuex'
	export default {
		name: 'login',

		data() {
			return{
				// phone: 'qqqqqqqqqqqqqq',
				// password: '',
			}
		},

		methods: {
			...mapMutations([
				'ISLOGIN',
			]),
			submit() {
				this.ajax({
					url: 'v1/user/login',
					type: 'POST',
					data: {
						phone: this.phone,
	                	password: this.password,
	                	cc: 86
					},
				}).then((data)=> {
					if ( data.data.status == 200 ) {
						this.ISLOGIN(data.data);

						this.cookie.set('token', data.data.data.token, {
							expires: Infinity,
						});

						this.cookie.set('phone', data.data.data.phone, {
							expires: Infinity,
						});

						this.cookie.set('uuid', data.data.data.uuid, {
							expires: Infinity,
						});

						this.cookie.set('inviteCode', data.data.data.invite_code, {
							expires: Infinity,
						});

						this.cookie.set('wl', data.data.data.wl, {
							expires: Infinity,
						});

						this.cookie.set('type', 'demo');

						this.$store.dispatch('getOptionList', {
							access_token: data.data.data.token,
						});

						this.$router.push({ path: 'option' });
					}
				})
			}
		}
	}
</script>