﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\legacyReportWizard.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from './internal/utils';
import { IReportWizardState, ILegacyReportWizardState } from './reportWizardState';
import { LegacyReportRequestModel } from './internal/_legacyReportRequestModel';
import { PageFactory, MultiQueryDataSourceWizardPageIterator, PopupWizard, StateManager } from '@devexpress/analytics-core/analytics-wizard';
export declare class LegacyReportWizard extends PopupWizard {
    private _reportWizardOptions;
    protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
    protected _callAfterFinishHandler(state: any, result: any): void;
    constructor(pageFactory: any, _reportWizardOptions: _ReportWizardOptions);
    initialize(state?: IReportWizardState): void;
    start(finishCallback?: (state: IReportWizardState) => JQueryPromise<any>): void;
    _requestModelType: typeof LegacyReportRequestModel;
    title: any;
}
export declare class LegacyReportWizardPageIterator extends MultiQueryDataSourceWizardPageIterator<ILegacyReportWizardState> {
    constructor(pageFactory: PageFactory, stateManager: StateManager, reportWizardOptions: _ReportWizardOptions);
    getNextPageId(pageId: string): string;
}
export declare function _createLegacyReportWizard(reportWizardOptions: _ReportWizardOptions): LegacyReportWizard;
