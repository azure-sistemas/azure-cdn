﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_calculatedFieldsSource.js)
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
var calculatedField_1 = require("../../dataObjects/calculatedField");
var customFunctions_1 = require("../../widgets/customFunctions");
var parameter_1 = require("../../dataObjects/parameters/parameter");
var _fieldListController_1 = require("./_fieldListController");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _wrappedExpressionOptions_1 = require("../../dataObjects/expressions/_wrappedExpressionOptions");
var CalculatedFieldsSource = (function (_super) {
    __extends(CalculatedFieldsSource, _super);
    function CalculatedFieldsSource(calculatedFields, reportDataSource, dataSourceHelper) {
        var _this = _super.call(this) || this;
        _this._calculatedFieldsInfo = {};
        _this._ordinaryFieldsInfo = {};
        _this._fieldsDataMembersInfo = {};
        _this.addAction = {
            clickAction: function (item) {
                return _this.addCalculatedField(item.path);
            },
            imageClassName: 'dxrd-image-add-calcfield',
            imageTemplateName: 'dxrd-svg-operations-add_calcfield',
            text: 'Add calculated field',
            displayText: function () { return analytics_utils_1.getLocalization('Add calculated field', 'ASPxReportsStringId.ReportDesigner_FieldListActions_AddCalculatedField'); }
        };
        _this.removeAction = {
            clickAction: function (item) {
                _this.removeCalculatedField(item.path);
            },
            position: 50,
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: 'Remove calculated field',
            displayText: function () { return analytics_utils_1.getLocalization('Remove calculated field', 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveCalculatedField'); }
        };
        _this._calculatedFieldsInfo = {};
        _this._calculatedFields = calculatedFields;
        _this._dataSourceHelper = ko.observable(dataSourceHelper);
        _this._reportDataSource = reportDataSource;
        for (var index = 0; index < calculatedFields().length; index++) {
            _this._initializeCalculatedField(calculatedFields()[index]);
        }
        var self = _this;
        _this._disposables.push(_this._calculatedFields.subscribe(function (changes) {
            for (var index = 0; index < changes.length; index++) {
                if (changes[index].status === 'added') {
                    self._initializeCalculatedField(changes[index].value);
                }
                else if (changes[index].status === 'deleted') {
                    var fullPath = self._getFieldPathRequest(changes[index].value).fullPath;
                    self._getDataMembersInfoByPath(fullPath).remove(function (item) {
                        return changes[index].value.name === item.name;
                    });
                    changes[index].value.dispose();
                }
            }
        }, null, 'arrayChange'));
        _this._disposables.push(_this._reportDataSource.subscribe(function (newValue) {
            for (var index = 0; index < calculatedFields().length; index++) {
                if (!calculatedFields()[index].dataSource()) {
                    _this._updateFieldPathRequest(calculatedFields()[index]);
                }
            }
        }));
        _this.addCalculatedField = function (fullPath) {
            var pathRequest = new analytics_utils_1.PathRequest(fullPath);
            var newField = _this.createCalculatedField(pathRequest.path);
            var dataSourceInfo = _this._dataSourceHelper().findDataSourceInfoByID(pathRequest.id) || _this._dataSourceHelper().findDataSourceInfoByRef(pathRequest.ref);
            newField.dataSource(dataSourceInfo.data);
            calculatedFields.push(newField);
            return newField;
        };
        _this.removeCalculatedField = function (fullPath) {
            var pathRequest = new analytics_utils_1.PathRequest(fullPath);
            calculatedFields.remove(function (item) {
                var path = item.dataMember() ? (item.dataMember() + '.' + item.name) : item.name;
                return pathRequest.path === path;
            });
        };
        return _this;
    }
    CalculatedFieldsSource.prototype.dispose = function () {
        var _this = this;
        _super.prototype.dispose.call(this);
        Object.keys(this._calculatedFieldsInfo).forEach(function (name) {
            _this.disposeObservableArray(_this._calculatedFieldsInfo[name]);
            _this.resetObservableArray(_this._calculatedFieldsInfo[name]);
            delete _this._calculatedFieldsInfo[name];
        });
        this.disposeObservableArray(this._calculatedFields);
        this.resetObservableArray(this._calculatedFields);
        this._dataSourceHelper(null);
        this._reportDataSource = null;
        this._fieldsDataMembersInfo = null;
        this._fieldsCallback = null;
    };
    CalculatedFieldsSource.prototype._getDataMembersInfoByPath = function (fullPath) {
        this._calculatedFieldsInfo[fullPath] = this._calculatedFieldsInfo[fullPath] || ko.observableArray();
        return this._calculatedFieldsInfo[fullPath];
    };
    CalculatedFieldsSource.prototype._subscribeFieldProperties = function (field) {
        var _this = this;
        field._disposables.push(field.dataMember.subscribe(function (newValue) {
            _this._getDataMembersInfoByPath(field.pathRequest.fullPath).remove(field);
            field.pathRequest = new analytics_utils_1.PathRequest(analytics_internal_1.getFullPath(field.pathRequest.id || field.pathRequest.ref, newValue));
            _this._getDataMembersInfoByPath(field.pathRequest.fullPath).push(field);
        }));
        field._disposables.push(field.dataSource.subscribe(function (newValue) {
            _this._updateFieldPathRequest(field);
        }));
        field._disposables.push(field.calculatedFieldName.subscribe(function (newValue) {
            _this._getDataMembersInfoByPath(field.pathRequest.fullPath).notifySubscribers();
        }));
    };
    CalculatedFieldsSource.prototype._getFieldPathRequest = function (field) {
        var dataSourceInfo = this._dataSourceHelper().findDataSourceInfo(field.dataSource() || this._reportDataSource());
        if (dataSourceInfo)
            return new analytics_utils_1.PathRequest(analytics_internal_1.getFullPath(dataSourceInfo.id || dataSourceInfo.ref, field.dataMember()));
        return new analytics_utils_1.PathRequest('none');
    };
    CalculatedFieldsSource.prototype._updateFieldPathRequest = function (field) {
        this._getDataMembersInfoByPath(field.pathRequest.fullPath).remove(field);
        field.pathRequest = this._getFieldPathRequest(field);
        if (field.pathRequest.ref !== 'none') {
            this._getDataMembersInfoByPath(field.pathRequest.fullPath).push(field);
        }
    };
    CalculatedFieldsSource.prototype._initializeCalculatedField = function (field) {
        var _this = this;
        var pathRequest = this._getFieldPathRequest(field);
        field['getPath'] = function (propertyName) {
            var dataSourceInfo = _this._dataSourceHelper().findDataSourceInfo(field.dataSource() || _this._reportDataSource());
            return dataSourceInfo && (dataSourceInfo.id || dataSourceInfo.ref);
        };
        field._disposables.push(field.expressionObj = new _wrappedExpressionOptions_1.WrappedExpressionOptions({
            value: field['expression'],
            path: ko.pureComputed(function () {
                return _this._getFieldPathRequest(field).fullPath;
            }),
            fieldName: field.calculatedFieldName,
            functions: customFunctions_1.reportFunctionDisplay.filter(function (cat) { return cat.category != 'Summary'; })
        }));
        field._disposables.push(field.expressionObj.path);
        field.nameEditable = ko.pureComputed({
            read: function () {
                return field.calculatedFieldName();
            },
            write: function (value) {
                var fields = this._ordinaryFieldsInfo[field.pathRequest.fullPath];
                if (!!value && analytics_internal_1.getFirstItemByPropertyValue(this._calculatedFields(), 'name', value) === null && analytics_internal_1.getFirstItemByPropertyValue(fields || [], 'displayName', value) === null) {
                    field.calculatedFieldName(value);
                }
            },
            owner: this
        });
        field._disposables.push(field.nameEditable);
        field.pathRequest = pathRequest;
        field.propertyGrid = new analytics_widgets_1.ObjectProperties(ko.observable(field));
        field._disposables.push(field.propertyGrid);
        this._subscribeFieldProperties(field);
        this._getDataMembersInfoByPath(pathRequest.fullPath).push(field);
    };
    CalculatedFieldsSource.prototype._generateNewFieldName = function () {
        var i = 1;
        var generatedName;
        do {
            generatedName = 'calculatedField' + i++;
        } while (analytics_internal_1.getFirstItemByPropertyValue(this._calculatedFields(), 'name', generatedName) !== null);
        return generatedName;
    };
    CalculatedFieldsSource.prototype.createCalculatedField = function (dataMember) {
        return new calculatedField_1.CalculatedField({
            '@Name': this._generateNewFieldName(),
            '@DataMember': dataMember
        });
    };
    CalculatedFieldsSource.prototype.getActions = function (context) {
        var result = [];
        if (context.hasItems && (context.data.specifics === 'List' || context.data.specifics === 'ListSource') && context.path.indexOf(parameter_1.Parameter.ParametersRefString) !== 0) {
            result.push(this.addAction);
        }
        if (context.data && context.data.specifics && context.data.specifics.indexOf('calc') === 0) {
            result.push(this.removeAction);
        }
        return result;
    };
    CalculatedFieldsSource.prototype.beforeItemsFilled = function (request, items) {
        if (request.fullPath) {
            items.push.apply(items, this._getDataMembersInfoByPath(request.fullPath)());
        }
        return false;
    };
    CalculatedFieldsSource.prototype.afterItemsFilled = function (request, items) {
        if (request.fullPath) {
            this._ordinaryFieldsInfo[request.fullPath] = items;
            items.sort(function (a, b) {
                var aIsList = _fieldListController_1.FieldListController.isList(a) ? 1 : 0;
                var bIsList = _fieldListController_1.FieldListController.isList(b) ? 1 : 0;
                if (aIsList !== bIsList) {
                    return bIsList - aIsList;
                }
                else {
                    return (a.displayName && b.displayName) ? a.displayName.localeCompare(b.displayName) : a.name.localeCompare(b.name);
                }
            });
        }
    };
    return CalculatedFieldsSource;
}(analytics_utils_1.Disposable));
exports.CalculatedFieldsSource = CalculatedFieldsSource;
