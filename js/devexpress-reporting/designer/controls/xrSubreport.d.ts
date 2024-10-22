﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSubreport.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from './xrReport';
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ISerializationInfoArray, PathRequest, IModelSerializer, ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
import { ElementViewModel, ISurfaceContext, IArea } from '@devexpress/analytics-core/analytics-elements';
import { DataBindingBase } from '../dataObjects/dataBinding';
import * as ko from 'knockout';
export declare class SubreportViewModel extends ReportViewModel {
    static defaultReport: {
        '@ControlType': string;
        '@PageWidth': string;
        '@PageHeight': string;
        '@Version': string;
        '@Font': string;
        '@Dpi': string;
        'Bands': {
            'Item1': {
                '@ControlType': string;
                '@HeightF': string;
            };
            'Item2': {
                '@ControlType': string;
                '@HeightF': string;
            };
            'Item3': {
                '@ControlType': string;
                '@HeightF': string;
            };
        };
    };
    _initializeBands(): void;
    static from(model: any, serializer?: IModelSerializer): SubreportViewModel;
    static toJson(value: SubreportViewModel, serializer: any, refs: any): any;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    serialize(): any;
    isAllSufficient: boolean;
    _model: any;
}
export declare class ParameterBinding extends DataBindingBase implements ISerializableModel {
    private _reportDataSource;
    static createNew(): ParameterBinding;
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    updateParameter(pathRequest: PathRequest, dataSources: any): void;
    refresh(): void;
    constructor(model: any, parent: any, serializer?: IModelSerializer);
    visible: ko.Observable<boolean>;
    parameterName: ko.Observable<string> | ko.Computed<string>;
    subreportControl: ko.Observable<XRSubreportViewModel> | ko.Computed<XRSubreportViewModel>;
    fakeBinding: any;
}
export declare class XRSubreportViewModel extends XRControlViewModel {
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    static _patchModel(model: any): any;
    private _getCurrentGenerateOwnPagesIsActive;
    private _clearReportModel;
    private _assignParameters;
    private _calculateSubreportPosition;
    private _subscribeStorages;
    constructor(model: any, parent: ElementViewModel, serializer?: IModelSerializer);
    refreshParameterBindings(): void;
    isPropertyDisabled(propertyName: any): any;
    updateParameters(): void;
    cloneReportSource(): ReportViewModel;
    needProcessLocation: boolean;
    root: ReportViewModel;
    generateOwnPages: ko.Computed<boolean>;
    _generateOwnPages: ko.Observable<boolean> | ko.Computed<boolean>;
    generateOwnPagesIsActive: ko.Computed<boolean>;
    subreportParameters: ko.ObservableArray<string>;
    reportSource: ReportViewModel;
    reportSourceUrl: ko.Observable<string> | ko.Computed<string>;
    parameterBindings: ko.ObservableArray<ParameterBinding>;
    key: ko.Computed<string>;
}
export declare class XRSubreportSurface extends XRControlSurface {
    constructor(control: XRSubreportViewModel, context: ISurfaceContext);
    getAdornTemplate(): string;
    getResizableOptions(resizeHandler: any): any;
    processLocation(location: IArea): IArea;
    _control: XRSubreportViewModel;
}
