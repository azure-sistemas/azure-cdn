﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailBand.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel, BandSurface } from './xrBand';
import { MultiColumn } from './multiColumn';
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
interface IHierarchyPrintOptions {
    keyFieldName: ko.Observable<string>;
    childListFieldName: ko.Observable<string>;
    parentFieldName: ko.Observable<string>;
    indent: ko.Observable<number>;
    keepTogetherWithFirstChild: ko.Observable<boolean>;
    isPropertyDisabled: (propertyName: string) => boolean;
    getPath: (propertyName?: string) => string;
}
export declare class DetailBand extends BandViewModel {
    static unitProperties: any[];
    dispose(): void;
    preInit(band: any, parent: ElementViewModel, serializer?: ModelSerializer): void;
    hasHierarchyPrintOptions(): boolean;
    constructor(band: any, parent: any, serializer: any);
    isPropertyDisabled(name: string): any;
    multiColumn: MultiColumn;
    hierarchyPrintOptions: IHierarchyPrintOptions;
    sortFields: ko.ObservableArray<GroupFieldModel>;
}
export declare class DetailBandSurface extends BandSurface {
    protected _initMultiColumn(): void;
    _control: DetailBand;
}
import { GroupFieldModel } from './groupfield';
export {};
