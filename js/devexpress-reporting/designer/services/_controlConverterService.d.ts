/**
* DevExpress HTML/JS Reporting (designer\services\_controlConverterService.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class ControlConverterService {
    static getXmlStringFromJson(controlJsonLayout: string, doneCallback: (result: any) => void, errorCallback: (error: any) => void): any;
    static getControlModelFromXmlString(controlXmlLayout: string, doneCallback: (result: any) => void, errorCallback: (error: any) => void): any;
}
