﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDataSourceInfo } from '../../actions/_sqlDataSourceEditor';
import { IPathRequest, IDataMemberInfo, Disposable, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
import { SqlDataSource, JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { IDataSourceInfo as IAnalyticDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { IMultiQueryDataSourceWizardCallbacks } from '@devexpress/analytics-core/analytics-wizard-internal';
export interface IReportWizardCallbacks extends IMultiQueryDataSourceWizardCallbacks {
    fieldListsCallback: IReportWizardFieldsCallback;
    createSqlDataSourceInfo?: (dataSource: SqlDataSource) => JQueryPromise<IDataSourceInfo>;
    createJsonDataSourceInfo?: (dataSource: JsonDataSource) => JQueryPromise<IDataSourceInfo>;
}
export interface IReportWizardFieldsCallback {
    (request: IPathRequest, dataSource: IAnalyticDataSourceInfo): JQueryPromise<IDataMemberInfo[]>;
}
export declare var _masterDetailWizardHeight: string;
export declare var _masterDetailWizardWidth: string;
export declare var _masterDetailScrollViewHeight: string;
export declare function overrideFullscreenDataSourceWizardPageMetadata(factory: PageFactory, pageId: string, create: () => WizardPageBase): void;
export declare class FieldInfo extends Disposable {
    constructor(data: Array<IDisplayedValue>);
    getOptions(options: any): any;
    field: ko.Observable<IDataMemberInfo>;
    selectedItems: ko.ObservableArray<any>;
    functionValue: ko.Observable<any>;
    visible: ko.Observable<boolean>;
    value: any;
}
