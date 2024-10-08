﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrReportelement.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel, PaddingModel, Point, Size, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelAction } from '@devexpress/analytics-core/analytics-internal';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class XRReportElementViewModel extends ElementViewModel implements ILocalizedControl, IScriptingControl {
    __localizationProvider: DefaultLocalizationProvider<ILocalizedControl>;
    readonly _localizationProvider: DefaultLocalizationProvider<ILocalizedControl>;
    static unitProperties: string[];
    dispose(): void;
    createLocalizationProvider(): DefaultLocalizationProvider<ILocalizedControl>;
    getLocalizationProperty(propertyName: string): import("./utils/_localizationUtils").LocalizedProperty;
    getLocalizationProperties(): import("./utils/_localizationUtils").LocalizedProperty[];
    applyLocalization(propertyName: string, propertyValue: any): void;
    protected _resetProperty(propertyName: string): void;
    private _getControlPropertyName;
    private _getStylePriorityPropertyName;
    private _getStyle;
    private _checkModify;
    private _getStyleProperty;
    private _zOrderChange;
    private _createPaddingDependencies;
    constructor(model: any, parent: ElementViewModel, serializer?: IModelSerializer);
    _getExpressionActions(name: any): IModelAction[];
    _getExpressionEvents(): {
        name: string;
        localizationId: string;
        displayName: string;
    }[];
    _addExpressionActions(propertyName: any): IModelAction[];
    _expressionActions: {
        [key: string]: IModelAction[];
    };
    getControlFactory(): import("./utils/controlsFactory").ControlsFactory;
    addChild(control: IElementViewModel): void;
    initDataBindingProperties(): void;
    initExpressionProperties(): void;
    _resetExpressions(propertyName: string): void;
    _hasAnyExpressions(propertyName: any, predicateFunc?: (value: ko.Observable<string> | ko.Computed<string>, innerPropertyName?: string) => boolean): boolean;
    _getExpressionNameByPropertyName(propertyName: any, info?: ISerializationInfoArray): string;
    initBindings(): void;
    dsHelperProvider: () => DataSourceHelper;
    isStyleProperty(propertyName: string): boolean;
    isResettableProperty(propertyName: string): boolean;
    getActionClassName(propertyName: string): {};
    getMenuBoxTemplate(propertyName: any): string;
    className(): string;
    initialize(): void;
    getPath(propertyName: any): string;
    isPropertyDisabled(name: string): boolean;
    isPropertyVisible(name: string): boolean;
    isPropertyHighlighted(propertyName: string, parentPropertyName?: string): boolean;
    sendToBack(): void;
    bringToFront(): void;
    getControlContainerName(): string;
    readonly dataBindingMode: any;
    dpi: ko.Observable<number> | ko.Computed<number>;
    _innerDpi: ko.Observable<number> | ko.Computed<number>;
    styleName: ko.Observable<string> | ko.Computed<string>;
    stylePriority: {
        [key: string]: ko.Observable<boolean> | ko.Computed<boolean>;
    };
    formattingRuleLinks: ko.ObservableArray<FormattingRuleLink>;
    dataBindings: ko.ObservableArray<DataBinding>;
    size: Size;
    location: Point;
    scripts: any;
    paddingObj: PaddingModel;
    expressionBindings: ko.ObservableArray<IExpressionBinding>;
    expressionObj: IExpressionObject;
    padding: ko.Observable<string> | ko.Computed<string>;
    root: XRReportElementViewModel;
    getStyleProperty: (propertyName: string, styleProperty: string) => any;
    toggleUseStyle: (propertyName: string) => void;
    _lockedInUserDesigner: ko.Observable<boolean> | ko.Computed<boolean>;
    lockedInUserDesigner: ko.Computed<boolean>;
    rtl(): boolean;
    parentModel: ko.Observable<XRReportElementViewModel | any>;
}
import { DataBinding } from '../dataObjects/dataBinding';
import { IExpressionObject } from '../dataObjects/expressions/_wrappedExpressionOptions';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { IExpressionBinding } from './properties/expressionBinding';
import { FormattingRuleLink } from './properties/formattingrules';
import { DefaultLocalizationProvider, ILocalizedControl } from './utils/_localizationUtils';
import { IScriptingControl } from '../internal/scripting/_scriptsEditor';
