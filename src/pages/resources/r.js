
//配置appid
const getWXAppid = () => {
	return 'wxf587c0d17e265b55'
}

// 微信分享域名
const getWXDomainWL = () => {
	return 'http://t.invhero.com/';
}

// 微信分享ICON
const getWXIconWL = () => {
	return 'http://t.invhero.com/img/share.jpg';
}

// 微信每日推荐分享标题
const getWXRecommendTitleWL = () => {
	return '投资英豪今日投资推荐 ';
}

// 微信每日推荐分享描述
const getWXRecommendDesWL = () => {
	return '投资英豪为您汇总最优秀的交易信号, 助您投资收益迅速翻番!';
}

// 微信每日推荐分享链接
const getWXRecommendLinkWL = () => {
	return 'http://t.invhero.com/s/weixin/recommend.html';
}

// 微信邀请好友图片
const getWXInviteImgUrlWl = () => {
	return 'http://t.invhero.com/img/share.jpg'
}

// 微信邀请好友标题
const getWXInviteTitleWL = () => {
	return '%s 在投资英豪赚的太嗨，送美金给你，注册后立即到账！';
}

// 微信邀请好友描述
const getWXInviteDesWL = () => {
	return '盛大集团旗下投资英豪，注册就送美金助你投资全球，盈利分分钟可提现！';
}

// 微信邀请好友链接, 把source写死在链接里, 只需要提供refer
const getWXInviteUrlWL = () => {
	return 'http://t.invhero.com/s/my/guides.html?inviteCode=';
}

// 微信转发标题
const getWXRepostTitleWL = () => {
	return ' 在投资英豪赚的太嗨，送美金给你，注册后立即到账！';
}

// 微信转发描述
const getWXRepostDesWL = () => {
	return '盛大集团旗下投资英豪，注册就送美金助你投资全球，盈利分分钟可提现！';
}

// 微信当前订单描述
const getWXCurrentDesWL = () => {
	return '盛大集团旗下投资英豪，注册就送美金助你投资全球，盈利分分钟可提现！';
}

// 微信历史订单描述
const getWXHistoricalDesWL = () => {
	return '盛大集团旗下投资英豪，注册就送美金助你投资全球，盈利分分钟可提现！';
}

// 默认头像
const getDefaultIconWL = () => {
	return 'http://t.invhero.com/img/wl/invhero_avatar.png';
}

// 白标标识
const getWXWL = () => {
	return 'tzyh365';
}

// 白标商家名称
const getWLName = () => {
	return '投资英豪';
}

// 登录页面链接
const getLoginWL = () => {
	return './login.html';
}

// 使用的交易UI
const getTradeUI = () => {
	return '';
}

// 是否允许修改订单 (二元交易UI不允许修改订单)
const getAllowModify = () => {
	return true;
}

// 是否允许搜索品种
const getAllowSearch = () => {
	return true;
}

// option页面左上角的帮助链接 
const getHelpLink = () => {
	return 'http://weixin.invhero.com/help';
}

// 注册赠金
const getRegBonus = () => {
	return 5;
}

// 受邀注册赠金
const getInviteRegBonus = () => {
	return 5;
}

//分享赠金
const getShareRegBonus = () => {
	return 20
}

// 默认昵称前缀, 要带一个空格
const getDefaultNicknamePrefix = () => {
	return '英豪_';
}

// 默认交易 UI
const getDefaultTradingUI = () => {
	// 专业交易
	// return 4;
	// 极速交易
	return 6;
}

//正式环境域名
const getFormalEnvironmentUrl = () => {
	return 'http://api.invhero.com';
}

//生产服ajax
const getProduClothedUrl = () => {
	return 'http://newapi.invhero.com';
}


//本地(其他)头像前缀
function getNativePlaceUrl() {
	return '//static.invhero.com/';
}

//获取价格 v1/price
function getPriceV1Url() {
	return 'http://price.invhero.com/v1/price/current';
}

//获取价格v2/price
function getPriceV2Url() {
	return 'http://price.invhero.com/v2/price/current';
}

//蜡烛图url
function getCandleUrl() {
	return 'http://price.invhero.com/v3/price/candle';
}

//获取Symbols(get)
function getSymbolUrl() {
	return 'http://price.invhero.com/v2/symbol/snapshot?'
}

//stomp 报价Url
function getRtpriceSompUrl() {
	return 'ws://rtprice.invhero.com:61613/stomp';
}

//帮助详情页链接
function getHelpHtmlUrl() {
	return 'http://weixin.invhero.com/help.html';
}

//微信每日推荐
function getWxTodayRecommendUrl() {
	return '//weixin.invhero.com/api/today_recommend/add';
}

//百度统计代码
function getBaiduCodeScript() {
	return '<script>var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "//hm.baidu.com/hm.js?a8ffcb5e37d87812824192f2af23e6ee";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();</script>';
}