﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\_dataSourceWizardHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chooseAvailableDataSourcePage_1 = require("../chooseAvailableDataSourcePage");
var $ = require("jquery");
var objectItemCreation_1 = require("../../../dataObjects/objectItemCreation");
function overrideDataSourceWizardPage(factory, pageId, meta) {
    var oldMetadata = factory.getMetadata(pageId);
    factory.registerMetadata(pageId, {
        canNext: function (page) { return page.canFinish() || page.canNext(); },
        create: function () { return meta.create(); },
        resetState: function (state, defaultState) {
            state.newDataSource = defaultState.newDataSource;
            meta.resetState && meta.resetState(state, defaultState);
        },
        getState: function (state) { return state; },
        setState: function (data, state) {
            meta.setState && meta.setState(data, state);
            state.newDataSource = data.newDataSource;
        },
        description: oldMetadata.description,
        template: oldMetadata.template
    });
}
function overrideJsonDataSourceWizardPage(factory, pageId, meta) {
    overrideDataSourceWizardPage(factory, pageId, $.extend({}, meta, {
        setState: function (data, state) {
            $.extend(state.jsonDataSourceWizard, data.result);
        }
    }));
}
exports.overrideJsonDataSourceWizardPage = overrideJsonDataSourceWizardPage;
function overrideSqlDataSourceWizardPage(factory, pageId, meta) {
    overrideDataSourceWizardPage(factory, pageId, $.extend({}, meta, {
        setState: function (data, state) {
            state.sqlDataSourceWizard = data.result;
        }
    }));
}
exports.overrideSqlDataSourceWizardPage = overrideSqlDataSourceWizardPage;
var DataSourceWizardHelper = (function () {
    function DataSourceWizardHelper(_page, _callback) {
        this._page = _page;
        this._callback = _callback;
    }
    DataSourceWizardHelper.prototype.commit = function (superCommit, createDataSource) {
        var _this = this;
        var deferred = $.Deferred();
        if (!this._page.canNext() && this._page.canFinish()) {
            superCommit().done(function (commitResult) {
                var dataSourcePromise = _this._callback(createDataSource(commitResult));
                dataSourcePromise.done(function (result) {
                    result.data = objectItemCreation_1.createNewObjectItem(result.data);
                    deferred.resolve({
                        result: commitResult,
                        newDataSource: chooseAvailableDataSourcePage_1._convertToStateDataSource(result)
                    });
                }).fail(deferred.reject);
            });
        }
        else
            superCommit().done(function (commitResult) {
                deferred.resolve({
                    result: commitResult
                });
            });
        return deferred.promise();
    };
    return DataSourceWizardHelper;
}());
exports.DataSourceWizardHelper = DataSourceWizardHelper;
