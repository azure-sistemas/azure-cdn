﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\anchoring.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IPoint, ISize } from '@devexpress/analytics-core/analytics-elements';
export interface IAnchoringProperties {
    size?: ISize;
    location?: IPoint;
    root: any;
}
export declare class Anchoring extends Disposable {
    static states: {
        inProgress: string;
        complete: string;
        fromControls: string;
    };
    anchoring: ko.Observable<string> | ko.Computed<string>;
    subscribtion: ko.Subscription;
    dispose(): void;
    constructor(subscrible: ko.Observable<number> | ko.Computed<number>, model: IAnchoringProperties, anchoringProperty: ko.Observable<string> | ko.Computed<string>);
    start(subscrible: ko.Observable<number> | ko.Computed<number>, model: IAnchoringProperties): void;
    anchorSubscribtion: (parentSizeValue: number, oldValue: ko.Observable<number> | ko.Computed<number>, model: IAnchoringProperties) => void;
    state: string;
}
export declare class VerticalAcnhoring extends Anchoring {
    anchorSubscribtion: (parentSizeValue: number, oldValue: ko.Observable<number> | ko.Computed<number>, model: IAnchoringProperties) => void;
    constructor(subscrible: ko.Observable<number> | ko.Computed<number>, model: IAnchoringProperties, anchoringProperty: ko.Observable<string> | ko.Computed<string>);
}
export declare class HorizontalAnchoring extends Anchoring {
    anchorSubscribtion: (parentSizeValue: number, oldValue: ko.Observable<number> | ko.Computed<number>, model: IAnchoringProperties) => void;
    constructor(subscrible: ko.Observable<number> | ko.Computed<number>, model: IAnchoringProperties, anchoringProperty: ko.Observable<string> | ko.Computed<string>);
}
