﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressViewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable, IDisposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal';
export interface IElementPosition {
    top: boolean;
    bottom?: boolean;
    left: boolean;
    right?: boolean;
}
export interface IProgressHandler extends IDisposable {
    stop?: () => void;
    cancelText?: ko.Observable<string> | ko.Computed<string>;
    progress: ko.Observable<number> | ko.Computed<number>;
    text: ko.Observable<string> | ko.Computed<string>;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
    startProgress: (onComplete?: () => void, onStop?: () => void) => void;
    inProgress: ko.Observable<boolean> | ko.Computed<boolean>;
    complete: () => void;
    cssClasses: ko.Observable<string | {
        [key: string]: boolean;
    }>;
    setPosition: (position: IElementPosition) => void;
}
export declare class ProgressViewModel extends Disposable implements IProgressHandler {
    progress: ko.Observable<number>;
    private _forceInvisible;
    private _onComplete;
    constructor(enableKeyboardSupport?: boolean);
    stop: () => void;
    inProgress: ko.Observable<boolean>;
    cancelText: ko.Observable<any>;
    text: ko.Observable<string>;
    cssClasses: ko.Observable<{
        [key: string]: boolean;
    }>;
    progressBarAccessibility: ListKeyboardHelper;
    visible: ko.PureComputed<boolean>;
    setPosition(position: IElementPosition): void;
    complete: () => void;
    startProgress: (onComplete?: () => void, onStop?: () => void) => void;
}
