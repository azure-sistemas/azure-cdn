﻿/**
* DevExpress HTML/JS Reporting (designer\services\_formatStringService.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IFormatStringEditorActions } from '@devexpress/analytics-core/analytics-widgets';
export declare class FormatStringService {
    static saveCustomPattern(typeString: string, format: string): any;
    static removeCustomPattern(typeString: string, format: string): any;
    static updatePreview(value: string, typeString: string, format: string): any;
    static actions: IFormatStringEditorActions;
}