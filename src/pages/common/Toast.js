/**
 * @param res 处理结果 成功: success 失败: error;
 * @param content 输出的内容;
 * @param time 时长
 */
class Toast {
	constructor(res, content, time = 2) {
		this._r = res;
		this._c = content;
		this._t = time * 1000; //单位 s
		this.init();
	};

	init() {
		this.show();
		this.timer = setTimeout( () => {
           this.hide();
        }, this._t);
	};

	show() {
		if (this.timer) clearTimeout(this.timer);

		let infoCon = document.createTextNode(this._c),
			toastCon = document.createElement('div');
		toastCon.className = 'toast-wrapper ' + this._r;
		toastCon.appendChild(infoCon);
		document.body.appendChild(toastCon);
		this.toastCon = toastCon;
	};

	hide() {
		if ( this.toastCon ) {
			document.body.removeChild(this.toastCon);
		}
	}
}

module.exports = Toast;