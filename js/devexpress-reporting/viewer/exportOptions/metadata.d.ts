﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\metadata.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare var rtfExportModeMergedPreview: ISerializationInfo;
export declare var docxExportModeMergedPreview: ISerializationInfo;
export declare function excludeModesForMergedDocuments(val: string): ko.Observable<string>;
export declare function excludeDifferentFilesMode(val: string): ko.Observable<string>;
export declare var htmlExportModePreviewBase: ISerializationInfo;
export declare var htmlExportModePreview: ISerializationInfo;
export declare var htmlExportModeMergedPreview: ISerializationInfo;
export declare var xlsExportModePreviewBase: ISerializationInfo;
export declare var xlsExportModePreview: ISerializationInfo;
export declare var xlsExportModeMergedPreview: ISerializationInfo;
export declare var imageExportModePreviewBase: ISerializationInfo;
export declare var imageExportModePreview: ISerializationInfo;
export declare var imageExportModeMergedPreview: ISerializationInfo;
export declare var xlsxExportModePreviewBase: ISerializationInfo;
export declare var xlsxExportModePreview: ISerializationInfo;
export declare var xlsxExportModeMergedPreview: ISerializationInfo;
