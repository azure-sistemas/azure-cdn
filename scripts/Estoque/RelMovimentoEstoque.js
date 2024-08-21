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

    //Produtos
    GetAzureDataSource(29).then((result) => {


        if (result.success) {

            $('#lkp_Produtos').dxLookup({
                dataSource: result.data,

                searchExpr: ['DS_PRODUTO_PESQUISA'],
                displayExpr: 'DS_PRODUTO_PESQUISA',
                valueExpr: 'CD_PRODUTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Produtos',
                },
                labelMode: 'floating',
                label: 'Produto *',
                placeholder: 'Produto *',
                showClearButton: false,
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Campo Obrigatório', }], validationGroup: 'Filtro' });

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

    //Almoxarifados que o usuário tem acesso
    GetAzureDataSource(28).then((result) => {

        if (result.success) {

            $('#lkp_Almoxarifado').dxLookup({
                dataSource: result.data,

                searchExpr: ['DS_ALMOXARIFADO_PESQUISA'],
                displayExpr: 'DS_ALMOXARIFADO_PESQUISA',
                valueExpr: 'CD_ALMOXARIFADO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Almoxarifados',
                },
                labelMode: 'floating',
                label: 'Almoxarifado *',
                placeholder: 'Almoxarifado *',
                showClearButton: false,
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Campo Obrigatório', }], validationGroup: 'Filtro' });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Tipo de Movimento de Estoque
    GetAzureDataSource(27).then((result) => {

        if (result.success) {

            $('#lkp_Tipo_Movimento_Estoque').dxLookup({
                dataSource: result.data,

                searchExpr: ['DS_TIPO_LANCAMENTO'],
                displayExpr: 'DS_TIPO_LANCAMENTO',
                valueExpr: 'CD_TIPO_LANCAMENTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Tipos de Movimento',
                },
                labelMode: 'floating',
                label: 'Tipo de Movimento (opcional)',
                placeholder: 'Tipo de Movimento (opcional)',
                showClearButton: true,
            });

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    $('#dt_Inicial').dxDateBox({
        labelMode: 'floating',
        label: 'Movimento Inicial *',
        placeholder: 'Movimento Inicial *',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: Date(),
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Campo Obrigatório', }], validationGroup: 'Filtro' });

    $('#dt_Final').dxDateBox({
        labelMode: 'floating',
        label: 'Movimento Final *',
        placeholder: 'Movimento Final *',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: Date(),
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Campo Obrigatório', }], validationGroup: 'Filtro' });


});


function validaCampos() {

    loadPanel.show();

    const result = DevExpress.validationEngine.validateGroup("Filtro");

    if (result.isValid) {

        gerarRelatorio();

    } else {

        loadPanel.hide();

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };
}


function gerarRelatorio() {

    ExibirEsconderPaineis('cardFiltros', 'none');
    ExibirEsconderPaineis('cardResultado', 'none');

    var data = new Date();

    data = new Date($('#dt_Inicial').dxDateBox("instance").option('value'));
    var dataInicial = `${data.getFullYear()}-${("00" + String(data.getMonth() + 1)).slice(-2)}-${("00" + String(data.getDate())).slice(-2)}`
    var labelDataInicial = `${("00" + String(data.getDate())).slice(-2)}/${("00" + String(data.getMonth() + 1)).slice(-2)}/${data.getFullYear()}`

    data = new Date($('#dt_Final').dxDateBox("instance").option('value'));
    var dataFinal = `${data.getFullYear()}-${("00" + String(data.getMonth() + 1)).slice(-2)}-${("00" + String(data.getDate())).slice(-2)}`
    var labelDataFinal = `${("00" + String(data.getDate())).slice(-2)}/${("00" + String(data.getMonth() + 1)).slice(-2)}/${data.getFullYear()}`

    var produto = $('#lkp_Produtos').dxLookup("instance").option('value');
    var almoxarifado = $('#lkp_Almoxarifado').dxLookup("instance").option('value');
    var tipoMovimento = $('#lkp_Tipo_Movimento_Estoque').dxLookup("instance").option('value');

    var parametros = '{ CD_PRODUTO: "' + produto + '", CD_ALMOXARIFADO: ' + almoxarifado + ', DT_INICIAL: "' + dataInicial + '", DT_FINAL: "' + dataFinal + '", CD_TIPO_LANCAMENTO: ' + tipoMovimento + ' }';

    //console.log("PARÂMETROS ", parametros)

    //processa resultado do relatório
    GetAzureDataSource(30, parametros, timeOut = 60).then((result) => {

        if (result.success) {

            ExibirEsconderPaineis('cardResultado', 'block');
            loadPanel.hide();

            var labelProduto;
            var labelFiltros;

            if (result.data.length > 0) {
                labelProduto = result.data[0].DS_PRODUTO;
                labelFiltros = 'Código: ' + produto + ' / Almoxarifado: ' + almoxarifado + ' / Período: ' + labelDataInicial + ' a ' + labelDataFinal

                if (tipoMovimento !== null) {
                    labelFiltros = labelFiltros + ' / Tipo de Movimento: ' + result.data[0].DS_TIPO_LANCAMENTO;
                }
            }
            else {
                labelProduto = "";
                labelFiltros = "NÃO FORAM ENCONTRADOS REGISTROS COM O FILTRO INFORMADO";
            }

            $('#labelProduto').hide().text(labelProduto).fadeIn(500);
            $('#labelFiltros').hide().text(labelFiltros).fadeIn(500);


            var nameGrid = "gridResultado";

            $(`#${nameGrid}`).dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                stateStoring: AutoLoad(nameGrid),
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
                paging: { pageSize: 20 },
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
                    const worksheet = workbook.addWorksheet('Movimento');

                    // Set page orientation to landscape
                    worksheet.pageSetup.orientation = 'landscape';

                    // Configurar ajuste de escala manualmente
                    //worksheet.pageSetup.fitToPage = true;
                    //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                    worksheet.pageSetup.fitToWidth = 1; // Largura da página
                    worksheet.pageSetup.scale = 75;

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

                        const imagePath = result.data[0].DS_CAMINHO_LOGO;
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

                        headerRowTitulo.getCell(3).value = labelProduto;
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
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'RelMovimentoEstoque_Produto_' + produto + '_Almoxarifado_' + almoxarifado + '.xlsx');
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
                keyExpr: 'NR_LANCAMENTO',
                columns: [
                    {
                        dataField: "NR_DOCUMENTO",
                        caption: "Documento",
                        width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "DT_MOVIMENTO_COMPLETA",
                        caption: "Data e Hora",
                        width: 120,
                        dataType: "date",
                        format: "dd/MM/yyyy HH:mm",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 195,
                    },
                    {
                        dataField: "DT_MOVIMENTO",
                        caption: "Data",
                        width: 92,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 195,
                    },
                    {
                        dataField: "QT_ESTOQUE_INICIAL",
                        caption: "Estoque Inicial",
                        format: "###,###,###,##0.#####",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },

                    {
                        dataField: "QT_MOVIMENTO_ESTOQUE",
                        caption: "Movimento",
                        format: "###,###,###,##0.#####",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },

                    {
                        dataField: "QT_ESTOQUE_FINAL",
                        caption: "Estoque Final",
                        format: "###,###,###,##0.#####",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },

                    {
                        dataField: "DS_TIPO_LANCAMENTO",
                        caption: "Tipo",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },

                    {
                        dataField: "DS_HISTORICO",
                        caption: "Histórico",
                        //width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "CD_LOGIN",
                        caption: "Login",
                        width: 110,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "CD_PRODUTO",
                        caption: "Código",
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
                        dataField: "CD_FABRICANTE",
                        caption: "Código Fabricante",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "CD_ORIGINAL",
                        caption: "Código Original",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "CD_OPCIONAL",
                        caption: "Código Opcional",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
                    },
                    {
                        dataField: "DS_PRODUTO",
                        caption: "Produto",
                        //width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //hidingPriority: 194,
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

                    if (e.rowType === "data") {
                        if (e.column.dataField === "QT_ESTOQUE_INICIAL") {
                            e.cellElement.css("font-weight", "bold");
                            if (e.value < 0) {
                                e.cellElement.css("font-weight", "bold");
                                e.cellElement.css("color", "#d00000");
                            };
                        }
                        if (e.column.dataField === "QT_MOVIMENTO_ESTOQUE") {
                            e.cellElement.css("font-weight", "bold");
                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                        if (e.column.dataField === "QT_ESTOQUE_FINAL") {
                            e.cellElement.css("font-weight", "bold");
                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                    }
                },

                summary: {
                    totalItems: [
                        {
                            column: 'NR_DOCUMENTO',
                            summaryType: 'count',
                            displayFormat: "{0} Reg",
                        },
                        {
                            column: 'QT_MOVIMENTO_ESTOQUE',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.#####",
                            displayFormat: "{0}",
                        }
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
    $('#lkp_Produtos').dxLookup('instance').option('value', null);
    $('#lkp_Almoxarifado').dxLookup('instance').option('value', null);
    $('#lkp_Tipo_Movimento_Estoque').dxLookup('instance').option('value', null);
    $('#dt_Inicial').dxDateBox('instance').option('value', Date());
    $('#dt_Final').dxDateBox('instance').option('value', Date());
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