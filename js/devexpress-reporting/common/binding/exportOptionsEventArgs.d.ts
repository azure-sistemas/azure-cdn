﻿/**
* DevExpress HTML/JS Reporting (common\binding\exportOptionsEventArgs.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPreviewExportOptionsCustomizationArgs } from '../../viewer/utils/initializer';
export declare class CustomizeExportOptionsEventArgs {
    constructor(options: IPreviewExportOptionsCustomizationArgs);
    HideExportOptionsPanel(): void;
    HideFormat(format: any): void;
    HideProperties(format: any, ...paths: (string | string[])[]): void;
    GetExportOptionsModel(format: any): any;
    _options: IPreviewExportOptionsCustomizationArgs;
}
