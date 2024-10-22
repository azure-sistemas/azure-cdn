﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportWizardService.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportWizardState } from '../wizard/reportWizardState';
import { IDataSourceInfo } from '../actions/_sqlDataSourceEditor';
import { JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { IJsonDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
export declare class ReportWizardService {
    static createNewWizardRequest(reportWizardState: IReportWizardState, requestType: any, state: any, customizeWizardModelAction: (wizardModel: any) => void, oldReportJSON?: any): string;
    static generateReportFromWizardState(reportWizardState: IReportWizardState, requestType: any, state: any, customizeWizardModelAction: (wizardModel: any) => void, oldReportJSON?: string): any;
    static getLabelReportWizardData(): any;
    static createNewJsonDataSource(state: IJsonDataSourceWizardState, createJsonCallback: (dataSource: JsonDataSource) => JQueryPromise<IDataSourceInfo>): JQuery.Promise<string, any, any>;
}
