﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\_utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GraphicsUnit } from './reportWizardState';
import { IDataSourceRefInfo, IReportWizardSettings } from '../utils/inititalizer';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
export declare function getFormattedValueInUnits(value: number, unit: GraphicsUnit): string;
export interface IReportWizardData {
    report: ko.Observable | ko.Computed;
    availableDataSources: IDataSourceInfo[];
    dataSourceRefs: IDataSourceRefInfo[];
    isReportServer?: boolean;
    disableCustomSql?: boolean;
    wizardSettings?: IReportWizardSettings;
}
export declare class ListViewModel<T> {
    caption?: string;
    private _items;
    private _refreshActiveItem;
    activeItemArray: ko.ObservableArray<T>;
    constructor(caption?: string);
    readonly items: T[];
    activeItem: T;
    add(item: T): void;
    addRange(items: T[]): void;
    removeActiveItem(): void;
    removeAll(): void;
    setItems(items: T[]): void;
    moveUp(): void;
    moveDown(): void;
    readonly isEmpty: boolean;
    isMoveUpEnabled(): boolean;
    isMoveDownEnabled(): boolean;
}
