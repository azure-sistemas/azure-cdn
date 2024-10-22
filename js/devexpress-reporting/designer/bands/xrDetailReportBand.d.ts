﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrDetailReportBand.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel, BandSurface } from './xrBand';
import { ObjectStorageItem } from '../dataObjects/objectStorageItem';
import { VerticalBandsContainerSurface } from './_vericalBandContainer';
import { ElementViewModel, ISurfaceContext, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
export declare class DetailReportBand extends BandViewModel {
    dispose(): void;
    initHeight(): void;
    createChildsArray(band: any, serializer: ModelSerializer): void;
    addChild(control: IElementViewModel): void;
    constructor(band: any, parent: ElementViewModel, serializer?: ModelSerializer);
    dataMember: ko.Observable<string> | ko.Computed<string>;
    dataSource: ko.Observable<ObjectStorageItem>;
    _filterString: ko.Observable<string> | ko.Computed<string>;
    filterString: FilterStringOptions;
}
export declare class DetailReportBandSurface extends BandSurface {
    dispose(): void;
    getChildrenCollection(): ko.ObservableArray<BandSurface>;
    createUnderCursor(): void;
    getTotalHeight(): number;
    getHeight(): number;
    getHasOwnRuler(): boolean;
    constructor(band: DetailReportBand, context: ISurfaceContext);
    verticalBandsContainer: VerticalBandsContainerSurface;
    templateName: string;
    selectionTemplate: string;
    leftMarginTemplate: string;
}
