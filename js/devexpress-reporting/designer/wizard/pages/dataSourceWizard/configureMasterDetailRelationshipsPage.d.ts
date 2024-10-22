﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\configureMasterDetailRelationshipsPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
import { IReportWizardCallbacks } from '../../internal/_utils';
import { SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import { PageFactory, ConfigureMasterDetailRelationshipsPage as ConfigureAnalyticMasterDetailRelationshipsPage } from '@devexpress/analytics-core/analytics-wizard';
export declare class ConfigureMasterDetailRelationshipsPage extends ConfigureAnalyticMasterDetailRelationshipsPage {
    private _dataSourceWizardHelper;
    constructor(createSqlDataSourceInfo: (dataSource: SqlDataSource) => JQueryPromise<IDataSourceInfo>, sqlDataSourceResultSchema: any);
    initialize(state: any): JQueryPromise<import("@devexpress/analytics-core/analytics-data").ResultSet>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerConfigureMasterDetailRelationshipsPage(factory: PageFactory, callbacks: IReportWizardCallbacks): void;
