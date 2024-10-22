﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\propertyExpressionMapper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var PropertyExpressionMapper = (function () {
    function PropertyExpressionMapper() {
        this._mapper = {};
    }
    PropertyExpressionMapper.prototype.getExpressionPropertyName = function (propertyName) {
        return propertyName.substr(0, 1).toLocaleUpperCase() + propertyName.substr(1) + 'ExpressionObj';
    };
    PropertyExpressionMapper.prototype.registerExpressionProperty = function (property) {
        var newPropertyName = this.getExpressionPropertyName(property.propertyName);
        var expressionInfo = {
            propertyName: newPropertyName,
            editor: analytics_widgets_1.editorTemplates.getEditor('expressionEditor'),
            displayName: property.displayName,
            localizationId: property.localizationId
        };
        this._mapper[newPropertyName] = {
            showExpression: ko.observable(false)
        };
        return expressionInfo;
    };
    PropertyExpressionMapper.prototype.isPropertyVisible = function (propertyName, editingMode) {
        if (!editingMode)
            return !this._mapper[propertyName];
        var expressionProperty = this.getExpressionProperty(propertyName);
        return expressionProperty ? (!!this._mapper[propertyName] === expressionProperty.showExpression()) : true;
    };
    PropertyExpressionMapper.prototype.getExpressionProperty = function (propertyName) {
        return this._mapper[propertyName] || this._mapper[this.getExpressionPropertyName(propertyName)];
    };
    PropertyExpressionMapper.propertiesWithExpressions = ['visible', 'enabled'];
    return PropertyExpressionMapper;
}());
exports.PropertyExpressionMapper = PropertyExpressionMapper;
