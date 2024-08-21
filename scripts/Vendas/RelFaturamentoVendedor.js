var loadPanel;

$(() => {

    loadPanel = $('#load_Panel').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando...',
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel('instance');

    loadPanel.show();

    //Filiais que o usuário possui acesso
    GetAzureDataSource(33).then((result) => {

        loadPanel.show();

        if (result.success) {

            $('#lkp_Filiais').dxLookup({
                dataSource: result.data,

                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_FILIAL',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Filiais',
                },
                labelMode: 'floating',
                label: 'Filial',
                placeholder: 'Filial',
                showClearButton: false,
            });

            loadPanel.hide();
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);

            loadPanel.hide();
        }
    });

    //Vendedores (Usuários)
    GetAzureDataSource(34).then((result) => {

        loadPanel.show();

        if (result.success) {

            function getTemplateFoto(data, containerClass) {
                return `<div class='${containerClass}'><img src='${data.DS_URL_FOTO}'?'${new Date()}' /><div> ${data.DS_PESQUISA}</div></div>`;
            }

            $('#lkp_Vendedores').dxLookup({
                dataSource: result.data,

                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_LOGIN',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Vendedores',
                },
                labelMode: 'floating',
                label: 'Vendedor',
                placeholder: 'Vendedor',
                showClearButton: true,
                itemTemplate(data) {
                    return getTemplateFoto(data, 'custom-item');
                },
            });

            loadPanel.hide();
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);

            loadPanel.hide();
        }
    });

    $('#dt_Inicial_Faturamento').dxDateBox({
        labelMode: 'floating',
        label: 'Data Faturamento Inicial',
        placeholder: 'Data Faturamento Inicial',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        //value: Date(),
    });

    $('#dt_Final_Faturamento').dxDateBox({
        labelMode: 'floating',
        label: 'Data Faturamento Final',
        placeholder: 'Data Faturamento Final',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        //value: Date(),
    });

    $('#dt_Inicial_Emissao').dxDateBox({
        labelMode: 'floating',
        label: 'Data Emissão Inicial',
        placeholder: 'Data Emissão Inicial',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        //value: Date(),
    });

    $('#dt_Final_Emissao').dxDateBox({
        labelMode: 'floating',
        label: 'Data Emissão Final',
        placeholder: 'Data Emissão Final',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        //value: Date(),
    });

    $('#lkp_Agrupamento').dxLookup({
        items: ['Vendedor', 'Filial e Vendedor'],
        value: 'Vendedor',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Resultado por',
        },
        labelMode: 'floating',
        label: 'Resultado por',
        placeholder: 'Resultado por',
        showClearButton: false,
    });

    $('#chk_Exibir_Vendas_Compartilhadas').dxCheckBox({
        value: false,
        text: "Exibir Vendas Compartilhadas",
    });

    $('#chk_Exibir_Aguardando_Faturamento_Outras_Formas').dxCheckBox({
        value: false,
        text: "Incluir na coluna Conta Corrente os pedidos aguardando faturamento em outras formas de pagamento",
    });
});

function validaCampos() {

    loadPanel.show();

    const result = validarCamposPeriodo();

    if (result) {

        gerarRelatorio();

    } else {

        loadPanel.hide();
    };
}

function validarCamposPeriodo() {

    var dataInicialFaturamento = $('#dt_Inicial_Faturamento').dxDateBox('instance').option('value');
    var dataFinalFaturamento = $('#dt_Final_Faturamento').dxDateBox('instance').option('value');
    var dataInicialEmissao = $('#dt_Inicial_Emissao').dxDateBox('instance').option('value');
    var dataFinalEmissao = $('#dt_Final_Emissao').dxDateBox('instance').option('value');

    if (dataInicialFaturamento === null && dataFinalFaturamento === null && dataInicialEmissao === null && dataFinalEmissao === null) {
        DevExpress.ui.notify({
            message: 'É necessário informar ao menos um intervalo de datas de Faturamento ou Emissão.',
            type: 'error',
            displayTime: 5000,
        });

        return false;
    } else if ((dataInicialFaturamento !== null && dataFinalFaturamento === null) || (dataInicialFaturamento === null && dataFinalFaturamento !== null) ||
        (dataInicialEmissao !== null && dataFinalEmissao === null) || (dataInicialEmissao === null && dataFinalEmissao !== null)) {
        DevExpress.ui.notify({
            message: 'É necessário informar tanto a data inicial quanto a final.',
            type: 'error',
            displayTime: 5000,
        });

        return false;
    } else {
        return true;
    };

}

function gerarRelatorio() {

    ExibirEsconderPaineis('cardFiltros', 'none');
    ExibirEsconderPaineis('cardResultado', 'none');

    var data = new Date();

    if ($('#dt_Inicial_Faturamento').dxDateBox("instance").option('value') !== null) {
        data = new Date($('#dt_Inicial_Faturamento').dxDateBox("instance").option('value'));
        var dataInicialFaturamento = '"' + `${data.getFullYear()}-${("00" + String(data.getMonth() + 1)).slice(-2)}-${("00" + String(data.getDate())).slice(-2)}` + '"'
        var labelDataInicialFaturamento = `${("00" + String(data.getDate())).slice(-2)}/${("00" + String(data.getMonth() + 1)).slice(-2)}/${data.getFullYear()}`
    } else {
        var dataInicialFaturamento = null;
        var labelDataInicialFaturamento = null;
    }

    if ($('#dt_Final_Faturamento').dxDateBox("instance").option('value') !== null) {
        data = new Date($('#dt_Final_Faturamento').dxDateBox("instance").option('value'));
        var dataFinalFaturamento = '"' + `${data.getFullYear()}-${("00" + String(data.getMonth() + 1)).slice(-2)}-${("00" + String(data.getDate())).slice(-2)}` + '"'
        var labelDataFinalFaturamento = `${("00" + String(data.getDate())).slice(-2)}/${("00" + String(data.getMonth() + 1)).slice(-2)}/${data.getFullYear()}`
    } else {
        var dataFinalFaturamento = null;
        var labelDataFinalFaturamento = null;
    }

    if ($('#dt_Inicial_Emissao').dxDateBox("instance").option('value') !== null) {
        data = new Date($('#dt_Inicial_Emissao').dxDateBox("instance").option('value'));
        var dataInicialEmissao = '"' + `${data.getFullYear()}-${("00" + String(data.getMonth() + 1)).slice(-2)}-${("00" + String(data.getDate())).slice(-2)}` + '"'
        var labelDataInicialEmissao = `${("00" + String(data.getDate())).slice(-2)}/${("00" + String(data.getMonth() + 1)).slice(-2)}/${data.getFullYear()}`
    } else {
        var dataInicialEmissao = null;
        var labelDataInicialEmissao = null;
    }

    if ($('#dt_Final_Emissao').dxDateBox("instance").option('value') !== null) {
        data = new Date($('#dt_Final_Emissao').dxDateBox("instance").option('value'));
        var dataFinalEmissao = '"' + `${data.getFullYear()}-${("00" + String(data.getMonth() + 1)).slice(-2)}-${("00" + String(data.getDate())).slice(-2)}` + '"'
        var labelDataFinalEmissao = `${("00" + String(data.getDate())).slice(-2)}/${("00" + String(data.getMonth() + 1)).slice(-2)}/${data.getFullYear()}`
    } else {
        var dataFinalEmissao = null
        var labelDataFinalEmissao = null
    }

    var filial = $('#lkp_Filiais').dxLookup("instance").option('value');

    if ($('#lkp_Vendedores').dxLookup("instance").option('value') !== null) {
        var vendedor = '"' + $('#lkp_Vendedores').dxLookup("instance").option('value') + '"';
    } else {
        var vendedor = null;
    }

    if ($('#lkp_Agrupamento').dxLookup("instance").option('value') !== null) {
        var agrupamento = '"' + $('#lkp_Agrupamento').dxLookup("instance").option('value') + '"';
    } else {
        var agrupamento = null;
    }

    var exibirVendasCompartilhadas = $('#chk_Exibir_Vendas_Compartilhadas').dxCheckBox('instance').option('value');
    var exibirVendasOutrasFormas = $('#chk_Exibir_Aguardando_Faturamento_Outras_Formas').dxCheckBox('instance').option('value');

    var agrupamentoFilialVisible = true;
    var agrupamentoFilialIndex = 0;
    var agrupamentoVendasCompartilhadasVisible = false;
    var agrupamentoVendasCompartilhadasIndex = -1;

    if (exibirVendasCompartilhadas) {
        agrupamentoVendasCompartilhadasVisible = true;
        agrupamentoVendasCompartilhadasIndex = 0;
        agrupamentoFilialIndex = 1;
    }

    if ($('#lkp_Agrupamento').dxLookup("instance").option('value') == 'Vendedor') {
        agrupamentoFilialVisible = false;
        agrupamentoFilialIndex = -1;
    }

    var parametros = '{ DT_INICIAL_FATURAMENTO: ' + dataInicialFaturamento + ', DT_FINAL_FATURAMENTO: ' + dataFinalFaturamento + ', DT_INICIAL_EMISSAO: ' + dataInicialEmissao + ', DT_FINAL_EMISSAO: ' + dataFinalEmissao + ', CD_FILIAL: ' + filial + ', CD_LOGIN_VENDEDOR: ' + vendedor + ', DS_AGRUPAMENTO: ' + agrupamento + ', LG_EXIBIR_VENDA_COMPARTILHADA: ' + exibirVendasCompartilhadas + ', LG_INCLUIR_AGUARDANDO_FATURAMENTO_OUTRAS: ' + exibirVendasOutrasFormas + ' }';

    console.log("PARÂMETROS ", parametros)

    //processa resultado do relatório
    GetAzureDataSource(35, parametros, timeOut = 60).then((result) => {

        if (result.success) {

            ExibirEsconderPaineis('cardResultado', 'block');
            loadPanel.hide();

            //console.log("RESUTLADO: ", result);

            var labelTitulo = "Relatório de Faturamento por Vendedor";
            var labelFiltros = "";

            if (result.data.length > 0) {

                if (dataInicialFaturamento !== null) {
                    labelFiltros = labelFiltros + 'Faturamento: ' + labelDataInicialFaturamento + ' a ' + labelDataFinalFaturamento
                }

                if (dataInicialEmissao !== null) {
                    if (labelFiltros.length > 0) {
                        labelFiltros = labelFiltros + ' / '
                    }
                    labelFiltros = labelFiltros + 'Emissão: ' + labelDataInicialEmissao + ' a ' + labelDataFinalEmissao
                }

                if (filial !== null) {
                    labelFiltros = labelFiltros + ' / Filial: ' + filial
                }

                if (vendedor !== null) {
                    labelFiltros = labelFiltros + ' / Vendedor: ' + vendedor
                }

                if (exibirVendasCompartilhadas == true ) {
                    labelFiltros = labelFiltros + ' / Vendas Compartilhadas: Sim'
                }

                if (exibirVendasOutrasFormas == true) {
                    labelFiltros = labelFiltros + ' / Conta Corrente + Outras Formas: Sim'
                }
            }
            else {
                labelFiltros = "NÃO FORAM ENCONTRADOS REGISTROS COM O FILTRO INFORMADO";
            }

            $('#labelTitulo').hide().text(labelTitulo).fadeIn(500);
            $('#labelFiltros').hide().text(labelFiltros).fadeIn(500);

            const discountCellTemplate = function (container, options) {
                $('<div/>').dxBullet({
                    onIncidentOccurred: null,
                    size: {
                        width: 50,
                        height: 30,
                    },
                    margin: {
                        top: 5,
                        bottom: 0,
                        left: 5,
                    },
                    //color: '#f05b41',
                    //color: '#f4a261',
                    color: '#e76f51',
                    showTarget: false,
                    showZeroLevel: true,
                    value: options.value * 100,
                    startScaleValue: 0,
                    endScaleValue: 100,
                    tooltip: {
                        enabled: true,
                        font: {
                            size: 18,
                        },
                        paddingTopBottom: 2,
                        customizeTooltip() {
                            return { text: options.text };
                        },
                        zIndex: 5,
                    },
                }).appendTo(container);
            };

            var nameGrid = "gridResultado";

            $(`#${nameGrid}`).dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                //stateStoring: AutoLoad(nameGrid),
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: { mode: "multiple" },
                selection: {
                    mode: 'single',
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                paging: { pageSize: 100 },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 15, 20, 50, 100],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },

                export: {
                    enabled: true,
                    allowExportSelectedData: false,
                },

                onExporting(e) {

                    var dataGrid = $(`#${nameGrid}`).dxDataGrid("instance");

                    //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                    var colunasVisiveis = dataGrid.getVisibleColumns();
                    var groupedColumns = [];

                    //IDENTIFICA A QUANTIDADE DE COLUNAS AGRUPADAS DO GRID PARA UTILIZAR NO MERGE DOS TÍTULOS
                    var colCount = 0, colNames = [];
                    for (i = 0; i < dataGrid.columnCount(); i++) {
                        if (dataGrid.columnOption(i, "groupIndex") >= 0) {
                            colCount++;
                            colNames.push(dataGrid.columnOption(i, "dataField"));
                        }
                    }
                    var quantidadeColunasAgrupadas = colCount;

                    console.log('grouped columns count: ' + colCount);
                    console.log(colNames);

                    var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                    var tituloAgrupamento = null;

                    const workbook = new ExcelJS.Workbook();
                    const worksheet = workbook.addWorksheet('Vendas');

                    // Set page orientation to landscape
                    worksheet.pageSetup.orientation = 'landscape';

                    // Configurar ajuste de escala manualmente
                    //worksheet.pageSetup.fitToPage = true;
                    //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                    worksheet.pageSetup.fitToWidth = 1; // Largura da página
                    worksheet.pageSetup.scale = 73;

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet,
                        topLeftCell: { row: 4, column: 1 },
                        autoFilterEnabled: true,
                        customizeCell: async (options) => {
                            const { gridCell } = options;
                            const { excelCell } = options;

                            //VERIFICA SE EXISTE AGRUPAMENTO NO GRID PARA DAR UM MERGE NAS COLUNAS
                            if (gridCell.rowType === 'group') {

                                try {
                                    worksheet.mergeCells(excelCell.row, 1, excelCell.row, quantidadeColunasVisiveis);
                                } catch {
                                    console.log("MERGE DE COLUNAS: Este erro é esperado");
                                }

                                if (gridCell.value !== undefined && gridCell.value !== null) {
                                    tituloAgrupamento = gridCell.value;
                                }
                            }

                            //SET OS VALORES DOS TÍTULOS DOS AGRUPAMENTOS APÓS O MERGE DAS COLUNAS
                            if (gridCell.rowType === 'group') {
                                const groupRowTitulo = worksheet.getRow(excelCell.row);

                                groupRowTitulo.getCell(1).value = tituloAgrupamento;
                            }

                            if (gridCell.rowType === 'data') {
                                if (gridCell.column.dataField === 'DS_URL_FOTO') {
                                    excelCell.value = undefined;

                                    const base64Image = await convertImageToBase64(gridCell.value + '?' + new Date());

                                    //VERIFICA SE A IMAGEM FOI ENCONTRADA
                                    if (base64Image.length > 25) {
                                        const image = workbook.addImage({
                                            base64: base64Image,
                                            extension: 'jpg',
                                        });

                                        worksheet.getRow(excelCell.row).height = 60;
                                        worksheet.addImage(image, {
                                            tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
                                            br: { col: excelCell.col, row: excelCell.row },
                                        });
                                    }

                                }
                            }

                        },
                    }).then(async (cellRange) => {

                        //Logotipo
                        const headerRowLogo = worksheet.getRow(1);

                        const imagePath = result.data[0].DS_CAMINHO_LOGO;
                        //const imagePath = '/img/logos/RSlogo_180.gif';

                        const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

                        console.log('ARQUIVO EM BASE 64: ', base64Image);

                        //VERIFICA SE A IMAGEM FOI ENCONTRADA
                        if (base64Image.length > 25) {
                            const image = workbook.addImage({
                                base64: base64Image,
                                extension: 'gif',
                            });

                            // Get image dimensions
                            const img = new Image();
                            img.src = base64Image;
                            await img.decode();
                            const imgWidth = img.width;
                            const imgHeight = img.height;

                            // Calculate dimensions to fit the image within a specific cell range
                            const maxWidth = 200; // maximum width in pixels
                            const maxHeight = 60; // maximum height in pixels
                            const scaleFactor = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
                            const width = imgWidth * scaleFactor;
                            const height = imgHeight * scaleFactor;

                            headerRowLogo.height = 50;
                            worksheet.mergeCells(1, 1, 2, 2);

                            worksheet.addImage(image, {
                                //tl: { col: 0, row: 0 },
                                //br: { col: 2, row: 1 },

                                tl: { col: 0, row: 0 },
                                ext: { width: width, height: height }
                            });
                        }

                        //Título
                        const headerRowTitulo = worksheet.getRow(1);
                        headerRowTitulo.height = 30;
                        worksheet.mergeCells(1, 3, 1, quantidadeColunasVisiveis);

                        headerRowTitulo.getCell(3).value = labelTitulo;
                        headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                        headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                        //Subtítulo
                        const headerRowSubTitulo = worksheet.getRow(2);
                        headerRowSubTitulo.height = 17;
                        worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                        headerRowSubTitulo.getCell(3).value = labelFiltros;
                        headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                        headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                    }).then(() => {
                        workbook.xlsx.writeBuffer().then((buffer) => {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'RelFaturamentoVendedor.xlsx');
                        });
                    });
                    e.cancel = true;
                },

                filterRow: { visible: true, applyFilter: "auto" },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: { visible: true },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    height: 500,
                    position: {
                        my: 'right top',
                        at: 'right bottom',
                        of: '.dx-datagrid-column-chooser-button',
                    },

                },
                columnsAutoWidth: true,
                //cellHintEnabled: true,
                keyExpr: ['CD_LOGIN_VENDEDOR', 'CD_FILIAL'],
                columns: [
                    {
                        dataField: 'DS_URL_FOTO',
                        caption: "",
                        width: 80,
                        allowFiltering: false,
                        allowSorting: false,
                        allowGrouping: false,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        /*cellTemplate: $('#gridPhoto'),*/
                        cellTemplate: function (e, x) {
                            e.append(`<figure class="image rounded mb-0">
                                            <img src="${x.data.DS_URL_FOTO}?${new Date()}" style="width: 60px; height: 60px;" class="rounded-circle">
                                        </figure>`);
                        },
                    },
                    {
                        dataField: "DS_NOME_LOGIN_VENDEDOR",
                        caption: "Vendedor",
                        //width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "DS_NOME_VENDEDOR",
                        caption: "Nome Vendedor",
                        //width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "CD_LOGIN_VENDEDOR",
                        caption: "Login Vendedor",
                        //width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "DS_VENDA_COMPARTILHADA",
                        caption: "Grupo: ",
                        //width: 120,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: agrupamentoVendasCompartilhadasVisible,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        groupIndex: agrupamentoVendasCompartilhadasIndex,
                        //hidingPriority: 195,
                    },
                    {
                        dataField: "CD_FILIAL",
                        caption: "Código Filial",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "DS_FILIAL",
                        caption: "Filial",
                        //width: 120,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: agrupamentoFilialVisible,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        groupIndex: agrupamentoFilialIndex,
                        //hidingPriority: 195,
                    },
                    {
                        dataField: "VL_FATURADO",
                        caption: "Valor Faturado",
                        format: "###,###,###,##0.00",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "VL_FRETE",
                        caption: "Valor Frete",
                        format: "###,###,###,##0.00",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "VL_LIQUIDO_FATURADO",
                        caption: "Valor Líquido sem Frete",
                        format: "###,###,###,##0.00",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "VL_DEVOLUCAO",
                        caption: "Valor Devolução",
                        format: "###,###,###,##0.00",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "VL_SUB_TOTAL",
                        caption: "Sub Total",
                        format: "###,###,###,##0.00",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "VL_AGUARDANDO_FATURAMENTO",
                        caption: "Conta Corrente",
                        format: "###,###,###,##0.00",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "VL_TOTAL_GERAL",
                        caption: "Total Geral",
                        format: "###,###,###,##0.00",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: 'PC_FATURAMENTO',
                        caption: '%',
                        width: 60,
                        dataType: 'number',
                        format: 'percent',
                        alignment: 'center',
                        allowGrouping: false,
                        allowHeaderFiltering: false,
                        cellTemplate: discountCellTemplate,
                        cssClass: 'bullet column-data-grid',
                    },

                ],

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'fa fa-filter',
                                text: 'Filtros',
                                hint: 'Exibir o painel de filtros',
                                type: 'default',
                                onClick() {
                                    exibirFiltros();
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'hierarchy',
                                text: 'Fechar Agrupamento',
                                hint: 'Fechar ou expandir os agrupamentos',
                                onClick(e) {
                                    const dataGrid = $("#gridResultado").dxDataGrid('instance');

                                    const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                    dataGrid.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                                },
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
                        'exportButton',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },

                onToolbarPreparing: AutoResetState([{
                    location: "after",
                    widget: "dxButton",
                    locateInMenu: "auto",
                    showText: 'inMenu',
                    options: {
                        hint: "Diminuir tamanho da fonte",
                        icon: "/img/FontSizeDiminuir.svg",
                        text: "Diminuir Fonte",
                        onClick: function () {
                            var size = $(`#${nameGrid}`).css('font-size').split('px')[0];
                            $(`#${nameGrid}`).css('font-size', --size + 'px')
                        }
                    }
                },
                {
                    location: "after",
                    widget: "dxButton",
                    locateInMenu: "auto",
                    showText: 'inMenu',
                    options: {
                        hint: "Aumentar tamanho da fonte",
                        icon: "/img/FontSizeAumentar.svg",
                        text: "Aumentar Fonte",
                        onClick: function () {
                            var size = $(`#${nameGrid}`).css('font-size').split('px')[0];
                            $(`#${nameGrid}`).css('font-size', ++size + 'px')
                        }
                    }
                }

                ]),

                onCellPrepared: function (e) {

                    //if (e.rowType === "data") {
                    //    if (e.column.dataField === "VL_DEVOLUCAO") {
                    //        if (e.value < 0) {
                    //            e.cellElement.css("color", "#d00000");
                    //            e.cellElement.css("font-weight", "bold");
                    //        };
                    //    }
                    //}
                    if (e.rowType === "group") {
                        //e.cellElement.css("color", "#f05b41");
                        //e.cellElement.css("color", "#f4a261");
                        e.cellElement.css("color", "#e76f51");
                        e.cellElement.css("background-color", "white");
                    }
                },

                summary: {
                    groupItems: [
                        //{
                        //    column: 'CD_LOGIN_VENDEDOR',
                        //    summaryType: 'count',
                        //    displayFormat: "{0} Reg",
                        //},
                        {
                            column: 'VL_FATURADO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_FRETE',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },

                        {
                            column: 'VL_LIQUIDO_FATURADO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_DEVOLUCAO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_SUB_TOTAL',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_AGUARDANDO_FATURAMENTO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_TOTAL_GERAL',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                    ],

                    totalItems: [
                        //{
                        //    column: 'CD_LOGIN_VENDEDOR',
                        //    summaryType: 'count',
                        //    displayFormat: "{0} Reg",
                        //},
                        {
                            column: 'VL_FATURADO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_FRETE',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },

                        {
                            column: 'VL_LIQUIDO_FATURADO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_DEVOLUCAO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_SUB_TOTAL',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_AGUARDANDO_FATURAMENTO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                        {
                            column: 'VL_TOTAL_GERAL',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                            showInGroupFooter: true,
                            alignByColumn: false,
                        },
                    ],
                },

                onInitialized(e) {
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                e.component.updateDimensions();
                            }
                        });
                    }).observe(e.element[0]);
                },

            });

        }
        else {
            loadPanel.hide();

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    rolar_topo();
}

function limparFiltros() {
    $('#lkp_Filiais').dxLookup('instance').option('value', null);
    $('#lkp_Vendedores').dxLookup('instance').option('value', null);
    $('#dt_Inicial_Faturamento').dxDateBox('instance').option('value', null);
    $('#dt_Final_Faturamento').dxDateBox('instance').option('value', null);
    $('#dt_Inicial_Emissao').dxDateBox('instance').option('value', null);
    $('#dt_Final_Emissao').dxDateBox('instance').option('value', null);
    $('#lkp_Agrupamento').dxLookup('instance').option('value', 'Vendedor');
    $('#chk_Exibir_Vendas_Compartilhadas').dxCheckBox('instance').option('value', false);
}

function exibirFiltros() {
    ExibirEsconderPaineis('cardFiltros', 'block');
}

function ExibirEsconderPaineis(el, paramDisplay) {

    var display;


    if (paramDisplay === 'block' || paramDisplay === 'none') {
        display = paramDisplay;
    } else {
        if (document.getElementById(el).style.display === "none") {
            display = 'block';
        } else {
            display = 'none';
        };
    };

    document.getElementById(el).style.display = display;
}

function rolar_para(elemento) {
    //setTimeout(() => {  $('html, body').animate({ scrollTop: $(elemento).offset().top}, 1300); }, 5000);
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function rolar_topo() {
    window.scrollTo(0, 0);
}

function AbrirModal(e) {
    $(e).modal('toggle');
}

function removerComAnimacao(objRemover) {
    const elemento = document.getElementById(objRemover);

    // Define a animação usando CSS transitions
    elemento.style.transition = 'opacity 1s ease-in-out';
    elemento.style.opacity = '0';

    // Define um atraso para aguardar a animação completar
    setTimeout(() => {
        elemento.remove();
    }, 750); // Tempo da animação em milissegundos (1 segundo no exemplo)
}

function convertImageToBase64(imageUrl) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", imageUrl, true);
        xhr.responseType = "blob";

        xhr.onload = () => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };

        xhr.onerror = () => {
            reject(new Error("Failed to fetch image."));
        };

        try {
            xhr.send();
        } catch {
            console.log("LOGOTIPO NÃO ENCONTRADO: ", imageUrl);
        }
    });
}

