﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionBinding.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var customFunctions_1 = require("../../widgets/customFunctions");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
function createExpressionProperty(object, propertyName, suffix) {
    if (suffix === void 0) { suffix = 'ExpressionObj'; }
    if (!object.expressionBindings().filter(function (binding) { return binding.propertyName() === propertyName; })[0]) {
        var newExpression = new ParameterExpressionBinding({});
        newExpression.propertyName(propertyName);
        object.expressionBindings.push(newExpression);
    }
    var propertyExpression = object.expressionBindings().filter(function (binding) { return binding.propertyName() === propertyName; })[0];
    var expressionProperty = {
        value: propertyExpression.expression,
        customizeCategories: propertyName !== 'Value' ? function () { } : function (tool, categories) {
            var fields = categories.filter(function (item) { return item.content.name == 'dx-expressioneditor-fields'; })[0];
            if (fields)
                categories.splice(categories.indexOf(fields), 1);
        },
        functions: customFunctions_1.reportFunctionDisplay.filter(function (cat) { return cat.category != 'Summary' && cat.category != 'Aggregate'; })
    };
    var wrappedExpressionOptions = new _wrappedExpressionOptions_1.WrappedExpressionOptions(expressionProperty, {
        addExpression: function (value) {
            if (object.expressionBindings().indexOf(propertyExpression) === -1)
                object.expressionBindings.push(propertyExpression);
            propertyExpression.expression(value);
        },
        removeExpression: function (expression) {
            object.expressionBindings.remove(propertyExpression);
            wrappedExpressionOptions.isValid(true);
        }
    });
    object._disposables.push(ko.computed(function () {
        if (object.expressionBindings().indexOf(propertyExpression) !== -1) {
            wrappedExpressionOptions.expression(propertyExpression);
        }
        else
            wrappedExpressionOptions.expression(null);
    }), wrappedExpressionOptions);
    object[propertyName + suffix] = wrappedExpressionOptions;
    return wrappedExpressionOptions;
}
exports.createExpressionProperty = createExpressionProperty;
var ParameterExpressionBinding = (function () {
    function ParameterExpressionBinding(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    ParameterExpressionBinding.prototype.getInfo = function () {
        return parameterExpressionBinding_1.parameterExpressionBindingSerializationsInfo;
    };
    ParameterExpressionBinding.prototype.isEmpty = function () {
        return !this.expression();
    };
    ParameterExpressionBinding.expressionSuff = 'ExpressionObj';
    return ParameterExpressionBinding;
}());
exports.ParameterExpressionBinding = ParameterExpressionBinding;
var parameterExpressionBinding_1 = require("../metadata/parameters/parameterExpressionBinding");
var _wrappedExpressionOptions_1 = require("../expressions/_wrappedExpressionOptions");
