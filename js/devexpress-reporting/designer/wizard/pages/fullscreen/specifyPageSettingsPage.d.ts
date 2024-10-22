﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyPageSettingsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from '../../internal/utils';
import { PreviewPageHelper } from '../configureReportPageSettingsPage';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory, FullscreenWizardPageFactory, FullscreenWizardPage } from '@devexpress/analytics-core/analytics-wizard';
export declare class SpecifyPageSettingsPage extends FullscreenWizardPage {
    private _reportWizardOptions;
    constructor(_reportWizardOptions: _ReportWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    registerSections(): void;
    getNextSectionId(sectionId: any): string;
}
export declare function _registerSpecifyPageSettingsPage(factory: FullscreenWizardPageFactory, reportWizardOptions: _ReportWizardOptions): void;
export declare class SpecifyReportTitlePage extends WizardPageBase {
    constructor();
    private _getBrightness;
    private _fillTables;
    initialize(state: any): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _reportTitlePlaceholder(): any;
    _foreColor: ko.Observable<string>;
    _masterDetailInfo: ko.ObservableArray<any>;
    reportTitle: ko.Observable<string> | ko.Computed<string>;
    _reportTitleVisible: boolean;
    _color: ko.Observable<string>;
    _previewPageHelper: PreviewPageHelper;
}
export declare function _registerSpecifyReportTitlePage(factory: PageFactory): void;
