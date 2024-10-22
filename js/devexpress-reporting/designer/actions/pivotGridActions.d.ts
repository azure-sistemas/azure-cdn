﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pivotGridActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BaseActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { BaseConverter } from '../internal/_baseConverter';
export declare class PivotGridActions extends BaseActionsProvider {
    private _converters;
    readonly _converter: BaseConverter;
    constructor(_converters: BaseConverter[], isDisabled?: () => boolean);
    condition(context: any): boolean;
}
