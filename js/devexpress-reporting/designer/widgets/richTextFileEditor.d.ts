﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\richTextFileEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IFileUploadResult } from '@devexpress/analytics-core/analytics-internal';
import { dxFileImagePicker } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare class dxRichTextFileEditor extends dxFileImagePicker {
    constructor(element: any, options?: any);
    _handleResult(result: IFileUploadResult): void;
}
