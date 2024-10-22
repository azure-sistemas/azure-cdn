﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseReportTypePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from '../internal/utils';
import { PageFactory, FullscreenWizardPageFactory, ChooseDataSourceTypePage as AnalyticChooseDataSourceTypePage } from '@devexpress/analytics-core/analytics-wizard';
interface ISelectReportTypePageOptions {
    canCreateDatabound: boolean | (() => boolean);
    showVertical?: boolean;
}
export declare class SelectReportTypePage extends AnalyticChooseDataSourceTypePage {
    private _options;
    constructor(_options: ISelectReportTypePageOptions);
    _addDataboundReportType(): void;
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<any, any, any>;
    initialize(state: any): JQuery.Promise<any, any, any>;
    _extendCssClass: (rightPath: any) => string;
}
export declare class ChooseDataSourceTypePage extends AnalyticChooseDataSourceTypePage {
    constructor(dataSourceWizardOptions: _ReportWizardOptions);
}
export declare function _registerSelectReportTypePage(factory: FullscreenWizardPageFactory, options: ISelectReportTypePageOptions): void;
export declare function _registerChooseDataSourceTypePage(factory: PageFactory, dataSourceWizardOptions: _ReportWizardOptions): void;
export {};
