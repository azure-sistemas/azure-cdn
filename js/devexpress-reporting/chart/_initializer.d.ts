﻿/**
* DevExpress HTML/JS Reporting (chart\_initializer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListProvider, IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { ControlsFactory, IAction, IDataMemberInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ChartStructureTreeListController } from './internal/chartStructure/_controller';
import { ChartStructureObjectProvider } from './internal/chartStructure/_provider';
import { ChartControlViewModel } from './_control';
export declare var ActionId: {
    Save: string;
};
export declare var controlsFactory: ControlsFactory;
export declare function registerControls(): void;
export declare function _setChartLimitation(chartLimitation: any): void;
export declare function updateChartSurfaceContentSize(element: any, surfaceSize: ko.Observable<number> | ko.Computed<number>, rtl?: boolean): () => void;
export interface IChartControlCallbacks {
    fieldLists?: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    customizeActions?: (actions: IAction[]) => void;
    init?: (designerModel: any) => void;
}
export interface IChartDesignerOptions {
    data: {
        chartSource?: ko.Observable<any>;
        chart?: ko.Observable<ChartControlViewModel>;
        dataSource?: ko.Observable<IDataSourceInfo>;
        availableChartDataSources?: ko.Computed<Array<{
            displayName: string;
            value: any;
        }>>;
        width?: number;
        height?: number;
    };
    fieldListProvider?: FieldListProvider;
    callbacks?: IChartControlCallbacks;
    visible?: ko.Observable<boolean>;
    localization?: any;
    rtl?: boolean;
}
export declare function subscribeTreelistArray(chartStructureProvider: any, array: ko.ObservableArray<any>, getPath: () => string[], subscribeNewItem?: (item: any, array: any, path: any) => void): ko.Subscription;
export declare function getPropertyInfo(serializationsInfo: ISerializationInfoArray, index: number, pathComponets: any): import("@devexpress/analytics-core/analytics-utils").ISerializationInfo;
export declare function createChartStructure(chart: ChartControlViewModel, selectedItem: any, subscriptions: any, surface: any, undoEngine: any, dragdrophandler: any): {
    itemsProvider: ChartStructureObjectProvider;
    treeListController: ChartStructureTreeListController;
    expandRootItems: boolean;
    selectedPath: ko.Observable<string> | ko.Computed<string>;
};
export declare function createChartDesigner(element: Element, options: IChartDesignerOptions, applyBindings?: boolean): any;
