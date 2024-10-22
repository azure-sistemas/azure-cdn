﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_actions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
import { Disposable, IAction } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IActionsProvider, ActionListsBase } from '@devexpress/analytics-core/analytics-internal';
export declare class PreviewDesignerActions extends Disposable implements IActionsProvider {
    actions: IAction[];
    dispose(): void;
    constructor(reportPreview: ReportPreview, fullscreen: ko.Computed<boolean>);
    getActions(context: any): IAction[];
}
export declare class ActionLists extends ActionListsBase {
    private _reportPreview;
    constructor(reportPreview: ReportPreview, globalActionProviders: ko.ObservableArray<IActionsProvider>, customizeActions?: (actions: IAction[]) => void, enabled?: ko.Observable<boolean>);
    processShortcut(actions: IAction[], e: JQueryKeyEventObject): void;
    dispose(): void;
    globalActionProviders: ko.ObservableArray<IActionsProvider>;
}
export declare class PreviewActions extends Disposable implements IActionsProvider {
    actions: IAction[];
    wrapDisposable<T>(object: T): T;
    constructor(reportPreview: ReportPreview);
    dispose(): void;
    getActions(context: any): IAction[];
}
