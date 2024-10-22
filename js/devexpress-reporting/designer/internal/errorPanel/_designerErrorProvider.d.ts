﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_designerErrorProvider.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ReportViewModel } from '../../controls/xrReport';
import { IErrorModel, IErrorProvider } from './_types';
export declare class DesignerErrorProvider extends Disposable implements IErrorProvider {
    private _report;
    errors: ko.ObservableArray<IErrorModel>;
    collectErrors(): any;
    constructor(_report: ReportViewModel);
}
