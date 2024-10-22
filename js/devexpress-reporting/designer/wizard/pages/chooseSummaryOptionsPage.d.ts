﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SummaryInfo, IMasterDetailReportTree } from '../internal/_masterDetailWizardUtils';
import { IReportWizardState } from '../reportWizardState';
import { SummaryOptionsWrapper } from '../internal/_summaryOptionsPageUtils';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class ChooseSummaryOptionsPage extends WizardPageBase {
    private _allColumns;
    private _masterDetailColumns;
    private _currentDataMember;
    private _createSummaryInfo;
    private _createNewItemIfNeed;
    private _changeQuery;
    constructor();
    _removeSummaryInfo(info: SummaryInfo): void;
    canFinish(): boolean;
    _toggleIgnoreNullValues: () => void;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _summaryOptions: ko.ObservableArray<SummaryOptionsWrapper>;
    ignoreNullValues: ko.Observable<boolean>;
    _template: string;
    _reportTree: ko.ObservableArray<IMasterDetailReportTree>;
    _currentPath: ko.Observable<string>;
    _availableFields: ko.ObservableArray<any>;
    _displayedFields: {
        [key: string]: ko.ObservableArray<any>;
    };
    _summaryInfos: ko.ObservableArray<SummaryInfo>;
    _summaryInfoMapByDataMember: {
        [key: string]: SummaryInfo[];
    };
    _selectFieldToSummaryCaption: any;
    _fieldsCaption: any;
    _summaryFunctionCaption: any;
    _ignoreNullValuesCaption: any;
}
export declare function _registerChooseSummaryOptionsPage(factory: PageFactory): void;
