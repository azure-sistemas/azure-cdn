﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\configureReportPageSettingsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPageSetup, GraphicsUnit } from '../reportWizardState';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
interface IPageSettings {
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    marginLeft: ko.Observable<number>;
    marginRight: ko.Observable<number>;
    marginTop: ko.Observable<number>;
    marginBottom: ko.Observable<number>;
}
export declare class PreviewPageHelper extends Disposable {
    private cachePagePreviewElement;
    constructor(settings?: IPageSettings);
    updatePageSettings(pageSetup: IPageSetup): void;
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    marginLeft: ko.Observable<number>;
    marginRight: ko.Observable<number>;
    marginTop: ko.Observable<number>;
    marginBottom: ko.Observable<number>;
    previewPageWidth: ko.Computed<number>;
    previewPageHeight: ko.Computed<number>;
    previewTopMargin: ko.Computed<number>;
    previewRightMargin: ko.Computed<number>;
    previewBottomMargin: ko.Computed<number>;
    previewLeftMargin: ko.Computed<number>;
    pagePreviewElement: ko.Observable<JQuery<HTMLElement>>;
}
export declare class ConfigureReportPageSettingsPage extends WizardPageBase {
    canFinish(): boolean;
    constructor();
    paperKind: ko.Observable<string>;
    landscape: ko.Observable<boolean>;
    unit: ko.Computed<GraphicsUnit>;
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    fixedSize: ko.Computed<boolean>;
    marginLeft: ko.Observable<number>;
    marginRight: ko.Observable<number>;
    marginTop: ko.Observable<number>;
    marginBottom: ko.Observable<number>;
    valueFormat: ko.Computed<string>;
    lookupData: {
        paperKind: {
            value: string;
            displayName: string;
        }[];
        unit: {
            value: GraphicsUnit;
            displayName: string;
        }[];
    };
    private _unit;
    previewPageHelper: PreviewPageHelper;
    initialize(state: IPageSetup): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _applyPageSetting(data: IPageSetup, state: IPageSetup): void;
export declare function _registerConfigureReportPageSettingsPage(factory: PageFactory): void;
export {};
