﻿/**
* DevExpress HTML/JS Reporting (designer\actions\textElementAction.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class TextElementAction extends BaseActionsProvider {
    private _selectionProvider;
    private readonly _textControls;
    private _inaccessibleAction;
    constructor(_selectionProvider: ISelectionProvider);
    condition(context: any): boolean;
}
