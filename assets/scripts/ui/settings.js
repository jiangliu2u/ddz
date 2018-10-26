"use strict";
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.musicSwitch = null;
        _this.soundSwitch = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.musicSwitch = cc.find("Canvas/settings/music/switch");
            _this.soundSwitch = cc.find("Canvas/settings/sound/switch");
            resolve();
        });
    };
    NewClass.prototype.switchMusic = function () {
        if (this.musicSwitch.getComponent(cc.Toggle).isChecked) {
            cc.log("打开音乐");
        }
        else {
            cc.log("关闭音乐");
        }
    };
    NewClass.prototype.switchSound = function () {
        if (this.soundSwitch.getComponent(cc.Toggle).isChecked) {
            cc.log("打开音效");
        }
        else {
            cc.log("关闭音效");
        }
    };
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        var _this = this;
        this.init().then(function () {
            _this.musicSwitch.getComponent(cc.Toggle).node.on('toggle', _this.switchMusic, _this);
            _this.soundSwitch.getComponent(cc.Toggle).node.on('toggle', _this.switchSound, _this);
        });
    };
    NewClass.prototype.start = function () {
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "musicSwitch", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "soundSwitch", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;
