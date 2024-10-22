﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_groupEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import { Editor, PropertyGridEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class ParametersGroupEditor extends PropertyGridEditor {
    _setPadding(position: string, value: any): {};
    createObjectProperties(): import("@devexpress/analytics-core/analytics-widgets").ObjectProperties;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    hideEditorHeader: boolean;
    hideCollapsingImage: boolean;
    hideBorder: boolean;
    showHorizontally: boolean;
    isGroupLabel: boolean;
}
export declare class ParametersEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    hasVerticalLabel: boolean;
    hasSeparator: boolean;
}
