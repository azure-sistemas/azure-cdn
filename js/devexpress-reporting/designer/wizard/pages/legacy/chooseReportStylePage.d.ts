﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseReportStylePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ILegacyReportWizardState } from '../../reportWizardState';
import { ReportStyle, ReportStyleItem } from '../../internal/reportStylePageUtils';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class LegacyChooseReportStylePage extends WizardPageBase {
    canFinish(): boolean;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        style?: ReportStyle;
    }, any, any>;
    reportStyleItems: ReportStyleItem[];
    selectedReportStyle: ko.Observable<ReportStyleItem>;
}
export declare function _registerLegacyChooseReportStylePage(factory: PageFactory): void;
