﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\imageSourceEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IFileUploadResult } from '@devexpress/analytics-core/analytics-internal';
import { dxFileImagePicker } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare class dxImageSourceEditor extends dxFileImagePicker {
    updateOptions(options: any): void;
    _toggleReadOnlyState(): void;
    _handleResult(result: IFileUploadResult): void;
}
