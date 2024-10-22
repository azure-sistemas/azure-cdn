﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_errorPanelViewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ErrorType, IErrorModel, IErrorProvider } from './_types';
import { ControlScrollingTool } from '../_controlScrollingTool';
import { SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { ReportDesignerControlsHelper } from '../../helpers/_reportDesignerControlsHelper';
interface IPositionX<T> {
    left?: ko.Subscribable<T>;
    right?: ko.Subscribable<T>;
    height?: ko.Subscribable<T>;
}
export interface IErrorPanelViewModelOptions {
    controlScrollingTool?: ControlScrollingTool;
    controlsHelper?: ReportDesignerControlsHelper;
    selection?: SurfaceSelection;
    editableObject?: ko.Observable<any>;
    position?: IPositionX<number>;
    undoEngine?: () => UndoEngine;
    onClick?: () => void;
}
export declare class ErrorPanelViewModel extends Disposable {
    private _offset;
    private _height;
    private _controlScrollingTool;
    private _controlsHelper;
    private _selection;
    private _editableObject;
    private _position;
    private _errorSource;
    private _choosenTypes;
    private _filterValue;
    private _getUndoEngine;
    private _onClick;
    private _latestChangeSet;
    private _collectErrorButtonDisabled;
    private _createMessage;
    private _expandParentBands;
    _dataGridOptions: any;
    collapsed: ko.Observable<boolean>;
    position: ko.Observable<any>;
    _errorList: ko.ObservableArray<IErrorModel>;
    _providers: IErrorProvider[];
    _subscriptions: ko.Subscription[];
    _errorMessage: ko.Computed<string>;
    _warningMessage: ko.Computed<string>;
    _informationMessage: ko.Computed<string>;
    clear(): void;
    navigateToItem(name: string): void;
    _resizableOptions: any;
    getNotificationTemplate(): "dxrd-svg-errorPanel-notification" | "dxrd-svg-errorPanel-notification_empty";
    getTitleMessage(): string;
    assignErrors(): void;
    subscribeProvider(provider: IErrorProvider): void;
    collectErrors(): void;
    toggleCollapsed(): void;
    createDataGridOptions(undoEngine: () => UndoEngine): void;
    getIconTemplateName(errorType: ErrorType): string;
    constructor(options: IErrorPanelViewModelOptions);
}
export {};
