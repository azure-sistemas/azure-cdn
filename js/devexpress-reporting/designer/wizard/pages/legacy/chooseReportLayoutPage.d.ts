﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseReportLayoutPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { LayoutTypeItem, ReportLayout, PageOrientationItem } from '../../internal/layoutPageUtils';
import { ILegacyReportWizardState } from '../../reportWizardState';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
export declare class LegacyChooseReportLayoutPage extends WizardPageBase {
    private _isGroupedReport;
    private _reportLayoutTypes;
    private _groupedReportLayoutsTypes;
    canFinish(): boolean;
    initialize(state: ILegacyReportWizardState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<{
        fitFieldsToPage?: boolean;
        layout?: ReportLayout;
        portrait?: boolean;
    }, any, any>;
    toggleFitFieldsToPage: () => void;
    selectedLayoutType: ko.Observable<LayoutTypeItem>;
    fitFieldsToPage: ko.Observable<boolean>;
    pageOrientationItems: PageOrientationItem[];
    selectedPageOrientation: ko.Observable<PageOrientationItem>;
    layoutTypeItems: ko.PureComputed<LayoutTypeItem[]>;
    layoutTypeItemClick: (item: LayoutTypeItem) => void;
    isSelected: (item: LayoutTypeItem) => boolean;
}
export declare function _registerLegacyChooseReportLayoutPage(factory: PageFactory): void;
