﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportComplexExpressionEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ReportExpressionEditorWrapper } from './reportExpressionEditorWrapper';
import { ReportExpressionEditor } from './reportExpressionEditor';
export declare class ReportComplexExpressionEditor extends ReportExpressionEditor {
    wrapper: ReportExpressionEditorWrapper;
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    showPopup(editableObject: any): void;
    editorTemplateName: string;
}
