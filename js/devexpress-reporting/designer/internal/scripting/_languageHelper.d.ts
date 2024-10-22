﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_languageHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../../controls/xrReport';
export declare class LanguageHelper {
    private _report;
    getLanguageMode(): "ace/mode/csharp" | "ace/mode/vbscript" | "ace/mode/text";
    createNewHandler(eventName: string, eventArgsType: string): string;
    getFunctionNamesFromScript(scripts: string): any[];
    constructor(report: ko.Observable<ReportViewModel>);
    createCompleters(editor: any, bindingContext: any, viewModel: any): Array<{
        getCompletions: any;
    }>;
}
