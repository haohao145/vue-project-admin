export default {
    //获取两个时间段之间有多少天
    getDateDif(fd, sd) {
        //开始时间
        let firstDate = new Date(fd)
        //结束时间
        let secondDate = new Date(sd)
        let diff = Math.abs(firstDate.getTime() - secondDate.getTime())
        let result = parseInt(diff / (1000 * 60 * 60 * 24))
        return result
    },
    //获取年月日
    formatDate(date) {
        let d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()
        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day
        return [year, month, day].join('/')
    },
    // 获取年月日 时分秒
    formatChinaDate(date) {
        let d = new Date()
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()
        let hour = d.getHours() < 10 ? '0'+ d.getHours() : d.getHours()
        let min = d.getMinutes() < 10 ? '0'+ d.getMinutes() : d.getMinutes()
        let sec = d.getSeconds() < 10 ? '0'+ d.getSeconds() : d.getSeconds()
        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day
        return year + '年' + month + '月' + day + '日    ' + hour + ':' + min + ':' + sec
    },

    formatDateCostomer(date, fenge) {
        let d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()
        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day
        return [year, month, day].join(fenge)
    },
    deepClone(obj) {
        var oType = this.getObjectType(obj)
        // eslint-disable-next-line eqeqeq
        if (oType == 'Object') {
            var result = {}
            for (let key in obj) {
                result[key] = this.deepClone(obj[key])
            }
            return result
            // eslint-disable-next-line eqeqeq
        } else if (oType == 'Array') {
            // eslint-disable-next-line no-redeclare
            var result = []
            for (var i = 0; i < obj.length; i++) {
                result[i] = this.deepClone(obj[i])
            }
            return result
        } else {
            return obj
        }
    },

    //时间戳转换 时间
    dateFormat: function(tt) {
        var t = new Date(tt); //row 表示一行数据, updateTime 表示要格式化的字段名称
        var month = t.getMonth() + 1,
          day = t.getDate(),
          hour = t.getHours(),
          min = t.getMinutes(),
          sec = t.getSeconds();
        var newTime =
          (month < 10 ? "0" + month : month) +
          "-" +
          (day < 10 ? "0" + day : day) +
          " " +
          (hour < 10 ? "0" + hour : hour) +
          ":" +
          (min < 10 ? "0" + min : min) +
          ":" +
          (sec < 10 ? "0" + sec : sec);
        return newTime;
      },

    getObjectType(o) {
        if (o === null) return 'Null'
        if (o === undefined) return 'Undefined'
        return Object.prototype.toString.call(o).slice(8, -1)
    },
    numberThousandFmt: function (num) {

        try {
            if (num > 10000) {
                num = this.fomatFloat(num / 1000, 1) + 'K'
            }
        } catch (e) {
            return '0'
        }
        return num
    },
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 32; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";

        this.uuidA = s.join("");
        console.log(s.join(""), 's.join("")');
        return this.uuidA;
    },
    //判断浏览器的类型
    myBrowser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1
                && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1
                && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
                && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return "IE7";
            } else if (fIEVersion == 8) {
                return "IE8";
            } else if (fIEVersion == 9) {
                return "IE9";
            } else if (fIEVersion == 10) {
                return "IE10";
            } else if (fIEVersion == 11) {
                return "IE11";
            } else {
                return "0";
            }//IE版本过低
            return "IE";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isEdge) {
            return "Edge";
        }
        if (isFF) {
            return "FF";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
        
    }
}
