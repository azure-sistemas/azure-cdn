﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\saveReportDialog.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDialogModel, ReportDialogBase } from './reportDialogBase';
import { INavigateTab } from '../navigation/navigateTab';
import { SaveAsReportDialog } from './saveAsReportDialog';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import * as ko from 'knockout';
export declare class SaveReportDialogModelBase implements IDialogModel {
    onShow(tab: INavigateTab): void;
    getUrl(): string;
    setUrl(url: any): void;
    constructor(popup: SaveReportDialog);
    popupButtons: any[];
    reportUrl: ko.Observable<string>;
    saveText: ko.Observable<string>;
}
export declare class SaveReportDialog extends ReportDialogBase {
    constructor(saveReportDialog: SaveAsReportDialog, callbacks: IReportDesignerCustomizationHandler);
    save(url: any): void;
    notSave(): void;
    cancel(): void;
    saveReportDialog: SaveAsReportDialog;
    onSaving: (e: any) => void;
    onSaved: (e: any) => void;
    title: string;
}
