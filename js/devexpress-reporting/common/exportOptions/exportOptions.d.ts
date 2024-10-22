﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\exportOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CsvExportOptions } from './csvExportOptions';
import { HtmlExportOptions } from './htmlExportOptions';
import { ImageExportOptions } from './imageExportOptions';
import { MhtExportOptions } from './mhtExportOptions';
import { PdfExportOptions } from './pdfExportOptions';
import { PrintPreviewOptions } from './printPreviewOptions';
import { RtfExportOptions } from './rtfExportOptions';
import { TextExportOptions } from './textExportOptions';
import { XlsExportOptions } from './xlsExportOptions';
import { XlsxExportOptions } from './xlsxExportOptions';
import { DocxExportOptions } from './docxExportOptions';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class ExportOptions {
    static from(model: any, serializer?: IModelSerializer): ExportOptions;
    static toJson(value: any, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    csv: CsvExportOptions;
    html: HtmlExportOptions;
    image: ImageExportOptions;
    mht: MhtExportOptions;
    pdf: PdfExportOptions;
    printPreview: PrintPreviewOptions;
    rtf: RtfExportOptions;
    textExportOptions: TextExportOptions;
    xls: XlsExportOptions;
    xlsx: XlsxExportOptions;
    docx: DocxExportOptions;
}
