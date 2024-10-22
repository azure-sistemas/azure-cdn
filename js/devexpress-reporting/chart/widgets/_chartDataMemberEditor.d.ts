﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataMemberEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
export declare class ChartDataMemberEditor extends FieldListEditor {
    private _isNumber;
    private _isDate;
    private _getArgumentDataMemberFilter;
    private _getValueDataMemberFilter;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>);
}
