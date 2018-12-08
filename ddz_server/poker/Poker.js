const config = require('./config');
const Util = require('./util');
// let PokerData = {};
let cardNo = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'g', 'G'];//g小王，G大王
let setPokerData = function () {//生成整副扑克
    let allpokers = [];//定义整副扑克
    for (let i = 0; i < cardNo.length; i++) {
        if (i < cardNo.length - 2) {
            for (let key in config.pokerCardType) {
                let pokerDataItem = {
                    showTxt: cardNo[i],
                    showType: config.pokerCardType[key]
                };
                allpokers.push(pokerDataItem);
            }
        } else {
            if (i == 13) {
                let pokerDataItem = {
                    showTxt: cardNo[i],
                    showType: config.jokerType.joker
                };
                allpokers.push(pokerDataItem);

            } else if (i == 14) {
                let pokerDataItem = {
                    showTxt: cardNo[i],
                    showType: config.jokerType.JOKER
                };
                allpokers.push(pokerDataItem);

            }
        }
    }
    return allpokers;
};
// PokerData.getPokerData = function () {
//     return allpokers;//获取整副扑克
// };


let partCards = function (allpokers) {
    let bodyPokerData = [];//定义所有玩家的扑克组合，一人20张，其余两人17张
    let threePlayers = [];
    let copyPokerData = allpokers;
    for (let i = 0; i < 2; i++) {//生成2个17张的扑克组合并放入3个玩家扑克的数组中
        let bodyPokerDataItem = [];
        for (let j = 0; j < 17; j++) {
            let num = Math.floor(Math.random() * (copyPokerData.length));//随机抽取
            let pokerData = copyPokerData[num];
            bodyPokerDataItem.push(pokerData);
            copyPokerData.splice(num, 1);//删除抽取的元素
        }
        // bodyPokerData.push(bodyPokerDataItem);
        threePlayers.push(bodyPokerDataItem);
    }
    threePlayers.push(copyPokerData);//把剩余的20张放入3个玩家扑克数组中，20张的为地主
    for (let i = 0; i < threePlayers.length; i++) {//排序
        //bodyPokerData[i].sort(Util.gradeDown);
        threePlayers[i].sort(Util.gradeDown);
    }
    return threePlayers;
};
// PokerData.getPartCardsData = function () {
//     return bodyPokerData;
// };
// PokerData.load = function () {
//     PokerData.setPokerData();
//     //PokerData.partCards();
// };
function PokerData(){
    this.partcards=null;
}
PokerData.prototype.setPart=function(){
    let a = setPokerData();
    this.partcards = partCards(a);
    console.log('set part');
}
module.exports = PokerData;
