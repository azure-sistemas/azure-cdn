﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_bandLevelEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { UndoEditor } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
export declare class BandLevelEditor extends UndoEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    max: ko.PureComputed;
    min: number;
}
