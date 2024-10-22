﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_parametersPopup.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewParametersViewModel } from '../../parameters/previewParametersViewModel';
import { MobileReportPreview } from '../mobilePreview';
import { DateRangeEditor } from '../../widgets/dateRange/dateRangeEditor';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IParamtersPopupFormModel {
    visible: ko.Observable<boolean>;
    submit?: () => void;
    reset?: () => void;
    cancel?: () => void;
}
export interface IParametersPopupButton {
    className: string;
    text: string;
    action: (params: any) => void;
    disabled: boolean | ko.Observable<boolean> | ko.Computed<boolean> | ko.Subscribable<boolean>;
    visible: boolean | ko.Observable<boolean> | ko.Computed<boolean> | ko.Subscribable<boolean>;
    id: 'dxrv-mobile-reset' | 'dxrv-mobile-cancel' | 'dxrv-mobile-submit' | string;
}
export declare class ParametersPopupModelBase extends Disposable {
    private formModel;
    private _parametersButtonContaner;
    private _submit;
    private _reset;
    private _cancel;
    constructor(formModel: IParamtersPopupFormModel);
    cacheElementContent(element: any): void;
    dispose(): void;
    initVisibilityIcons(): void;
    title: string;
    contentTemplate: string;
    model: any;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
    actionButtons: IParametersPopupButton[];
    actionIcons: any;
    cancelDisabled: ko.Subscribable<boolean>;
    showIcons: ko.Observable<boolean>;
    className: string;
}
export declare class ParametersPopupModel extends ParametersPopupModelBase {
    model: PreviewParametersViewModel;
    private _reportPreview;
    constructor(model: PreviewParametersViewModel, _reportPreview: MobileReportPreview);
}
export declare class DateRangeParemeterPopupModel extends ParametersPopupModelBase {
    model: DateRangeEditor;
    private _oldStart;
    private _oldEnd;
    private _dateEditorClassName;
    private _dateButtonEditorClassName;
    constructor(model: DateRangeEditor);
    textRangeValue: ko.Subscribable<string>;
    getStringDate: (value: ko.Subscribable<string>) => string;
    focusButton: (e: any) => void;
}
