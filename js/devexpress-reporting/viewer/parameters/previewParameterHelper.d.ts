﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameterHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ParameterHelper } from './parameterHelper';
import { ILookUpValue } from './previewParametersViewModel';
import { PreviewParameter } from './previewParameter';
import { IEnumType } from '../../common/customTypes';
import { IParametersCustomizationHandler } from '../utils/initializer';
import { ISerializationInfo, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
export declare class PreviewParameterHelper extends ParameterHelper {
    callbacks?: IParametersCustomizationHandler;
    mapLookUpValues(type: string, lookUpValues: Array<ILookUpValue>): Array<IDisplayedValue>;
    static fixPropertyName(propertyName: string): string;
    static getPrivatePropertyName(propertyName: string): string;
    createInfo(parameter: PreviewParameter): ISerializationInfo;
    assignValueStore(info: ISerializationInfo, parameter: PreviewParameter): void;
    isEnumType(parameter: PreviewParameter): boolean;
    getValueConverter(type: string): (val: any) => any;
    getRangeEditor(): {
        header: string;
    };
    constructor(knownEnums?: Array<IEnumType>, callbacks?: IParametersCustomizationHandler);
}
