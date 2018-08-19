const Util = require('Util');
function PokerTypeHandler() {
}

PokerTypeHandler.prototype.dan = function (map, wrapper) {
    for (let i in map) {
        if (i != 'size') {
            wrapper.headValue = i;
        }
    }
    return wrapper;
};

PokerTypeHandler.prototype.dui = function (map, wrapper) {
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
PokerTypeHandler.prototype.shunzi = function (map, wrapper) {
    let valueList = [];
    for (let i in map) {
        if (i == 'size') {
            continue;
        }
        valueList.push(i);
    }
    console.log('valuelist:' + JSON.stringify(valueList));
    if (Util.isRightOrder(valueList)) {

        wrapper.headValue = valueList[0];
        return wrapper;
    } else {
        throw Util.EXCEPTION.WRONG_POKER_TYPE;
    }
};

//map: {"10":2,"J":2,"Q":3,"K":3}
PokerTypeHandler.prototype.liandui = function (map, wrapper) {
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        valueList.push(pvalue);
    }
    console.log('valueList:' + JSON.stringify(valueList));
    if (Util.isRightOrder(valueList)) {

        wrapper.headValue = valueList[0];
        return wrapper;
    } else {
        throw Util.EXCEPTION.WRONG_POKER_TYPE;
    }
};

PokerTypeHandler.prototype.feiji = function (map, wrapper) {
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        if (map[pvalue] == 3) {
            valueList.push(pvalue);
        }
    }
    if (Util.isRightOrder(valueList)) {

        wrapper.headValue = valueList[0];
        return wrapper;
    } else {
        throw Util.EXCEPTION.WRONG_POKER_TYPE;

    }
};

PokerTypeHandler.prototype.zhadan = function (map, wrapper) {
    let valueList = [];
    for (let pvalue in map) {
        if (pvalue == 'size')
            continue;
        valueList.push(pvalue);
    }
    wrapper.headValue = valueList[0];
    return wrapper;
};
PokerTypeHandler.prototype.san = function (map, wrapper) {
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