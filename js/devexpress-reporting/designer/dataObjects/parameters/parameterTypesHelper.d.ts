﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterTypesHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface IParameterType {
    value: string;
    displayValue: string;
    defaultVal: any;
    specifics: string;
    valueConverter: (val: any) => any;
}
export interface IParameterTypeValue {
    value: string;
    displayValue: string;
    defaultValue: any;
    specifics: string;
    valueConverter: (val: any, defaultValue?: any) => any;
    icon?: string;
    localizationId?: string;
}
export declare class ParameterTypesHelper {
    static defaultGuidValue: string;
    static typeValues: IParameterTypeValue[];
    private _getTypeInfo;
    private _tryConvertValue;
    convertSingleValue(value: any, typeName: string): any;
    getSpecifics(typeName: string): string;
    getIcon(typeName: string): string;
    getDefaultValue(typeName: string): any;
}
