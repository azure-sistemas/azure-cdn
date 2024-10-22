﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigureParametersPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
import { IReportWizardCallbacks } from '../../internal/_utils';
import { SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import { PageFactory, MultiQueryConfigureParametersPage as AnalyticMultiQueryConfigureParametersPage } from '@devexpress/analytics-core/analytics-wizard';
export declare class MultiQueryConfigureParametersPage extends AnalyticMultiQueryConfigureParametersPage {
    private createSqlDataSourceInfo;
    private _dataSourceWizardHelper;
    constructor(createSqlDataSourceInfo: (dataSource: SqlDataSource) => JQueryPromise<IDataSourceInfo>, parametersConverters?: any, requestWrapper?: any);
    initialize(state: any): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerMultiQueryConfigureParametersPage(factory: PageFactory, callbacks: IReportWizardCallbacks): void;
