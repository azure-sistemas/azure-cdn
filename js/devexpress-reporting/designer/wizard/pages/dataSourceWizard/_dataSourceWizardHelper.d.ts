﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\_dataSourceWizardHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceInfo } from '../../../actions/_sqlDataSourceEditor';
import { PageFactory, IWizardPageMetadata, IWizardPage } from '@devexpress/analytics-core/analytics-wizard';
export declare function overrideJsonDataSourceWizardPage(factory: PageFactory, pageId: string, meta: IWizardPageMetadata<IWizardPage>): void;
export declare function overrideSqlDataSourceWizardPage(factory: PageFactory, pageId: string, meta: IWizardPageMetadata<IWizardPage>): void;
export declare class DataSourceWizardHelper {
    private _page;
    private _callback;
    constructor(_page: IWizardPage, _callback: (dataSource: any) => JQueryPromise<IDataSourceInfo>);
    commit(superCommit: () => JQueryPromise<any>, createDataSource: (state: any) => any): JQuery.Promise<any, any, any>;
}
