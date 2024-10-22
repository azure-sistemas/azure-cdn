﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileActionList.js)
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
var settings_1 = require("../../settings");
var ko = require("knockout");
var $ = require("jquery");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var MobileActionList = (function (_super) {
    __extends(MobileActionList, _super);
    function MobileActionList(actions) {
        var _this = _super.call(this) || this;
        _this.actions = actions;
        _this.visible = ko.observable(false);
        return _this;
    }
    MobileActionList.prototype.dispose = function () {
        this.actions.forEach(function (action) {
            if (action.content && action.content.dispose) {
                action.content.dispose();
                delete action.content.dispose;
            }
        });
        _super.prototype.dispose.call(this);
    };
    return MobileActionList;
}(analytics_utils_1.Disposable));
exports.MobileActionList = MobileActionList;
function getPreviewActionsMobile(options) {
    var exportToModel = {
        visible: ko.observable(false),
        items: ko.pureComputed(function () {
            var allFormats = options.exportModel._getExportFormatItems();
            var availableFormats = options.exportTypes().filter(function (x) { return allFormats.indexOf(x) !== -1; });
            if (availableFormats.length > 9) {
                availableFormats.splice(9, availableFormats.length - 9);
            }
            else if (availableFormats.length < 9) {
                var notUsedFormats = allFormats.filter(function (x) { return availableFormats.indexOf(x) === -1; });
                availableFormats.push.apply(availableFormats, notUsedFormats.slice(0, 9 - availableFormats.length));
            }
            return availableFormats.map(function (item) {
                item.action = function (model) { options.exportModel._exportDocumentByFormat(model && model.format); };
                return item;
            });
        })
    };
    var actions = [
        {
            clickAction: function () {
                options.searchModel.searchPanelVisible(true);
                options.searchModel.editorVisible(true);
                options.searchModel.focusEditor({ currentTarget: $('.dxrdp-taptosearch') });
                options.reportPreview.actionsVisible(false);
            },
            imageClassName: 'dxrd-image-search',
            imageTemplateName: 'dxrd-svg-preview-search',
            visible: settings_1.SearchAvailable
        },
        {
            clickAction: function () { exportToModel.visible(!exportToModel.visible()); },
            imageClassName: 'dxrd-image-export-to',
            imageTemplateName: 'dxrd-svg-preview-export-export-to',
            visible: true,
            content: {
                name: 'dxrd-menu-export-content',
                data: exportToModel,
                dispose: function () {
                    exportToModel.items().forEach(function (item) {
                        delete item.action;
                    });
                    exportToModel.items.dispose();
                }
            }
        },
        {
            clickAction: function () {
                options.parametersModel.popupInfo.visible(!options.parametersModel.popupInfo.visible());
                options.reportPreview.actionsVisible(false);
            },
            imageClassName: 'dxrd-image-parameters',
            imageTemplateName: 'dxrd-svg-tabs-parameters',
            visible: options.parametersModel.popupInfo.notEmpty
        }
    ];
    options.callbacks && options.callbacks.customizeActions && options.callbacks.customizeActions(actions);
    return new MobileActionList(actions);
}
exports.getPreviewActionsMobile = getPreviewActionsMobile;
