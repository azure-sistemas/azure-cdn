﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDependencyEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class ChartDependencyEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    getDependencyOptions(templateOptions: any, propertyName: any, depPropertyName: any): any;
    depProperty: any;
    bindableOptions: any;
}
