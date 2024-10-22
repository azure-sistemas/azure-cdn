﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\valueSourceSettingsHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { LookUpValue } from './lookUpValue';
export declare class ValueSourceSettingsHelper {
    parameter: Parameter;
    private _updateValueSourceSettingsType;
    private _updateValueSourceSettings;
    constructor(parameter: Parameter);
    initializeParameterSettingsType(): void;
    initializeLookupValueSubscribe(report: any): void;
    initializeLookUpValue(lookUpValue: LookUpValue): void;
    updateLookUpValues(newType: string, value?: any): void;
    updateSettingValues(newType: string, value?: any): void;
}
import { Parameter } from './parameter';
