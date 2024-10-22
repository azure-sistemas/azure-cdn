﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\chooseJsonSchemaPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
import { IReportWizardCallbacks } from '../../internal/_utils';
import { JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { PageFactory, ChooseJsonSchemaPage as ChooseAnalyticJsonSchemaPage } from '@devexpress/analytics-core/analytics-wizard';
export declare class ChooseJsonSchemaPage extends ChooseAnalyticJsonSchemaPage {
    private _dataSourceWizardHelper;
    private _dataSourceId;
    constructor(createJsonDataSourceInfo: (dataSource: JsonDataSource) => JQueryPromise<IDataSourceInfo>);
    initialize(state: any): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _registerChooseJsonSchemaPage(factory: PageFactory, callbacks: IReportWizardCallbacks): void;
