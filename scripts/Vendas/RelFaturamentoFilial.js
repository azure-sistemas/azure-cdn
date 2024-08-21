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

    var dataAtual = new Date();

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth(); // 0 para janeiro, 1 para fevereiro, e assim por diante
    const dataUltimoDia = ultimoDiaDoMes(ano, mes);

    $('#dt_Inicial_Faturamento').dxDateBox({
        labelMode: 'floating',
        label: 'Data Faturamento Inicial',
        placeholder: 'Data Faturamento Inicial',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: Date(),
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Período obrigatório', }],
        validationGroup: 'Periodo'
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
        value: Date(),
        onValueChanged(e) {
            var dataAtual = new Date(e.value);
            
            const ano = dataAtual.getFullYear();
            const mes = dataAtual.getMonth(); // 0 para janeiro, 1 para fevereiro, e assim por diante
            const dataUltimoDia = ultimoDiaDoMes(ano, mes);

            console.log("Data: ", dataUltimoDia);

            $('#dt_Projecao_Faturamento').dxDateBox('instance').option('value', dataUltimoDia);
        },
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Período obrigatório', }],
        validationGroup: 'Periodo'
    });

    var dataSourceAgrupamentos = [
        { CD_TIPO_AGRUPAMENTO: 'F', DS_TIPO_AGRUPAMENTO: 'Filial' },
        { CD_TIPO_AGRUPAMENTO: 'FFC', DS_TIPO_AGRUPAMENTO: 'Filial, Forma e Condição' },
    ];

    $('#lkp_Agrupamento').dxLookup({
        dataSource: dataSourceAgrupamentos,
        value: 'F',
        searchExpr: ['DS_TIPO_AGRUPAMENTO'],
        displayExpr: 'DS_TIPO_AGRUPAMENTO',
        valueExpr: 'CD_TIPO_AGRUPAMENTO',
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

    $('#chk_Incluir_Conta_Corrente').dxCheckBox({
        value: false,
        text: "Incluir Conta Corrente",
    });


    $('#hr_Abertura').dxDateBox({
        labelMode: 'floating',
        label: 'Abertura',
        placeholder: '',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        //displayFormat: 'hh:mm',
        type: 'time',
        value: '01/01/2023, 8:00',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Horário obrigatório', }],
        validationGroup: 'Projecao'
    });

    $('#hr_Fechamento').dxDateBox({
        labelMode: 'floating',
        label: 'Fechamento',
        placeholder: '',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        //displayFormat: 'hh:mm',
        type: 'time',
        value: '01/01/2023, 18:00',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Horário obrigatório', }],
        validationGroup: 'Projecao'
    });

    $('#dt_Projecao_Faturamento').dxDateBox({
        labelMode: 'floating',
        label: 'Data para projeção',
        placeholder: 'Data para projeção',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: dataUltimoDia,
    });

    $('#nbx_Dias_Projecao_Faturamento').dxNumberBox({
        value: null,
        format: 'Projetar ### dias',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Dias para projeção',
        //labelMode: 'floating',
        //label: 'Periodicidade',
    });

    var dataSourceCustos = [
        { CD_TIPO_CUSTO: 'CM', DS_TIPO_CUSTO: 'Custo Médio' },
        { CD_TIPO_CUSTO: 'CB', DS_TIPO_CUSTO: 'Custo Bruto' },
    ];

    $('#lkp_Custo').dxLookup({
        dataSource: dataSourceCustos,
        value: 'CM',
        searchExpr: ['DS_TIPO_CUSTO'],
        displayExpr: 'DS_TIPO_CUSTO',
        valueExpr: 'CD_TIPO_CUSTO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tipo de Custo',
        },
        labelMode: 'floating',
        label: 'Tipo de Custo',
        placeholder: 'Tipo de Custo',
        showClearButton: false,
    });

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
    var horaAbertura = $('#hr_Abertura').dxDateBox('instance').option('value');
    var horaFechamento = $('#hr_Fechamento').dxDateBox('instance').option('value');
    var dataProjecao = $('#dt_Projecao_Faturamento').dxDateBox('instance').option('value');
    var diasProjecao = $('#nbx_Dias_Projecao_Faturamento').dxNumberBox('instance').option('value');

    const resultadoValidacaoPeriodo = DevExpress.validationEngine.validateGroup("Periodo");
    const resultadoValidacaoProjecao = DevExpress.validationEngine.validateGroup("Projecao");

    if (resultadoValidacaoPeriodo.isValid == false) {
        DevExpress.ui.notify({
            message: 'É necessário informar tanto a data inicial quanto a final de faturamento.',
            type: 'error',
            displayTime: 5000,
        });
        return false;
    } else if (resultadoValidacaoProjecao.isValid == false) {
        DevExpress.ui.notify({
            message: 'É necessário informar o horário de abertura e fechamento da empresa para calculo da projeção de faturamento.',
            type: 'error',
            displayTime: 5000,
        });
        return false;
    } else if ((dataProjecao === null && diasProjecao === null)) {
        DevExpress.ui.notify({
            message: 'É necessário informar a data ou a quantidade de dias para projeção.',
            type: 'error',
            displayTime: 5000,
        });
        return false;
    } else {
        return true;
    };

}

function gerarRelatorio() {


    //console.log(
    //    'Fixando a data 2023-01-31 13:26:00: ', moment('2023-01-31 13:26:00').format('DD/MM/YYYY HH:mm'),
    //    '\nData atual: ', moment().format('DD/MM/YYYY HH:mm'),
    //    '\nRetirando 2 dias: ', moment().add(-2, 'day').format('DD/MM/YYYY HH:mm'),
    //    '\nAdicionando 2 dias: ', moment().add(2, 'day').format('DD/MM/YYYY HH:mm')
    //)

    //var a = moment([2008, 9]);
    //var b = moment([2007, 0]);
    //console.log('Diferença em anos: ', a.diff(b, 'years'));
    //console.log('Diferença em anos com meses decimais: ', a.diff(b, 'years', true));


    ExibirEsconderPaineis('cardFiltros', 'none');
    ExibirEsconderPaineis('divBotoesFiltro', 'none');
    ExibirEsconderPaineis('divBotoesFiltroRecolher', 'block');
    ExibirEsconderPaineis('cardResultado', 'none');
    
    var data = new Date();

    data = new Date($('#dt_Inicial_Faturamento').dxDateBox("instance").option('value'));
    var dataInicialFaturamento = '"' + moment(data).format('YYYY/MM/DD') + '"'
    var labelDataInicialFaturamento = moment(data).format('DD/MM/YYYY')

    data = new Date($('#dt_Final_Faturamento').dxDateBox("instance").option('value'));
    var dataFinalFaturamento = '"' + moment(data).format('YYYY/MM/DD') + '"'
    var labelDataFinalFaturamento = moment(data).format('DD/MM/YYYY')

    if ($('#dt_Projecao_Faturamento').dxDateBox("instance").option('value') !== null) {
        data = new Date($('#dt_Projecao_Faturamento').dxDateBox("instance").option('value'));
        var dataProjecaoFaturamento = '"' + moment(data).format('YYYY/MM/DD') + '"'
        var labelDataProjecaoFaturamento = moment(data).format('DD/MM/YYYY')
    } else {
        var dataProjecaoFaturamento = null;
    }

    data = new Date($('#hr_Abertura').dxDateBox("instance").option('value'));
    var horaAbertura = '"' + moment(data).format('HH') + '"'
    var minutoAbertura = '"' + moment(data).format('mm') + '"'
    var horaAberturaLabel = moment(data).format('HH:mm')

    data = new Date($('#hr_Fechamento').dxDateBox("instance").option('value'));
    var horaFechamento = '"' + moment(data).format('HH') + '"'
    var minutoFechamento = '"' + moment(data).format('mm') + '"'
    var horaFechamentoLabel = moment(data).format('HH:mm')

    var tipoAgrupamento = $('#lkp_Agrupamento').dxLookup("instance").option('value');

    if (tipoAgrupamento == "F") {
        var procedimento = 1
    } else {
        var procedimento = 3
    }

    var incluirContaCorrente = $('#chk_Incluir_Conta_Corrente').dxCheckBox("instance").option('value');
    var diasProjecaoFaturamento = $('#nbx_Dias_Projecao_Faturamento').dxNumberBox("instance").option('value')

    var tipoCusto = '"' + $('#lkp_Custo').dxLookup("instance").option('value') + '"';
    var labelTipoCusto = $('#lkp_Custo').dxLookup("instance").option('value');
    var paramTipoCusto = $('#lkp_Custo').dxLookup("instance").option('value');

    if (labelTipoCusto == "CM") {
        labelTipoCusto = "Custo Médio"
    } else {
        labelTipoCusto = "Custo Bruto"
    }

    var parametros = '{ PROCEDIMENTO: ' + procedimento + ', CD_FILIAL: 0, DT_MOVIMENTO: ' + dataInicialFaturamento + ', DT_MOVIMENTO_FINAL: ' + dataFinalFaturamento + ', LG_AUTENTICACAO: false, CD_TIPO_CUSTO: ' + tipoCusto + ', LG_INCLUI_CONTA_CORRENTE: ' + incluirContaCorrente + ', HR_HORA_ABERTURA: ' + horaAbertura + ', HR_MINUTO_ABERTURA: ' + minutoAbertura + ', HR_HORA_ENCERRAMENTO: ' + horaFechamento + ', HR_MINUTO_ENCERRAMENTO: ' + minutoFechamento + ', QT_DIAS_PROJECAO: ' + diasProjecaoFaturamento + ', DT_PROJECAO: ' + dataProjecaoFaturamento + ' }';

    console.log("PARÂMETROS ", parametros)

    //processa resultado do relatório
    GetAzureDataSource(44, parametros, timeOut = 60).then((result) => {

        if (result.success) {

            ExibirEsconderPaineis('cardResultado', 'block');
            loadPanel.hide();

            //console.log("RESUTLADO: ", result);

            if (tipoAgrupamento == "F") {
                var labelTitulo = "Relatório de Faturamento por Filial";
                var moduloMaxWidht = '1300px';
            } else {
                var labelTitulo = "Relatório de Faturamento por Filial e Forma de Pagamento";
                var moduloMaxWidht = '900px';
            }

            document.getElementById('Modulos').style.maxWidth = moduloMaxWidht;

            var labelFiltros = "";
            var tipoCustoCaption = "CUSTO MÉDIO";
            var tipoCustoColunaCaption = "Custo Médio";

            if (result.data.length > 0) {

                if (dataInicialFaturamento !== null) {
                    labelFiltros = labelFiltros + 'Faturamento: ' + labelDataInicialFaturamento + ' a ' + labelDataFinalFaturamento
                }

                if (incluirContaCorrente == true) {
                    labelFiltros = labelFiltros + ' / Conta Corrente: Sim'
                }

                if (tipoCusto !== null) {
                    labelFiltros = labelFiltros + ' / Tipo Custo: ' + labelTipoCusto

                    if (paramTipoCusto == 'CB') {
                        var tipoCustoCaption = "CUSTO BRUTO";
                        var tipoCustoColunaCaption = "Custo Bruto";
                    }
                }
            }
            else {
                labelFiltros = "NÃO FORAM ENCONTRADOS REGISTROS COM O FILTRO INFORMADO";
            }

            $('#labelTitulo').hide().text(labelTitulo).fadeIn(500);
            $('#labelFiltros').hide().text(labelFiltros).fadeIn(500);

            var nameGrid = "gridResultado";
            var nameGridForma = "gridResultadoForma";

            var vlFaturamentoSomatoriaReposicaoLucro = 0;
            var vlCustoReposicaoSomatoriaLucro = 0;

            var vlFaturamentoSomatoriaReposicaoRentabilidade = 0;
            var vlCustoReposicaoSomatoriaRentabilidade = 0;

            var vlFaturamentoSomatoriaCustoMedioLucro = 0;
            var vlCustoMedioSomatoriaLucro = 0;

            var vlFaturamentoSomatoriaCustoMedioRentabilidade = 0;
            var vlCustoMedioSomatoriaRentabilidade = 0;

            var vlFaturamentoSomatoria = 0;
            var vlCustoReposicaoSomatoria = 0;
            var vlCustoMedioSomatoria = 0;

            if (tipoAgrupamento == "F") {
                ExibirEsconderPaineis('divGridResultado', 'block');
                ExibirEsconderPaineis('divGridResultadoForma', 'none');

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
                    paging: { pageSize: 15 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 15, 20, 50],
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
                        const worksheet = workbook.addWorksheet('Faturamento');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 67;

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
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'RelFaturamentoFilial.xlsx');
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
                    keyExpr: ['DS_FILIAL'],
                    columns: [
                        {
                            dataField: "DS_FILIAL",
                            caption: "Filial",
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
                            dataField: "VL_FATURAMENTO",
                            name: "VL_FATURAMENTO",
                            caption: "Faturamento",
                            format: "###,###,###,##0.00",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                            //hidingPriority: 194,
                        },

                        {
                            dataField: "GRP_CUSTO_REPOSICAO",
                            caption: "CUSTO DE REPOSIÇÃO",
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            columns: [
                                {
                                    dataField: "VL_CUSTO_REPOSICAO",
                                    name: "VL_CUSTO_REPOSICAO",
                                    caption: "Custo Reposição",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    //hidingPriority: 194,
                                },
                                {
                                    dataField: "VL_RESULTADO_REPOSICAO",
                                    caption: "Resultado",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    calculateCellValue: function (rowData) {
                                        var resultado = rowData.VL_FATURAMENTO - rowData.VL_CUSTO_REPOSICAO
                                        return resultado;
                                    },
                                },
                                {
                                    dataField: "PC_LUCRO_REPOSICAO",
                                    caption: "Lucro",
                                    format: "###,###,###,##0.00%",
                                    width: 60,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    calculateCellValue: function (rowData) {
                                        var resultado = rowData.VL_FATURAMENTO - rowData.VL_CUSTO_REPOSICAO
                                        var lucro = resultado / rowData.VL_CUSTO_REPOSICAO
                                        return lucro;
                                    },
                                },
                                {
                                    dataField: "PC_RENTABILIDADE_REPOSICAO",
                                    caption: "Rentab.",
                                    format: "###,###,###,##0.00%",
                                    width: 60,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    calculateCellValue: function (rowData) {
                                        var resultado = rowData.VL_FATURAMENTO - rowData.VL_CUSTO_REPOSICAO
                                        var rentabilidade = resultado / rowData.VL_FATURAMENTO
                                        return rentabilidade;
                                    },
                                },
                            ],
                        },

                        {
                            dataField: "GRP_CUSTO_MEDIO",
                            caption: tipoCustoCaption,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            columns: [
                                {
                                    dataField: "VL_CUSTO_MEDIO",
                                    caption: tipoCustoColunaCaption,
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    //hidingPriority: 194,
                                },
                                {
                                    dataField: "VL_RESULTADO_CUSTO_MEDIO",
                                    caption: "Resultado",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    calculateCellValue: function (rowData) {
                                        var resultado = rowData.VL_FATURAMENTO - rowData.VL_CUSTO_MEDIO
                                        return resultado;
                                    },
                                },
                                {
                                    dataField: "PC_LUCRO_CUSTO_MEDIO",
                                    caption: "Lucro",
                                    format: "###,###,###,##0.00%",
                                    width: 60,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    calculateCellValue: function (rowData) {
                                        var resultado = rowData.VL_FATURAMENTO - rowData.VL_CUSTO_MEDIO
                                        var lucro = resultado / rowData.VL_CUSTO_MEDIO
                                        return lucro;
                                    },
                                },
                                {
                                    dataField: "PC_RENTABILIDADE_CUSTO_MEDIO",
                                    caption: "Rentab.",
                                    format: "###,###,###,##0.00%",
                                    width: 60,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    calculateCellValue: function (rowData) {
                                        var resultado = rowData.VL_FATURAMENTO - rowData.VL_CUSTO_MEDIO
                                        var rentabilidade = resultado / rowData.VL_FATURAMENTO
                                        return rentabilidade;
                                    },
                                },
                            ],
                        },

                        {
                            dataField: "GRP_DEVOLUCOES",
                            caption: "DEVOLUÇÕES",
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            columns: [
                                {
                                    dataField: "VL_DEVOLUCAO",
                                    caption: "Devolução",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    //hidingPriority: 194,
                                },
                                {
                                    dataField: "VL_FATURAMENTO_LIQUIDO",
                                    caption: "Faturamento Líquido",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    calculateCellValue: function (rowData) {
                                        var resultado = rowData.VL_FATURAMENTO - rowData.VL_DEVOLUCAO
                                        return resultado;
                                    },
                                },
                            ],
                        },

                        {
                            dataField: "GRP_MEDIAS",
                            caption: "MÉDIAS",
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            columns: [
                                {
                                    dataField: "VL_VENDA_MEDIA_MINUTO",
                                    caption: "Faturamento por Minuto",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    //hidingPriority: 194,
                                },
                                {
                                    dataField: "VL_VENDA_MEDIA_HORA",
                                    caption: "Faturamento por Hora",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                },
                            ],
                        },

                        {
                            dataField: "GRP_PROJECOES",
                            caption: "PROJEÇÕES",
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            columns: [
                                {
                                    dataField: "VL_PROJECAO_DIA",
                                    caption: "Para o dia",
                                    format: "###,###,###,##0.00",
                                    width: 70,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                    //hidingPriority: 194,
                                },
                                {
                                    dataField: "VL_PROJECAO_MES",
                                    caption: "Para o Período",
                                    format: "###,###,###,##0.00",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: false,
                                    visible: true,
                                    alignment: 'right',
                                    cssClass: "column-data-grid",
                                },
                            ],
                        },
                    ],

                    summary: {
                        groupItems: [
                            {
                                column: 'VL_FATURAMENTO',
                                name: 'FATURAMENTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_CUSTO_REPOSICAO',
                                name: 'CUSTO_REPOSICAO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_RESULTADO_REPOSICAO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            //{
                            //    showInColumn: 'PC_LUCRO_REPOSICAO',
                            //    name: "PC_LUCRO_REPOSICAO_AGRUPADO",
                            //    summaryType: 'custom',
                            //    valueFormat: "###,###,###,##0.00%",
                            //    displayFormat: "{0}",
                            //    showInGroupFooter: true,
                            //    alignByColumn: false,
                            //},
                            {
                                showInColumn: 'PC_RENTABILIDADE_REPOSICAO',
                                name: 'PC_RENTABILIDADE_REPOSICAO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_CUSTO_MEDIO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_RESULTADO_CUSTO_MEDIO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO_CUSTO_MEDIO',
                                name: 'PC_LUCRO_CUSTO_MEDIO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_RENTABILIDADE_CUSTO_MEDIO',
                                name: 'PC_RENTABILIDADE_CUSTO_MEDIO_AGRUPADO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
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
                                column: 'VL_FATURAMENTO_LIQUIDO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_VENDA_MEDIA_MINUTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_VENDA_MEDIA_HORA',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_PROJECAO_DIA',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_PROJECAO_MES',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                        ],
                        totalItems: [
                            {
                                column: 'VL_FATURAMENTO',
                                name: 'FATURAMENTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_CUSTO_REPOSICAO',
                                name: 'CUSTO_REPOSICAO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_RESULTADO_REPOSICAO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO_REPOSICAO',
                                name: "PC_LUCRO_REPOSICAO",
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_RENTABILIDADE_REPOSICAO',
                                name: 'PC_RENTABILIDADE_REPOSICAO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_CUSTO_MEDIO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_RESULTADO_CUSTO_MEDIO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_LUCRO_CUSTO_MEDIO',
                                name: 'PC_LUCRO_CUSTO_MEDIO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                showInColumn: 'PC_RENTABILIDADE_CUSTO_MEDIO',
                                name: 'PC_RENTABILIDADE_CUSTO_MEDIO',
                                summaryType: 'custom',
                                valueFormat: "###,###,###,##0.00%",
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
                                column: 'VL_FATURAMENTO_LIQUIDO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_VENDA_MEDIA_MINUTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_VENDA_MEDIA_HORA',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_PROJECAO_DIA',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                            {
                                column: 'VL_PROJECAO_MES',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                alignByColumn: false,
                            },
                        ],

                        calculateCustomSummary: function (options) {

                            if (options.name == 'PC_LUCRO_REPOSICAO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaReposicaoLucro = 0;
                                    vlCustoReposicaoSomatoriaLucro = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaReposicaoLucro += options.value.VL_FATURAMENTO;
                                    vlCustoReposicaoSomatoriaLucro += options.value.VL_CUSTO_REPOSICAO;
                                }
                                if (options.summaryProcess === 'finalize') {

                                    var result = (vlFaturamentoSomatoriaReposicaoLucro - vlCustoReposicaoSomatoriaLucro) / vlCustoReposicaoSomatoriaLucro
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_RENTABILIDADE_REPOSICAO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaRentabilidade = 0;
                                    vlCustoReposicaoSomatoriaRentabilidade = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaRentabilidade += options.value.VL_FATURAMENTO;
                                    vlCustoReposicaoSomatoriaRentabilidade += options.value.VL_CUSTO_REPOSICAO;
                                }
                                if (options.summaryProcess === 'finalize') {

                                    var result = (vlFaturamentoSomatoriaRentabilidade - vlCustoReposicaoSomatoriaRentabilidade) / vlFaturamentoSomatoriaRentabilidade
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_LUCRO_CUSTO_MEDIO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaCustoMedioLucro = 0;
                                    vlCustoMedioSomatoriaLucro = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaCustoMedioLucro += options.value.VL_FATURAMENTO;
                                    vlCustoMedioSomatoriaLucro += options.value.VL_CUSTO_MEDIO;
                                }
                                if (options.summaryProcess === 'finalize') {

                                    var result = (vlFaturamentoSomatoriaCustoMedioLucro - vlCustoMedioSomatoriaLucro) / vlCustoMedioSomatoriaLucro
                                    options.totalValue = result;

                                }
                            } else if (options.name == 'PC_RENTABILIDADE_CUSTO_MEDIO') {

                                if (options.summaryProcess === 'start') {

                                    vlFaturamentoSomatoriaCustoMedioRentabilidade = 0;
                                    vlCustoMedioSomatoriaRentabilidade = 0;
                                }
                                if (options.summaryProcess === 'calculate') {

                                    vlFaturamentoSomatoriaCustoMedioRentabilidade += options.value.VL_FATURAMENTO;
                                    vlCustoMedioSomatoriaRentabilidade += options.value.VL_CUSTO_MEDIO;
                                }
                                if (options.summaryProcess === 'finalize') {

                                    var result = (vlFaturamentoSomatoriaCustoMedioRentabilidade - vlCustoMedioSomatoriaRentabilidade) / vlFaturamentoSomatoriaCustoMedioRentabilidade
                                    options.totalValue = result;

                                }
                            }
                        },
                    },

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

                        if (e.rowType === "header") {
                            if (e.column.dataField === "GRP_CUSTO_REPOSICAO" || e.column.dataField === "GRP_CUSTO_MEDIO"
                                || e.column.dataField === "GRP_DEVOLUCOES" || e.column.dataField === "GRP_MEDIAS" ||
                                e.column.dataField === "GRP_PROJECOES") {
                                e.cellElement.css("color", "#f05b41");
                                e.cellElement.css("font-weight", "bold");
                                e.cellElement.css("background-color", "#f8f9fa");

                            }
                        }
                        if (e.rowType === "group") {
                            //e.cellElement.css("color", "#f05b41");
                            //e.cellElement.css("color", "#f4a261");
                            e.cellElement.css("color", "#e76f51");
                            e.cellElement.css("background-color", "white");
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

                });
                $(`#${nameGrid}`).css('font-size', '9px')
            } else {
                ExibirEsconderPaineis('divGridResultadoForma', 'block');
                ExibirEsconderPaineis('divGridResultado', 'none');

                var primeiroRegistroFilial = result.data[0].DS_FILIAL;

                $(`#${nameGridForma}`).dxDataGrid({
                    dataSource: result.data,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    showColumnLines: false,
                    rowAlternationEnabled: false,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    stateStoring: AutoLoad(nameGridForma),
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
                    //focusedRowEnabled: true,
                    allowColumnResizing: true,
                    //columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                    grouping: {
                        autoExpandAll: false,
                    },
                    paging: { pageSize: 50 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 15, 20, 50],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },

                    export: {
                        enabled: true,
                        allowExportSelectedData: false,
                    },

                    onExporting(e) {

                        var dataGrid = $(`#${nameGridForma}`).dxDataGrid("instance");

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
                        const worksheet = workbook.addWorksheet('Faturamento');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'portrait';

                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 80;

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
                            //if (base64Image.length > 25) {
                            //    const image = workbook.addImage({
                            //        base64: base64Image,
                            //        extension: 'gif',
                            //    });

                            //    // Get image dimensions
                            //    const img = new Image();
                            //    img.src = base64Image;
                            //    await img.decode();
                            //    const imgWidth = img.width;
                            //    const imgHeight = img.height;

                            //    // Calculate dimensions to fit the image within a specific cell range
                            //    const maxWidth = 200; // maximum width in pixels
                            //    const maxHeight = 60; // maximum height in pixels
                            //    const scaleFactor = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
                            //    const width = imgWidth * scaleFactor;
                            //    const height = imgHeight * scaleFactor;

                            //    headerRowLogo.height = 50;
                            //    worksheet.mergeCells(1, 1, 2, 2);

                            //    worksheet.addImage(image, {
                            //        //tl: { col: 0, row: 0 },
                            //        //br: { col: 2, row: 1 },

                            //        tl: { col: 0, row: 0 },
                            //        ext: { width: width, height: height }
                            //    });
                            //}

                            //Título
                            const headerRowTitulo = worksheet.getRow(1);
                            headerRowTitulo.height = 30;
                            worksheet.mergeCells(1, 1, 1, quantidadeColunasVisiveis);

                            headerRowTitulo.getCell(1).value = labelTitulo;
                            headerRowTitulo.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
                            headerRowTitulo.getCell(1).alignment = { horizontal: 'center' };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, 1, 2, quantidadeColunasVisiveis);

                            headerRowSubTitulo.getCell(1).value = labelFiltros;
                            headerRowSubTitulo.getCell(1).font = { name: 'Segoe UI Light', size: 12 };
                            headerRowSubTitulo.getCell(1).alignment = { horizontal: 'center' };

                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'RelFaturamentoFilialForma.xlsx');
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
                    //keyExpr: ['DS_FILIAL'],
                    columns: [
                        {
                            dataField: "DS_FILIAL",
                            caption: "Filial",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            groupIndex: 0,
                            //allowHiding: false,
                            //hidingPriority: 100,
                        },
                        {
                            dataField: "DS_FORMA_PAGAMENTO",
                            caption: "Forma de Pagamento",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            groupIndex: 1,
                            //allowHiding: true,
                            //hidingPriority: 100,
                        },
                        {
                            dataField: "DS_CONDICAO_PAGAMENTO",
                            caption: "Condição de Pagamento",
                            //width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                        //    allowHiding: true,
                        //    hidingPriority: 98,
                        },
                        {
                            dataField: "VL_FATURAMENTO",
                            name: "VL_FATURAMENTO",
                            caption: "Faturamento",
                            format: "###,###,###,##0.00",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: 'right',
                            cssClass: "column-data-grid",
                        //    allowHiding: true,
                        //    hidingPriority: 101,
                        },
                    ],

                    summary: {
                        groupItems: [
                            {
                                column: 'VL_FATURAMENTO',
                                name: 'FATURAMENTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: false,
                                alignByColumn: true,
                            },
                        ],
                        totalItems: [
                            {
                                column: 'VL_FATURAMENTO',
                                name: 'FATURAMENTO',
                                summaryType: 'sum',
                                valueFormat: "###,###,###,##0.00",
                                displayFormat: "{0}",
                                showInGroupFooter: true,
                                //alignByColumn: true,
                            },
                        ],
                    },

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
                                    text: 'Expandir Agrupamento',
                                    hint: 'Fechar ou expandir os agrupamentos',
                                    onClick(e) {
                                        const dataGrid = $("#gridResultadoForma").dxDataGrid('instance');

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
                                var size = $(`#${nameGridForma}`).css('font-size').split('px')[0];
                                $(`#${nameGridForma}`).css('font-size', --size + 'px')
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
                                var size = $(`#${nameGridForma}`).css('font-size').split('px')[0];
                                $(`#${nameGridForma}`).css('font-size', ++size + 'px')
                            }
                        }
                    }

                    ]),

                    onCellPrepared: function (e) {
                        if (e.column.dataField === "VL_FATURAMENTO") {
                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.rowType === "group") {
                            if (e.column.dataField === "DS_FILIAL") {
                                e.cellElement.css("color", "#e76f51");
                                //e.cellElement.css("background-color", "white");
                            }

                            if (e.column.dataField !== "DS_FILIAL" && e.column.dataField !== "VL_FATURAMENTO") {
                                e.cellElement.css("background-color", "white");
                            }

                            if (e.column.dataField === "DS_FILIAL") {
                                e.component.expandRow([e.value]);
                            }
                        }
                    },

                    //onContentReady: function (e) {
                    //    //    e.component.expandRow([primeiroRegistroFilial]);
                    //    // e.component.expandRow(e.component.getKeyByRowIndex(0));
                    //},  

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
                $(`#${nameGridForma}`).css('font-size', '9px')
            }

            //$("#gridResultadoForma").dxDataGrid('instance').option('grouping.autoExpandAll', false);
            //$("#gridResultadoForma").dxDataGrid('instance').component.expandRow(0);

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

function ultimoDiaDoMes(ano, mes) {
    return new Date(ano, mes + 1, 0);
}

function limparFiltros() {
    var dataAtual = new Date();

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth(); // 0 para janeiro, 1 para fevereiro, e assim por diante
    const dataUltimoDia = ultimoDiaDoMes(ano, mes);

    $('#lkp_Agrupamento').dxLookup('instance').option('value', 'F');
    $('#dt_Inicial_Faturamento').dxDateBox('instance').option('value', new Date());
    $('#dt_Final_Faturamento').dxDateBox('instance').option('value', new Date());
    $('#chk_Incluir_Conta_Corrente').dxCheckBox('instance').option('value', false);
    $('#hr_Abertura').dxDateBox('instance').option('value', '08:00');
    $('#hr_Fechamento').dxDateBox('instance').option('value', '18:00');
    $('#dt_Projecao_Faturamento').dxDateBox('instance').option('value', new Date(dataUltimoDia));
    $('#nbx_Dias_Projecao_Faturamento').dxNumberBox('instance').option('value', false);
    $('#lkp_Custo').dxLookup('instance').option('value', 'CM');
}

function exibirFiltros() {
    $('#cardCabecalho, #cardFiltros').slideDown();
}

function fecharFiltros() {
    $('#cardFiltros').slideUp();
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

