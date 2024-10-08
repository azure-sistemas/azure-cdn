﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableOfContents.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { TableOfContentLocalizationProvider } from './utils/_localizationUtils';
import { BandViewModel } from '../bands/xrBand';
import { TableOfContentsLevel, TableOfContentsLevelSurface } from './xrTableOfContentsLevel';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class XRTableOfContentsViewModel extends XRControlViewModel {
    static unitProperties: any[];
    dispose(): void;
    createLocalizationProvider(): TableOfContentLocalizationProvider;
    constructor(control: any, parent: BandViewModel, serializer?: ModelSerializer);
    readonly textEditableProperty: ko.Observable<string> | ko.Computed<string>;
    levels: ko.ObservableArray<TableOfContentsLevel>;
    levelDefault: TableOfContentsLevel;
    levelTitle: TableOfContentsLevel;
    maxNestingLevel: ko.Observable<number> | ko.Computed<number>;
    levelTitleText: ko.Observable<string> | ko.Computed<string>;
    allLevels: ko.Observable<TableOfContentsLevel[]> | ko.Computed<TableOfContentsLevel[]>;
    borderWidth: ko.Observable | ko.Computed;
    borderColor: ko.Observable | ko.Computed;
    borders: ko.Observable | ko.Computed;
    borderDashStyle: ko.Observable | ko.Computed;
    borderDefault: ko.PureComputed<string>;
    parentModel: ko.Observable<BandViewModel>;
}
export declare class XRTableOfContentsSurface extends XRControlSurface {
    constructor(control: XRTableOfContentsViewModel, context: ISurfaceContext);
    isThereIntersectionWithChildCollection(): boolean;
    isThereIntersectionWithUsefulArea(): boolean;
    isThereIntersectionWithParentCollection(): boolean;
    levelTitle: TableOfContentsLevelSurface;
    levelDefault: TableOfContentsLevelSurface;
    levels: ko.ObservableArray<TableOfContentsLevelSurface>;
}
