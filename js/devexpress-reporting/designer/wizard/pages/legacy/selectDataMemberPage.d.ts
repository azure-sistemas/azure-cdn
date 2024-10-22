﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\selectDataMemberPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportWizardState } from '../../reportWizardState';
import { _ReportWizardOptions } from '../../internal/utils';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { FieldListProvider } from '@devexpress/analytics-core/analytics-internal';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { DataMemberTreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare class LegacyChooseDataMemberPage extends WizardPageBase {
    private _rootItems;
    private _selectedPath;
    private _fieldListCallBack;
    private _createSqlDataSourceInfo;
    private _dataSource;
    private _hideDataMemberSubItems;
    private _wrapFieldListCallback;
    private readonly dataSourcePath;
    private _beginInternal;
    constructor(reportWizardOptions: _ReportWizardOptions);
    canNext(): boolean;
    canFinish(): boolean;
    initialize(state: IReportWizardState): JQueryPromise<any>;
    commit(): JQuery.Promise<{
        dataMemberPath?: string;
        dataMemberInfo?: IDataMemberInfo;
    }, any, any>;
    scrollViewHeight: string;
    fieldListModel: {
        itemsProvider: FieldListProvider;
        selectedPath: any;
        treeListController: DataMemberTreeListController;
    };
}
export declare function _registerLegacyChooseDataMemberPage(factory: PageFactory, reportWizardOptions: _ReportWizardOptions): void;
