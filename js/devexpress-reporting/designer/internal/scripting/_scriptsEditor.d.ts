﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_scriptsEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRReportElementViewModel } from '../../controls/xrReportelement';
import { ReportViewModel } from '../../controls/xrReport';
import { LanguageHelper } from './_languageHelper';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface ICursorPosition {
    row: number;
    column: number;
}
export interface IScriptingControl {
    scripts: any;
    lockedInUserDesigner: () => boolean;
}
export interface IAceEditor {
    setValue: (text: string) => void;
    getValue: () => string;
    getSession: () => any;
    getSelection: () => any;
    getCopyText: () => string;
    getCursorPosition: () => ICursorPosition;
    onPaste: (text: string) => void;
    execCommand: (cmd: string) => void;
    undo: (select: boolean) => void;
    redo: (select: boolean) => void;
    on: (event: string, handler: any) => void;
    resize: () => void;
    find: (needle: string, options: any, animate: boolean) => void;
    findNext: () => void;
    findPrevious: () => void;
    focus: () => any;
    guid: string;
}
export declare class ScriptsEditor extends Disposable {
    private _selectionNotEmpty;
    private _canUndo;
    private _canRedo;
    private _cursorPosition;
    private _changeSelection;
    private _updateEditorState;
    private _initializeToolbar;
    private _getValidIndex;
    private _setScriptsText;
    private _getFunctionName;
    private _getEventByFunction;
    static generateFunctionName(control: XRReportElementViewModel, eventName: string, functionName?: string, allFunctionNames?: any[]): string;
    static getEventArgsType(eventName: string): string;
    initialize(): void;
    constructor(report: ko.Observable<ReportViewModel>, allControls: ko.ObservableArray<XRReportElementViewModel>);
    readonly allFunctionNames: any[];
    guid: ko.Observable<any>;
    ensureEvent: (eventName: string, functionName?: string, model?: any) => void;
    private _ensureFunction;
    selectionChanged: (editor: IAceEditor) => void;
    report: ko.Observable<ReportViewModel>;
    scriptsText: ko.Observable<string> | ko.Computed<string>;
    editorContainer: ko.Observable<IAceEditor>;
    editorVisible: ko.Observable<boolean>;
    toolbarItems: any[];
    controls: ko.ObservableArray<XRReportElementViewModel>;
    selectedControl: ko.Observable<XRReportElementViewModel>;
    events: ko.Observable<string[]>;
    selectedEvent: ko.Observable<string>;
    languageHelper: LanguageHelper;
    validateDisabled: ko.Observable<boolean>;
    aceOptions: {
        enableBasicAutocompletion: boolean;
        enableSnippets: boolean;
        enableLiveAutocompletion: boolean;
        showPrintMargin: boolean;
    };
}
