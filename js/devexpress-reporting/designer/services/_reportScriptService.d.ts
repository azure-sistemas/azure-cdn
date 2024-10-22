﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportScriptService.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../controls/xrReport';
export declare class ReportScriptService {
    static validateScripts(report: ReportViewModel): any;
    static getCompletions(editor: any, session: any, pos: any, prefix: any, callback: any, report: any, editorInstance: any, guid: string): any;
    static setCodeDom(key: string, reportLayout: string): any;
}
