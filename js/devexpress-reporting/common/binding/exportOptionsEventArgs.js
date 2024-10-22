﻿/**
* DevExpress HTML/JS Reporting (common\binding\exportOptionsEventArgs.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var CustomizeExportOptionsEventArgs = (function () {
    function CustomizeExportOptionsEventArgs(options) {
        this._options = options;
    }
    CustomizeExportOptionsEventArgs.prototype.HideExportOptionsPanel = function () { this._options.panelVisible = false; };
    CustomizeExportOptionsEventArgs.prototype.HideFormat = function (format) { delete this._options.exportOptions[format.propertyName || format.format]; };
    CustomizeExportOptionsEventArgs.prototype.HideProperties = function (format) {
        var _this = this;
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        var patchPropName = function (propName, obj) {
            var info = obj.getInfo && obj.getInfo();
            if (info) {
                var p = info.filter(function (x) { return x.modelName === propName || x.modelName === '@' + propName; })[0];
                if (p)
                    return p.propertyName;
            }
            return propName;
        };
        var addPredicate = function (obj, propName) {
            propName = patchPropName(propName, obj);
            var oldPredicate = obj.isPropertyVisible;
            obj.isPropertyVisible =
                oldPredicate
                    ? (function (x) { return oldPredicate(x) && x !== propName; })
                    : (function (x) { return x !== propName; });
        };
        if (paths.length == 0) {
            addPredicate(this._options.exportOptions, format.format);
        }
        else {
            paths.forEach(function (property) {
                var path = Array.isArray(property)
                    ? property
                    : property.split('.');
                var obj = _this._options.exportOptions[format.format];
                while (path.length > 1) {
                    obj = ko.unwrap(obj[patchPropName(path[0], obj)]);
                    path.splice(0, 1);
                }
                addPredicate(obj, path[0]);
            });
        }
    };
    CustomizeExportOptionsEventArgs.prototype.GetExportOptionsModel = function (format) { return this._options.exportOptions[format.format]; };
    return CustomizeExportOptionsEventArgs;
}());
exports.CustomizeExportOptionsEventArgs = CustomizeExportOptionsEventArgs;
