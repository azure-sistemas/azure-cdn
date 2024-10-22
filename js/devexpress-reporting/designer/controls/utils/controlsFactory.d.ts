﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\controlsFactory.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExpressionObject } from '../../dataObjects/expressions/_wrappedExpressionOptions';
import { ISerializationInfoWithBindings } from '../metadata/properties/metadata';
import { IElementMetadata } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { ControlsFactory as AnalyticControlsFactory, IDisposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IReportControlMetadata extends IElementMetadata {
    defaultBindingName?: string;
    group?: 'common' | 'misc' | 'complex' | 'graphics' | string;
    canPaste?: (dropTarget: ISelectionTarget) => boolean;
}
export declare class ControlsFactory extends AnalyticControlsFactory implements IDisposable {
    fieldListProvider: ko.Observable | ko.Computed;
    dispose(): void;
    private _expressionWrapper;
    private _beforePrintPrintOnPage;
    private _beforePrint;
    private _registerCommonExpressions;
    private _registerExtensions;
    constructor(fieldListProvider?: ko.Observable | ko.Computed);
    registerControl(typeName: string, metadata: IReportControlMetadata): void;
    _createExpressionObject(typeName: any, expressions: any, path?: ko.Computed<string>, summaryRunning?: (name: string) => ko.Observable<boolean> | ko.Computed<boolean>): IExpressionObject;
    setExpressionBinding(controlType: string, propertyName: string, events: string[], group?: string, objectProperties?: string[]): void;
    setPropertyDescription(controlType: string, propertyName: string, events: string[], group?: string, objectProperties?: string[]): void;
    setDisplayNameForExpression(propertyName: string, localizationId: string, displayName: string): void;
    hideExpressionBindings(type: any, ...propertyNames: any[]): void;
    hidePropertyDescriptions(type: any, ...propertyNames: any[]): void;
    inheritControl(parentType: string, extendedOptions: IElementMetadata): IElementMetadata & {
        parentType: string;
        info: any[];
        popularProperties: any[];
    };
    createPopularBindingInfo(options: ISerializationInfoWithBindings, isExpression?: boolean): ISerializationInfoWithBindings;
}
