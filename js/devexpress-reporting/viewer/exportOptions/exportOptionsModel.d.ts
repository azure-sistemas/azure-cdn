﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
import { Disposable, TabInfo } from '@devexpress/analytics-core/analytics-utils';
export declare class ExportOptionsModel extends Disposable {
    private _reportPreview;
    constructor(reportPreview: ReportPreview, enableKeyboardSupport?: boolean);
    _getExportFormatItems(): Array<{
        text: string;
        format: string;
    }>;
    _exportDocumentByFormat(format: any): void;
    getActions(context: any): any[];
    dispose(): void;
    actions: any[];
    tabInfo: TabInfo;
}
export declare class ExportOptionsEventHandlers {
    private _menuButton;
    onSubmenuShowing(popupContainer: any, element: any): (e: any) => void;
    onSubmenuShown(e: any): void;
    onSubmenuHiding(e: any): void;
}
