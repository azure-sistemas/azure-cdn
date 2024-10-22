﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseSummaryOptionsSection.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SummaryInfoFieldlist, ISummaryDataMemberInfo } from '../internal/_masterDetailWizardUtils';
import { IReportWizardState } from '../reportWizardState';
import { IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class AddSummaryFieldsPage extends WizardPageBase {
    dispose(): void;
    private _fillTreeQueries;
    private _createSummaryInfo;
    private _createNewItemIfNeed;
    private _getParentName;
    private _flat;
    _removeSummaryInfo(info: SummaryInfoFieldlist): void;
    canFinish(): boolean;
    _toggleIgnoreNullValues: () => void;
    _updateSummaries(flatlist: ISummaryDataMemberInfo[]): void;
    initialize(state: IReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
    _fieldListProvider: ko.Observable<IItemsProvider>;
    ignoreNullValues: ko.Observable<boolean>;
    _template: string;
    _reportTree: ko.ObservableArray<ISummaryDataMemberInfo>;
    _availableFieldsCount: ko.Observable<number>;
    _summaryInfos: ko.ObservableArray<SummaryInfoFieldlist>;
    _selectFieldToSummaryCaption: any;
    _fieldsCaption: any;
    _summaryFunctionCaption: any;
    _ignoreNullValuesCaption: any;
}
export declare function _registerAddSummaryFieldsPage(factory: PageFactory): void;
