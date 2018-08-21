let Util = {};
Util.EXCEPTION = {
    WRONG_POKER_TYPE: "错误牌型",
    NOT_SAME_TYPE: "牌型不一致",
    CANNOT_FOLLOW:"不能跟牌"
};
Util.pokerType = {
    'a': 'dan',
    'b': 'dui',
    'c': 'san',
    'd': 'zhadan',
    'da': 'si',
    'db': 'si',
    'dc': 'si',
    'aaaaa': 'shunzi',
    'bbb': 'liandui',
    'ca': 'sandaiyi',
    'cb': 'sandaiyi',
    'cc': 'feiji',
    'ccaa': 'feiji',
    'ccbb': 'feiji',
    'ccc': 'feiji',
    'cccaaa': 'feiji',
    'cccbbb': 'feiji',
    'cccc': 'feiji',
    'ccccaaaa': 'feiji',
    'ccccbbbb': 'feiji',
    'ccccc': 'feiji',
    'cccccaaaa': 'feiji',
    'cccccc': 'feiji',
};
Util.pokerGrade = {
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    10: 8,
    J: 9,
    Q: 10,
    K: 11,
    A: 12,
    2: 13,
    g: 14,
    G: 15,
};
Util.rnd = function (x, y) {
    return Math.floor(Math.random() * (x - y + 1) + x);
};
Util.gradeDown = function (poker1, poker2) {
    return Util.pokerGrade[poker2['showTxt']] - Util.pokerGrade[poker1['showTxt']];
};
Util.gradeUp = function (poker1, poker2) {
    return Util.pokerGrade[poker1['showTxt']] - Util.pokerGrade[poker2['showTxt']];
};
Util.isRightOrder = function (pokerShowTxtArray) {//判断是否为公差为1的等差数列
    for (let i = 0; i < pokerShowTxtArray.length - 1; i++) {
        if (Util.pokerGrade[pokerShowTxtArray[i + 1]] - Util.pokerGrade[pokerShowTxtArray[i]] != 1) {
            return false;
        }
    }
    return true;
};
//整理牌并显示在合适的位置
Util.neatenPoker=function (pokerNode, seatPosParam, showWidth, startX) {
    if (pokerNode.length < 1) { return; }
    var pokerNum = pokerNode.length;
    var needWidth = (pokerNum - 1) * seatPosParam.disBetween + pokerNode[0].getComponent('PokerControl').node.width * seatPosParam.pokerScale;
    showWidth = showWidth || cc.director.getWinSize.width;
    var startPosX = 0 - needWidth / 2;
    startX = startX || startPosX;
    for (var i = 0; i < pokerNode.length; i++) {
        var x = startX + i * seatPosParam.disBetween + pokerNode[0].getComponent('PokerControl').node.width * seatPosParam.pokerScale * 0.5;
        var y = seatPosParam.positionY;
        pokerNode[i].setPosition(cc.v2(x, y));

    }
},
module.exports = Util;