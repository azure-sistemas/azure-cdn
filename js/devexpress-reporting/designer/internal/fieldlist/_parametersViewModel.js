﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_parametersViewModel.js)
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
var parametersDialogs_1 = require("../../tools/dialogs/parametersDialogs");
var parameter_1 = require("../../dataObjects/parameters/parameter");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ParametersViewModel = (function (_super) {
    __extends(ParametersViewModel, _super);
    function ParametersViewModel(report) {
        var _this = _super.call(this) || this;
        _this.addAction = {
            clickAction: function () {
                return _this.add();
            },
            imageClassName: 'dxrd-image-add',
            imageTemplateName: 'dxrd-svg-operations-add',
            text: 'Add parameter',
            displayText: function () { return analytics_utils_1.getLocalization('Add parameter', 'AnalyticsCoreStringId.FieldListActions_AddParameter'); }
        };
        _this.removeAction = {
            clickAction: function (item) {
                _this.remove(item.data);
            },
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: 'Remove parameter',
            displayText: function () { return analytics_utils_1.getLocalization('Remove parameter', 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveParameter'); }
        };
        _this.editAction = {
            clickAction: function (item) {
                if (item.data instanceof parameter_1.Parameter) {
                    _this.edit(item.data);
                }
                else if (item.hasItems) {
                    _this.edit(item.items()[0].data);
                }
                else {
                    _this.edit(undefined);
                }
            },
            imageClassName: 'dxrd-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: 'Edit parameter',
            displayText: function () { return analytics_utils_1.getLocalization('Edit parameter', 'ASPxReportsStringId.ReportDesigner_FieldListActions_EditParameter'); }
        };
        _this.parameters = report.parameters;
        _this.remove = function (parameter) {
            _this.parameters.splice(_this.parameters.indexOf(parameter), 1);
        };
        _this.add = function () {
            _this._addParametersDialog.show();
        };
        _this.edit = function (parameter) {
            _this._editParametersDialog.show(parameter);
        };
        _this._disposables.push(_this._addParametersDialog = new parametersDialogs_1.AddParameterDialog(report), _this._editParametersDialog = new parametersDialogs_1.EditParametersDialog(report));
        return _this;
    }
    ParametersViewModel.prototype.getActions = function (context) {
        var result = [];
        if (context.path.indexOf(parameter_1.Parameter.ParametersRefString) === 0) {
            if (context.pathParts.length === 1) {
                result.push(this.editAction);
                result.push(this.addAction);
            }
            else if (context.pathParts.length === 2) {
                result.push(this.editAction);
                result.push(this.removeAction);
            }
        }
        return result;
    };
    ParametersViewModel.prototype.beforeItemsFilled = function (request, items) {
        if (request.ref !== parameter_1.Parameter.ParametersRefString)
            return false;
        items.push.apply(items, request.fullPath === parameter_1.Parameter.ParametersRefString ? this.parameters.slice(0) : []);
        this.parameters().forEach(function (parameter) {
            if (parameter.isList && parameter.parameterName() === request.path) {
                items.push.apply(items, parameter.getRangeParameters());
            }
        });
        return true;
    };
    ParametersViewModel.prototype.afterItemsFilled = function (request, items) {
        if (!request.fullPath) {
            var parameters = analytics_internal_1.findFirstItemMatchesCondition(items, function (item) { return item.specifics === 'parameters'; });
            if (parameters)
                parameters.displayName = analytics_utils_1.getLocalization('Parameters', 'DevExpress.XtraReports.UI.XtraReport.Parameters');
            var noneDataSource = !request.fullPath && analytics_internal_1.findFirstItemMatchesCondition(items, function (item) { return item.specifics === 'none'; });
            if (noneDataSource)
                noneDataSource.displayName = analytics_internal_1.localizeNoneString('none');
        }
    };
    return ParametersViewModel;
}(analytics_utils_1.Disposable));
exports.ParametersViewModel = ParametersViewModel;
