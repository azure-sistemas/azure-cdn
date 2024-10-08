﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_commonRequestModel.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reportWizardState_1 = require("../reportWizardState");
var CommonRequestModel = (function () {
    function CommonRequestModel(state) {
        if (state.reportType === reportWizardState_1.ReportType.Label) {
            this.CustomLabelInformation = {
                Height: state.labelDetails.height,
                HorizontalPitch: state.labelDetails.hPitch,
                LeftMargin: state.labelDetails.leftMargin,
                RightMargin: state.labelDetails.rightMargin,
                PaperKindDataId: state.labelDetails.paperKindId,
                TopMargin: state.labelDetails.topMargin,
                BottomMargin: state.labelDetails.bottomMargin,
                Unit: state.labelDetails.unit === reportWizardState_1.GraphicsUnit.Inch ? reportWizardState_1.GraphicsUnit.Inch : reportWizardState_1.GraphicsUnit.Millimeter,
                VerticalPitch: state.labelDetails.vPitch,
                Width: state.labelDetails.width
            };
            this.LabelProductId = state.labelDetails.productId;
            this.LabelProductDetailId = state.labelDetails.id;
        }
        this.IgnoreNullValuesForSummary = state.ignoreNullValuesForSummary;
        this.ReportTitle = state.reportTitle;
        this.ReportType = state.reportType;
        if (state.dataMemberInfo != null || state.dataMemberPath != null) {
            this.DataMemberName = {
                DisplayName: state.dataMemberInfo.displayName,
                Name: state.dataMemberInfo.name,
                DataMemberType: 0
            };
            if (state.dataMemberInfo.name) {
                var index = state.dataMemberPath.indexOf('.');
                this.DataMemberName.Name = index > 0 ? state.dataMemberPath.substr(index + 1) : state.dataMemberPath;
            }
        }
        else {
            this.DataMemberName = null;
        }
    }
    return CommonRequestModel;
}());
exports.CommonRequestModel = CommonRequestModel;
