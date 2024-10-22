﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportElementActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementActions } from './elementActions';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class ReportElementActions extends ElementActions {
    constructor(surfaceContext: ko.Observable<ISurfaceContext>, selection: ISelectionProvider);
    getActions(context: any): import("@devexpress/analytics-core/analytics-utils").IAction[];
}
