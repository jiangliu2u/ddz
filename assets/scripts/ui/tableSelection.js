"use strict";
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
exports.__esModule = true;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var tableSelection = /** @class */ (function (_super) {
    __extends(tableSelection, _super);
    function tableSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tableId = null;
        return _this;
        // update (dt) {}
    }
    tableSelection.prototype.onLoad = function () {
        this.tableId.string = '',
        ;
    };
    tableSelection.prototype.start = function () {
    };
    tableSelection.prototype.one = function () {
        this.tableId.string += 1;
    };
    tableSelection.prototype.two = function () {
        this.tableId.string += 2;
    };
    tableSelection.prototype.three = function () {
        this.tableId.string += 3;
    };
    tableSelection.prototype.four = function () {
        this.tableId.string += 4;
    };
    tableSelection.prototype.five = function () {
        this.tableId.string += 5;
    };
    tableSelection.prototype.six = function () {
        this.tableId.string += 6;
    };
    tableSelection.prototype.seven = function () {
        this.tableId.string += 7;
    };
    tableSelection.prototype.eight = function () {
        this.tableId.string += 8;
    };
    tableSelection.prototype.nine = function () {
        this.tableId.string += 9;
    };
    tableSelection.prototype.zero = function () {
        this.tableId.string += 0;
    };
    tableSelection.prototype.clear = function () {
        this.tableId.string = '';
    };
    tableSelection.prototype["delete"] = function () {
        this.tableId.string.substring(-1, this.tableId.string.length - 1);
    };
    __decorate([
        property(cc.Label)
    ], tableSelection.prototype, "tableId");
    tableSelection = __decorate([
        ccclass
    ], tableSelection);
    return tableSelection;
}(cc.Component));
exports["default"] = tableSelection;
