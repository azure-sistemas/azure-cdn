﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IComponentAddedEventArgs } from '../utils/inititalizer';
import { IActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { IAction } from '@devexpress/analytics-core/analytics-utils';
export declare class ReportActions implements IActionsProvider {
    actions: IAction[];
    private _contextModel;
    private _targetModel;
    private _canAddBand;
    private _addBand;
    constructor(onComponentAdded?: any);
    getActions(context: any): IAction[];
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}
