﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\expressionSmartTag.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { ReportExpressionEditorWrapper } from '../../widgets/expressioneditor/reportExpressionEditorWrapper';
import { ISmartTag } from './smartTagContainer';
export declare class ExpressionSmartTag extends Disposable implements ISmartTag {
    reportElement: XRReportElementViewModel;
    constructor(reportElement: XRReportElementViewModel);
    onClick(): void;
    templateName: string;
    imageTemplateName: string;
    expressionEditor: ko.Observable<ReportExpressionEditorWrapper>;
}
