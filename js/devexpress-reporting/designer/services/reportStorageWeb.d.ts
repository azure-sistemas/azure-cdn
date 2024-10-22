﻿/**
* DevExpress HTML/JS Reporting (designer\services\reportStorageWeb.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../controls/xrReport';
export declare class ReportStorageWeb {
    static getErrorMessageHandler(defaultErrorMessage?: string): (message: string, jqXHR: JQueryXHR, textStatus: string) => void;
    static getReportByUrl(url: string): JQueryPromise<ReportViewModel>;
    static getData(url: string): any;
    static setData(layout: string, url: string): any;
    static setNewData(layout: string, url: string): JQueryPromise<any>;
    static getUrls(subreports?: any): any;
}
