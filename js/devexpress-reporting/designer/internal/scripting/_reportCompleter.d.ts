﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_reportCompleter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../../controls/xrReport';
export declare class ReportCompleter {
    __getCompletions(editor: any, session: any, pos: any, prefix: any, callback: any): void;
    constructor(report: ko.Observable<ReportViewModel>, editorInstance: any, guid: any);
    getCompletions(editor: any, session: any, pos: any, prefix: any, callback: any): void;
    completions: any[];
    oldPrefix: string;
    report: ko.Observable<ReportViewModel>;
    editorInstance: any;
    guid: ko.Observable<string> | ko.Computed<string>;
}
