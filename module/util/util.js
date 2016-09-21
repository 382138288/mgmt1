/**
 * Created by lucha on 6/2/2016.
 */

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

function numToChinese(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
        return "invalid data!";
    }
    var unit = "千百十亿千百十万千百十 ", str = "";
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++) {
        str += '零一二三四五六七八九'.charAt(n.charAt(i)) + unit.charAt(i);
    }
    return str;
}

function dateToStr(datetime) {
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minutes = datetime.getMinutes();
    var second = datetime.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second;
    }

    var time = year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second; //2009-06-12 17:18:05
    return time;
}

function getDateForStringDate(strDate) {
    var s = strDate.split(" ");
    var s1 = s[0].split("-");
    var s2 = s[1].split(":");
    if (s2.length == 2) {
        s2.push("00");
    }
    return new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], s2[2]);
}

/**
 * Created by lica on 6/12/2016.
 */
function Map() {
    this.container = new Object();
}

Map.prototype.put = function (key, value) {
    this.container[key] = value;
}

Map.prototype.get = function (key) {
    return this.container[key];
}

Map.prototype.putAll = function (map) {
    for (var key in map.container) {
        if (key == 'extend') {
            continue;
        }
        this.container[key] = map.container[key];
    }
}

Map.prototype.entrySet = function () {
    var set = new Array();

    function Entry() {
        this.entry = new Object();
    }

    Entry.prototype.getKey = function () {
        for (var key in this.entry) {
            if (key == 'extend') {
                continue;
            }
            return key;
        }
    }

    Entry.prototype.getValue = function () {
        for (var key in this.entry) {
            if (key == 'extend') {
                continue;
            }
            return this.entry[key];
        }
    }

    for (var key in this.container) {
        var entry = new Entry();
        if (key == 'extend') {
            continue;
        }
        entry.entry[key] = this.container[key];
        set.push(entry);
    }
    return set;
}

Map.prototype.keySet = function () {
    var keySet = new Array();
    var count = 0;
    for (var key in this.container) {
        // 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        keySet[count] = key;
        count++;
    }
    return keySet;
}

Map.prototype.values = function () {
    var values = new Array();
    for (var key in this.container) {
        if (key == 'extend') {
            continue;
        }
        values.push(this.container[key]);
    }
    return values;
}

Map.prototype.isEmpty = function () {
    var flag = true;
    for (var key in this.container) {
        if (key == 'extend') {
            continue;
        }
        flag = false;
        break;
    }
    return flag;
}

Map.prototype.size = function () {
    var count = 0;
    for (var key in this.container) {
        // 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        count++;
    }
    return count;
}

Map.prototype.remove = function (key) {
    delete this.container[key];
}

Map.prototype.clear = function () {
    for (var key in this.container) {
        if (key == 'extend') {
            continue;
        }
        delete this.container[key];
    }
}

Map.prototype.clone = function () {
    var cloneObj = new Map();
    cloneObj.putAll(this);
    return cloneObj;
}

Map.prototype.toString = function () {
    var str = "";
    for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
        str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
    }
    return str;
}