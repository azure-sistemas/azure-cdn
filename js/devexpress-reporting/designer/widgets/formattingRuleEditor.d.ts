﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\formattingRuleEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ICollectionEditorOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class FormattingRuleEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    options: ICollectionEditorOptions;
}
