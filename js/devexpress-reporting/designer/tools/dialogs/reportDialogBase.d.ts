﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\reportDialogBase.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { INavigateTab } from '../navigation/navigateTab';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IDialogModel {
    getUrl: () => string;
    setUrl: (url: string) => void;
    onShow: (tab: INavigateTab) => void;
    popupButtons: any[];
}
export declare class ReportDialogBase extends Disposable {
    private _visible;
    dispose(): void;
    show(tab: INavigateTab): void;
    customize(template: string, model: IDialogModel): void;
    constructor();
    width: ko.Observable<any>;
    height: ko.Observable<any>;
    template: ko.Observable<string>;
    buttons: any[];
    model: ko.Observable<IDialogModel>;
    tab: ko.Observable<INavigateTab>;
    disabled: ko.Observable<boolean>;
    visible: ko.Computed<boolean>;
    cancel(): void;
    container: (element: HTMLElement) => JQuery<HTMLElement>;
}
