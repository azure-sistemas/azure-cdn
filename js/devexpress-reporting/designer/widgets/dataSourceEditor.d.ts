﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class DataSourceEditor extends Editor {
    private _getEditorOptions;
    dispose(): void;
    getEditorOptions(dataSourceHelper: ko.Observable<DataSourceHelper>, undoEngine: ko.Observable<UndoEngine>, popupContainer: string): any;
}
