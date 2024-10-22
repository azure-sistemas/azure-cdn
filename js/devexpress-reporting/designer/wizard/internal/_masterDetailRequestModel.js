﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_masterDetailRequestModel.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _commonRequestModel_1 = require("./_commonRequestModel");
var paperKind_1 = require("../../utils/paperKind");
var reportWizardState_1 = require("../reportWizardState");
var $ = require("jquery");
var _crossTabRequestModel_1 = require("./_crossTabRequestModel");
var MasterDetailRequestModel = (function (_super) {
    __extends(MasterDetailRequestModel, _super);
    function MasterDetailRequestModel(state) {
        var _this = _super.call(this, state) || this;
        _this._masterRelationMap = function (query, path) {
            var newInfo = {
                Name: query.name,
                DisplayName: query.displayName,
                CheckedState: query.checked,
                Fields: query.fields.map(function (field) {
                    return {
                        Name: field.name,
                        DisplayName: field.displayName,
                        Checked: field.checked,
                    };
                }),
                Relations: query.relations.map(function (relation) { return _this._masterRelationMap(relation, relation.path); })
            };
            _this._collectionByPath[path] = newInfo;
            return newInfo;
        };
        _this._collectionByPath = {};
        _this.UseMasterDetailBuilder = true;
        var dataSource = state.dataSource || state.newDataSource;
        _this.DataSourceName = dataSource && JSON.parse(dataSource).name;
        if (state.reportType === reportWizardState_1.ReportType.CrossTab) {
            _this.CrossTabFieldInfo = [].concat(state.crossTabColumnsFieldInfo.map(function (item) { return new _crossTabRequestModel_1.CrossTabColumnFieldInfo({ name: item.name, displayName: item.displayName, sortOrder: item.sortOrder }); }), state.crossTabRowsFieldInfo.map(function (item) { return new _crossTabRequestModel_1.CrossTabRowFieldInfo({ name: item.name, displayName: item.displayName, sortOrder: item.sortOrder }); }), state.crossTabDataFieldInfo.map(function (item) { return new _crossTabRequestModel_1.CrossTabDataFieldInfo({ name: item.name, displayName: item.displayName, summaryType: item.summaryType }); }));
        }
        else {
            _this.MasterDetailInfo = state.masterDetailInfoCollection.map(function (info) {
                return _this._masterRelationMap(info, info.path);
            });
            _this.MasterDetailGroupsInfo = $.map(state.masterDetailGroups, function (array, key) { return ({
                'Key': _this._collectionByPath[key],
                'Value': (array || []).map(function (item) { return ((item || [])); })
            }); });
            _this.MasterDetailSummariesInfo = $.map(state.masterDetailSummariesInfo, function (value, key) { return ({
                'Key': _this._collectionByPath[key],
                'Value': (value || []).map(function (item) {
                    return {
                        Column: {
                            Name: item.column.name,
                            DisplayName: item.column.displayName
                        },
                        SummaryFunctions: item.summaryFunctions
                    };
                })
            }); });
        }
        if (state.pageSetup) {
            _this.PaperKind = paperKind_1.PaperKind[state.pageSetup.paperKind];
            _this.PaperSize = {
                width: state.pageSetup.width,
                height: state.pageSetup.height
            };
            _this.Margins = {
                Left: state.pageSetup.marginLeft,
                Right: state.pageSetup.marginRight,
                Top: state.pageSetup.marginTop,
                Bottom: state.pageSetup.marginBottom
            };
            _this.Portrait = !state.pageSetup.landscape;
            _this.Unit = state.pageSetup.unit;
        }
        return _this;
    }
    return MasterDetailRequestModel;
}(_commonRequestModel_1.CommonRequestModel));
exports.MasterDetailRequestModel = MasterDetailRequestModel;
