﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_jsonDataSourceEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceEditorBase, IDataSourceInfo } from './_sqlDataSourceEditor';
import { DataSourceWizardPageIterator, IDataSourceWizardState, IDataSourceWizardConnectionStrings } from '@devexpress/analytics-core/analytics-wizard';
import { JsonDataSource } from '@devexpress/analytics-core/analytics-data';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
export declare class JsonEditSchemaIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId: any): any;
}
export declare class JsonDataSourceEditor extends DataSourceEditorBase {
    private _applyDataSourceChange;
    editSchema(dataSourceID: string): void;
    applyDataSourceWizardChanges(dataSourceWizardModel: IDataSourceWizardState): JQueryPromise<IDataSourceInfo>;
    saveJsonSource(state: IDataSourceWizardState, connections: IDataSourceWizardConnectionStrings): JQuery.Promise<any, any, any>;
    static createJsonDataSourceInfo(source: JsonDataSource): JQueryPromise<IDataSourceInfo>;
    editSchemaAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    getActions(context: any): IAction[];
}
