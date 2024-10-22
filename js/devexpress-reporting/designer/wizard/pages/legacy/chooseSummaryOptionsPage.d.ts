﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseSummaryOptionsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ILegacyReportWizardState } from '../../reportWizardState';
import { SummaryOptionsWrapper, ISummaryOptions } from '../../internal/_summaryOptionsPageUtils';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class LegacyChooseSummaryOptionsPage extends WizardPageBase {
    private _columns;
    canFinish(): boolean;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        summaryOptions?: ISummaryOptions[];
        ignoreNullValuesForSummary?: boolean;
    }, any, any>;
    summaryOptions: ko.ObservableArray<SummaryOptionsWrapper>;
    ignoreNullValues: ko.Observable<boolean>;
    toggleIgnoreNullValues: () => void;
}
export declare function _registerLegacyChooseSummaryOptionsPage(factory: PageFactory): void;
