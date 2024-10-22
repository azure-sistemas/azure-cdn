﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportDataSourceService.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPathRequest, IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { SqlDataSource, JsonDataSource, TableQuery } from '@devexpress/analytics-core/analytics-data';
import { IObjectDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
export declare class ReportDataSourceService {
    static fieldListCallback(request: IPathRequest): JQueryPromise<IDataMemberInfo[]>;
    static getCustomQueriesPreset(dataSource: SqlDataSource): JQueryPromise<TableQuery[]>;
    static sqlDataSourceFromBase64(base64: string): JQueryPromise<{
        sqlDataSourceJSON: string;
        queryName: string;
        relationsEditing: boolean;
    }>;
    static getSqlDataSourceBase64(dataSource: SqlDataSource): JQueryPromise<string>;
    static getJsonDataSourceBase64(dataSource: JsonDataSource): JQueryPromise<{
        base64: string;
        schema: string;
    }>;
    static getObjectDataSourceBase64(json: IObjectDataSourceWizardState): JQueryPromise<string>;
    static editObjectDataSourceParameters(json: IObjectDataSourceWizardState, base64: string): JQueryPromise<string>;
    static objectDataSourceFromBase64(base64: string): JQueryPromise<IObjectDataSourceWizardState>;
    static jsonDataSourceFromBase64(base64: string): JQueryPromise<{
        jsonDataSourceJSON: string;
    }>;
}
