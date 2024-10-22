﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\summaryEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SummaryEditorModel, SummaryEditorPopup } from './_summaryEditor';
import { PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets';
export declare class SummaryEditor extends PropertyGridEditor {
    dispose(): void;
    getPopupServiceActions(): import("@devexpress/analytics-core/analytics-internal").IModelAction[];
    summaryModel: SummaryEditorModel;
    popup: SummaryEditorPopup;
}
