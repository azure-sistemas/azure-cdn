﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
export declare class ElementActions extends BaseActionsProvider {
    private _selectionProvider;
    private _generalDisabled;
    private _isMultiSelect;
    constructor(surfaceContext: ko.Observable<ISurfaceContext>, selectionProvider: ISelectionProvider);
    condition(context: any): boolean;
}
