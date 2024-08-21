/// <reference path="../../../properties/referencesdevexpress/dx.all.d.ts" />
/// <reference path="../../../properties/referencesdevexpress/jquery.d.ts" />

var loadPanel;
var esconderIndicesInflacao = false;
var esconderIndicesRentabilidade = false;
var esconderIndicesFaturamento = false;
var esconderIndicesVendedor = false;
var esconderIndicesTicket = false;
var filial = null;
var vNomeUsuario = null;
var vNrNivelAcesso = null;
var vVersaoTermo = null;
var vAceiteRealizado = null;
var vNomeUsuarioAceite = null;
var vPossuiTextoResponsabilidade = false;
var oTextoResponsabilidade = null;
var oTextoAdesao = null;
var oScrollTextoAdesao = null;
var oScrollContentTextoAdesao = null;
var oScrollBarTextoAdesao = null;
var oScrollSliderTextoAdesao = null;
var oChkAceiteTermoAdesao = null;
var oChkAceiteTermoAdesaoSimplificado = null;
var oTxtEmailTermoUso = null;
var oTxtEmailTermoUsoSimplificado = null;
var custoVisible = false;

var larguraJanela = window.innerWidth;

if (larguraJanela >= 1850) {
    custoVisible = true;
}

$(document).ready(async function inicio() {
    loadPanel = $('#load_Panel').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando Catálogo ConstruHub',
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel('instance');

    loadPanel.show();

    await Promise.all([
        oChkAceiteTermoAdesao = $('#chkAceiteTermoAdesao').dxCheckBox({
            value: false,
            text: "Aceito o termo de uso para utilização do Catálogo de Produtos ConstruHub",
            elementAttr: {
                class: 'checkbox-font',
            },
        }).dxCheckBox("instance"),

        oChkAceiteTermoAdesaoSimplificado = $('#chkAceiteTermoAdesaoSimplificado').dxCheckBox({
            value: false,
            text: "Aceito o termo de uso para utilização do Catálogo de Produtos ConstruHub",
            elementAttr: {
                class: 'checkbox-font',
            },
        }).dxCheckBox("instance"),

        oTxtEmailTermoUso = $("#txtEmailTermoUso").dxTextBox({
            //labelMode: "floating",
            //label: "Informe seu E-mail",
            placeholder: "Informe seu E-mail",
            showClearButton: true,
            buttons: [{
                name: 'currency',
                location: 'after',
                options: {
                    icon: 'fa fa-send',
                    text: 'Enviar',
                    stylingMode: 'text',
                    width: 80,
                    elementAttr: {
                        class: 'botao-enviar-email',
                    },
                    onClick(e) {
                        enviaEmailTermoAdesao('N');
                    },
                },
            }],
        }).dxTextBox("instance"),

        oTxtEmailTermoUsoSimplificado = $("#txtEmailTermoUsoSimplificado").dxTextBox({
            //labelMode: "floating",
            //label: "Informe seu E-mail",
            placeholder: "Informe seu E-mail",
            showClearButton: true,
            buttons: [{
                name: 'currency',
                location: 'after',
                options: {
                    icon: 'fa fa-send',
                    text: 'Enviar',
                    stylingMode: 'text',
                    width: 80,
                    elementAttr: {
                        class: 'botao-enviar-email',
                    },
                    onClick(e) {
                        enviaEmailTermoAdesao('S');
                    },
                },
            }],
        }).dxTextBox("instance"),

        oTextoAdesao = document.getElementById("textoAdesao"),

        oScrollTextoAdesao = document.getElementById("scrollTextoAdesao"),

        oScrollContentTextoAdesao = document.getElementById("scrollContentTextoAdesao"),

        oScrollBarTextoAdesao = document.getElementById("scrollBarTextoAdesao"),

        oScrollSliderTextoAdesao = document.getElementById("scrollSliderTextoAdesao"),

        oTextoResponsabilidade = document.getElementById("textoResponsabilidade")
    ]);

    //CARREGA OS PARÂMETROS INICIAIS PARA FUNCIONAMENTO DO MÓDULO, INFORMAÇÕES SOBRE OS TERMOS DE USO E DADOS DO USUÁRIO LOGADO
    await $.ajax({
        type: "POST",
        url: "/GestaoEstrategica/CarregaParametrosIndicadoresMercado",
        data: null,
    }).done(function (response) {
        var responseData = JSON.parse(response.Content);

        if (responseData.length > 0) {
            vNomeUsuario = responseData[0].DS_NOME_USUARIO;
            vNrNivelAcesso = responseData[0].NR_NIVEL_ACESSO;
            oTextoAdesao.innerHTML = responseData[0].DS_TERMO;
            vVersaoTermo = responseData[0].CD_VERSAO_TERMO;
            vAceiteRealizado = responseData[0].LG_ACEITE_REALIZADO;
            vNomeUsuarioAceite = responseData[0].DS_NOME_USUARIO_ACEITE;

            if (responseData[0].DS_TERMO_RESPONSABILIDADE) {
                vPossuiTextoResponsabilidade = true;
                oTextoResponsabilidade.innerHTML = responseData[0].DS_TERMO_RESPONSABILIDADE;
            }

            configuraModalTermoAdesao();
        }
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao carregar os parâmetros iniciais dos indicadores", response);
    });

    await Promise.all([
        //RETORNA OS ÍNDICES ACUMULADOS DOS ÚLTIMOS 12 MESES
        GetAzureDataSource(74).then((result) => {

            if (result.success) {

                const [
                    dataSourceIRPAAcumulado,
                    dataSourceIRPA,
                    dataSourceRentabilidadeAcumulada,
                    dataSourceRentabilidade,
                    dataSourceFaturamentoEmpresaAcumulada,
                    dataSourceFaturamentoEmpresa,
                    dataSourceFaturamentoVendedorAcumulada,
                    dataSourceFaturamentoVendedor,
                    dataSourceTicketMedioAcumulado,
                    dataSourceTicketMedio,
                    dataSourceFormaPagamentoMaisUtilizada,
                    dataSourceFormaPagamento,
                ] =
                [
                    result.data[0],
                    result.data[1],
                    result.data[2],
                    result.data[3],
                    result.data[4],
                    result.data[5],
                    result.data[6],
                    result.data[7],
                    result.data[8],
                    result.data[9],
                    result.data[10],
                    result.data[11],
                ];

                const IRPAAcumulado = (dataSourceIRPAAcumulado[0].PC_INDICE_INFLACAO).toLocaleString('pt-BR', { minimumFractionDigits: 2 }); 
                const arrayIRPA = dataSourceIRPA.map(item => item.PC_INDICE_INFLACAO); 

                const rentabilidadeAcumulada = (dataSourceRentabilidadeAcumulada[0].PC_RENTABILIDADE).toLocaleString('pt-BR', { minimumFractionDigits: 2 });  
                const arrayRentabilidade = dataSourceRentabilidade.map(item => item.PC_RENTABILIDADE);

                const faturamentoEmpresaAcumulado = (dataSourceFaturamentoEmpresaAcumulada[0].VL_FATURAMENTO_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                const arrayFaturamentoEmpresa = dataSourceFaturamentoEmpresa.map(item => item.VL_FATURAMENTO_MEDIO);
            
                const faturamentoVendedorAcumulado = (dataSourceFaturamentoVendedorAcumulada[0].VL_MEDIO_FATURAMENTO_VENDEDOR).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                const arrayFaturamentoVendedor = dataSourceFaturamentoVendedor.map(item => item.VL_MEDIO_FATURAMENTO_VENDEDOR);

                const ticketMedioAcumulado = (dataSourceTicketMedioAcumulado[0].VL_TICKET_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                const arrayTicketMedio = dataSourceTicketMedio.map(item => item.VL_TICKET_MEDIO);

                const formaPagamentoMaisUtilizada = dataSourceFormaPagamentoMaisUtilizada[0].DS_FORMA_PAGAMENTO;
                const pcFormaPagamentoMaisUtilizada = (dataSourceFormaPagamentoMaisUtilizada[0].PC_FORMA_PAGAMENTO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                const arrayFormaPagamento = dataSourceFormaPagamento.map(item => item.PC_FORMA_PAGAMENTO);

                $('#labelIRPAAcumulado').hide().text(IRPAAcumulado + '%').fadeIn(500);
                $('#labelRentabilidadeAcumulado').hide().text(rentabilidadeAcumulada + '%').fadeIn(500);
                $('#labelFaturamentoEmpresaAcumulado').hide().text('R$ ' + faturamentoEmpresaAcumulado).fadeIn(500);
                $('#labelFaturamentoVendedorAcumulado').hide().text('R$ ' + faturamentoVendedorAcumulado).fadeIn(500);
                $('#labelTicketMedioAcumulado').hide().text('R$ ' + ticketMedioAcumulado).fadeIn(500);
                $('#labelFormaPagamentoMaisUtilizada').hide().text(formaPagamentoMaisUtilizada + ' ' + pcFormaPagamentoMaisUtilizada + '%').fadeIn(500);

                if (dataSourceIRPAAcumulado[0].PC_INDICE_INFLACAO < 0) {
                    $('#labelIRPAAcumulado').addClass('text-danger');
                } 
            
                if ($('#sparklineIRPA').get(0)) {
                    $("#sparklineIRPA").sparkline(arrayIRPA, {
                        type: 'bar',
                        width: '60',
                        height: '45',
                        lineColor: '#0088cc',
                        barColor: '#7AB8EB',
                        negBarColor: '#DC3545',
                    });
                }

                if ($('#sparklineRentabilidade').get(0)) {
                    $("#sparklineRentabilidade").sparkline(arrayRentabilidade, {
                        type: 'line',
                        width: '60',
                        height: '30',
                        lineColor: '#0088cc',
                        barColor: '#7AB8EB',
                    });
                }

                if ($('#sparklineFaturamento').get(0)) {
                    $("#sparklineFaturamento").sparkline(arrayFaturamentoEmpresa, {
                        type: 'line',
                        width: '60',
                        height: '30',
                        lineColor: '#0088cc',
                        barColor: '#7AB8EB',
                    });
                }

                if ($('#sparklineFaturamentoVendedor').get(0)) {
                    $("#sparklineFaturamentoVendedor").sparkline(arrayFaturamentoVendedor, {
                        type: 'line',
                        width: '60',
                        height: '30',
                        lineColor: '#0088cc',
                        barColor: '#7AB8EB',
                    });
                }

                if ($('#sparklineTicketMedio').get(0)) {
                    $("#sparklineTicketMedio").sparkline(arrayTicketMedio, {
                        type: 'line',
                        width: '60',
                        height: '30',
                        lineColor: '#0088cc',
                        barColor: '#7AB8EB',
                    });
                }

                if ($('#sparklineFaturamentoForma').get(0)) {
                    $("#sparklineFaturamentoForma").sparkline(arrayFormaPagamento, {
                        type: 'bar',
                        width: '40',
                        height: '30',
                        barColor: '#7AB8EB',
                        negBarColor: '#B20000'
                    });
                }

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
        }),

        //RETORNA OS DADOS HISTÓRICOS DO IRPA-MC (INFLAÇÃO DE MERCADO)
        GetAzureDataSource(75, '{ PROCEDIMENTO: 1 }', timeOut = 60).then((result) => {

            if (result.success) {

                const [
                    dataSourcePrimeiroAno,
                    dataSourcePrimeiroAnoAcumulado,

                    dataSourceSegundoAno,
                    dataSourceSegundoAnoAcumulado,

                    dataSourceTerceiroAno,
                    dataSourceTerceiroAnoAcumulado,

                    dataSource12Meses,
                    dataSource12MesesAcumulado,

                    dataSourceHistorico,
                ] = [
                        result.data[0],
                        result.data[1],
                        result.data[2],
                        result.data[3],
                        result.data[4],
                        result.data[5],
                        result.data[6],
                        result.data[7],
                        result.data[8],
                        result.data[9],
                    ]

                var vPcInflacaoAcumuladaPrimeiroAno = (dataSourcePrimeiroAnoAcumulado[0].PC_INDICE_INFLACAO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                var vPcInflacaoAcumuladaSegundoAno = (dataSourceSegundoAnoAcumulado[0].PC_INDICE_INFLACAO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                var vPcInflacaoAcumuladaTerceiroAno = (dataSourceTerceiroAnoAcumulado[0].PC_INDICE_INFLACAO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                var vPcInflacaoAcumulada12Meses = (dataSource12MesesAcumulado[0].PC_INDICE_INFLACAO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                $('#labelInflacaoPrimeiroAno').hide().text(dataSourcePrimeiroAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelInflacaoSegundoAno').hide().text(dataSourceSegundoAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelInflacaoTerceiroAno').hide().text(dataSourceTerceiroAnoAcumulado[0].NR_ANO).fadeIn(500);

                $('#labelPcInflacaoAcumuladaPrimeiroAno').hide().text(vPcInflacaoAcumuladaPrimeiroAno + '%').fadeIn(500);
                $('#labelPcInflacaoAcumuladaSegundoAno').hide().text(vPcInflacaoAcumuladaSegundoAno + '%').fadeIn(500);
                $('#labelPcInflacaoAcumuladaTerceiroAno').hide().text(vPcInflacaoAcumuladaTerceiroAno + '%').fadeIn(500);
                $('#labelPcInflacaoAcumulada12Meses').hide().text(vPcInflacaoAcumulada12Meses + '%').fadeIn(500);

                if (dataSourcePrimeiroAnoAcumulado[0].PC_INDICE_INFLACAO < 0) {
                    $('#labelInflacaoAcumuladaPrimeiroAnoNegativo').removeClass('alert-default').addClass('alert-danger'); 
                }

                if (dataSourceSegundoAnoAcumulado[0].PC_INDICE_INFLACAO < 0) {
                    $('#labelInflacaoAcumuladaSegundoAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceTerceiroAnoAcumulado[0].PC_INDICE_INFLACAO < 0) {
                    $('#labelInflacaoAcumuladaTerceiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSource12MesesAcumulado[0].PC_INDICE_INFLACAO < 0) {
                    $('#labelInflacaoAcumulada12MesesNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                $('#chartInflacao').dxChart({
                    dataSource: dataSourceHistorico,
                    palette: 'Soft Blue',
                    commonSeriesSettings: {
                        type: 'spline',
                        //color: '#ffaa66',
                        argumentField: 'DS_MES',
                        valueField: 'PC_INDICE_INFLACAO',
                        ignoreEmptyPoints: true,
                        point: {
                            size: 8,
                        },
                    },
                    series: [
                        { valueField: 'PC_INDICE_INFLACAO', name: 'IRPA-MC' },
                    ],
                    legend: {
                        visible: false,
                        font: {
                            size: 10,
                        },
                    },

                    valueAxis: [
                    {
                        constantLines: [{
                            value: 0,
                            color: '#fc3535',
                            dashStyle: 'solid',
                            width: 1,
                            label: { visible: false },
                        }],
                    }],

                    commonAxisSettings: {
                        label: {
                            font: {
                                size: 10,
                            },
                        },
                        grid: {
                            visible: false,
                        },
                    },
                    tooltip: {
                        enabled: true,
                        location: 'edge',
                        customizeTooltip(arg) {
                            //const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(arg.originalValue);
                            const valorFormatado = (arg.originalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            return {
                                html: `<b>${arg.argument}</b><br>IRPA-MC<div class='currency'>${valorFormatado}%`,
                            };
                        },
                    },
                    size: {
                        height: 180,
                    },
                    adaptiveLayout: {
                        width: 450,
                    },
                    onInitialized: (e) => {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.refresh();
                            });
                        }).observe(e.element[0]);
                    }
                });

                gridInflacaoPrimeiroAno = $("#gridInflacaoPrimeiroAno").dxDataGrid({
                    dataSource: dataSourcePrimeiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridInflacaoPrimeiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO','NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 65,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_INDICE_INFLACAO",
                            caption: "IRPA-MC",
                            format: "###,###,###,##0.00'%'",
                            //width: 50,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {
                            if (e.column.dataField === "PC_INDICE_INFLACAO") {
                                if (e.value < 0) {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                        }
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

                }).dxDataGrid('instance');

                gridInflacaoSegundoAno = $("#gridInflacaoSegundoAno").dxDataGrid({
                    dataSource: dataSourceSegundoAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridInflacaoSegundoAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_INDICE_INFLACAO",
                            caption: "IRPA-MC",
                            format: "###,###,###,##0.00'%'",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {
                            if (e.column.dataField === "PC_INDICE_INFLACAO") {
                                if (e.value < 0) {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                        }
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

                }).dxDataGrid('instance');

                gridInflacaoTerceiroAno = $("#gridInflacaoTerceiroAno").dxDataGrid({
                    dataSource: dataSourceTerceiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridInflacaoTerceiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_INDICE_INFLACAO",
                            caption: "IRPA-MC",
                            format: "###,###,###,##0.00'%'",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 301,
                        },
                    ],

                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {
                            if (e.column.dataField === "PC_INDICE_INFLACAO") {
                                if (e.value < 0) {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                        }
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

                }).dxDataGrid('instance');

                gridInflacao12Meses = $("#gridInflacao12Meses").dxDataGrid({
                    dataSource: dataSource12Meses,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridInflacao12Meses").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_INDICE_INFLACAO",
                            caption: "IRPA-MC",
                            format: "###,###,###,##0.00'%'",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 301,
                        },
                    ],

                    showBorders: true,
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {
                            if (e.column.dataField === "PC_INDICE_INFLACAO") {
                                if (e.value < 0) {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                        }
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

                }).dxDataGrid('instance');
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
        }),

        //RETORNA OS DADOS HISTÓRICOS DE % RENTABILIDADE
        GetAzureDataSource(75, '{ PROCEDIMENTO: 2 }', timeOut = 60).then((result) => {

            if (result.success) {

                const [
                    dataSourcePrimeiroAno,
                    dataSourcePrimeiroAnoAcumulado,

                    dataSourceSegundoAno,
                    dataSourceSegundoAnoAcumulado,

                    dataSourceTerceiroAno,
                    dataSourceTerceiroAnoAcumulado,

                    dataSource12Meses,
                    dataSource12MesesAcumulado,

                    dataSourceHistorico,
                ] = [
                        result.data[0],
                        result.data[1],
                        result.data[2],
                        result.data[3],
                        result.data[4],
                        result.data[5],
                        result.data[6],
                        result.data[7],
                        result.data[8],
                        result.data[9],
                    ]

                var vPcRentabilidadeAcumuladaPrimeiroAno = (dataSourcePrimeiroAnoAcumulado[0].PC_RENTABILIDADE).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                var vPcRentabilidadeAcumuladaSegundoAno = (dataSourceSegundoAnoAcumulado[0].PC_RENTABILIDADE).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                var vPcRentabilidadeAcumuladaTerceiroAno = (dataSourceTerceiroAnoAcumulado[0].PC_RENTABILIDADE).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                var vPcRentabilidadeAcumulada12Meses = (dataSource12MesesAcumulado[0].PC_RENTABILIDADE).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                $('#labelRentabilidadePrimeiroAno').hide().text(dataSourcePrimeiroAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelRentabilidadeSegundoAno').hide().text(dataSourceSegundoAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelRentabilidadeTerceiroAno').hide().text(dataSourceTerceiroAnoAcumulado[0].NR_ANO).fadeIn(500);

                $('#labelPcRentabilidadeAcumuladaPrimeiroAno').hide().text(vPcRentabilidadeAcumuladaPrimeiroAno + '%').fadeIn(500);
                $('#labelPcRentabilidadeAcumuladaSegundoAno').hide().text(vPcRentabilidadeAcumuladaSegundoAno + '%').fadeIn(500);
                $('#labelPcRentabilidadeAcumuladaTerceiroAno').hide().text(vPcRentabilidadeAcumuladaTerceiroAno + '%').fadeIn(500);
                $('#labelPcRentabilidadeAcumulada12Meses').hide().text(vPcRentabilidadeAcumulada12Meses + '%').fadeIn(500);

                if (dataSourcePrimeiroAnoAcumulado[0].PC_RENTABILIDADE < 0) {
                    $('#labelRentabilidadeAcumuladaPrimeiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceSegundoAnoAcumulado[0].PC_RENTABILIDADE < 0) {
                    $('#labelRentabilidadeAcumuladaSegundoAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceTerceiroAnoAcumulado[0].PC_RENTABILIDADE < 0) {
                    $('#labelRentabilidadeAcumuladaTerceiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSource12MesesAcumulado[0].PC_RENTABILIDADE < 0) {
                    $('#labelRentabilidadeAcumulada12MesesNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                $('#chartRentabilidade').dxChart({
                    dataSource: dataSourceHistorico,
                    palette: 'Soft Blue',
                    commonSeriesSettings: {
                        type: 'spline',
                        //color: '#ffaa66',
                        argumentField: 'DS_MES',
                        valueField: 'PC_RENTABILIDADE',
                        ignoreEmptyPoints: true,
                        point: {
                            size: 8,
                        },
                    },
                    series: [
                        { valueField: 'PC_RENTABILIDADE', name: 'Rentabilidade' },
                    ],
                    legend: {
                        visible: false,
                        font: {
                            size: 10,
                        },
                    },
                    commonAxisSettings: {
                        label: {
                            font: {
                                size: 10,
                            },
                        },
                        grid: {
                            visible: true,
                        },
                    },
                    tooltip: {
                        enabled: true,
                        location: 'edge',
                        customizeTooltip(arg) {
                            //const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(arg.originalValue);
                            const valorFormatado = (arg.originalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            return {
                                html: `<b>${arg.argument}</b><br>Rentabilidade<div class='currency'>${valorFormatado}%`,
                            };
                        },
                    },
                    size: {
                        height: 180,
                    },
                    adaptiveLayout: {
                        width: 450,
                    },
                    onInitialized: (e) => {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.refresh();
                            });
                        }).observe(e.element[0]);
                    }
                });

                gridRentabilidadePrimeiroAno = $("#gridRentabilidadePrimeiroAno").dxDataGrid({
                    dataSource: dataSourcePrimeiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridRentabilidadePrimeiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 65,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_RENTABILIDADE",
                            caption: "RENTABILIDADE",
                            format: "###,###,###,##0.00'%'",
                            //width: 50,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridRentabilidadeSegundoAno = $("#gridRentabilidadeSegundoAno").dxDataGrid({
                    dataSource: dataSourceSegundoAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridRentabilidadeSegundoAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_RENTABILIDADE",
                            caption: "RENTABILIDADE",
                            format: "###,###,###,##0.00'%'",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridRentabilidadeTerceiroAno = $("#gridRentabilidadeTerceiroAno").dxDataGrid({
                    dataSource: dataSourceTerceiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridRentabilidadeTerceiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_RENTABILIDADE",
                            caption: "RENTABILIDADE",
                            format: "###,###,###,##0.00'%'",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridRentabilidade12Meses = $("#gridRentabilidade12Meses").dxDataGrid({
                    dataSource: dataSource12Meses,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridRentabilidade12Meses").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "PC_RENTABILIDADE",
                            caption: "RENTABILIDADE",
                            format: "###,###,###,##0.00'%'",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');
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
        }),

        //RETORNA OS DADOS HISTÓRICOS DE FATURAMENTO POR EMPRESA
        GetAzureDataSource(75, '{ PROCEDIMENTO: 3 }', timeOut = 60).then((result) => {

            if (result.success) {

                const [
                    dataSourcePrimeiroAno,
                    dataSourcePrimeiroAnoAcumulado,

                    dataSourceSegundoAno,
                    dataSourceSegundoAnoAcumulado,

                    dataSourceTerceiroAno,
                    dataSourceTerceiroAnoAcumulado,

                    dataSource12Meses,
                    dataSource12MesesAcumulado,

                    dataSourceHistorico,
                ] = [
                        result.data[0],
                        result.data[1],
                        result.data[2],
                        result.data[3],
                        result.data[4],
                        result.data[5],
                        result.data[6],
                        result.data[7],
                        result.data[8],
                        result.data[9],
                    ]

                var vFaturamentoAcumuladaPrimeiroAno = (dataSourcePrimeiroAnoAcumulado[0].VL_FATURAMENTO_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vFaturamentoAcumuladaSegundoAno = (dataSourceSegundoAnoAcumulado[0].VL_FATURAMENTO_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vFaturamentoAcumuladaTerceiroAno = (dataSourceTerceiroAnoAcumulado[0].VL_FATURAMENTO_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vFaturamentoAcumulada12Meses = (dataSource12MesesAcumulado[0].VL_FATURAMENTO_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });

                $('#labelFaturamentoPrimeiroAno').hide().text(dataSourcePrimeiroAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelFaturamentoSegundoAno').hide().text(dataSourceSegundoAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelFaturamentoTerceiroAno').hide().text(dataSourceTerceiroAnoAcumulado[0].NR_ANO).fadeIn(500);

                $('#labelPcFaturamentoAcumuladaPrimeiroAno').hide().text('R$ ' + vFaturamentoAcumuladaPrimeiroAno).fadeIn(500);
                $('#labelPcFaturamentoAcumuladaSegundoAno').hide().text('R$ ' + vFaturamentoAcumuladaSegundoAno).fadeIn(500);
                $('#labelPcFaturamentoAcumuladaTerceiroAno').hide().text('R$ ' + vFaturamentoAcumuladaTerceiroAno).fadeIn(500);
                $('#labelPcFaturamentoAcumulada12Meses').hide().text('R$ ' + vFaturamentoAcumulada12Meses).fadeIn(500);

                if (dataSourcePrimeiroAnoAcumulado[0].PC_Faturamento < 0) {
                    $('#labelFaturamentoAcumuladaPrimeiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceSegundoAnoAcumulado[0].PC_Faturamento < 0) {
                    $('#labelFaturamentoAcumuladaSegundoAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceTerceiroAnoAcumulado[0].PC_Faturamento < 0) {
                    $('#labelFaturamentoAcumuladaTerceiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSource12MesesAcumulado[0].PC_Faturamento < 0) {
                    $('#labelFaturamentoAcumulada12MesesNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                $('#chartFaturamento').dxChart({
                    dataSource: dataSourceHistorico,
                    palette: 'Soft Blue',
                    commonSeriesSettings: {
                        type: 'spline',
                        //color: '#ffaa66',
                        argumentField: 'DS_MES',
                        valueField: 'VL_FATURAMENTO_MEDIO',
                        ignoreEmptyPoints: true,
                        point: {
                            size: 8,
                        },
                    },
                    series: [
                        { valueField: 'VL_FATURAMENTO_MEDIO', name: 'Faturamento' },
                    ],
                    legend: {
                        visible: false,
                        font: {
                            size: 10,
                        },
                    },
                    commonAxisSettings: {
                        label: {
                            font: {
                                size: 10,
                            },
                        },
                        grid: {
                            visible: true,
                        },
                    },
                    tooltip: {
                        enabled: true,
                        location: 'edge',
                        customizeTooltip(arg) {
                            const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(arg.originalValue);
                            //const valorFormatado = (arg.originalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            return {
                                html: `<b>${arg.argument}</b><br>Faturamento Médio por Empresa<div class='currency'>${valorFormatado}`,
                            };
                        },
                    },
                    size: {
                        height: 180,
                    },
                    adaptiveLayout: {
                        width: 450,
                    },
                    onInitialized: (e) => {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.refresh();
                            });
                        }).observe(e.element[0]);
                    }
                });

                gridFaturamentoPrimeiroAno = $("#gridFaturamentoPrimeiroAno").dxDataGrid({
                    dataSource: dataSourcePrimeiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamentoPrimeiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 65,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_FATURAMENTO_MEDIO",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 50,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridFaturamentoSegundoAno = $("#gridFaturamentoSegundoAno").dxDataGrid({
                    dataSource: dataSourceSegundoAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamentoSegundoAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_FATURAMENTO_MEDIO",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridFaturamentoTerceiroAno = $("#gridFaturamentoTerceiroAno").dxDataGrid({
                    dataSource: dataSourceTerceiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamentoTerceiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_FATURAMENTO_MEDIO",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridFaturamento12Meses = $("#gridFaturamento12Meses").dxDataGrid({
                    dataSource: dataSource12Meses,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamento12Meses").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_FATURAMENTO_MEDIO",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');
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
        }),

        //RETORNA OS DADOS HISTÓRICOS DE FATURAMENTO POR EMPRESA
        GetAzureDataSource(75, '{ PROCEDIMENTO: 4 }', timeOut = 60).then((result) => {

            if (result.success) {

                const [
                    dataSourcePrimeiroAno,
                    dataSourcePrimeiroAnoAcumulado,

                    dataSourceSegundoAno,
                    dataSourceSegundoAnoAcumulado,

                    dataSourceTerceiroAno,
                    dataSourceTerceiroAnoAcumulado,

                    dataSource12Meses,
                    dataSource12MesesAcumulado,

                    dataSourceHistorico,
                ] = [
                        result.data[0],
                        result.data[1],
                        result.data[2],
                        result.data[3],
                        result.data[4],
                        result.data[5],
                        result.data[6],
                        result.data[7],
                        result.data[8],
                        result.data[9],
                    ]

                var vFaturamentoVendedorAcumuladaPrimeiroAno = (dataSourcePrimeiroAnoAcumulado[0].VL_MEDIO_FATURAMENTO_VENDEDOR).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vFaturamentoVendedorAcumuladaSegundoAno = (dataSourceSegundoAnoAcumulado[0].VL_MEDIO_FATURAMENTO_VENDEDOR).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vFaturamentoVendedorAcumuladaTerceiroAno = (dataSourceTerceiroAnoAcumulado[0].VL_MEDIO_FATURAMENTO_VENDEDOR).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vFaturamentoVendedorAcumulada12Meses = (dataSource12MesesAcumulado[0].VL_MEDIO_FATURAMENTO_VENDEDOR).toLocaleString('pt-BR', { minimumFractionDigits: 0 });

                $('#labelFaturamentoVendedorPrimeiroAno').hide().text(dataSourcePrimeiroAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelFaturamentoVendedorSegundoAno').hide().text(dataSourceSegundoAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelFaturamentoVendedorTerceiroAno').hide().text(dataSourceTerceiroAnoAcumulado[0].NR_ANO).fadeIn(500);

                $('#labelPcFaturamentoVendedorAcumuladaPrimeiroAno').hide().text('R$ ' + vFaturamentoVendedorAcumuladaPrimeiroAno).fadeIn(500);
                $('#labelPcFaturamentoVendedorAcumuladaSegundoAno').hide().text('R$ ' + vFaturamentoVendedorAcumuladaSegundoAno).fadeIn(500);
                $('#labelPcFaturamentoVendedorAcumuladaTerceiroAno').hide().text('R$ ' + vFaturamentoVendedorAcumuladaTerceiroAno).fadeIn(500);
                $('#labelPcFaturamentoVendedorAcumulada12Meses').hide().text('R$ ' + vFaturamentoVendedorAcumulada12Meses).fadeIn(500);

                if (dataSourcePrimeiroAnoAcumulado[0].PC_FaturamentoVendedor < 0) {
                    $('#labelFaturamentoVendedorAcumuladaPrimeiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceSegundoAnoAcumulado[0].PC_FaturamentoVendedor < 0) {
                    $('#labelFaturamentoVendedorAcumuladaSegundoAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceTerceiroAnoAcumulado[0].PC_FaturamentoVendedor < 0) {
                    $('#labelFaturamentoVendedorAcumuladaTerceiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSource12MesesAcumulado[0].PC_FaturamentoVendedor < 0) {
                    $('#labelFaturamentoVendedorAcumulada12MesesNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                $('#chartFaturamentoVendedor').dxChart({
                    dataSource: dataSourceHistorico,
                    palette: 'Soft Blue',
                    commonSeriesSettings: {
                        type: 'spline',
                        //color: '#ffaa66',
                        argumentField: 'DS_MES',
                        valueField: 'VL_MEDIO_FATURAMENTO_VENDEDOR',
                        ignoreEmptyPoints: true,
                        point: {
                            size: 8,
                        },
                    },
                    series: [
                        { valueField: 'VL_MEDIO_FATURAMENTO_VENDEDOR', name: 'FaturamentoVendedor' },
                    ],
                    legend: {
                        visible: false,
                        font: {
                            size: 10,
                        },
                    },
                    commonAxisSettings: {
                        label: {
                            font: {
                                size: 10,
                            },
                        },
                        grid: {
                            visible: true,
                        },
                    },
                    tooltip: {
                        enabled: true,
                        location: 'edge',
                        customizeTooltip(arg) {
                            const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(arg.originalValue);
                            //const valorFormatado = (arg.originalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            return {
                                html: `<b>${arg.argument}</b><br>Faturamento Médio por Vendedor<div class='currency'>${valorFormatado}`,
                            };
                        },
                    },
                    size: {
                        height: 180,
                    },
                    adaptiveLayout: {
                        width: 450,
                    },
                    onInitialized: (e) => {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.refresh();
                            });
                        }).observe(e.element[0]);
                    }
                });

                gridFaturamentoVendedorPrimeiroAno = $("#gridFaturamentoVendedorPrimeiroAno").dxDataGrid({
                    dataSource: dataSourcePrimeiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamentoVendedorPrimeiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 65,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_MEDIO_FATURAMENTO_VENDEDOR",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 50,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridFaturamentoVendedorSegundoAno = $("#gridFaturamentoVendedorSegundoAno").dxDataGrid({
                    dataSource: dataSourceSegundoAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamentoVendedorSegundoAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_MEDIO_FATURAMENTO_VENDEDOR",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridFaturamentoVendedorTerceiroAno = $("#gridFaturamentoVendedorTerceiroAno").dxDataGrid({
                    dataSource: dataSourceTerceiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamentoVendedorTerceiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_MEDIO_FATURAMENTO_VENDEDOR",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridFaturamentoVendedor12Meses = $("#gridFaturamentoVendedor12Meses").dxDataGrid({
                    dataSource: dataSource12Meses,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridFaturamentoVendedor12Meses").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_MEDIO_FATURAMENTO_VENDEDOR",
                            caption: "FATURAMENTO",
                            format: "###,###,###,##0",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');
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
        }),

        //RETORNA OS DADOS HISTÓRICOS DE TICKET MÉDIO
        GetAzureDataSource(75, '{ PROCEDIMENTO: 5 }', timeOut = 60).then((result) => {

            if (result.success) {

                const [
                    dataSourcePrimeiroAno,
                    dataSourcePrimeiroAnoAcumulado,

                    dataSourceSegundoAno,
                    dataSourceSegundoAnoAcumulado,

                    dataSourceTerceiroAno,
                    dataSourceTerceiroAnoAcumulado,

                    dataSource12Meses,
                    dataSource12MesesAcumulado,

                    dataSourceHistorico,
                ] = [
                        result.data[0],
                        result.data[1],
                        result.data[2],
                        result.data[3],
                        result.data[4],
                        result.data[5],
                        result.data[6],
                        result.data[7],
                        result.data[8],
                        result.data[9],
                    ]

                var vTicketAcumuladaPrimeiroAno = (dataSourcePrimeiroAnoAcumulado[0].VL_TICKET_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vTicketAcumuladaSegundoAno = (dataSourceSegundoAnoAcumulado[0].VL_TICKET_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vTicketAcumuladaTerceiroAno = (dataSourceTerceiroAnoAcumulado[0].VL_TICKET_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vTicketAcumulada12Meses = (dataSource12MesesAcumulado[0].VL_TICKET_MEDIO).toLocaleString('pt-BR', { minimumFractionDigits: 0 });

                $('#labelTicketPrimeiroAno').hide().text(dataSourcePrimeiroAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelTicketSegundoAno').hide().text(dataSourceSegundoAnoAcumulado[0].NR_ANO).fadeIn(500);
                $('#labelTicketTerceiroAno').hide().text(dataSourceTerceiroAnoAcumulado[0].NR_ANO).fadeIn(500);

                $('#labelPcTicketAcumuladaPrimeiroAno').hide().text('R$ ' + vTicketAcumuladaPrimeiroAno).fadeIn(500);
                $('#labelPcTicketAcumuladaSegundoAno').hide().text('R$ ' + vTicketAcumuladaSegundoAno).fadeIn(500);
                $('#labelPcTicketAcumuladaTerceiroAno').hide().text('R$ ' + vTicketAcumuladaTerceiroAno).fadeIn(500);
                $('#labelPcTicketAcumulada12Meses').hide().text('R$ ' + vTicketAcumulada12Meses).fadeIn(500);

                if (dataSourcePrimeiroAnoAcumulado[0].PC_Ticket < 0) {
                    $('#labelTicketAcumuladaPrimeiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceSegundoAnoAcumulado[0].PC_Ticket < 0) {
                    $('#labelTicketAcumuladaSegundoAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSourceTerceiroAnoAcumulado[0].PC_Ticket < 0) {
                    $('#labelTicketAcumuladaTerceiroAnoNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                if (dataSource12MesesAcumulado[0].PC_Ticket < 0) {
                    $('#labelTicketAcumulada12MesesNegativo').removeClass('alert-default').addClass('alert-danger');
                }

                $('#chartTicket').dxChart({
                    dataSource: dataSourceHistorico,
                    palette: 'Soft Blue',
                    commonSeriesSettings: {
                        type: 'spline',
                        //color: '#ffaa66',
                        argumentField: 'DS_MES',
                        valueField: 'VL_TICKET_MEDIO',
                        ignoreEmptyPoints: true,
                        point: {
                            size: 8,
                        },
                    },
                    series: [
                        { valueField: 'VL_TICKET_MEDIO', name: 'Ticket' },
                    ],
                    legend: {
                        visible: false,
                        font: {
                            size: 10,
                        },
                    },
                    commonAxisSettings: {
                        label: {
                            font: {
                                size: 10,
                            },
                        },
                        grid: {
                            visible: true,
                        },
                    },
                    tooltip: {
                        enabled: true,
                        location: 'edge',
                        customizeTooltip(arg) {
                            const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(arg.originalValue);
                            //const valorFormatado = (arg.originalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            return {
                                html: `<b>${arg.argument}</b><br>Ticket Médio por Empresa<div class='currency'>${valorFormatado}`,
                            };
                        },
                    },
                    size: {
                        height: 180,
                    },
                    adaptiveLayout: {
                        width: 450,
                    },
                    onInitialized: (e) => {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.refresh();
                            });
                        }).observe(e.element[0]);
                    }
                });

                gridTicketPrimeiroAno = $("#gridTicketPrimeiroAno").dxDataGrid({
                    dataSource: dataSourcePrimeiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridTicketPrimeiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 65,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_TICKET_MEDIO",
                            caption: "TICKET MÉDIO",
                            format: "###,###,###,##0.00",
                            //width: 50,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridTicketSegundoAno = $("#gridTicketSegundoAno").dxDataGrid({
                    dataSource: dataSourceSegundoAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridTicketSegundoAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_TICKET_MEDIO",
                            caption: "TICKET MÉDIO",
                            format: "###,###,###,##0.00",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridTicketTerceiroAno = $("#gridTicketTerceiroAno").dxDataGrid({
                    dataSource: dataSourceTerceiroAno,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridTicketTerceiroAno").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_TICKET_MEDIO",
                            caption: "TICKET MÉDIO",
                            format: "###,###,###,##0.00",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');

                gridTicket12Meses = $("#gridTicket12Meses").dxDataGrid({
                    dataSource: dataSource12Meses,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: 'single',
                        //    allowSelectAll: true,
                        //    showCheckBoxesMode: 'always',
                        //    deferred: false,
                    },
                    focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
                    paging: { pageSize: 100 },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting(e) {

                        var dataGrid = $("#gridTicket12Meses").dxDataGrid("instance");

                        //var colunasVisiveis = $(`#${nameGrid}`).dxDataGrid("instance").getVisibleColumns();
                        //var quantidadeColunasVisiveis = colunasVisiveis.length - 1;
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
                        var quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas - 1;
                        var tituloAgrupamento = null;

                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Extrato');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 85;

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },

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
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);

                            const imagePath = transacoesPix[0].DS_CAMINHO_LOGO;
                            //const imagePath = '/img/logos/RSlogo_180.gif';

                            const base64Image = await convertImageToBase64(imagePath + '?' + new Date());

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

                            headerRowTitulo.getCell(3).value = 'Extrato de Cobrança HubPix';
                            headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(3).value = labelMes;
                            headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExtratoCobrançaIntegraçãoPix_' + nrMes.toString() + '.' + nrAno.toString() + '.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: false },
                    columnChooser: {
                        enabled: false,
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
                    //stateStoring: AutoLoad("dataSourcePrimeiroAno", false),
                    keyExpr: ['NR_ANO', 'NR_MES'],
                    columns: [
                        {
                            dataField: "DS_MES",
                            caption: "MESES",
                            //width: 120,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            //hidingPriority: 303,
                        },
                        {
                            dataField: "VL_TICKET_MEDIO",
                            caption: "TICKET MÉDIO",
                            format: "###,###,###,##0.00",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            hidingPriority: 301,
                        },
                    ],

                    showBorders: true,

                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },

                }).dxDataGrid('instance');
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
        }),

        //FILIAIS QUE O USUÁRIO POSSUI ACESSO PARA COMPARAÇÃO DE PREÇOS DA LOJA COM O MERCADO
        GetAzureDataSource(33).then((result) => {

            if (result.success) {

                //pega o primeiro registro entre as filiais
                filial = result.data.length > 0 ? result.data[0].CD_FILIAL : null;

                $('#lkp_Filiais').dxLookup({
                    dataSource: result.data,
                    value: filial,
                    searchExpr: ['DS_PESQUISA'],
                    displayExpr: 'DS_PESQUISA',
                    valueExpr: 'CD_FILIAL',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Filiais',
                    },
                    onValueChanged(e) {
                        filial = e.value;
                    },
                    labelMode: 'floating',
                    label: 'Filial',
                    placeholder: 'Filial',
                    showClearButton: false,
                });

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
        })
    ]);

    loadPanel.hide();

    processaDadosProdutos();
});

function processaDadosProdutos() {
    //var filial = $('#lkp_Filiais').dxLookup("instance").option('value');

    loadPanel.show();

    //RETORNA OS PRODUTOS DO CATÁLOGO DE PRODUTOS
    GetAzureDataSource(77, '{ CD_FILIAL: ' + filial + ' }', timeOut = 180).then((result) => {
        if (result.success) {
            const [dataSourceCatalogoProdutos] = [result.data];

            const dadosLiberados = dataSourceCatalogoProdutos[0].LG_DADOS_LIBERADOS;

            if (dadosLiberados == true) {
                var vFaturamentoProduto = (dataSourceCatalogoProdutos[0].VL_FATURAMENTO_MEDIO_MENSAL).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
                var vDescricaoProduto = dataSourceCatalogoProdutos[0].DS_PRODUTO_CATALOGO;

                $('#labelFaturamentoProduto').hide().text('R$ ' + vFaturamentoProduto).fadeIn(500);
                $('#labelDescricaoProduto').hide().text(vDescricaoProduto).fadeIn(500);

                dataSourceCatalogoProdutos.sort(function (a, b) {
                    return b.value - a.value; // Ordena de maior para menor
                });

                // Seleciona os 8 primeiros registros para o gráfico
                var dataSourceChartCatalogoProdutos = dataSourceCatalogoProdutos.slice(0, 8); // Seleciona os primeiros 8 registros

                const arrayCatalogoProdutos = dataSourceChartCatalogoProdutos.map(item => item.VL_FATURAMENTO_MEDIO_MENSAL);
                if ($('#sparklineProduto').get(0)) {
                    $("#sparklineProduto").sparkline(arrayCatalogoProdutos, {
                        type: 'bar',
                        width: '60',
                        height: '40',
                        lineColor: '#0088cc',
                        barColor: '#7AB8EB',
                        negBarColor: '#DC3545',
                    });
                }

                $('#chartCatalogoProdutos').dxChart({
                    dataSource: dataSourceChartCatalogoProdutos,
                    palette: 'Soft Pastel',
                    commonSeriesSettings: {
                        type: 'bar',
                        //color: '#ffaa66',
                        argumentField: 'DS_PRODUTO_CATALOGO',
                        valueField: 'VL_FATURAMENTO_MEDIO_MENSAL',
                        ignoreEmptyPoints: true,
                        point: {
                            size: 8,
                        },
                    },
                    series: [
                        { valueField: 'VL_FATURAMENTO_MEDIO_MENSAL', name: 'Faturamento' },
                    ],
                    seriesTemplate: {
                        nameField: 'DS_PRODUTO_CATALOGO',
                    },
                    legend: {
                        visible: false,
                        font: {
                            size: 10,
                        },
                    },
                    commonAxisSettings: {
                        label: {
                            font: {
                                size: 7,
                            },
                        },
                        //    grid: {
                        //        visible: false,
                        //    },
                    },
                    tooltip: {
                        enabled: true,
                        location: 'edge',
                        customizeTooltip(arg) {
                            const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(arg.originalValue);
                            //const valorFormatado = (arg.originalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                            return {
                                html: `<b>${arg.argument}</b><br>Faturamento médio mensal <div class='currency'>${valorFormatado}`,
                            };
                        },
                    },
                    size: {
                        height: 160,
                    },
                    adaptiveLayout: {
                        width: 800,
                    },
                    onInitialized: (e) => {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.refresh();
                            });
                        }).observe(e.element[0]);
                    }
                });

                var nameGrid = "gridCatalogoProdutos";

                vGridCatalogoProdutos = $(`#${nameGrid}`).dxDataGrid({
                    dataSource: result.data,
                    columnHidingEnabled: true,
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    //selection: {
                    //    mode: "multiple",
                    //    showCheckBoxesMode: "always",
                    //},
                    hoverStateEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                    keyboardNavigation: {
                        enterKeyAction: "moveFocus",
                        enterKeyDirection: "column",
                        editOnKeyPress: true,
                    },
                    paging: { pageSize: 30 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 20, 30, 50, 100, 200, 300],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    repaintChangesOnly: true,
                    showBorders: true,
                    keyExpr: "CD_EAN_CATALOGO",

                    columns: [
                        //{
                        //    type: "selection",
                        //    width: 30,
                        //},
                        //{
                        //    dataField: "DS_PRODUTO_VENDIDO_LOJA",
                        //    caption: '',
                        //    width: 30,
                        //    allowFiltering: false,
                        //    allowSorting: false,
                        //    alignment: 'center',
                        //    visible: false,
                        //    cssClass: "column-data-grid-lg",
                        //    cellTemplate: function (e, x) {

                        //        if (x.data.DS_PRODUTO_VENDIDO_LOJA == 'Sim') {
                        //            e.append(`
                        //                <div class="row mt-0 mb-0 text-center">
                        //                    <div class="col-lg-12 mt-0 mb-0 text-center">
                        //                        <img src="/img/check3.png" class="ml-0 mt-0 mb-0" style="width: 14px; cursor: pointer;" data-toggle="tooltip" data-placement="top" title="Você comercializa este produto" onclick="detalheFaturamentoProduto{x.data.CD_EAN_CATALOGO};">
                        //                    </div>
                        //                </div>
                        //            `);
                        //        };

                        //    },
                        //},
                        {
                            dataField: "CD_EAN_CATALOGO",
                            caption: "Código de Barras",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            width: 105,
                            hidingPriority: 199,
                        },
                        {
                            dataField: "DS_PRODUTO_CATALOGO",
                            caption: "Descrição Catálogo ConstruHub",
                            //width: 250,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            hidingPriority: 200,
                        },
                        {
                            dataField: "DS_PRODUTO_VENDIDO_LOJA",
                            caption: "Já vendo este produto",
                            width: 90,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            visible: true,
                            hidingPriority: 102,
                        },
                        {
                            dataField: "CD_PRODUTO",
                            caption: "Seu código",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            width: 80,
                            visible: false,
                            hidingPriority: 101,
                        },

                        {
                            dataField: "DS_PRODUTO",
                            caption: "Sua Descrição",
                            //width: 90,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            hidingPriority: 92,
                        },

                        {
                            dataField: "DS_STATUS",
                            caption: "Seu Status",
                            width: 80,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            alignment: 'center',
                            hidingPriority: 91,
                        },

                        {
                            dataField: "GR_PRECO",
                            caption: "PREÇO DE VENDA",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: true,
                            columns: [
                                {
                                    dataField: "VL_PRECO_VENDA_MEDIO",
                                    caption: "Preço Médio MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 75,
                                    hidingPriority: 195,
                                },
                                {
                                    dataField: "VL_PRECO_VENDA_LOJA",
                                    caption: "Preço Atual SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 85,
                                    hidingPriority: 194,
                                },
                                {
                                    dataField: "PC_PRECO_VENDA_LOJA_DIFERENCA_CATALOGO",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 193,
                                    cellTemplate: function (e, x) {

                                        if (x.data.VL_PRECO_VENDA_LOJA != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_PRECO_VENDA_LOJA_DIFERENCA_CATALOGO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_PRECO_VENDA_LOJA_DIFERENCA_CATALOGO >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },

                            ]
                        },


                        {
                            dataField: "GR_CUSTO_COM_IMPOSTOS",
                            caption: "CUSTO COM IMPOSTOS",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: custoVisible,
                            columns: [
                                {
                                    dataField: "VL_PRECO_CUSTO_COM_IMPOSTOS_MEDIO",
                                    caption: "Média do MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 80,
                                    hidingPriority: 182,
                                },
                                {
                                    dataField: "VL_PRECO_CUSTO_COM_IMPOSTOS_LOJA",
                                    caption: "Custo Atual SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 85,
                                    hidingPriority: 181,
                                },
                                {
                                    dataField: "VL_PRECO_CUSTO_COM_IMPOSTOS_MENOR",
                                    caption: "Menor Custo C/ Impostos",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 75,
                                    visible: true,
                                    hidingPriority: 96,
                                },
                                {
                                    dataField: "PC_PRECO_CUSTO_COM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 180,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_PRECO_CUSTO_COM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_PRECO_CUSTO_COM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_PRECO_CUSTO_COM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },


                            ]
                        },

                        {
                            dataField: "GR_FATURAMENTO_POR_FILIAL",
                            caption: "FATURAMENTO POR FILIAL",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: true,
                            columns: [
                                {
                                    dataField: "VL_FATURAMENTO_MEDIO_MENSAL",
                                    name: 'FATURAMENTO',
                                    caption: "Média Mensal MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 100,
                                    hidingPriority: 191,
                                },
                                {
                                    dataField: "VL_VENDA_MEDIA_LOJA_POR_FILIAL",
                                    caption: "Média Mensal SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 100,
                                    hidingPriority: 190,
                                },
                                {
                                    dataField: "PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 189,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },

                            ]
                        },

                        {
                            dataField: "GR_FATURAMENTO",
                            caption: "FATURAMENTO TOTAL",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: false,
                            columns: [
                                {
                                    dataField: "VL_FATURAMENTO_MEDIO_MENSAL",
                                    name: 'FATURAMENTO2',
                                    caption: "Média Mensal MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 100,
                                    hidingPriority: 191,
                                },
                                {
                                    dataField: "VL_VENDA_MEDIA_LOJA",
                                    caption: "Média Mensal SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 100,
                                    hidingPriority: 190,
                                },
                                {
                                    dataField: "PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 189,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_VL_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },

                            ]
                        },


                        {
                            dataField: "GR_QUANTIDADE_POR_FILIAL",
                            caption: "QUANTIDADE VENDIDA POR FILIAL",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: false,
                            columns: [
                                {
                                    dataField: "QT_VENDA_MEDIA_MENSAL",
                                    caption: "Média Mensal MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 80,
                                    hidingPriority: 188,
                                },
                                {
                                    dataField: "QT_VENDA_MEDIA_LOJA_POR_FILIAL",
                                    caption: "Média Mensal SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 85,
                                    hidingPriority: 187,
                                },
                                {
                                    dataField: "PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 186,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO_POR_FILIAL >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },


                            ]
                        },

                        {
                            dataField: "GR_QUANTIDADE",
                            caption: "QUANTIDADE VENDIDA TOTAL",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: false,
                            columns: [
                                {
                                    dataField: "QT_VENDA_MEDIA_MENSAL",
                                    caption: "Média Mensal MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 80,
                                    hidingPriority: 188,
                                },
                                {
                                    dataField: "QT_VENDA_MEDIA_LOJA",
                                    caption: "Média Mensal SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 85,
                                    hidingPriority: 187,
                                },
                                {
                                    dataField: "PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 186,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_QT_VENDA_MENSAL_LOJA_DIFERENCA_CATALOGO >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },


                            ]
                        },


                        {
                            dataField: "GR_CUSTO_SEM_IMPOSTOS",
                            caption: "CUSTO SEM IMPOSTOS",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: false,
                            columns: [
                                {
                                    dataField: "VL_PRECO_CUSTO_SEM_IMPOSTOS_MEDIO",
                                    caption: "Média do MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 80,
                                    hidingPriority: 185,
                                },
                                {
                                    dataField: "VL_PRECO_CUSTO_SEM_IMPOSTOS_LOJA",
                                    caption: "Custo Atual SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 85,
                                    hidingPriority: 184,
                                },
                                {
                                    dataField: "PC_PRECO_CUSTO_SEM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 183,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_PRECO_CUSTO_SEM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_PRECO_CUSTO_SEM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_PRECO_CUSTO_SEM_IMPOSTOS_LOJA_DIFERENCA_CATALOGO >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },


                            ]
                        },


                        {
                            dataField: "GR_PC_RENTABILIDADE",
                            caption: "% RENTABILIDADE",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: false,
                            columns: [
                                {
                                    dataField: "PC_RENTABILIDADE_MEDIA",
                                    caption: "Média do MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 80,
                                    hidingPriority: 179,
                                },
                                {
                                    dataField: "PC_RENTABILIDADE_LOJA",
                                    caption: "Rentab. Atual SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 85,
                                    hidingPriority: 178,
                                },
                                {
                                    dataField: "PC_RENTABILIDADE_LOJA_DIFERENCA_CATALOGO",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 177,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_RENTABILIDADE_LOJA_DIFERENCA_CATALOGO != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_RENTABILIDADE_LOJA_DIFERENCA_CATALOGO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_RENTABILIDADE_LOJA_DIFERENCA_CATALOGO >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },


                            ]
                        },

                        {
                            dataField: "GR_PC_LUCRO",
                            caption: "% LUCRO",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: false,
                            columns: [
                                {
                                    dataField: "PC_LUCRO_MEDIO",
                                    caption: "Média do MERCADO",
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 80,
                                    hidingPriority: 176,
                                },
                                {
                                    dataField: "PC_LUCRO_LOJA",
                                    caption: "Lucro Atual SUA EMPRESA",
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    width: 85,
                                    hidingPriority: 175,
                                },
                                {
                                    dataField: "PC_LUCRO_LOJA_DIFERENCA_CATALOGO",
                                    caption: 'DIFERENÇA sobre a média',
                                    width: 85,
                                    dataType: "number",
                                    format: "###,###,###,##0.00'%'",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid-lg",
                                    hidingPriority: 174,
                                    cellTemplate: function (e, x) {

                                        if (x.data.PC_LUCRO_LOJA_DIFERENCA_CATALOGO != null) {

                                            var imgSeta;
                                            var classeDiff;
                                            var pcDiferenca = (x.data.PC_LUCRO_LOJA_DIFERENCA_CATALOGO).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                                            if (x.data.PC_LUCRO_LOJA_DIFERENCA_CATALOGO >= 0) {
                                                imgSeta = '/img/seta-cima-verde.png';
                                                classeDiff = 'diff-positivo';
                                            } else {
                                                imgSeta = '/img/seta-baixo-vermelha.png';
                                                classeDiff = 'diff-negativo';
                                            }

                                            e.append(`
                                    <div class="row mt-0 mb-0">
                                        <div class="col-lg-12 mt-0 mb-0 text-right">
                                            <h6 class="mt-0 mb-0 mr-0 ${classeDiff}">${pcDiferenca}% <span><img src="${imgSeta}" class="ml-0 mt-0 mb-0" style="height: 12px;"></span></h6>
                                        </div>
                                    </div>
                                `);
                                        };

                                    },
                                },


                            ]
                        },


                        {
                            dataField: "VL_PRECO_VENDA_MENOR",
                            caption: "Menor Preço de Venda",
                            dataType: "number",
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 75,
                            visible: false,
                            hidingPriority: 100,
                        },
                        {
                            dataField: "VL_PRECO_VENDA_MAIOR",
                            caption: "Maior Preço de Venda",
                            dataType: "number",
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 75,
                            visible: false,
                            hidingPriority: 99,
                        },

                        {
                            dataField: "VL_PRECO_CUSTO_SEM_IMPOSTOS_MENOR",
                            caption: "Menor Custo sem Impostos",
                            dataType: "number",
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 75,
                            visible: false,
                            hidingPriority: 98,
                        },
                        {
                            dataField: "VL_PRECO_CUSTO_SEM_IMPOSTOS_MAIOR",
                            caption: "Maior Custo Sem Impostos",
                            dataType: "number",
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 75,
                            visible: false,
                            hidingPriority: 97,
                        },
                        {
                            dataField: "VL_PRECO_CUSTO_COM_IMPOSTOS_MAIOR",
                            caption: "Maior Custo C/ Impostos",
                            dataType: "number",
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 75,
                            visible: false,
                            hidingPriority: 95,
                        },

                        {
                            dataField: "PC_RENTABILIDADE_MENOR",
                            caption: "Menor % Rentabilidade",
                            dataType: "number",
                            format: "###,###,###,##0.00'%'",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 70,
                            visible: false,
                            hidingPriority: 94,
                        },
                        {
                            dataField: "PC_RENTABILIDADE_MAIOR",
                            caption: "Maior % Rentabilidade",
                            dataType: "number",
                            format: "###,###,###,##0.00'%'",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 70,
                            visible: false,
                            hidingPriority: 93,
                        },

                        {
                            dataField: "PC_LUCRO_MENOR",
                            caption: "Menor % Lucro",
                            dataType: "number",
                            format: "###,###,###,##0.00'%'",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 70,
                            visible: false,
                            hidingPriority: 92,
                        },
                        {
                            dataField: "PC_LUCRO_MAIOR",
                            caption: "Maior % Lucro",
                            dataType: "number",
                            format: "###,###,###,##0.00'%'",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 70,
                            visible: false,
                            hidingPriority: 91,
                        },
                        {
                            dataField: "PC_TAXA_CONVERSAO_MEDIA",
                            caption: "% Taxa Conversão MERCADO",
                            dataType: "number",
                            format: "###,###,###,##0.00'%'",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            width: 80,
                            visible: false,
                            hidingPriority: 94,
                        },
                        {
                            dataField: "DS_MARCA",
                            caption: "Marca em seu Cadastro",
                            width: 90,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            alignment: 'center',
                            hidingPriority: 90,
                        },
                        {
                            dataField: "CD_FAMILIA",
                            caption: "Código Família",
                            width: 85,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            alignment: 'center',
                            hidingPriority: 89,
                        },
                        {
                            dataField: "DS_FAMILIA",
                            caption: "Família em seu Cadastro",
                            //width: 80,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            hidingPriority: 88,
                        },
                        {
                            dataField: "CD_FORNECEDOR",
                            caption: "Código Fornecedor",
                            width: 80,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            alignment: 'center',
                            hidingPriority: 87,
                        },

                        {
                            dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                            caption: "Fornecedor em seu Cadastro (Razão)",
                            //width: 80,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            hidingPriority: 86,
                        },

                        {
                            dataField: "DS_FANTASIA_FORNECEDOR",
                            caption: "Fornecedor em seu Cadastro (Fantasia)",
                            //width: 80,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                            visible: false,
                            hidingPriority: 85,
                        },
                    ],

                    summary: {
                        recalculateWhileEditing: true,
                        groupItems: [
                            {
                                column: 'CD_EAN_CATALOGO',
                                summaryType: 'count',
                                displayFormat: "{0} Produtos",
                            },
                            {
                                column: 'VL_FATURAMENTO_MEDIO_MENSAL',
                                name: 'FATURAMENTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: false,
                                alignByColumn: true,
                            },
                            {
                                column: 'VL_VENDA_MEDIA_LOJA',
                                name: 'VENDA_LOJA',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: false,
                                alignByColumn: true,
                            },
                            {
                                column: 'VL_VENDA_MEDIA_LOJA_POR_FILIAL',
                                name: 'VENDA_LOJA_POR_FILIAL',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: false,
                                alignByColumn: true,
                            },
                        ],

                        totalItems: [
                            {
                                column: 'CD_EAN_CATALOGO',
                                summaryType: 'count',
                                displayFormat: "{0} Produtos",
                            },
                            {
                                column: "VL_FATURAMENTO_MEDIO_MENSAL",
                                name: "FATURAMENTO",
                                summaryType: "sum",
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                            },
                            {
                                column: "VL_VENDA_MEDIA_LOJA",
                                name: "VENDA_LOJA",
                                summaryType: "sum",
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                            },
                            {
                                column: "VL_VENDA_MEDIA_LOJA_POR_FILIAL",
                                name: "VENDA_LOJA_POR_FILIAL",
                                summaryType: "sum",
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                            },
                        ],
                    },
                    stateStoring: AutoLoad(nameGrid),
                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                locateInMenu: 'auto',
                                options: {
                                    icon: 'fullscreen',
                                    text: 'Tela Cheia',
                                    hint: 'Expandir/Retrair o grid de Catálogo de Produtos',
                                    //type: 'default',
                                    onClick(e) {
                                        const expanding = e.component.option('text');

                                        if (expanding == 'Tela Cheia') {
                                            expandirGridProdutos(true);
                                            e.component.option('text', 'Sair Tela Cheia');

                                        } else {
                                            expandirGridProdutos(false);
                                            e.component.option('text', 'Tela Cheia');
                                        }
                                    },
                                },
                            },
                            {
                                location: 'after',
                                widget: 'dxButton',
                                locateInMenu: 'auto',
                                options: {
                                    icon: 'fa fa-bank',
                                    text: 'Alterar Filial',
                                    hint: 'Altera a filial utilizada para comparação de preços de venda e custos',
                                    //type: 'default',
                                    onClick(e) {
                                        AbrirModal('#ModalSelecaoFilial');
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
                                        //const dataGrid = $("#gridResultadoForma").dxDataGrid('instance');
                                        const dataGrid = vGridCatalogoProdutos;

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

                    onToolbarPreparing: AutoResetState([]),

                    onCellPrepared: function (e) {

                        if (e.rowType === "data") {
                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                        }
                        if (e.rowType === "header") {
                            const liberacaoFields = [
                                "GR_FATURAMENTO",
                                "GR_FATURAMENTO_POR_FILIAL",
                                "GR_QUANTIDADE",
                                "GR_QUANTIDADE_POR_FILIAL",
                                "GR_PRECO",
                                "GR_CUSTO_SEM_IMPOSTOS",
                                "GR_CUSTO_COM_IMPOSTOS",
                                "GR_PC_RENTABILIDADE",
                                "GR_PC_LUCRO",
                            ];

                            if (liberacaoFields.includes(e.column.dataField)) {
                                e.cellElement.css("color", "#f05b41");
                                e.cellElement.css("font-weight", "bold");
                                e.cellElement.css("background-color", "#f8f9fa");
                            }
                        }
                        if (e.rowType === "group") {
                            e.cellElement.css("color", "#e76f51");
                        }

                    },

                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet("Sugestão");

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Catálogo.xlsx");
                            });
                        });
                        e.cancel = true;
                    },

                    onFocusedCellChanging(e) {
                        e.isHighlighted = true;
                    },

                    //stateStoring: AutoLoad("gridSugestao"),
                    //onToolbarPreparing: AutoResetState([]),

                }).dxDataGrid("instance");

                $('#cardUsuarioLiberado').show();
                $('#cardUsuarioNaoLiberado').hide();

                //VERIFICA SE O TERMO DE USO AINDA NÃO FOI ACEITO
                if (vAceiteRealizado == false) {
                    setTimeout(function () {
                        //CHAMA O PROCEDIMENTO PARA REGISTRAR LOG DE SOLICITAÇÃO DE ACEITE DO TERMO DE USO
                        registraLogSolicitacaoAceiteTermoAdesao();

                        //VERIFICA O NÍVEL DE ACESSO DO USUÁRIO LOGADO
                        if (vNrNivelAcesso == 1) {
                            //VERIFICA SE EXISTE UM TERMO DE RESPONSABILIDADE
                            if (vPossuiTextoResponsabilidade == true) {
                                AbrirModal('#ModalResponsavel');
                            }
                            else {
                                AbrirModal('#ModalTermoAdesaoAdministradorSimplificado');
                            }
                        }
                        else {
                            AbrirModal('#ModalTermoAdesaoUsuarioComum');
                        }
                    }, 6000); // 6 segundos
                }
                else {
                    //CHAMA O PROCEDIMENTO PARA REGISTRAR LOG
                    registraLogUtilizacao();
                }
            } else {
                $('#cardUsuarioLiberado').hide();
                $('#cardUsuarioNaoLiberado').show();
                
                var elemento = document.getElementById('Modulos');
                elemento.style.maxWidth = '700px'; // Novo valor para max-width
            }

            loadPanel.hide();
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
}

function exibirIndicesDetalhados(cardIndice) {
    ExibirEsconderPaineis('cardIndicesAcumulados', 'none')
    ExibirEsconderPaineis('cardProdutosMaisVendidos', 'none')

    ExibirEsconderPaineis('cardDetalhamentoIRPA', 'none')
    ExibirEsconderPaineis('cardDetalhamentoRentabilidade', 'none')
    ExibirEsconderPaineis('cardDetalhamentoFaturamento', 'none')
    ExibirEsconderPaineis('cardDetalhamentoFaturamentoVendedor', 'none')
    ExibirEsconderPaineis('cardDetalhamentoTicketMedio', 'none')

    ExibirEsconderPaineis(cardIndice, 'block')

    rolar_topo();
}

function voltarTelaInicial() {
    ExibirEsconderPaineis('cardIndicesAcumulados', 'block')
    ExibirEsconderPaineis('cardProdutosMaisVendidos', 'block')

    ExibirEsconderPaineis('cardDetalhamentoIRPA', 'none')
    ExibirEsconderPaineis('cardDetalhamentoRentabilidade', 'none')
    ExibirEsconderPaineis('cardDetalhamentoFaturamento', 'none')
    ExibirEsconderPaineis('cardDetalhamentoFaturamentoVendedor', 'none')
    ExibirEsconderPaineis('cardDetalhamentoTicketMedio', 'none')

    rolar_topo();
}

function expandirGridProdutos(param) {
    if (param == true) {

        var elemento = document.getElementById('Modulos');
        elemento.style.maxWidth = '4000px'; // Novo valor para max-width

        ExibirEsconderPaineis('cardIndicesAcumulados', 'none')
        ExibirEsconderPaineis('botoesGridProdutosRetraido', 'none')
        ExibirEsconderPaineis('botoesGridProdutosExpandido', 'block')

        $("#cardProdutosMaisVendidos").removeClass("col-lg-9").addClass("col-lg-12");
        $('#chartCatalogoProdutos').dxChart('instance').refresh();

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Erro ao tentar ativar o modo de tela cheia: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    } else {
        var elemento = document.getElementById('Modulos');
        elemento.style.maxWidth = '1800px'; // Novo valor para max-width

        ExibirEsconderPaineis('cardIndicesAcumulados', 'block')
        ExibirEsconderPaineis('botoesGridProdutosRetraido', 'block')
        ExibirEsconderPaineis('botoesGridProdutosExpandido', 'none')

        $("#cardProdutosMaisVendidos").removeClass("col-lg-12").addClass("col-lg-9");
        $('#chartCatalogoProdutos').dxChart('instance').refresh();

        document.exitFullscreen();
    }
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

function trataErroHTTP(pMensagemOperacao, pResponse) {
    var vMsgErroHTTP = "Erro desconhecido";

    if (pResponse) {
        if (pResponse.responseJSON) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseJSON.detail;
        } else if (pResponse.responseText) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseText;
        } else {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.statusText;
        }
    }

    exibeMensagem("error", pMensagemOperacao, vMsgErroHTTP);
}

function exibirTermoUsoSimplificado() {
    AbrirModal('#ModalTermoAdesaoAdministradorSimplificado');
}

function exibirTermoUso() {
    AbrirModal('#ModalTermoAdesaoAdministrador');
}

function exibeEmailTermo() {
    $('#emailTermoUso').slideDown();
    $('#linkEmailTermo').slideUp();
}

function inibeEmailTermo() {
    $('#linkEmailTermo').slideDown();
    $('#emailTermoUso').slideUp();
}

function exibeEmailTermoSimplificado() {
    $('#emailTermoUsoSimplificado').slideDown();
    $('#linkEmailTermoSimplificado').slideUp();
}

function inibeEmailTermoSimplificado() {
    $('#linkEmailTermoSimplificado').slideDown();
    $('#emailTermoUsoSimplificado').slideUp();
}

function abortarAdesao() {
    window.open("/Home/InicioRapido", "_self");
}

function rolar_para_toggle(elemento) {
    // Primeiro, abrir o toggle (se aplicável) e depois rolar
    $(elemento).parent().slideDown(400, function () {
        // Após a conclusão da animação do toggle, rolar para o elemento
        var posicaoDestino = $(elemento).offset().top - 150; // ajuste aqui conforme necessário
        $('html, body').animate({ scrollTop: posicaoDestino }, 600);
    });
}

function rolar_para(elemento) {
    var posicaoDestino = $(elemento).offset().top - 150; // ajuste aqui conforme necessário
    $('html, body').animate({ scrollTop: posicaoDestino }, 600);
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

function exibeMensagem(pTipo, pTitulo, pTexto) {
    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
        //configuration.hide = false;
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration);
};

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

window.onresize = function () {
    configuraModalTermoAdesao();
};

function configuraModalTermoAdesao() {
    const pageHeight = window.innerHeight;

    const heightScrollReajusteAbortado = pageHeight - 240;

    oScrollTextoAdesao.style.height = heightScrollReajusteAbortado + "px";

    var sliderHeight = Math.trunc(oScrollContentTextoAdesao.clientHeight / (oScrollContentTextoAdesao.scrollHeight / oScrollContentTextoAdesao.clientHeight));

    oScrollTextoAdesao.nanoscroller.contentHeight = oScrollContentTextoAdesao.scrollHeight;
    oScrollTextoAdesao.nanoscroller.isActive = true;
    oScrollTextoAdesao.nanoscroller.maxScrollTop = (oScrollContentTextoAdesao.scrollHeight - oScrollContentTextoAdesao.clientHeight);
    oScrollTextoAdesao.nanoscroller.paneHeight = oScrollContentTextoAdesao.clientHeight;
    oScrollTextoAdesao.nanoscroller.paneOuterHeight = oScrollContentTextoAdesao.clientHeight;
    oScrollTextoAdesao.nanoscroller.sliderHeight = sliderHeight;
    oScrollTextoAdesao.nanoscroller.maxSliderTop = oScrollContentTextoAdesao.clientHeight - sliderHeight;
    oScrollBarTextoAdesao.style.display = "block";
    oScrollSliderTextoAdesao.style.height = sliderHeight + "px";
};

async function adesaoConcluida(pOrigem) {
    if (pOrigem == "S") {
        if (oChkAceiteTermoAdesaoSimplificado.option("value") == false) {
            DevExpress.ui.notify({
                message: 'Você precisa assinalar ter lido e concordado com o termo.',
                type: 'error',
                displayTime: 5000,
            });

            return;
        }
    }
    else {
        if (oChkAceiteTermoAdesao.option("value") == false) {
            DevExpress.ui.notify({
                message: 'Você precisa assinalar ter lido e concordado com o termo.',
                type: 'error',
                displayTime: 5000,
            });

            return;
        }
    }

    loadPanel.show();

    await $.ajax({
        type: "POST",
        url: "/GestaoEstrategica/AdesaoTermoIndicadoresMercado",
        data: { pVersaoTermo: vVersaoTermo },
    }).done(function (response) {
        exibeMensagem("success", "Termo de Uso", "Adesão realizada com sucesso");

        if (pOrigem == "S") {
            AbrirModal('#ModalTermoAdesaoAdministradorSimplificado');
        }
        else {
            AbrirModal('#ModalTermoAdesaoAdministrador');
        }
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao gravar informações sobre sua adesão ao termo de uso do catálogo de produtos", response);
    });

    loadPanel.hide();
}

async function enviaEmailTermoAdesao(pOrigem) {
    var vEmail = null;

    if (pOrigem == "S") {
        vEmail = oTxtEmailTermoUsoSimplificado.option("value");
    }
    else {
        vEmail = oTxtEmailTermoUso.option("value");
    }

    loadPanel.show();

    await $.ajax({
        type: "POST",
        url: "/GestaoEstrategica/EnviaEmailTermoAdesaoIndicadoresMercado",
        data: { pVersaoTermo: vVersaoTermo, pEmail: vEmail },
    }).done(function (response) {
        exibeMensagem("success", "Termo de Uso", "E-mail enviado com sucesso");

        if (pOrigem == "S") {
            inibeEmailTermoSimplificado();
        }
        else {
            inibeEmailTermo();
        }
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao enviar o termo de uso do catálogo de produtos para o e-mail informado", response);
    });

    loadPanel.hide();
}

async function registraLogSolicitacaoAceiteTermoAdesao() {
    loadPanel.show();

    await $.ajax({
        type: "POST",
        url: "/GestaoEstrategica/RegistraLogSolicitacaoAceiteTermoAdesaoIndicadoresMercado",
        data: null,
    }).done(function (response) {
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao registrar log de acesso ao catálogo de produtos", response);
    });

    loadPanel.hide();
}

async function registraLogUtilizacao(pOrigem) {
    await $.ajax({
        type: "POST",
        url: "/GestaoEstrategica/RegistraLogUtilizacaoIndicadoresMercado",
        data: null,
    }).done(function (response) {
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao registrar log de acesso ao catálogo de produtos", response);
    });
}