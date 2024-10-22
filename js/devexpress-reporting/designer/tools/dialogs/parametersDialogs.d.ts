﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\parametersDialogs.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Parameter } from '../../dataObjects/parameters/parameter';
import { ObjectItem } from '../../dataObjects/objectStorageItem';
import { ReportViewModel } from '../../controls/xrReport';
import { Disposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ObjectProperties } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { ICollectionEditorOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
declare class SettingsAreaModel {
    private _parameter;
    getInfo(): any[];
    constructor(_parameter: Parameter);
    isPropertyVisible(propertyName: string): boolean;
    valueSourceSettingsType: ko.Observable<string>;
    valueSourceSettings: ko.Observable<ObjectItem> | ko.Computed<ObjectItem>;
}
export declare class ParametersDialogBase extends Disposable {
    protected _currentReport: ReportViewModel;
    dispose(): void;
    protected onSubmit(): void;
    protected readonly undoEngine: UndoEngine;
    private _undoEngine;
    private _isSubmited;
    private _createButton;
    constructor(_currentReport: ReportViewModel);
    protected selectParameter(parameter: Parameter): void;
    show(parameter?: Parameter): void;
    _onStart(parameter: Parameter): void;
    close(): void;
    submit(): void;
    buttons: {
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: string;
            onClick: () => void;
        };
    }[];
    _propertiesGrid: ObjectProperties;
    _settingsGrid: ObjectProperties;
    _selectedParameter: ko.Observable<Parameter>;
    _selectedSettings: ko.Computed<SettingsAreaModel>;
    visible: ko.Observable<boolean>;
    contentTemplate: string;
    container: (element: HTMLElement) => JQuery<HTMLElement>;
}
export declare class AddParameterDialog extends ParametersDialogBase {
    protected _createParameter(parameters?: Parameter[]): Parameter;
    onSubmit(): void;
    _onStart(parameter?: Parameter): void;
    popupCss: string;
    title: any;
    width: string | number;
    height: number;
    contentTemplate: string;
}
export declare class EditParametersDialog extends AddParameterDialog {
    dispose(): void;
    _parametersListOptions: ICollectionEditorOptions;
    constructor(report: ReportViewModel);
    onSubmit(): void;
    width: string;
    height: number;
    popupCss: string;
    title: any;
    contentEmptyAreaPlaceHolder: any;
    contentTemplate: string;
    contentVisible: ko.Computed<boolean>;
}
export {};
