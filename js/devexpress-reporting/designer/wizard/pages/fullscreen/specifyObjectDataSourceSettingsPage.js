﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyObjectDataSourceSettingsPage.js)
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
var _objectDataSourceEditor_1 = require("../../../actions/_objectDataSourceEditor");
var chooseAvailableDataSourcePage_1 = require("../chooseAvailableDataSourcePage");
var $ = require("jquery");
var _utils_1 = require("../../internal/_utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var objectItemCreation_1 = require("../../../dataObjects/objectItemCreation");
var SpecifyObjectDataSourceSettingsPage = (function (_super) {
    __extends(SpecifyObjectDataSourceSettingsPage, _super);
    function SpecifyObjectDataSourceSettingsPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecifyObjectDataSourceSettingsPage.prototype.canNext = function () {
        return _super.prototype.canFinish.call(this);
    };
    SpecifyObjectDataSourceSettingsPage.prototype.initialize = function (state) {
        this._dataSourceId = state.dataSourceId;
        return _super.prototype.initialize.call(this, state);
    };
    SpecifyObjectDataSourceSettingsPage.prototype.commit = function () {
        var _this = this;
        var deferred = $.Deferred();
        _super.prototype.commit.call(this).done(function (state) {
            var infoPromise = _objectDataSourceEditor_1.ObjectDataSourceEditor.createObjectDataSourceInfo(state, analytics_wizard_1._restoreObjectDataSourceFromState(state, undefined, _this._dataSourceId));
            infoPromise.done(function (result) {
                result.data = objectItemCreation_1.createNewObjectItem(result.data);
                deferred.resolve({
                    objectDataSourceWizard: state,
                    newDataSource: chooseAvailableDataSourcePage_1._convertToStateDataSource(result)
                });
            });
        });
        return deferred.promise();
    };
    return SpecifyObjectDataSourceSettingsPage;
}(analytics_wizard_1.SpecifyObjectDataSourceSettingsPage));
exports.SpecifyObjectDataSourceSettingsPage = SpecifyObjectDataSourceSettingsPage;
function _registerSpecifyObjectDataSourceSettingsPage(factory, wizardOptions) {
    analytics_wizard_1._registerSpecifyObjectDataSourceSettingsPage(factory, wizardOptions);
    _utils_1.overrideFullscreenDataSourceWizardPageMetadata(factory, analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage, function () { return new SpecifyObjectDataSourceSettingsPage(wizardOptions); });
}
exports._registerSpecifyObjectDataSourceSettingsPage = _registerSpecifyObjectDataSourceSettingsPage;
