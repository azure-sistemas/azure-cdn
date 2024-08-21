﻿var loadPanel;

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

    //LISTA DE MESES COM COBRANÇA
    GetAzureDataSource(71).then((result) => {

        if (result.success) {

            const lstMeses = $('#lstMeses').dxList({
                dataSource: result.data, 
                height: '93%',
                searchEnabled: true,
                searchExpr: ['DS_MES', 'DS_SITUACAO_MES'],
                selectionMode: 'single',
                itemTemplate(data) {
                    return $('<div>')
                        .append($('<div class="titulo-list text-center">').text(data.DS_MES))
                        .append($('<div class="item-list text-center">').text(data.DS_SITUACAO_MES))
                },
                onItemClick(e) {

                    e.element.find('.dx-list-item').css('color', 'black');
                    e.element.find('.dx-list-item').css('background-color', 'transparent');
                    e.itemElement.closest('.dx-list-item').css('color', 'white');
                    e.itemElement.closest('.dx-list-item').css('background-color', '#337AB7');

                    loadPanel.show();
                    gerarRelatorio(e.itemData.NR_ANO, e.itemData.NR_MES);
                },
                onItemContextMenu(e) {

                    e.element.find('.dx-list-item').css('color', 'black');
                    e.element.find('.dx-list-item').css('background-color', 'transparent');
                    e.itemElement.closest('.dx-list-item').css('color', 'white');
                    e.itemElement.closest('.dx-list-item').css('background-color', '#337AB7');
                },
                onContentReady(e) {
                    // Selecionar o primeiro item
                    const instance = e.component;
                    instance.selectItem(0);

                    // Alterar o estilo do primeiro item selecionado manualmente
                    const firstItemElement = instance.element().find('.dx-list-item').first();
                    firstItemElement.css('color', 'white');
                    firstItemElement.css('background-color', '#337AB7');
                },
            }).dxList('instance');

            lstMeses.selectItem(0);

            //Gera o extrato sem informar parâmetros para a Query SQL utilizar o mês corrente
            gerarRelatorio(null, null);

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


});

function gerarRelatorio(pAno, pMes) {

    ExibirEsconderPaineis('cardResultado', 'none');

    var parametros = '{ NR_ANO: ' + pAno + ', NR_MES: ' + pMes + ' }';

    //processa resultado do relatório
    GetAzureDataSource(70, parametros, timeOut = 120).then((result) => {

        if (result.success) {

            const [transacoesPix, transacoesTotais, transacoesPedidos] = [result.data[0], result.data[1], result.data[2]]

            ExibirEsconderPaineis('cardResultado', 'block');

            loadPanel.hide();

            var vValorTotalPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacoesTotais[0].VL_RECEBIMENTO_PIX);
            var vQtdeTotalPIX = (transacoesTotais[0].QT_TRANSACOES).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
            var vValorTaxaPIX = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacoesTotais[0].VL_CUSTO_INTEGRACAO_PIX);
            var vPcTaxaPIX = (transacoesTotais[0].PC_TAXA_MEDIA).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

            $('#valorTotalPIX').hide().text(vValorTotalPIX).fadeIn(500);
            $('#qtdeTotalPIX').hide().text(vQtdeTotalPIX).fadeIn(500);
            $('#valorTaxaPIX').hide().text(vValorTaxaPIX).fadeIn(500);
            $('#pcTaxaPIX').hide().text(vPcTaxaPIX + '%').fadeIn(500);

            var labelMes;
            var nrMes;
            var nrAno;

            if (transacoesPix.length > 0) {
                labelMes = transacoesPix[0].DS_MES;
                nrMes = transacoesPix[0].NR_MES;
                nrAno = transacoesPix[0].NR_ANO;
            }
            else {
                labelMes = "NÃO FORAM ENCONTRADAS TRANSAÇÕES";
            }

            $('#labelMes').hide().text(labelMes).fadeIn(500);

            if (transacoesPix[0].LG_FATURA_FECHADA == true) {
                ExibirEsconderPaineis('labelFaturaAberta', 'none');
                ExibirEsconderPaineis('labelFaturaFechada', 'block');
            } else {
                ExibirEsconderPaineis('labelFaturaAberta', 'block');
                ExibirEsconderPaineis('labelFaturaFechada', 'none');

            }

            gridResultado = $("#gridResultado").dxDataGrid({
                dataSource: transacoesPix,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                searchPanel: {
                    visible: true,
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
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 15 },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 15, 20, 50, 100],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting(e) {

                    var dataGrid = $("#gridResultado").dxDataGrid("instance");

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
                stateStoring: AutoLoad("gridResultado", false),
                keyExpr: 'ID',
                columns: [
                    {
                        dataField: "DT_TRANSACAO",
                        caption: "Data Transação",
                        width: 120,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 303,
                    },
                    {
                        dataField: "CD_FILIAL",
                        caption: "Filial",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 201,
                    },
                    {
                        dataField: "CD_CAIXA",
                        caption: "Caixa",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 194,
                    },
                    {
                        dataField: "CD_FORMA_PAGAMENTO_PIX",
                        caption: "Código Forma",
                        //width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 195,
                    },
                    {
                        dataField: "DS_FORMA_PAGAMENTO",
                        caption: "Forma Pagamento",
                        //width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 196,
                    },
                    {
                        dataField: "CD_BANCO",
                        caption: "Banco",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 197,
                    },
                    {
                        dataField: "CD_AGENCIA",
                        caption: "Agência",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 198,
                    },
                    {
                        dataField: "CD_CONTA_CORRENTE",
                        caption: "Conta Corrente",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 199,
                    },
                    {
                        dataField: "DS_SITUACAO_PIX",
                        caption: "Situação PIX",
                        //width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 200,
                    },
                    {
                        dataField: "VL_TRANSACAO",
                        caption: "Valor Transações",
                        format: "###,###,###,##0.00",
                        width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        hidingPriority: 301,
                    },
                    {
                        dataField: "VL_RECEBIDO",
                        caption: "Valor Recebido",
                        format: "###,###,###,##0.00",
                        width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        hidingPriority: 302,
                    },
                    {
                        dataField: "VL_CUSTO_INTEGRACAO_PIX",
                        caption: "Valor Taxa HubPix",
                        format: "###,###,###,##0.00",
                        width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        hidingPriority: 304,
                    },
                    {
                        dataField: "CD_ID_PIX",
                        caption: "EMV Transação",
                        width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 193,
                    },
                    {
                        dataField: "CD_EMV",
                        caption: "EMV Transação",
                        width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        hidingPriority: 192,
                    },
                ],

                masterDetail: {
                    enabled: true,
                    template(container, options) {
                        const currentEmployeeData = options.data;

                        //$('<div>')
                        //    .addClass('master-detail-caption')
                        //    .text('Relação de Pedidos: ')
                        //    .appendTo(container);

                        $('<div>')
                            .dxDataGrid({
                                columnAutoWidth: true,
                                showBorders: true,
                                wordWrapEnabled: true,
                                columns: [
                                    {
                                        dataField: "NR_PEDIDO",
                                        caption: "Pedido",
                                        width: 100,
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        visible: true,
                                        alignment: 'center',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 400,
                                    },
                                    {
                                        dataField: "DT_EMISSAO",
                                        caption: "Emissão",
                                        width: 120,
                                        dataType: "date",
                                        format: "dd/MM/yyyy HH:mm",
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        visible: true,
                                        alignment: 'center',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 303,
                                    },
                                    {
                                        dataField: "DS_SITUACAO_PEDIDO",
                                        caption: "Situação",
                                        width: 100,
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        visible: true,
                                        alignment: 'center',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 201,
                                    },
                                    {
                                        dataField: "CD_CPF_CNPJ",
                                        caption: "CPF/CNPJ",
                                        width: 105,
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        visible: true,
                                        alignment: 'center',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 202,
                                    },
                                    {
                                        dataField: "DS_FANTASIA",
                                        caption: "Cliente Fantasia",
                                        //width: 100,
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        visible: true,
                                        alignment: 'center',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 203,
                                    },
                                    {
                                        dataField: "DS_RAZAO_SOCIAL",
                                        caption: "Cliente Razão Social",
                                        //width: 100,
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        visible: false,
                                        alignment: 'center',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 204,
                                    },
                                    {
                                        dataField: "CD_LOGIN",
                                        caption: "Vendedor",
                                        width: 90,
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        visible: true,
                                        alignment: 'center',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 205,
                                    },
                                    {
                                        dataField: "VL_TOTAL_PAGAR",
                                        caption: "Valor Pedido",
                                        format: "###,###,###,##0.00",
                                        width: 100,
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: false,
                                        visible: true,
                                        alignment: 'right',
                                        cssClass: "column-data-grid",
                                        hidingPriority: 304,
                                    },
                                ],
                                dataSource: new DevExpress.data.DataSource({
                                    store: new DevExpress.data.ArrayStore({
                                        key: 'ID',
                                        data: transacoesPedidos,
                                    }),
                                    filter: ['ID', '=', options.key],
                                }),
                            }).appendTo(container);
                    },
                },

                showBorders: true,

                summary: {
                    totalItems: [
                        {
                            column: 'DT_TRANSACAO',
                            summaryType: 'count',
                            displayFormat: "{0} Transações",
                        },
                        {
                            column: 'VL_TRANSACAO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                        },
                        {
                            column: 'VL_RECEBIDO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                        },
                        {
                            column: 'VL_CUSTO_INTEGRACAO_PIX',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                        },
                    ],
                },

                toolbar: {
                    items: [
                        {
                            location: "after",
                            widget: "dxButton",
                            locateInMenu: "auto",
                            options: {
                                hint: "Restaurar layout original do grid",
                                icon: "deletetable",
                                onClick: function () {
                                    var result = DevExpress.ui.dialog.confirm("Deseja restaurar layout original do grid?", "Restaurar");
                                    result.done(function (dialogResult) {
                                        if (dialogResult) {
                                            gridResultado.state({});
                                            gridResultado.refresh();

                                            gridResultado.updateDimensions();
                                        }
                                    });
                                }
                            }
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
    });

    rolar_topo();
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
