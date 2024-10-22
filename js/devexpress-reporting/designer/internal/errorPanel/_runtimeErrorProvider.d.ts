﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_runtimeErrorProvider.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IErrorModel, IErrorProvider } from './_types';
export declare class RuntimeErrorProvider implements IErrorProvider {
    errors: ko.ObservableArray<IErrorModel>;
    collectErrors(): void;
}
