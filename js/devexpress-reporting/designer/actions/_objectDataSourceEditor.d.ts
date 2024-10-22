﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_objectDataSourceEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceEditorBase, IDataSourceInfo } from './_sqlDataSourceEditor';
import { DataSourceWizardPageIterator, IObjectDataSourceWizardState, IDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
import { ObjectDataSource } from '@devexpress/analytics-core/analytics-data';
export declare class ObjectDataSourceEditParametersIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId: any): any;
}
export declare class ObjectDataSourceEditor extends DataSourceEditorBase {
    static createObjectDataSourceInfo(objectDataSourceWizard: IObjectDataSourceWizardState, objectDataSource: ObjectDataSource, base64?: string): JQueryPromise<IDataSourceInfo>;
    applyDataSourceWizardChanges(dataSourceWizardModel: IDataSourceWizardState): JQuery.Promise<IDataSourceInfo, any, any>;
    getActions(context: any): IAction[];
    editSchema(dataSourceID: string): void;
    editParametersAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
}
