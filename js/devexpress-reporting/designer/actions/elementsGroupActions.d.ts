﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementsGroupActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
export declare class ElementsGroupActions extends BaseActionsProvider {
    private _selectionProvider;
    actions: IAction[];
    constructor(surfaceContext: ko.Observable<ISurfaceContext>, selectionProvider: ISelectionProvider);
    condition(context: any): boolean;
}
