﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigurePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { _ReportWizardOptions } from '../../internal/utils';
import { PageFactory, MultiQueryConfigurePage as AnalyticMultiQueryConfigurePage } from '@devexpress/analytics-core/analytics-wizard';
export declare class MultiQueryConfigurePage extends AnalyticMultiQueryConfigurePage {
    private _dataSourceWizardHelper;
    constructor(reportWizardOptions: _ReportWizardOptions);
    _getQueriesCount(): any;
    _canEditQueryParameters(): any;
    initialize(state: any): JQuery.Promise<import("@devexpress/analytics-core/queryBuilder-utils").ISqlQueryViewModel, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerMultiQueryConfigurePage(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
