﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_brickUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IBrickNode } from '../utils/utils';
import { EditingField } from '../editing/editingField';
import * as ko from 'knockout';
export declare function convertToPercent(childSize: any, parentSize: any): string;
export declare function getBrickValueForKey(brick: IBrickNode, key?: string): any;
export declare function brickText(brick: IBrickNode, editingFieldsProvider?: () => EditingField[]): any;
export declare function updateBricksPosition(brick: IBrickNode, height: any, width: any): void;
export declare function initializeBrick(brick: IBrickNode, processClick: (target: IBrickNode, e?: JQueryEventObject) => void, zoom: ko.Observable<number> | ko.Computed<number>, editingFieldBricks: IBrickNode[]): void;
