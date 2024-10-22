﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_types.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare enum ErrorSource {
    ReportCreation = 0,
    ReportLayout = 1,
    ReportScripts = 2,
    All = 3
}
export declare enum ErrorType {
    Error = 0,
    Warning = 1,
    Information = 2
}
export interface IErrorModel {
    code: string;
    description: string;
    errorSource: ErrorSource;
    errorType: ErrorType;
    message: string;
    controlName?: string;
}
export interface IErrorProvider {
    errors: ko.ObservableArray<IErrorModel>;
    collectErrors(): void;
}
