﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_designControlsHelper.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var calculatedField_1 = require("../dataObjects/calculatedField");
var parameter_1 = require("../dataObjects/parameters/parameter");
var DesignControlsHelper = (function (_super) {
    __extends(DesignControlsHelper, _super);
    function DesignControlsHelper(target, selection) {
        return _super.call(this, target, [{
                added: function (control) { },
                deleted: function (control) { control.surface === selection.focused() && selection.focused(control.surface.findNextSelection()); }
            }], ['controls', 'bands', 'crossBandControls', 'rows', 'cells', 'fields', 'styles', 'parameters', 'formattingRuleSheet', 'calculatedFields', 'components']) || this;
    }
    DesignControlsHelper.prototype.dispose = function () {
        this._xrPdfSignatureCollection = [];
        _super.prototype.dispose.call(this);
    };
    DesignControlsHelper.prototype.getNameProperty = function (model) {
        if (model instanceof parameter_1.Parameter)
            return model.parameterName;
        if (model instanceof calculatedField_1.CalculatedField)
            return model.calculatedFieldName;
        return _super.prototype.getNameProperty.call(this, model);
    };
    DesignControlsHelper.prototype._setName = function (value) {
        if (value !== this.target) {
            _super.prototype._setName.call(this, value);
        }
    };
    DesignControlsHelper.prototype._setDefaultText = function (value) {
        var controlType = value.controlType || 'Unknown';
        controlType !== 'XRCrossTabCell' && _super.prototype._setDefaultText.call(this, value);
    };
    DesignControlsHelper.prototype._getNamePrefix = function (value) {
        var controlType = value.controlType || 'Unknown';
        if (controlType === 'XRCrossTabCell') {
            return value.namePrefix;
        }
        return _super.prototype._getNamePrefix.call(this, value);
    };
    return DesignControlsHelper;
}(analytics_internal_1.DesignControlsHelper));
exports.DesignControlsHelper = DesignControlsHelper;
