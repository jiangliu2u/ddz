const Util = require('../common/util');
function PokerTypeHandler() {
}

PokerTypeHandler.prototype.dan = function (map, wrapper) {
    console.log('单张');
    for (let i in map) {
        if (i != 'size') {
            wrapper.headValue = i;
        }
    }
    return wrapper;
};

PokerTypeHandler.prototype.dui = function (map, wrapper) {
    console.log('一对');
    let valueList = [];
    for (let i in map) {
        if (i == 'size') {
            continue;
        }
        valueList.push(i);
    }
    wrapper.headValue = valueList[0];
    return wrapper;

};
PokerTypeHandler.prototype.san = function (map, wrapper) {
    console.log('三个');
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        valueList.push(pvalue);
    }
    for (let pvalue in map) {
        if (map[pvalue] == 3) {
            wrapper.headValue = pvalue;
            break;
        }
    }
    return wrapper;

};
PokerTypeHandler.prototype.shunzi = function (map, wrapper) {
    console.log("顺子");

    let valueList = [];
    for (let i in map) {
        if (i == 'size') {
            continue;
        }
        valueList.push(i);
    }
    console.log(valueList);
    if (parseInt(valueList[valueList.length - 1]) < 12) {
        if (Util.isRightOrder(valueList)) {
            wrapper.headValue = valueList[0];
            return wrapper;
        } else {
            console.log("不是等差数列");
            throw Util.EXCEPTION.WRONG_POKER_TYPE;
        }
    } else {
        throw Util.EXCEPTION.WRONG_POKER_TYPE;
    }

};

//map: {"10":2,"J":2,"Q":3,"K":3}
PokerTypeHandler.prototype.liandui = function (map, wrapper) {
    console.log("连对");
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        valueList.push(pvalue);
    }
    console.log(valueList);
    if (parseInt(valueList[valueList.length - 1]) < 12) {
        if (Util.isRightOrder(valueList)) {
            wrapper.headValue = valueList[0];
            return wrapper;
        } else {
            console.log("不是等差数列");
            throw Util.EXCEPTION.WRONG_POKER_TYPE;
        }
    } else {
        throw Util.EXCEPTION.WRONG_POKER_TYPE;

    }
};

PokerTypeHandler.prototype.feiji = function (map, wrapper) {
    console.log("飞机");
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        if (map[pvalue] == 3) {
            valueList.push(pvalue);
        }
    }
    if (parseInt(valueList[valueList.length - 1]) < 12) {
        if (Util.isRightOrder(valueList)) {
            wrapper.headValue = valueList[0];
            return wrapper;
        } else {
            console.log("不是等差数列");
            throw Util.EXCEPTION.WRONG_POKER_TYPE;

        }
    } else {
        console.log("顺子最大D是数字应该小于2");
        throw Util.EXCEPTION.WRONG_POKER_TYPE;
    }
};

PokerTypeHandler.prototype.zhadan = function (map, wrapper) {
    console.log('炸弹');
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        valueList.push(pvalue);
    }
    wrapper.headValue = valueList[0];
    return wrapper;
};

PokerTypeHandler.prototype.sandaiyi = function (map, wrapper) {
    console.log('三带一');
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        valueList.push(pvalue);
    }
    for (let pvalue in map) {
        if (map[pvalue] == 3) {
            wrapper.headValue = pvalue;
            break;
        }
    }
    return wrapper;
};
PokerTypeHandler.prototype.si = function (map, wrapper) {
    let valueList = [];
    console.log('四带一');
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        valueList.push(pvalue);
    }
    for (let pvalue in map) {
        if (map[pvalue] == 4) {
            wrapper.headValue = pvalue;
            break;
        }
    }
    return wrapper;
};
module.exports = PokerTypeHandler;