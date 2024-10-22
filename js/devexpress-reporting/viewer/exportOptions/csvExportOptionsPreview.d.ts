﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\csvExportOptionsPreview.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CsvExportOptions } from '../../common/exportOptions/csvExportOptions';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class CsvExportOptionsPreview extends CsvExportOptions {
    static from(model: any, serializer?: IModelSerializer): CsvExportOptionsPreview;
    isPropertyVisible(name: string): boolean;
    isPropertyDisabled(name: string): boolean;
}
