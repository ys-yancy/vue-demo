import Focha from '../lib/focha';

module.exports = {
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  getUnit: function(num) {
    var num = parseFloat(num),
      unit = 0;

    while (num < 1) {
      num *= 10;
      unit++;
    }

    return unit;
  },

  getTime: function(timestr, pattern) {
    return Focha.parse(timestr, pattern || 'YYYY-MM-DD HH:mm:ss').getTime();
  },

  formateDate: function(time, forate) {
    var date = new Date(time);
    return Focha.format(date, forate || 'YYYY-MM-DD HH:mm:ss');
  },

  getDate: function(time) {
    var date = new Date(time || Date.now());
    return Focha.format(date, 'YYYY-MM-DD');
  },

  getStrLen: function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      //单字节加1 
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }

    return len;
  },


  /** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
      可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
      Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
   * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
   * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
   * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
   * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
   */
  formateTime: function(time, fmt) { //author: meizz 
    var date = new Date(time);
    var o = {
      "M+": date.getMonth() + 1, //月份         
      "d+": date.getDate(), //日         
      "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
      "H+": date.getHours(), //小时         
      "m+": date.getMinutes(), //分         
      "s+": date.getSeconds(), //秒         
      "q+": Math.floor((date.getMonth() + 3) / 3) //季度         
        // "S": date.getMilliseconds() //毫秒         
    };
    var week = {
      "0": "/u65e5",
      "1": "/u4e00",
      "2": "/u4e8c",
      "3": "/u4e09",
      "4": "/u56db",
      "5": "/u4e94",
      "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },

  isWeixin: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },

  isZhifubao: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/AlipayClient/i) == 'alipayclient') {
      return true;
    } else {
      return false;
    }
  },

  isAndroid: function() {
    var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  },

  isIOS: function() {
    var u = navigator.userAgent;
    return u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1;
  },

  isDaily: function() {
    return location.host.indexOf('localhost') !== -1 || location.host.indexOf('waibao.') !== -1;
  },

  supportWebsocket: function() {
    var protocol = 'https:' == location.protocol ? 'wss' : 'ws',
      protoBin;

    if ('WebSocket' in window) {
      if (protoBin = 'binaryType' in WebSocket.prototype) {
        return protoBin;
      }
      try {
        return !!(new WebSocket(protocol + '://.').binaryType);
      } catch (e) {}
    }

    return false;

  },

  mixin: function(...list) {
    if (typeof Object.assign != 'function') {
      Object.assign = function(target) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source != null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
    }
    return function(target) {
      Object.assign(target.prototype, ...list)
    };
  }
};
