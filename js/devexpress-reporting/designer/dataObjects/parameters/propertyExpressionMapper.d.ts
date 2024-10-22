﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\propertyExpressionMapper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
export declare class PropertyExpressionMapper {
    static propertiesWithExpressions: string[];
    getExpressionPropertyName(propertyName: string): string;
    registerExpressionProperty(property: ISerializationInfo): ISerializationInfo;
    isPropertyVisible(propertyName: string, editingMode: boolean): boolean;
    getExpressionProperty(propertyName: string): {
        showExpression: ko.Observable<boolean>;
    };
    private _mapper;
}
