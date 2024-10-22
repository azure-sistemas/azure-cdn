﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localizationEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel } from '../controls/xrControl';
import { ReportViewModel } from '../controls/xrReport';
import { TranslateHelper } from '../internal/_translateHelper';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SurfaceSelection, getResizableOptions } from '@devexpress/analytics-core/analytics-internal';
import { ControlScrollingTool } from '../internal/_controlScrollingTool';
export interface ILocalizationItem {
    component: XRControlViewModel;
    defaultText: ko.Observable<string>;
    localizedText: ko.Observable<string>;
    visible: () => boolean;
    dispose: () => void;
}
export interface ILocalizationEditorOptions {
    controlScrollingTool: ControlScrollingTool;
    selection: SurfaceSelection;
    report: () => ReportViewModel;
}
export declare class LocalizationEditor extends Disposable {
    private _options;
    private _selectionDisabled;
    private _autoScrollingSubscription;
    private _uncollapseParent;
    private _subscribeFocused;
    private _getDefaultLanguageItems;
    dispose(): void;
    private _isLocalizableControl;
    _localizableControls(): any;
    applyLocalization(serviceName: string): void;
    clearLocalization(): void;
    getRegisteredService(): string;
    isDefaultLanguage(): boolean;
    _updateLocalizationItems(): void;
    constructor(_options: ILocalizationEditorOptions);
    start(): void;
    finish(): void;
    onSelectionChanged(e: {
        addedItems: ILocalizationItem[];
    }): void;
    onItemGotFocus(e: {
        model: ILocalizationItem;
    }): void;
    switchSearchBox(): void;
    defaultLanguageText: () => any;
    currentLanguageText: () => any;
    localizationItems: ko.ObservableArray<ILocalizationItem>;
    textToSearch: ko.Observable<string>;
    language: ko.Observable<string>;
    searchPlaceholder: () => any;
    searchBox: ko.Observable<any>;
    availableCultures: any;
    isSearching: ko.Observable<boolean>;
    getResizableOptions: typeof getResizableOptions;
    translateHelper: TranslateHelper;
    isVisible: ko.Observable<boolean>;
    width: ko.Observable<number>;
    showLoadIndicator: ko.Observable<boolean>;
    getLoadPanelPosition: (element: any) => JQuery<any>;
}
