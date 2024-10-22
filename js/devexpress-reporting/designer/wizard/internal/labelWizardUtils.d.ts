﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\labelWizardUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GraphicsUnit } from '../reportWizardState';
export interface ILabelProduct {
    id: number;
    name: string;
}
export interface IPaperKind {
    id: number;
    enumId: number;
    name: string;
    width: number;
    height: number;
    isRollPaper: boolean;
    unit: GraphicsUnit;
}
export interface ILabelDetails {
    id: number;
    productId: number;
    paperKindId: number;
    name: string;
    width: number;
    height: number;
    hPitch: number;
    vPitch: number;
    topMargin: number;
    leftMargin: number;
    rightMargin: number;
    bottomMargin: number;
    unit: GraphicsUnit;
}
