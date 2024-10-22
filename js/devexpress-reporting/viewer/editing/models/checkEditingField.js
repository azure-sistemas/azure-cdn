﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\checkEditingField.js)
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
var imageSource_1 = require("../../../common/imageSource");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var GlyphStyle;
(function (GlyphStyle) {
    GlyphStyle[GlyphStyle["StandardBox1"] = 0] = "StandardBox1";
    GlyphStyle[GlyphStyle["StandardBox2"] = 1] = "StandardBox2";
    GlyphStyle[GlyphStyle["YesNoBox"] = 2] = "YesNoBox";
    GlyphStyle[GlyphStyle["YesNoSolidBox"] = 3] = "YesNoSolidBox";
    GlyphStyle[GlyphStyle["YesNo"] = 4] = "YesNo";
    GlyphStyle[GlyphStyle["RadioButton"] = 5] = "RadioButton";
    GlyphStyle[GlyphStyle["Smiley"] = 6] = "Smiley";
    GlyphStyle[GlyphStyle["Thumb"] = 7] = "Thumb";
    GlyphStyle[GlyphStyle["Toggle"] = 8] = "Toggle";
    GlyphStyle[GlyphStyle["Star"] = 9] = "Star";
    GlyphStyle[GlyphStyle["Heart"] = 10] = "Heart";
})(GlyphStyle = exports.GlyphStyle || (exports.GlyphStyle = {}));
var CheckState;
(function (CheckState) {
    CheckState[CheckState["Unchecked"] = 0] = "Unchecked";
    CheckState[CheckState["Checked"] = 1] = "Checked";
    CheckState[CheckState["Indeterminate"] = 2] = "Indeterminate";
})(CheckState = exports.CheckState || (exports.CheckState = {}));
function createCustomGlyphStyleCss(imageSource) {
    var backgroundResult = {};
    if (imageSource) {
        var urlContent = imageSource.getDataUrl();
        if (urlContent) {
            backgroundResult = { background: 'url(' + urlContent + ') no-repeat' };
            backgroundResult['backgroundPosition'] = 'center center';
            backgroundResult['backgroundSize'] = 'cover';
        }
    }
    return backgroundResult;
}
exports.createCustomGlyphStyleCss = createCustomGlyphStyleCss;
function getCheckBoxTemplate(style, state, customGlyph) {
    if (!$.isEmptyObject(customGlyph)) {
        return 'dxrd-checkboxcustomglyph';
    }
    else {
        return analytics_widgets_internal_1.SvgTemplatesEngine.getExistingTemplate('dxrd-svg-checkboxglyphs-' + style + '_' + state);
    }
}
exports.getCheckBoxTemplate = getCheckBoxTemplate;
var CheckEditingFieldViewModel = (function (_super) {
    __extends(CheckEditingFieldViewModel, _super);
    function CheckEditingFieldViewModel(field, pageWidth, pageHeight, zoom, editingFieldsProvider) {
        var _this = _super.call(this) || this;
        _this.focused = ko.observable(false);
        _this._editingFieldsProvider = editingFieldsProvider;
        _this.template = 'dxrp-editing-field-checkbox';
        _this.field = field;
        _this.zoom = zoom;
        var bounds = _this.field.model().bounds;
        var checkBounds = _this.field.model().brickOptions.checkBoxBounds;
        var rtl = _this.field.model().brickOptions.rtlLayout;
        _this.containerStyle = function () {
            return {
                height: bounds.height + 'px',
                width: bounds.width + 'px',
                top: bounds.top * 100 / pageHeight + '%',
                left: bounds.left * 100 / pageWidth + '%',
                cursor: _this.field.readOnly() ? 'auto' : 'pointer'
            };
        };
        _this.checkStyle = function () {
            var result = {
                height: checkBounds.height + 'px',
                width: checkBounds.width + 'px',
                top: checkBounds.top + 'px',
                left: (rtl ? (bounds.width - checkBounds.left - checkBounds.width) : checkBounds.left) + 'px'
            };
            return result;
        };
        _this._disposables.push(_this.customGlyphStyleCss = ko.pureComputed(function () {
            var imageSourceData = field.model().brickOptions.checkBoxGlyphOptions.customGlyphs.filter(function (item) { return item.key === _this.field.editValue(); })[0];
            if (!imageSourceData.value)
                return {};
            var imageSource = new imageSource_1.ImageSource(imageSourceData.value.imageType, imageSourceData.value.image);
            return createCustomGlyphStyleCss(imageSource);
        }));
        _this._disposables.push(_this.checkStateStyleIcon = ko.pureComputed(function () {
            return getCheckBoxTemplate(GlyphStyle[field.model().brickOptions.checkBoxGlyphOptions.glyphStyle], CheckState[_this.field.editValue()], _this.customGlyphStyleCss());
        }));
        return _this;
    }
    CheckEditingFieldViewModel.prototype._toggleCheckState = function () {
        if (this.field.editValue() === CheckState.Checked) {
            this.field.editValue(CheckState.Unchecked);
        }
        else {
            this.field.editValue(CheckState.Checked);
        }
    };
    CheckEditingFieldViewModel.prototype.onKeyDown = function (_, e) {
        if (e.key == analytics_internal_1.KeyboardEnum.Space) {
            this.toggleCheckState();
        }
        else {
        }
    };
    CheckEditingFieldViewModel.prototype.onBlur = function () {
        this.focused(false);
    };
    CheckEditingFieldViewModel.prototype.onFocus = function () {
        this.focused(true);
    };
    CheckEditingFieldViewModel.prototype.onClick = function (_, e) {
        e.target.focus();
        this.toggleCheckState();
        e.stopPropagation();
    };
    CheckEditingFieldViewModel.prototype.checked = function () {
        if (this.field.editValue() === CheckState.Checked) {
            return true;
        }
        if (this.field.editValue() === CheckState.Unchecked) {
            return false;
        }
    };
    CheckEditingFieldViewModel.prototype.toggleCheckState = function () {
        var _this = this;
        if (this.field.readOnly())
            return;
        if (!this.field.groupID()) {
            this._toggleCheckState();
        }
        else if (this.checked() === false) {
            this._editingFieldsProvider().forEach(function (value) {
                if (value.groupID() === _this.field.groupID()) {
                    value.editValue(CheckState.Unchecked);
                }
            });
            this._toggleCheckState();
        }
    };
    return CheckEditingFieldViewModel;
}(analytics_utils_1.Disposable));
exports.CheckEditingFieldViewModel = CheckEditingFieldViewModel;
