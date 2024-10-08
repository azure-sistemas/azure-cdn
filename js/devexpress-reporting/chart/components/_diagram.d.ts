﻿/**
* DevExpress HTML/JS Reporting (chart\components\_diagram.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SecondaryAxisViewModel } from './axis/_secondaryAxisViewModel';
import { AdditionalPaneViewModel } from './models/_additionalPane';
import { ISerializationInfoArray, ModelSerializer, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export interface IDiagramViewModel {
    axisX?: any;
    axisY?: any;
    secondaryAxesX?: ko.ObservableArray<SecondaryAxisViewModel>;
    secondaryAxesY?: ko.ObservableArray<SecondaryAxisViewModel>;
    defaultPanes?: any;
    panes?: ko.ObservableArray<AdditionalPaneViewModel>;
    getInfo: () => ISerializationInfoArray;
}
export declare class DiagramViewModel extends SerializableModel implements IDiagramViewModel {
    static createDiagram(model: any, type: any, serializer?: ModelSerializer): IDiagramViewModel;
    static from(model: any, serializer?: IModelSerializer): DiagramViewModel;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
    secondaryAxesX: ko.ObservableArray<SecondaryAxisViewModel>;
    secondaryAxesY: ko.ObservableArray<SecondaryAxisViewModel>;
    panes: ko.ObservableArray<AdditionalPaneViewModel>;
}
