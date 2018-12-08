const config = require('./config');
const Util = require('./util');
let PokerData = {};
PokerData.cardNo = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'g', 'G'];//g小王，G大王
PokerData.showData = [];//定义整副扑克
PokerData.setPokerData = function () {//生成整副扑克
    for (let i = 0; i < PokerData.cardNo.length; i++) {
        if (i < PokerData.cardNo.length - 2) {
            for (let key in config.pokerCardType) {
                let pokerDataItem = {
                    showTxt: PokerData.cardNo[i],
                    showType: config.pokerCardType[key]
                };
                PokerData.showData.push(pokerDataItem);
            }
        } else {
            if (i == 13) {
                let pokerDataItem = {
                    showTxt:PokerData.cardNo[i],
                    showType: config.jokerType.joker
                };
                PokerData.showData.push(pokerDataItem);

            } else if (i == 14) {
                let pokerDataItem = {
                    showTxt: PokerData.cardNo[i],
                    showType: config.jokerType.JOKER
                };
                PokerData.showData.push(pokerDataItem);

            }
        }
    }
};
PokerData.getPokerData = function () {
    return PokerData.showData;//获取整副扑克
};


PokerData.bodyPokerData = [];//定义所有玩家的扑克组合，一人20张，其余两人17张
PokerData.partCards = function () {
    let threePlayers=[];
    let copyPokerData = PokerData.showData;
    for (let i = 0; i < 2; i++) {//生成2个17张的扑克组合并放入3个玩家扑克的数组中
        let bodyPokerDataItem = [];
        for (let j = 0; j < 17; j++) {
            let num = Math.floor(Math.random() * (copyPokerData.length));//随机抽取
            let pokerData = copyPokerData[num];
            bodyPokerDataItem.push(pokerData);
            copyPokerData.splice(num, 1);//删除抽取的元素
        }
        // PokerData.bodyPokerData.push(bodyPokerDataItem);
        threePlayers.push(bodyPokerDataItem);
    }
    threePlayers.push(copyPokerData);//把剩余的20张放入3个玩家扑克数组中，20张的为地主
    for (let i = 0; i < PokerData.bodyPokerData.length; i++) {//排序
        //PokerData.bodyPokerData[i].sort(Util.gradeDown);
        threePlayers[i].sort(Util.gradeDown);
    }
    return threePlayers;
};
PokerData.getPartCardsData = function () {
    return PokerData.bodyPokerData;
};
PokerData.load = function () {
    PokerData.setPokerData();
    //PokerData.partCards();
};
module.exports = PokerData;
