﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pdfContentActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { XRPdfContentViewModel } from '../controls/xrPdfContent';
export declare class PdfContentActions extends BaseActionsProvider {
    private _selection;
    readonly _focusedPdfContent: XRPdfContentViewModel;
    constructor(_selection: ISelectionProvider, isDisabled?: () => boolean);
    condition(context: any): boolean;
}
