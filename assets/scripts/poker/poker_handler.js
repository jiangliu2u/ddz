const PokerTypeHandler = require('./poker_type_handler');
const Util = require('../common/util');

function PokerMap() {//统计各种牌的数量
    this.size();
}

PokerMap.prototype.size = function () {
    var size = 0;
    for (var i in this) {
        if ('size' != i) {
            size++;
        }
    }
    return size;
};

//出的一手牌的包装类，包括牌型，数量以及开始的牌大小
function PokerWrapper(pokerList) {
    this.size = pokerList.length;
    this.srcPoker = pokerList;
    this.headValue;
    this.pokerType;
}

PokerWrapper.prototype.follow = function (targetPokerList) {
    if (this.pokerType == 'wangzha') {
        return true;
    }
    let targetWrapper = new PokerPlay().getPokerWrapper(targetPokerList);
    console.log("this.headValue  "+this.headValue);
    console.log("targetWrapper.headValue  " + targetWrapper.headValue);
    console.log(this.pokerType +' type '+ targetWrapper.pokerType);
    console.log(this.size +' size '+ targetWrapper.size);
    console.log(this.headValue > targetWrapper.headValue);
    if ((this.pokerType === targetWrapper.pokerType) && (this.size === targetWrapper.size) && (this.headValue > targetWrapper.headValue)) {
        return true;
    } else {
        return false;
    }
};

function PokerPlay() {
}

PokerPlay.prototype.getPokerWrapper = function (pokerList) {
    pokerList.sort(Util.gradeUp);//按照Util里定义的牌大小从小到大排序
    if (!pokerList || pokerList.length == 0)
        throw 'wrong poker length';
    let pokerWrapper = new PokerWrapper(pokerList);
    if (pokerList.length == 2 && (pokerList[0] >> 4) == 4 && (pokerList[1] >> 4) == 5) {
        pokerWrapper.headValue = 'g';
        pokerWrapper.pokerType = "wangzha";
        return pokerWrapper;
    }
    let pokerMap = new PokerMap();
    for (let i = 0; i < pokerList.length; i++) {
        let poker = pokerList[i];
        let count = pokerMap[poker & 15];//不同数值牌的数量
        if (!count) {
            count = 0;
        }
        pokerMap[poker & 15] = ++count;
    }
    let countList = [];// 每张相同牌值的数量数组
    for (let pokerValue in pokerMap) {
        if (pokerValue != 'size')
            countList.push(pokerMap[pokerValue]);
    }
    //倒序
    countList.sort(function (a, b) {
        return b - a;
    });

    let type = '';
    for (let i = 0; i < countList.length; i++) {
        var count = countList[i];
        if (count > 4)
            throw 'wrong poker type';

        type += count + '';
    }
    console.log(type);
    type = type.replace(/1/g, 'a');
    type = type.replace(/2/g, 'b');
    type = type.replace(/3/g, 'c');
    type = type.replace(/4/g, 'd');
    // 处理顺子，可能大于5个，使等于5个
    let pattern = /a+/g;
    let array = pattern.exec(type);
    if (array && array[0].length === type.length && type.length > 5)
        type = 'aaaaa';

    // 处理连对，大于3对时使其等于3对
    let pattern2 = /b+/g;
    let array2 = pattern2.exec(type);
    if (array2 && array2[0].length === type.length && type.length > 3)
        type = 'bbb';
    console.log('type:' + type);
    pokerWrapper.pokerType = Util.pokerType[type];
    let pokerTypeHandler = new PokerTypeHandler();
    try {
        return pokerTypeHandler[Util.pokerType[type]](pokerMap, pokerWrapper);
    }
    catch (err) {
        console.log(err);
        // throw Util.EXCEPTION.WRONG_POKER_TYPE;
    }
};
module.exports = PokerPlay;


