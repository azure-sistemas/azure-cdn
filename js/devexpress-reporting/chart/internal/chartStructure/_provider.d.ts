﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_provider.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStructureProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class ChartStructureObjectProvider extends ObjectStructureProvider {
    getClassName(instance: any): any;
    createArrayItem(currentTarget: Array<any>, result: IDataMemberInfo[], propertyName?: any): void;
    constructor(target: any, displayName?: string, localizationId?: string);
}
import { IDataMemberInfo } from '@devexpress/analytics-core/widgets/utils';
