﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizard.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MultiQueryDataSourceWizardPageIterator, PageFactory, PopupWizard, StateManager } from '@devexpress/analytics-core/analytics-wizard';
import { _ReportWizardOptions } from './internal/utils';
import { MasterDetailRequestModel } from './internal/_masterDetailRequestModel';
import { IReportWizardState } from './reportWizardState';
export declare class ReportWizard extends PopupWizard {
    private _reportWizardOptions;
    protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
    protected _callAfterFinishHandler(state: any, result: any): void;
    constructor(pageFactory: PageFactory, _reportWizardOptions: _ReportWizardOptions);
    initialize(state?: IReportWizardState): void;
    start(finishCallback?: (state: IReportWizardState) => JQueryPromise<any>): void;
    _requestModelType: typeof MasterDetailRequestModel;
    title: any;
}
export declare class ReportWizardPageIterator extends MultiQueryDataSourceWizardPageIterator<IReportWizardState> {
    private _reportWizardOptions;
    constructor(pagesFactory: PageFactory, stateManager: StateManager, _reportWizardOptions: _ReportWizardOptions);
    getNextPageId(pageId?: string): string;
}
export declare function _registerCommonReportWizardPages(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
export declare function _registerReportWizardPages(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
export declare function _createReportWizard(reportWizardOptions: _ReportWizardOptions): ReportWizard;
