﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_spaceCommandHandler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
export declare class SpaceCommandHandler {
    private _selectionProvider;
    private _surfaceContext;
    constructor(selectionProvider: ISelectionProvider, surfaceContext: ko.Observable<ISurfaceContext>);
    private _comparer;
    private _spaceIncrease;
    private _spaceMakeEqual;
    private _concatenateWithSpace;
    horizSpaceConcatenate(): void;
    vertSpaceConcatenate(): void;
    horizSpaceMakeEqual(): void;
    vertSpaceMakeEqual(): void;
    horizSpaceDecrease(): void;
    horizSpaceIncrease(): void;
    vertSpaceDecrease(): void;
    vertSpaceIncrease(): void;
}
