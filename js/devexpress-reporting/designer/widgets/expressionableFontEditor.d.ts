﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressionableFontEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { FontEditor, ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
export declare class ExpressionableFontEditor extends FontEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    createObjectProperties(): ObjectProperties;
}
