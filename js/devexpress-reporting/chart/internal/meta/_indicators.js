﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_indicators.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var pointscount = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.AverageTrueRange.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 14 };
var name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', localizationId: 'DevExpress.XtraCharts.Indicator.Name', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
var legendtext = { propertyName: 'legendText', modelName: '@LegendText', displayName: 'LegendText', localizationId: 'DevExpress.XtraCharts.Indicator.LegendText', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
var color = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.Indicator.Color', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
var visible = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.Indicator.Visible', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var checkedinlegend = { propertyName: 'checkedInLegend', modelName: '@CheckedInLegend', displayName: 'CheckedInLegend', localizationId: 'DevExpress.XtraCharts.Indicator.CheckedInLegend', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var checkableinlegend = { propertyName: 'checkableInLegend', modelName: '@CheckableInLegend', displayName: 'CheckableInLegend', localizationId: 'DevExpress.XtraCharts.Indicator.CheckableInLegend', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var showinlegend = { propertyName: 'showInLegend', modelName: '@ShowInLegend', displayName: 'ShowInLegend', localizationId: 'DevExpress.XtraCharts.Indicator.ShowInLegend', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var crosshairenabled = {
    propertyName: 'crosshairEnabled', modelName: '@CrosshairEnabled', displayName: 'CrosshairEnabled', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairEnabled', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: [
        { displayValue: 'True', value: 'True' },
        { displayValue: 'False', value: 'False' },
        { displayValue: 'Default', value: 'Default' },
    ]
};
var crosshairlabelvisibility = {
    propertyName: 'crosshairLabelVisibility', modelName: '@CrosshairLabelVisibility', displayName: 'CrosshairLabelVisibility', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairLabelVisibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: [
        { displayValue: 'True', value: 'True' },
        { displayValue: 'False', value: 'False' },
        { displayValue: 'Default', value: 'Default' },
    ]
};
var crosshairlabelpattern = { propertyName: 'crosshairLabelPattern', modelName: '@CrosshairLabelPattern', displayName: 'CrosshairLabelPattern', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairLabelPattern', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
var crosshaircontentshowmode = {
    propertyName: 'crosshairContentShowMode', modelName: '@CrosshairContentShowMode', displayName: 'CrosshairContentShowMode', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairContentShowMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: [
        { displayValue: 'Default', value: 'Default' },
        { displayValue: 'Label', value: 'Label' },
        { displayValue: 'Legend', value: 'Legend' },
    ]
};
var crosshairemptyvaluelegendtext = { propertyName: 'crosshairEmptyValueLegendText', modelName: '@CrosshairEmptyValueLegendText', displayName: 'CrosshairEmptyValueLegendText', localizationId: 'DevExpress.XtraCharts.Indicator.CrosshairEmptyValueLegendText', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
var tag = { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraCharts.ChartElement.Tag', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), visible: false };
var averageTrueRange = [pointscount, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount1 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.BollingerBands.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 20 };
var valuelevel = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.BollingerBands.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var bandscolor = { propertyName: 'bandsColor', modelName: '@BandsColor', displayName: 'BandsColor', localizationId: 'DevExpress.XtraCharts.BollingerBands.BandsColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
var standarddeviationmultiplier = { propertyName: 'standardDeviationMultiplier', modelName: '@StandardDeviationMultiplier', displayName: 'StandardDeviationMultiplier', localizationId: 'DevExpress.XtraCharts.BollingerBands.StandardDeviationMultiplier', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 2 };
var bollingerBands = [pointscount1, valuelevel, bandscolor, standarddeviationmultiplier, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount2 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.ChaikinsVolatility.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 10 };
var chaikinsVolatility = [pointscount2, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount3 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.CommodityChannelIndex.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 14 };
var commodityChannelIndex = [pointscount3, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var negativeerrordatamember = { propertyName: 'negativeErrorDataMember', modelName: '@NegativeErrorDataMember', displayName: 'NegativeErrorDataMember', localizationId: 'DevExpress.XtraCharts.DataSourceBasedErrorBars.NegativeErrorDataMember', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
var positiveerrordatamember = { propertyName: 'positiveErrorDataMember', modelName: '@PositiveErrorDataMember', displayName: 'PositiveErrorDataMember', localizationId: 'DevExpress.XtraCharts.DataSourceBasedErrorBars.PositiveErrorDataMember', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
var endstyle = {
    propertyName: 'endStyle', modelName: '@EndStyle', displayName: 'EndStyle', localizationId: 'DevExpress.XtraCharts.ErrorBars.EndStyle', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Cap', valuesArray: [
        { displayValue: 'Cap', value: 'Cap' },
        { displayValue: 'NoCap', value: 'NoCap' },
    ]
};
var direction = {
    propertyName: 'direction', modelName: '@Direction', displayName: 'Direction', localizationId: 'DevExpress.XtraCharts.ErrorBars.Direction', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Both', valuesArray: [
        { displayValue: 'Both', value: 'Both' },
        { displayValue: 'Minus', value: 'Minus' },
        { displayValue: 'Plus', value: 'Plus' },
    ]
};
var dataSourceBasedErrorBars = [negativeerrordatamember, positiveerrordatamember, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount4 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.DetrendedPriceOscillator.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 20 };
var valuelevel1 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.DetrendedPriceOscillator.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var detrendedPriceOscillator = [pointscount4, valuelevel1, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var kind = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', localizationId: 'DevExpress.XtraCharts.MovingAverage.Kind', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'MovingAverage', valuesArray: [
        { displayValue: 'MovingAverage', value: 'MovingAverage' },
        { displayValue: 'Envelope', value: 'Envelope' },
        { displayValue: 'MovingAverageAndEnvelope', value: 'MovingAverageAndEnvelope' },
    ]
};
var envelopepercent = { propertyName: 'envelopePercent', modelName: '@EnvelopePercent', displayName: 'EnvelopePercent', localizationId: 'DevExpress.XtraCharts.MovingAverage.EnvelopePercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 3 };
var envelopecolor = { propertyName: 'envelopeColor', modelName: '@EnvelopeColor', displayName: 'EnvelopeColor', localizationId: 'DevExpress.XtraCharts.MovingAverage.EnvelopeColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
var pointscount5 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var valuelevel2 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var exponentialMovingAverage = [kind, envelopepercent, envelopecolor, pointscount5, valuelevel2, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var baselevelcolor = { propertyName: 'baseLevelColor', modelName: '@BaseLevelColor', displayName: 'BaseLevelColor', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.BaseLevelColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
var showlevel0 = { propertyName: 'showLevel0', modelName: '@ShowLevel0', displayName: 'ShowLevel0', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel0', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
var showlevel100 = { propertyName: 'showLevel100', modelName: '@ShowLevel100', displayName: 'ShowLevel100', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel100', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
var showlevel23_6 = { propertyName: 'showLevel23_6', modelName: '@ShowLevel23_6', displayName: 'ShowLevel23_6', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel23_6', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
var showlevel76_4 = { propertyName: 'showLevel76_4', modelName: '@ShowLevel76_4', displayName: 'ShowLevel76_4', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel76_4', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
var showadditionallevels = { propertyName: 'showAdditionalLevels', modelName: '@ShowAdditionalLevels', displayName: 'ShowAdditionalLevels', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.ShowAdditionalLevels', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
var kind1 = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', localizationId: 'DevExpress.XtraCharts.FibonacciIndicator.Kind', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'FibonacciArcs', valuesArray: [
        { displayValue: 'FibonacciArcs', value: 'FibonacciArcs' },
        { displayValue: 'FibonacciFans', value: 'FibonacciFans' },
        { displayValue: 'FibonacciRetracement', value: 'FibonacciRetracement' },
    ]
};
var fibonacciIndicator = [baselevelcolor, showlevel0, showlevel100, showlevel23_6, showlevel76_4, showadditionallevels, kind1, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var negativeerror = { propertyName: 'negativeError', modelName: '@NegativeError', displayName: 'NegativeError', localizationId: 'DevExpress.XtraCharts.FixedValueErrorBars.NegativeError', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1 };
var positiveerror = { propertyName: 'positiveError', modelName: '@PositiveError', displayName: 'PositiveError', localizationId: 'DevExpress.XtraCharts.FixedValueErrorBars.PositiveError', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1 };
var fixedValueErrorBars = [negativeerror, positiveerror, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var movingaveragepointscount = { propertyName: 'movingAveragePointsCount', modelName: '@MovingAveragePointsCount', displayName: 'MovingAveragePointsCount', localizationId: 'DevExpress.XtraCharts.MassIndex.MovingAveragePointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var sumpointscount = { propertyName: 'sumPointsCount', modelName: '@SumPointsCount', displayName: 'SumPointsCount', localizationId: 'DevExpress.XtraCharts.MassIndex.SumPointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 25 };
var massIndex = [movingaveragepointscount, sumpointscount, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var medianPrice = [name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var longperiod = { propertyName: 'longPeriod', modelName: '@LongPeriod', displayName: 'LongPeriod', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.LongPeriod', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 26 };
var shortperiod = { propertyName: 'shortPeriod', modelName: '@ShortPeriod', displayName: 'ShortPeriod', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.ShortPeriod', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 12 };
var signalsmoothingperiod = { propertyName: 'signalSmoothingPeriod', modelName: '@SignalSmoothingPeriod', displayName: 'SignalSmoothingPeriod', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.SignalSmoothingPeriod', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 9 };
var signallinecolor = { propertyName: 'signalLineColor', modelName: '@SignalLineColor', displayName: 'SignalLineColor', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.SignalLineColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
var valuelevel3 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.MovingAverageConvergenceDivergence.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var movingAverageConvergenceDivergence = [longperiod, shortperiod, signalsmoothingperiod, signallinecolor, valuelevel3, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var percent = { propertyName: 'percent', modelName: '@Percent', displayName: 'Percent', localizationId: 'DevExpress.XtraCharts.PercentageErrorBars.Percent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 5 };
var percentageErrorBars = [percent, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount6 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.RateOfChange.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 14 };
var valuelevel4 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.RateOfChange.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var rateOfChange = [pointscount6, valuelevel4, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var valuelevel5 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var regressionLine = [valuelevel5, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount7 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.RelativeStrengthIndex.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 14 };
var valuelevel6 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.RelativeStrengthIndex.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var relativeStrengthIndex = [pointscount7, valuelevel6, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount8 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var valuelevel7 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var simpleMovingAverage = [kind, envelopepercent, envelopecolor, pointscount8, valuelevel7, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount9 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.StandardDeviation.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 14 };
var valuelevel8 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.StandardDeviation.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var standardDeviation = [pointscount9, valuelevel8, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var multiplier = { propertyName: 'multiplier', modelName: '@Multiplier', displayName: 'Multiplier', localizationId: 'DevExpress.XtraCharts.StandardDeviationErrorBars.Multiplier', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1 };
var standardDeviationErrorBars = [multiplier, endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var standardErrorBars = [endstyle, direction, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var extrapolatetoinfinity = { propertyName: 'extrapolateToInfinity', modelName: '@ExtrapolateToInfinity', displayName: 'ExtrapolateToInfinity', localizationId: 'DevExpress.XtraCharts.TrendLine.ExtrapolateToInfinity', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var trendLine = [extrapolatetoinfinity, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount10 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var valuelevel9 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var triangularMovingAverage = [kind, envelopepercent, envelopecolor, pointscount10, valuelevel9, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount11 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var valuelevel10 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var tripleExponentialMovingAverageTema = [kind, envelopepercent, envelopecolor, pointscount11, valuelevel10, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount12 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.TripleExponentialMovingAverageTrix.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 15 };
var valuelevel11 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.TripleExponentialMovingAverageTrix.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Close', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var tripleExponentialMovingAverageTrix = [pointscount12, valuelevel11, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var typicalPrice = [name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var weightedClose = [name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount13 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var valuelevel12 = {
    propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'ValueLevel', localizationId: 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Value', valuesArray: [
        { displayValue: 'Value', value: 'Value' },
        { displayValue: 'Value_1', value: 'Value_1' },
        { displayValue: 'Value_2', value: 'Value_2' },
        { displayValue: 'Low', value: 'Low' },
        { displayValue: 'High', value: 'High' },
        { displayValue: 'Open', value: 'Open' },
        { displayValue: 'Close', value: 'Close' },
        { displayValue: 'Weight', value: 'Weight' },
        { displayValue: 'BoxPlotMin', value: 'BoxPlotMin' },
        { displayValue: 'BoxPlotQuartile_1', value: 'BoxPlotQuartile_1' },
        { displayValue: 'BoxPlotMedian', value: 'BoxPlotMedian' },
        { displayValue: 'BoxPlotQuartile_3', value: 'BoxPlotQuartile_3' },
        { displayValue: 'BoxPlotMax', value: 'BoxPlotMax' },
        { displayValue: 'BoxPlotMean', value: 'BoxPlotMean' },
    ]
};
var weightedMovingAverage = [kind, envelopepercent, envelopecolor, pointscount13, valuelevel12, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
var pointscount14 = { propertyName: 'pointsCount', modelName: '@PointsCount', displayName: 'PointsCount', localizationId: 'DevExpress.XtraCharts.WilliamsR.PointsCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 14 };
var williamsR = [pointscount14, name, legendtext, color, visible, checkedinlegend, checkableinlegend, showinlegend, crosshairenabled, crosshairlabelvisibility, crosshairlabelpattern, crosshaircontentshowmode, crosshairemptyvaluelegendtext, tag];
exports.indicatorMapper = {
    'AverageTrueRange': averageTrueRange,
    'BollingerBands': bollingerBands,
    'ChaikinsVolatility': chaikinsVolatility,
    'CommodityChannelIndex': commodityChannelIndex,
    'DataSourceBasedErrorBars': dataSourceBasedErrorBars,
    'DetrendedPriceOscillator': detrendedPriceOscillator,
    'ExponentialMovingAverage': exponentialMovingAverage,
    'FibonacciIndicator': fibonacciIndicator,
    'FixedValueErrorBars': fixedValueErrorBars,
    'MassIndex': massIndex,
    'MedianPrice': medianPrice,
    'MovingAverageConvergenceDivergence': movingAverageConvergenceDivergence,
    'PercentageErrorBars': percentageErrorBars,
    'RateOfChange': rateOfChange,
    'RegressionLine': regressionLine,
    'RelativeStrengthIndex': relativeStrengthIndex,
    'SimpleMovingAverage': simpleMovingAverage,
    'StandardDeviation': standardDeviation,
    'StandardDeviationErrorBars': standardDeviationErrorBars,
    'StandardErrorBars': standardErrorBars,
    'TrendLine': trendLine,
    'TriangularMovingAverage': triangularMovingAverage,
    'TripleExponentialMovingAverageTema': tripleExponentialMovingAverageTema,
    'TripleExponentialMovingAverageTrix': tripleExponentialMovingAverageTrix,
    'TypicalPrice': typicalPrice,
    'WeightedClose': weightedClose,
    'WeightedMovingAverage': weightedMovingAverage,
    'WilliamsR': williamsR,
};
