﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localizationEditor.js)
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
var xrControl_1 = require("../controls/xrControl");
var xrBand_1 = require("../bands/xrBand");
var metadata_1 = require("../../common/metadata");
var xrCheckbox_1 = require("../controls/xrCheckbox");
var localizationService_1 = require("./localizationService");
var dataSourceSelectBox_1 = require("../widgets/dataSourceSelectBox");
var _translateHelper_1 = require("../internal/_translateHelper");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var LocalizationEditor = (function (_super) {
    __extends(LocalizationEditor, _super);
    function LocalizationEditor(_options) {
        var _this = _super.call(this) || this;
        _this._options = _options;
        _this.defaultLanguageText = function () { return metadata_1.availableCultures()[metadata_1.defaultCulture]; };
        _this.currentLanguageText = function () { return metadata_1.availableCultures()[_this.language()]; };
        _this.localizationItems = ko.observableArray();
        _this.textToSearch = ko.observable('');
        _this.searchPlaceholder = function () { return analytics_internal_1.searchPlaceholder(); };
        _this.searchBox = ko.observable(null);
        _this.isSearching = ko.observable(false);
        _this.getResizableOptions = analytics_internal_1.getResizableOptions;
        _this.isVisible = ko.observable(false);
        _this.width = ko.observable(500);
        _this.showLoadIndicator = ko.observable(false);
        _this.getLoadPanelPosition = function (element) { return $(element).closest('.dxrd-localization-editor'); };
        _this._disposables.push(_this.availableCultures = dataSourceSelectBox_1.DataSourceSelectBox.createDataSource(Object.keys(metadata_1.availableCultures()).map(function (key) {
            return { value: key, displayValue: metadata_1.availableCultures()[key] };
        })));
        _this.translateHelper = new _translateHelper_1.TranslateHelper();
        return _this;
    }
    LocalizationEditor.prototype._uncollapseParent = function (newVal) {
        var parent = newVal.parentModel();
        if (!parent)
            return;
        if (parent instanceof xrBand_1.BandViewModel) {
            parent.expanded(true);
        }
        this._uncollapseParent(parent);
    };
    LocalizationEditor.prototype._subscribeFocused = function () {
        var _this = this;
        return this._options.selection.focused.subscribe(function (newVal) {
            _this._uncollapseParent(newVal.getControlModel());
            _this._options.controlScrollingTool.scrollToControl(newVal);
        });
    };
    LocalizationEditor.prototype._getDefaultLanguageItems = function () {
        return this._options.report()._localization.items.get(metadata_1.defaultCulture).properties;
    };
    LocalizationEditor.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.localizationItems().forEach(function (x) { return x.dispose(); });
        this.localizationItems.removeAll();
        this._autoScrollingSubscription && this._autoScrollingSubscription.dispose();
        this._options = null;
        this.language = null;
        this.searchBox(null);
        this._selectionDisabled = null;
        this.translateHelper.dispose();
    };
    LocalizationEditor.prototype._isLocalizableControl = function (x) {
        if (x instanceof xrCheckbox_1.XRCheckBoxViewModel) {
            return x.glyphAlignment() !== 'Center';
        }
        return true;
    };
    LocalizationEditor.prototype._localizableControls = function () {
        var _this = this;
        return this._options.report().enumerateComponents().filter(function (x) {
            return x instanceof xrControl_1.XRControlViewModel &&
                x.getLocalizationProperties &&
                x['text'] &&
                !x.hasDataBindingByName() &&
                _this._isLocalizableControl(x);
        });
    };
    LocalizationEditor.prototype.applyLocalization = function (serviceName) {
        var _this = this;
        if (this.language() !== metadata_1.defaultCulture) {
            this.showLoadIndicator(true);
            var textCollection = this.localizationItems().reduce(function (result, item) {
                if (item.visible())
                    result.push(item.localizedText);
                return result;
            }, []);
            localizationService_1._translationFactory.translate(serviceName, textCollection.map(function (x) { return x(); }), this.language()).done(function (result) {
                result.texts.forEach(function (val, i) {
                    textCollection[i](val);
                });
                _this.showLoadIndicator(false);
            }).fail(function () {
                _this.showLoadIndicator(false);
            });
        }
    };
    LocalizationEditor.prototype.clearLocalization = function () {
        this._options.report().clearLocalization(this.language());
    };
    LocalizationEditor.prototype.getRegisteredService = function () {
        return localizationService_1._translationFactory.getFirstRegistered();
    };
    LocalizationEditor.prototype.isDefaultLanguage = function () {
        return this.language() === metadata_1.defaultCulture;
    };
    LocalizationEditor.prototype._updateLocalizationItems = function () {
        var _this = this;
        var defaultProperties = this._getDefaultLanguageItems();
        this.localizationItems(this._localizableControls().map(function (component) {
            var _defaultText = ko.observable(component['text']());
            if (!_this.isDefaultLanguage()) {
                var defaultTextProperty = defaultProperties.filter(function (x) { return x.component === component && x.propertyName === 'Text'; })[0];
                _defaultText(defaultTextProperty && defaultTextProperty.value);
            }
            return {
                component: component,
                defaultText: ko.computed({
                    read: function () { return _defaultText(); },
                    write: function (newVal) {
                        _defaultText(newVal);
                        if (_this.isDefaultLanguage())
                            component['text'](newVal);
                    }
                }),
                isDefaultLanguage: function () { return _this.isDefaultLanguage(); },
                readOnly: function () { return component.isPropertyDisabled('text'); },
                visible: ko.computed(function () {
                    return (_this.isDefaultLanguage() || !!_defaultText() || !!component['text']()) &&
                        (function (regex) {
                            return [_defaultText(), component['text']()].some(function (x) { return regex.test(x); });
                        })(new RegExp(_this.textToSearch(), 'gi'));
                }),
                dispose: function () {
                    this.defaultText.dispose();
                    this.visible.dispose();
                },
                localizedText: component['text'],
                multiline: component['multiline']
            };
        }));
    };
    LocalizationEditor.prototype.start = function () {
        if (this._options.controlScrollingTool) {
            this._autoScrollingSubscription = this._subscribeFocused();
        }
        this.language = this._options.report().language;
        this._updateLocalizationItems();
        this._options.selection.updateSelection(this._options.report().surface);
        this._selectionDisabled = this._options.selection.disabled();
        this._options.selection.disabled(true);
        this.isVisible(true);
    };
    LocalizationEditor.prototype.finish = function () {
        this._autoScrollingSubscription && this._autoScrollingSubscription.dispose();
        this.localizationItems().forEach(function (x) { return x.dispose(); });
        this.localizationItems.removeAll();
        this._options.selection.disabled(this._selectionDisabled);
        this.language = null;
        this._selectionDisabled = null;
        this.searchBox(null);
        this.isVisible(false);
    };
    LocalizationEditor.prototype.onSelectionChanged = function (e) {
        if (e.addedItems[0])
            this._options.selection.updateSelection(e.addedItems[0].component.surface);
        else
            this._options.selection.clear();
    };
    LocalizationEditor.prototype.onItemGotFocus = function (e) {
        if (!e.model.component.surface.selected())
            this._options.selection.updateSelection(e.model.component.surface);
    };
    LocalizationEditor.prototype.switchSearchBox = function () {
        if (this.isSearching()) {
            this.textToSearch('');
        }
        this.isSearching(!this.isSearching());
    };
    return LocalizationEditor;
}(analytics_utils_1.Disposable));
exports.LocalizationEditor = LocalizationEditor;
