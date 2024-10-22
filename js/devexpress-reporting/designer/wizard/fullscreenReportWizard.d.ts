﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\fullscreenReportWizard.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from './internal/utils';
import { IReportWizardState } from './reportWizardState';
import { MasterDetailRequestModel } from './internal/_masterDetailRequestModel';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { PageFactory, FullscreenWizardPageFactory, FullscreenWizard, PageIterator, StateManager, _WrappedWizardPage } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
export declare class FullscreenReportWizard extends FullscreenWizard {
    private _reportWizardOptions;
    protected _callBeforeFinishHandler(state: any, wizardModel?: any): void;
    protected _callAfterFinishHandler(state: any, result: any): void;
    constructor(pageFactory: FullscreenWizardPageFactory, _reportWizardOptions: _ReportWizardOptions);
    _description(): any;
    initialize(state?: IReportWizardState): void;
    _requestModelType: typeof MasterDetailRequestModel;
    _availableDataSources: ko.Observable<IDataSourceInfo[]> | ko.Computed<IDataSourceInfo[]>;
}
export declare class FullscreenReportWizardPageIterator extends PageIterator<IReportWizardState> {
    private _reportWizardOptions;
    constructor(pagesFactory: PageFactory, stateManager: StateManager, _onResetPage: (page: _WrappedWizardPage) => void, _reportWizardOptions: _ReportWizardOptions);
    getNextPageId(pageId?: string): string;
}
export declare function _registerFullscreenReportWizardPages(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
export declare function _createFullscreenReportWizard(reportWizardOptions: _ReportWizardOptions): FullscreenReportWizard;
