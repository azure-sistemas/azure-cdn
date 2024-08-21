var labelTitulo = "Novo Modelo de Visão Analítico";
var visaoObjConsulta = null;
var CurrentState = null;
var codigoVisao = 0;
var codigoVisaoConsulta = 0;
var tamanhoInicialGrid = 570;
var comprimentoAdicionalInicial = 505;
var comprimentoAdicionalPadrao = 505;
var comprimentoAdicionalSemGrafico = 205;
var qtdeColunasGrafico = 5;
var contadorColunas = 0;
var labelUltimaColunaPlotada;
var linhaExpandirInicializacao = 'PRODUTOS DE CURVA A';
var qtdeMesesSelecionados = 7;
var data = new Date();
var dataFinal = data.setDate(data.getDate() - 1);
let dxComp = {};
let labels = {};

PNotify.messages = {
    success: (title, text) => new PNotify({
        title: title,
        type: 'success',
        text: text,
        delay: 2200,
    }),
    error: (title, text) => new PNotify({
        title: title,
        type: 'error',
        text: text,
        delay: 3500,
    }),
    notice: (title, text) => new PNotify({
        title: title,
        type: 'notice',
        text: text,
        delay: 3000,
    }),
};

let parameters = (new function () {
    const request = () => new Promise(async (resolve, reject) => {
        await fetch('/Vendas/RelEvolucaoVendas/Parametros')
            .then(async (result) => {
                this.result = null;
                try {
                    this.result = await result.json();
                } catch { }
                if (!result.ok) {
                    reject(new Error(`Erro ao carregar parâmetros. ${parseResult?.msg || ''}`))
                    return;
                }
                resolve(this.result);
            })
    });
    this.promise = request();
    this.get = () => this.promise = request();
})

var dataSourceDimensoes = [
    { NR_DIMENSAO: -1, DS_DIMENSAO: 'Tela cheia' },
    { NR_DIMENSAO: 0, DS_DIMENSAO: 'Ajustado a tela' },
    { NR_DIMENSAO: 570, DS_DIMENSAO: '570 pixels' },
    { NR_DIMENSAO: 670, DS_DIMENSAO: '670 pixels' },
    { NR_DIMENSAO: 770, DS_DIMENSAO: '770 pixels' },
    { NR_DIMENSAO: 870, DS_DIMENSAO: '870 pixels' },
    { NR_DIMENSAO: 970, DS_DIMENSAO: '970 pixels' },
    { NR_DIMENSAO: 1070, DS_DIMENSAO: '1070 pixels' },
];

var dataSourceOrdemPeriodo = [
    { CD_ORDEM: 'desc', DS_ORDEM: 'Decrescente' },
    { CD_ORDEM: 'asc', DS_ORDEM: 'Crescente' },
];

var dataSourceTiposGraficos = [
    { CD_TIPO_GRAFICO: "bar", DS_TIPO_GRAFICO: "Gráfico Barras", },
    { CD_TIPO_GRAFICO: "stackedbar", DS_TIPO_GRAFICO: "Gráfico Barras Empilhadas", },
    { CD_TIPO_GRAFICO: "line", DS_TIPO_GRAFICO: "Gráfico Linhas", },
    { CD_TIPO_GRAFICO: "spline", DS_TIPO_GRAFICO: "Gráfico Linhas Curvas", },
    { CD_TIPO_GRAFICO: "area", DS_TIPO_GRAFICO: "Gráfico Área", },
    { CD_TIPO_GRAFICO: "splinearea", DS_TIPO_GRAFICO: "Gráfico Área Curva", },
    { CD_TIPO_GRAFICO: "stackedarea", DS_TIPO_GRAFICO: "Gráfico Área Empilhada", },
    { CD_TIPO_GRAFICO: "stackedsplinearea", DS_TIPO_GRAFICO: "Gráfico Área Empilhada Curva", },
    { CD_TIPO_GRAFICO: "steparea", DS_TIPO_GRAFICO: "Gráfico Degraus", },
    { CD_TIPO_GRAFICO: "stepline", DS_TIPO_GRAFICO: "Gráfico Degraus em Linhas", },
];

const paletteCollection = ['Soft Blue', 'Pastel', 'Material', 'Soft Pastel', 'Harmony Light', 'Bright', 'Soft', 'Ocean', 'Office', 'Vintage', 'Violet', 'Carmine', 'Dark Moon', 'Dark Violet', 'Green Mist'];

const optionsData = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    //hour: '2-digit',
    //minute: '2-digit',
    //second: '2-digit',
    //hour12: false, // Use o formato de 24 horas
};

const optionsDataHora = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    //second: '2-digit',
    hour12: false, // Use o formato de 24 horas
};

const optionsDataHoraSegundo = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use o formato de 24 horas
};

var COMPONENTES = [];

let load_lkp_Filiais = Load_Azr_Lookup_Filial2(COMPONENTES, 'lkp_Filiais', 0, 1, 'Filiais (Apenas as liberadas para o usuario)', 'Filiais (Apenas as liberadas para o usuario)').then(() => {
    dxComp.lkp_Filiais = DevExpress.ui.dxLookup.getInstance('#lkp_Filiais');
});

let load_lkp_Fornecedores = Load_Azr_Lookup_FornecedorV2('lkp_Fornecedores', COMPONENTES, 0, 'Fornecedores (Padrão ou não)', 'Fornecedores (Padrão ou não)').then(() => {
    dxComp.lkp_Fornecedores = DevExpress.ui.dxLookup.getInstance('#lkp_Fornecedores');
});

let load_lkp_Familias = Load_Azr_DropDownBox_FamiliaProduto(COMPONENTES, 'lkp_Familias', 'Árvore de Família', 0).then(() => {
    dxComp.lkp_Familias = DevExpress.ui.dxDropDownBox.getInstance('#lkp_Familias');
});

const loadPanel = new DevExpress.ui.dxLoadPanel('#load_Panel', {
    shadingColor: 'rgba(0,0,0,0.4)',
    message: 'Carregando...',
    visible: false,
    showIndicator: true,
    showPane: true,
    shading: true,
    hideOnOutsideClick: false,
});

const diffDateMonthsWithAtual = (dataInicial, dateFinal) => Math.abs(moment(new Date(dataInicial)).diff(moment(new Date(dateFinal)), 'months', true));
const updateLblDiferencaMeses = (valueOptions, callback = null) => {
    var lblDiferencaMeses;

    var dataInicial = new Date(dxComp.dt_Inicial.option('value'));
    var dataFinal = new Date(dxComp.dt_Final.option('value'));

    if (dataInicial !== null && dataFinal !== null) {
        const numeroMeses = diffDateMonthsWithAtual(dataInicial, dataFinal);
        qtdeMesesSelecionados = numeroMeses;
        lblDiferencaMeses = `${numeroMeses} ${numeroMeses === 1 ? 'Mês' : 'Meses'}`;
    } else {
        lblDiferencaMeses = 'Período não informado'
    }

    $('#lblDiferencaMeses').hide().text(lblDiferencaMeses).fadeIn(500);

    if (callback != null) callback();
}

const datasDxOptions = {
    labelMode: 'floating',
    readOnly: false,
    showClearButton: false,
    useMaskBehavior: true,
    displayFormat: 'MM/yyyy',
    calendarOptions: {
        maxZoomLevel: 'year',
        minZoomLevel: 'century',
    },
    type: 'date',
    max: moment().endOf('month').valueOf(),
    onValueChanged: updateLblDiferencaMeses,
    onInitialized: async (e) => {
        e.component.element().dxValidator({
            validationRules: [{ type: 'required', message: 'Período obrigatório', }],
            validationGroup: 'Geral'
        });
        await parameters.promise
            .then(() => {
                let [max, min] = parameters.result.data.minMaxFromData.map(a => moment(a, 'YYYYMM').toDate());
                if (moment(min).isValid())
                    e.component.option('min', moment(min).startOf('month').valueOf());
                else
                    e.component.option('min', moment().add(-parameters.result.data.maxMeses, 'month').startOf('month').valueOf());
            })
            .catch(erro => PNotify.messages.error('Parâmetros', `Erro ao carregar parâmetros. ${erro?.msg || erro?.message || ''}`));
    },
}

dxComp.dt_Inicial = new DevExpress.ui.dxDateBox('#dt_Inicial', Object.assign({
    label: 'Mês/Ano Inicial',
    placeholder: 'Mês/Ano Inicial',
    value: new Date(data.setMonth(data.getMonth() - 6)),
}, datasDxOptions));

dxComp.dt_Final = new DevExpress.ui.dxDateBox('#dt_Final', Object.assign({
    label: 'Mês/Ano Final',
    placeholder: 'Mês/Ano Final',
    value: dataFinal,
}, datasDxOptions));

let getDataPivot = (new function () {
    this.get = (properties, query = 36) => {
        this.promise = GetAzureDataSource(query, JSON.stringify(properties), timeOut = 60 * 3);
    }
    this.get({}, 40);
    this.firstFind = true;
})

//Visões gravadas
let getDataVisoes = (new function () {
    this.get = (status = 'A') => {
        this.promise = GetAzureDataSource(39, `{CD_STATUS: "${status}"}`).then((result) => this.result = result);
    }
    this.get();
});

dxComp.lkp_selecao_visoes = new DevExpress.ui.dxLookup('#lkp_selecao_visoes', {
    width: '80%',
    dataSource: new DevExpress.data.DataSource({
        store: {
            type: 'array',
            data: [],
            key: 'CD_CRM',
            paginate: true,
        },
    }),
    labelMode: 'floating',
    placeholder: 'Selecione uma visão',
    label: 'Visão de análise',
    hint: 'Selecione uma visão da lista para continuar',
    displayExpr: 'DS_CRM',
    searchExpr: ['CD_CRM', 'DS_CRM'],
    onValueChanged: (e) => {
        if (dxComp.btn_Excluir_Visao) {
            if (!e.value) {
                dxComp.btn_Excluir_Visao.option('disabled', true);
                return;
            }
            dxComp.btn_Excluir_Visao.option('disabled', false);
        }
    },
});

//Ramos de Atividades de Clientes
let getDataRamosAtividades = GetAzureDataSource(9).then((result) => {

    loadPanel.show();

    if (result.success) {

        dxComp.lkp_Ramos_Atividades = new DevExpress.ui.dxLookup('#lkp_Ramos_Atividades', {
            dataSource: result.data,
            searchExpr: ['DS_RAMO_ATIVIDADE'],
            displayExpr: 'DS_RAMO_ATIVIDADE',
            valueExpr: 'CD_RAMO_ATIVIDADE',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Ramos de Atividades',
            },
            labelMode: 'floating',
            label: 'Ramos de Atividades',
            placeholder: 'Ramos de Atividades',
            showClearButton: true,
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

//Categorias de Clientes
let getDataCategoriaCliente = GetAzureDataSource(6).then((result) => {

    loadPanel.show();

    if (result.success) {

        dxComp.lkp_Categorias_Clientes = new DevExpress.ui.dxLookup('#lkp_Categorias_Clientes', {
            dataSource: result.data,
            searchExpr: ['DS_CATEGORIA_CLIENTE'],
            displayExpr: 'DS_CATEGORIA_CLIENTE',
            valueExpr: 'CD_CATEGORIA_CLIENTE',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Categorias de Clientes',
            },
            labelMode: 'floating',
            label: 'Categorias de Clientes',
            placeholder: 'Categorias de Clientes',
            showClearButton: true,
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

//Tabelas de Preços
let getDataTabelaPreco = GetAzureDataSource(2).then((result) => {

    loadPanel.show();

    if (result.success) {

        dxComp.lkp_Tabelas_Precos = new DevExpress.ui.dxLookup('#lkp_Tabelas_Precos', {
            dataSource: result.data,
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_PESQUISA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Tabelas de Preços',
            },
            labelMode: 'floating',
            label: 'Tabelas de Preços de Clientes',
            placeholder: 'Tabelas de Preços de Clientes',
            showClearButton: true,
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

//Equipes de Vendas (Apenas equipes ligadas a algum Cliente)
let getDataEquipeVendas = GetAzureDataSource(38).then((result) => {

    loadPanel.show();

    if (result.success) {

        dxComp.lkp_Equipes_Vendas = new DevExpress.ui.dxLookup('#lkp_Equipes_Vendas', {
            dataSource: result.data,
            searchExpr: ['DS_EQUIPE_VENDA'],
            displayExpr: 'DS_EQUIPE_VENDA',
            valueExpr: 'CD_EQUIPE_VENDA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Equipes de Vendas',
            },
            labelMode: 'floating',
            label: 'Equipes de Vendas',
            placeholder: 'Equipes de Vendas',
            showClearButton: true,
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

dxComp.chk_Incluir_Conta_Corrente = new DevExpress.ui.dxCheckBox('#chk_Incluir_Conta_Corrente', {
    text: 'Incluir Conta Corrente (Aguardando Faturamento)',
    value: true,
});

function validaCampos() {

    loadPanel.show();

    const result = validarCamposPeriodo();

    if (result) {

        if (!getDataPivot.firstFind) {
            getDataPivot.get({
                NR_ANO_INICIAL: new Date(dxComp.dt_Inicial.option().value).getFullYear().toString(),
                NR_MES_INICIAL: (new Date(dxComp.dt_Inicial.option().value).getMonth() + 1).toString(),
                NR_ANO_FINAL: new Date(dxComp.dt_Final.option().value).getFullYear().toString(),
                NR_MES_FINAL: (new Date(dxComp.dt_Final.option().value).getMonth() + 1).toString(),
                CD_FILIAL: dxComp.lkp_Filiais.option().value,
                CD_FAMILIA: dxComp.lkp_Familias.option().value,
                CD_FORNECEDOR: dxComp.lkp_Fornecedores.option().value,
                LG_INCLUIR_CONTA_CORRENTE: dxComp.chk_Incluir_Conta_Corrente.option().value,
                CD_RAMO_ATIVIDADE: dxComp.lkp_Ramos_Atividades.option().value,
                CD_CATEGORIA_CLIENTE: dxComp.lkp_Categorias_Clientes.option().value,
                CD_TABELA_PRECO: dxComp.lkp_Tabelas_Precos.option().value,
                CD_EQUIPE_VENDA: dxComp.lkp_Equipes_Vendas.option().value,
            });
        }
        labelTitulo = dxComp.lkp_selecao_visoes.option().selectedItem.DS_CRM;
        gerarRelatorio();

    } else {
        loadPanel.hide();
    };
}

async function validarCamposPeriodo() {
    await parameters.promise;

    var dataInicial = new Date(dxComp.dt_Inicial.option('value'));
    var dataFinal = new Date(dxComp.dt_Final.option('value'));

    //var dataInicialFormatada = new Date(`${dataInicial.getFullYear()}-${("00" + String(dataInicial.getMonth() + 1)).slice(-2)}-${("00" + String(dataInicial.getDate())).slice(-2)}`);
    //var dataFinalFormatada = new Date(`${dataFinal.getFullYear()}-${("00" + String(dataFinal.getMonth() + 1)).slice(-2)}-${("00" + String(dataFinal.getDate())).slice(-2)}`);

    var dataInicialFormatada = moment(dataInicial).toDate();
    var dataFinalFormatada = moment(dataFinal).toDate();

    const resultadoValidcao = DevExpress.validationEngine.validateGroup("Geral");

    if (resultadoValidcao.isValid == false) {
        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });

        return false;
    } else {
        const diferenca = diffDateMonthsWithAtual(dataInicialFormatada, dataFinalFormatada);

        if (diferenca > parameters.result.data.maxMeses) {
            DevExpress.ui.notify({
                message: `O período máximo permitido é de ${parameters.result.data.maxMeses} meses. Por favor, ajuste os meses informados.`,
                type: 'error',
                displayTime: 5000,
            });

            return false;
        } else {
            return true;
        }
    };

}

function diferencaEmMeses(data1, data2) {
    // Verifique se as entradas são objetos Date válidos
    if (!(data1 instanceof Date) || !(data2 instanceof Date)) {
        return null;
    }

    // Calcule a diferença em milissegundos
    const diferencaEmMilissegundos = data2 - data1;

    // Converta a diferença em milissegundos em meses
    const meses = diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 29); // Em média, um mês tem cerca de 30,44 dias

    return Math.floor(meses); // Arredonde para o número inteiro mais próximo
}

function exibirFiltros() {
    $('#cardCabecalho, #cardFiltros').slideDown();
    //ExibirEsconderPaineis('cardCabecalho', 'block');
    //ExibirEsconderPaineis('cardFiltros', 'block');

    rolar_topo();
}

function ocultarFiltros() {
    $('#cardCabecalho, #cardFiltros').slideUp();
    //ExibirEsconderPaineis('cardCabecalho', 'none');
    //ExibirEsconderPaineis('cardFiltros', 'none');
}

async function gerarRelatorio() {

    $('#cardCabecalho, #cardFiltros, #cardResultado').fadeOut();

    //ExibirEsconderPaineis('cardCabecalho', 'none');
    //ExibirEsconderPaineis('cardFiltros', 'none');
    //ExibirEsconderPaineis('cardResultado', 'none');

    await load_lkp_Familias, load_lkp_Fornecedores, load_lkp_Filiais, getDataCategoriaCliente, getDataTabelaPreco, getDataEquipeVendas;

    if (dxComp.dt_Inicial.option('value') !== null) {
        data = new Date(dxComp.dt_Inicial.option('value'));
    } else {
        data = new Date(data.setMonth(data.getMonth() - 7));
    }

    var anoInicial = `${data.getFullYear()}`
    labels.labelPeriodoInicial = `${("00" + String(data.getMonth() + 1)).slice(-2)}` + '/' + anoInicial

    if (dxComp.dt_Final.option('value') !== null) {
        data = new Date(dxComp.dt_Final.option('value'));
    } else {
        data = new Date();
    }

    var anoFinal = `${data.getFullYear()}`
    labels.labelPeriodoFinal = `${("00" + String(data.getMonth() + 1)).slice(-2)}` + '/' + anoFinal

    labels.labelFilial = dxComp.lkp_Filiais.option('value') || null;
    labels.labelFamilia = dxComp.lkp_Familias.option('value') || null;
    labels.labelFornecedor = dxComp.lkp_Fornecedores.option('value') || null;
    labels.labelRamoAtividade = dxComp.lkp_Ramos_Atividades.option('value') || null;
    labels.labelCategoriaCliente = dxComp.lkp_Categorias_Clientes.option('value') || null;
    labels.labelTabelaPreco = dxComp.lkp_Tabelas_Precos.option('value') || null;
    labels.labelEquipeVenda = dxComp.lkp_Equipes_Vendas.option('value') || null;

    var incluirContaCorrente = dxComp.chk_Incluir_Conta_Corrente.option('value');
    labels.labelIncluirContaCorrente = incluirContaCorrente ? 'Sim' : 'Não';

    //processa resultado do relatório
    await getDataPivot.promise.then((result) => {
        getDataPivot.firstFind = false;

        if (result.success) {
            $('#cardResultado').fadeIn();
            ////ExibirEsconderPaineis('cardResultado', 'block');

            loadPanel.hide();

            //console.log("RESULTADO: ", result);

            var labelFiltros = "";

            if (result.data.length > 0) {
                var dataProcessamento = new Date(result.data[0].DT_PROCESSAMENTO);

                // Formate a data e hora de acordo com as opções
                labels.labelDataProcessamento = dataProcessamento.toLocaleDateString('pt-BR', optionsDataHora);

                if (anoInicial) {
                    labelFiltros = labelFiltros + 'Período: ' + labels.labelPeriodoInicial + ' a ' + labels.labelPeriodoFinal;
                }

                if (labels.labelFilial) {
                    labelFiltros = labelFiltros + ' / Filial: ' + labels.labelFilial;
                }

                if (labels.labelFamilia) {
                    labelFiltros = labelFiltros + ' / Família: ' + labels.labelFamilia;
                }

                if (labels.labelFornecedor) {
                    labelFiltros = labelFiltros + ' / Fornecedor: ' + labels.labelFornecedor;
                }

                if (labels.labelRamoAtividade) {
                    labelFiltros = labelFiltros + ' / Ramo de Atividades: ' + labels.labelRamoAtividade;
                }

                if (labels.labelCategoriaCliente) {
                    labelFiltros = labelFiltros + ' / Categoria: ' + labels.labelCategoriaCliente;
                }

                if (labels.labelTabelaPreco) {
                    labelFiltros = labelFiltros + ' / Tabela de Preço: ' + labels.labelTabelaPreco;
                }

                if (labels.labelEquipeVenda) {
                    labelFiltros = labelFiltros + ' / Equipe de Venda: ' + labels.labelEquipeVenda;
                }

                if (labels.labelIncluirContaCorrente) {
                    labelFiltros = labelFiltros + ' / Incluído Conta Corrente: ' + labels.labelIncluirContaCorrente;
                }

                if (labels.labelDataProcessamento) {
                    labelFiltros = labelFiltros + ' / Dados pré-processados em ' + labels.labelDataProcessamento;
                }
            }
            else {
                labelFiltros = "NÃO FORAM ENCONTRADOS REGISTROS COM O FILTRO INFORMADO";
            }

            const distinct = (value, index, array) => array.indexOf(value) === index;
            const arr = result.data.map(a => a.NR_ANO_MES).filter(distinct).sort();
            const [min, max] = [String(arr[0]), String(arr.findLast(a => a))];
            const [dateMin, dateMax] = [moment(min, 'YYYYMM'), moment(max, 'YYYYMM')];

            if (dateMax.isValid())
                dxComp.dt_Final.option('value', dateMax.toDate());
            if (dateMin.isValid())
                dxComp.dt_Inicial.option('value', dateMin.toDate());

            $('#labelTitulo').fadeOut(500, function () {
                $(this).text(labelTitulo).fadeIn(500);
            })

            $('#labelFiltros').fadeOut(500, function () {
                $(this).text(labelFiltros).fadeIn(500);
            })

            $('#labelDataProcessamento').fadeOut(500, function () {
                $(this).text(`${moment(result.data[0].DT_PROCESSAMENTO).format('DD/MM/YYYY HH:mm')}`).fadeIn(500);
            })

            var labelCHURN = result.data[0].PC_CHURN;
            var labelQtdeTotalClientes = result.data[0].QT_CLIENTES;
            var labelQtdeNovosClientesChurn = result.data[0].QT_CLIENTES_COM_COMPRA_APENAS_ULTIMO_MES;
            var labelQtdeClientesMesesAnteriores = result.data[0].QT_CLIENTES_COM_COMPRA_MESES_ANTERIORES;
            var labelCHURNQuantidade = result.data[0].QT_CLIENTES_SEM_COMPRA_ULTIMO_MES;
            var labelCHURNPercentual = result.data[0].PC_CHURN + '%';

            var labelPositivacao = result.data[0].PC_POSITIVACAO;
            var labelQtdeClientesMesesAnterioresPositivacao = result.data[0].QT_CLIENTES_COM_COMPRA_MESES_ANTERIORES;
            var labelPositivacaoQuantidade = result.data[0].QT_CLIENTES_COM_COMPRA_ULTIMO_MES;
            var labelPositivacaoPercentual = result.data[0].PC_POSITIVACAO + '%';

            var labelNovosClientes = result.data[0].PC_NOVOS_CLIENTES;
            var labelQtdeClientesMesesAnterioresNovosClientes = result.data[0].QT_CLIENTES_COM_COMPRA_MESES_ANTERIORES;
            var labelQtdeNovosClientes = result.data[0].QT_CLIENTES_COM_COMPRA_APENAS_ULTIMO_MES;
            var labelNovosClientesPercentual = result.data[0].PC_NOVOS_CLIENTES + '%';

            if (labelCHURN !== null && labelCHURN > 0) {
                ExibirEsconderPaineis('panelCHURN', 'block');
                ExibirEsconderPaineis('panelSemCHURN', 'none');

                $('#labelCHURN').hide().text(labelCHURN).fadeIn(500);
                $('#labelQtdeTotalClientes').hide().text(labelQtdeTotalClientes).fadeIn(500);
                $('#labelQtdeNovosClientesChurn').hide().text(labelQtdeNovosClientesChurn).fadeIn(500);
                $('#labelQtdeClientesMesesAnteriores').hide().text(labelQtdeClientesMesesAnteriores).fadeIn(500);
                $('#labelCHURNQuantidade').hide().text(labelCHURNQuantidade).fadeIn(500);
                $('#labelCHURNPercentual').hide().text(labelCHURNPercentual).fadeIn(500);
            } else {
                ExibirEsconderPaineis('panelCHURN', 'none');
                ExibirEsconderPaineis('panelSemCHURN', 'block');
            }

            if (labelPositivacao !== null && labelPositivacao > 0) {
                ExibirEsconderPaineis('panelPositivacao', 'block');
                ExibirEsconderPaineis('panelSemPositivacao', 'none');

                $('#labelPositivacao').hide().text(labelPositivacao).fadeIn(500);
                $('#labelQtdeClientesMesesAnterioresPositivacao').hide().text(labelQtdeClientesMesesAnterioresPositivacao).fadeIn(500);
                $('#labelPositivacaoQuantidade').hide().text(labelPositivacaoQuantidade).fadeIn(500);
                $('#labelPositivacaoPercentual').hide().text(labelPositivacaoPercentual).fadeIn(500);
            } else {
                ExibirEsconderPaineis('panelPositivacao', 'none');
                ExibirEsconderPaineis('panelSemPositivacao', 'block');
            }

            if (labelNovosClientes !== null) {
                ExibirEsconderPaineis('panelNovosClientes', 'block');
                ExibirEsconderPaineis('panelSemNovosClientes', 'none');

                $('#labelNovosClientes').hide().text(labelNovosClientes).fadeIn(500);
                $('#labelQtdeClientesMesesAnterioresNovosClientes').hide().text(labelQtdeClientesMesesAnterioresNovosClientes).fadeIn(500);
                $('#labelQtdeNovosClientes').hide().text(labelQtdeNovosClientes).fadeIn(500);
                $('#labelNovosClientesPercentual').hide().text(labelNovosClientesPercentual).fadeIn(500);
            } else {
                ExibirEsconderPaineis('panelNovosClientes', 'none');
                ExibirEsconderPaineis('panelSemNovosClientes', 'block');
            }

            var tipoGrafico = 'bar';
            var paletaGrafico = 'Soft Blue';

            const pivotGridChart = $('#pivotgrid-chart').dxChart({
                palette: paletaGrafico,
                legend: {
                    font: {
                        size: 10,
                    },
                },
                commonSeriesSettings: {
                    type: tipoGrafico,
                },
                commonAxisSettings: {
                    label: {
                        font: {
                            size: 11,
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                    customizeTooltip(args) {
                        const valueText = (args.seriesName.indexOf('Valor Venda') !== -1)
                            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(args.originalValue)
                            : args.originalValue;

                        return {
                            html: `${args.seriesName}<div class='currency'>${valueText}</div>`,
                        };
                    },
                },
                size: {
                    height: 160,
                },
                adaptiveLayout: {
                    width: 450,
                },
                onDrawn(e) {
                    contadorColunas = 0;
                },
                onInitialized: (e) => {
                    dxComp.pivotGridChart = e.component;
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) e.component.refresh();
                        });
                    }).observe(e.element[0]);
                }
            }).dxChart('instance');

            var columnData = 'VL_TOTAL_VENDA';

            const toolbarSeparator = {
                locateInMenu: 'auto',
                location: 'before',
                template(itemData, itemIndex, element) {
                    $('<div>')
                        .addClass('toolbar-separator')
                        .appendTo(element);
                },
                menuItemTemplate(itemData, itemIndex, element) {
                    $('<div>')
                        .addClass('toolbar-menu-separator')
                        .appendTo(element);
                },
            };

            $('#resizable-container').dxResizable({
                minWidth: 500,
                minHeight: 150,
                maxHeight: 370,
                handles: 'right',
                area: '.widget-container',
            });

            if (!dxComp.toolbar) dxComp.toolbar = new DevExpress.ui.dxToolbar('#toolbar', {
                items: [
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            hint: 'Incluir nova visão',
                            icon: 'add',
                            type: 'default',
                            onClick: (e) => {
                                dxComp.lkp_selecao_visoes.option('value', null);
                                dxComp.pivotGrid.getDataSource().state(null);
                                $('#labelTitulo').fadeOut(500, function () {
                                    $(this).text('Novo Modelo de Visão Analítica').fadeIn(500);
                                })
                            },
                            onInitialized: (e) => dxComp.btn_Incluir_Visao = e.component,
                        },
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            hint: 'Salvar a visão atual',
                            icon: 'save',
                            type: 'normal',
                            onClick(e) {
                                let value = dxComp.lkp_selecao_visoes.option().value;
                                if (!value) {
                                    AbrirModal('#ModalSalvarVisao');
                                    return;
                                }
                                CreateUpdateCRM('modificar');
                            },
                        },
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            hint: 'Salvar Como',
                            icon: 'fa fa-files-o',
                            type: 'normal',
                            onClick(e) {
                                AbrirModal('#ModalSalvarVisao');
                            },
                        },
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            hint: 'Abrir uma visão gravada',
                            icon: 'folder',
                            type: 'normal',
                            onClick(e) {
                                getDataVisoes.get();
                                abrirVisao();
                            },
                        },
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            hint: 'Excluir esta visão',
                            icon: 'fa fa-trash',
                            type: 'normal',
                            onClick(e) {
                                AbrirModal('#ModalConfirmacaoExclusaoVisao');
                            },
                            onInitialized: (e) => dxComp.btn_Excluir_Visao = e.component,
                        },
                    },

                    toolbarSeparator,

                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            hint: 'Filtros Adicionais',
                            icon: 'fa fa-filter',
                            type: 'default',
                            onClick(e) {
                                exibirFiltros();
                            },
                        },
                    },

                    toolbarSeparator,

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceOrdemPeriodo,
                            searchExpr: ['DS_ORDEM'],
                            displayExpr: 'DS_ORDEM',
                            valueExpr: 'CD_ORDEM',
                            value: 'desc',
                            width: 100,
                            hint: 'Ordem dos meses',
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: true,
                                title: 'Ordem do Meses',
                                width: 200,
                            },
                            //labelMode: 'floating',
                            //label: 'Ordem do Período',
                            placeholder: 'Ordem dos Meses',
                            showClearButton: false,
                            onValueChanged(e) {
                                var pivotGridDataSource = dxComp.pivotGrid.getDataSource();

                                pivotGridDataSource.field("DT_MES_ANO", { sortOrder: e.value });
                                pivotGridDataSource.load();
                            },
                            onInitialized: (e) => dxComp.lkp_Ordem_Meses = e.component,
                        },
                    },

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceDimensoes,
                            searchExpr: ['DS_DIMENSAO'],
                            displayExpr: 'DS_DIMENSAO',
                            valueExpr: 'NR_DIMENSAO',
                            value: tamanhoInicialGrid,
                            width: 110,
                            hint: 'Altura do grid de resultados',
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: true,
                                title: 'Altura do Grid',
                                width: 200,
                            },
                            //labelMode: 'floating',
                            //label: 'Altura do Grid',
                            placeholder: 'Altura do Grid',
                            showClearButton: false,
                            onInitialized(e) {
                                dxComp.lkp_Dimensao_Grid = e.component;
                            },
                            onValueChanged(e) {

                                var comprimentoAdicional = 0;
                                comprimentoAdicionalPadrao = comprimentoAdicionalInicial;

                                if (dxComp.btn_Exibir_Grafico.option('visible')) {
                                    comprimentoAdicional = comprimentoAdicionalSemGrafico;
                                }

                                if (e.value == -1) {
                                    requestFullScreen();

                                    setTimeout(function () {
                                        ajustaTamanhoGrid(comprimentoAdicional);
                                    }, 1);

                                } else if (e.value == 0) {

                                    desligaFullScreen();

                                    setTimeout(function () {
                                        ajustaTamanhoGrid(comprimentoAdicional);
                                    }, 1);
                                } else {
                                    dxComp.pivotGrid.option('height', e.value);

                                    //alternaFullScreen();

                                    //setTimeout(function () {
                                    //    alternaFullScreen();
                                    //}, 1);
                                }

                                dxComp.pivotGrid.repaint();
                            },
                        },
                    },

                    toolbarSeparator,

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxLookup',
                        options: {
                            hint: 'Tipo de Gráfico',
                            dataSource: dataSourceTiposGraficos,
                            searchExpr: ['DS_TIPO_GRAFICO'],
                            displayExpr: 'DS_TIPO_GRAFICO',
                            valueExpr: 'CD_TIPO_GRAFICO',
                            value: tipoGrafico,
                            width: 160,
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: true,
                                width: 210,
                                title: 'Tipo de Gráfico',
                            },
                            //labelMode: 'floating',
                            //label: 'Gráfico',
                            placeholder: 'Tipo de Gráfico',
                            showClearButton: false,
                            onInitialized(e) {
                                dxComp.lkp_Tipos_Graficos = e.component;
                            },
                            onValueChanged(e) {
                                tipoGrafico = e.value;
                                atualizarGrafico();
                            },
                        },
                    },

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxLookup',
                        options: {
                            hint: 'Paleta de Cores do Gráfico',
                            dataSource: paletteCollection,
                            items: paletteCollection,
                            value: paletaGrafico,
                            width: 110,
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: true,
                                width: 250,
                                title: 'Paleta de Cores do Gráfico',
                            },
                            //labelMode: 'floating',
                            //label: 'Paleta',
                            placeholder: 'Paleta de Cores do Gráfico',
                            showClearButton: false,
                            onValueChanged(e) {
                                paletaGrafico = e.value;
                                atualizarGrafico();
                            },
                            onInitialized: (e) => dxComp.lkp_Paleta_Grafico = e.component,
                        },
                    },

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxNumberBox',
                        options: {
                            hint: 'Quantidade de Registros do Gráfico',
                            value: qtdeColunasGrafico,
                            format: 'Top #####',
                            min: 0,
                            //max: 100,
                            showClearButton: false,
                            showSpinButtons: true,
                            step: 1,
                            width: 70,
                            placeholder: 'Resultados',
                            //labelMode: 'floating',
                            //label: 'Resultados',
                            onValueChanged(e) {
                                if (e.value == null) {
                                    e.value = 0;
                                }
                                qtdeColunasGrafico = e.value;
                                atualizarGrafico();
                            },
                            onInitialized: (e) => dxComp.lkp_Colunas_Grafico = e.component,
                        },
                    },

                    toolbarSeparator,

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxCheckBox',
                        options: {
                            text: 'Totais na primeira coluna',
                            value: true,
                            onValueChanged(data) {
                                dxComp.pivotGrid.option('showTotalsPrior', data.value ? 'both' : 'rows');
                            },
                            onInitialized: (e) => dxComp.chk_Totais_Primeira_Linha = e.component,
                        },
                    },

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxCheckBox',
                        options: {
                            text: 'Valores em linhas',
                            value: false,
                            onValueChanged(data) {
                                dxComp.pivotGrid.option('dataFieldArea', data.value ? 'row' : 'column');
                            },
                            onInitialized: (e) => dxComp.chk_Valores_Em_Linhas = e.component,
                        },
                    },

                    {
                        locateInMenu: 'auto',
                        location: 'before',
                        widget: 'dxCheckBox',
                        options: {
                            text: 'Níveis em cascata',
                            value: false,
                            onValueChanged(data) {
                                dxComp.pivotGrid.option('rowHeaderLayout', data.value ? 'tree' : 'standard');
                            },
                            onInitialized: (e) => dxComp.chk_Niveis_Formato_Cascata = e.component,
                        },
                    },

                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            hint: 'Exibir Gráfico',
                            icon: 'fa fa-bar-chart',
                            visible: false,
                            type: 'default',
                            onInitialized(e) {
                                dxComp.btn_Exibir_Grafico = e.component;
                            },
                            onClick(e) {
                                exibirGrafico();
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            hint: 'Sair do Módulo',
                            icon: 'fa fa-close',
                            type: 'normal',
                            onClick(e) {
                                AbrirModal('#ModalConfirmacaoSairTela');
                            },
                        },
                    },


                ],
            });

            if (!dxComp.txt_Nome_Visao) dxComp.txt_Nome_Visao = new DevExpress.ui.dxTextBox('#txt_Nome_Visao', {
                placeholder: 'Digite um nome para sua nova visão análítica *',
                maxLength: 60,
                showClearButton: true,
                onInitialized: (e) => {
                    e.component.element().dxValidator({ validationRules: [{ type: 'required', message: 'Nome Obrigatório', }], validationGroup: 'Salvar' });
                },
            });

            if (!dxComp.btn_Fechar_Grafico) dxComp.btn_Fechar_Grafico = new DevExpress.ui.dxButton('#btn_Fechar_Grafico', {
                text: '',
                hint: 'Ocultar Gráfico',
                icon: 'chevronup',
                type: 'normal',
                onClick(e) {
                    fecharGrafico();
                },

            });

            if (dxComp.pivotGrid) {
                dxComp.pivotGrid.getDataSource().store()._dataSource.store()._array = result.data;
                dxComp.pivotGrid.getDataSource().reload();
            } else {
                dxComp.pivotGrid = new DevExpress.ui.dxPivotGrid('#pivotgrid', {
                    allowSorting: true,
                    allowSortingBySummary: true,
                    allowExpandAll: true,
                    allowFiltering: true,
                    showBorders: true,
                    //showColumnGrandTotals: true,
                    //showDataHeaders: true,
                    showTotalsPrior: 'both',
                    //showRowGrandTotals: true,
                    //showRowTotals: true,
                    showColumnTotals: true,
                    height: 570,
                    //rowHeaderLayout: 'tree',
                    scrolling: {
                        mode: 'virtual',
                    },
                    headerFilter: {
                        allowSearch: true,
                        showRelevantValues: true,
                        width: 500,
                        height: 400
                    },
                    fieldChooser: {
                        enabled: true,
                        allowSearch: true,
                        applyChangesMode: "onDemand",
                        texts: {
                            allFields: "Campos disponíveis",
                            columnFields: "Colunas",
                            dataFields: "Dados",
                            rowFields: "Linhas",
                            filterFields: "Filtros"
                        },
                        height: 700
                    },
                    fieldPanel: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    export: {
                        enabled: true
                    },
                    stateStoring: {
                        enabled: true,
                        type: "custom",
                        //customLoad: () => CurrentState,
                        customSave: function (state) {
                            if (!this.firstState) {
                                this.firstState = state;
                            }
                            CurrentState = state;
                        }
                    },
                    dataSource: new DevExpress.data.PivotGridDataSource({
                        store: result.data,
                        retrieveFields: false,
                        fields: [
                            {
                                dataField: 'CD_ABC_PRODUTO',
                                caption: 'ABC Produto',
                                width: 50,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_PRODUTO_COM_CODIGO',
                                caption: 'Produto',
                                width: 250,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_PRODUTO_CODIGO_COM_DESCRICAO',
                                caption: 'Código / Produto',
                                width: 250,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc'
                            },
                            {
                                dataField: 'DS_PRODUTO',
                                caption: 'Descrição Produto',
                                width: 250,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc'
                            },
                            {
                                dataField: 'CD__PRODUTO',
                                caption: 'Código Interno',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc'
                            },
                            {
                                dataField: 'DS_RAZAO_SOCIAL_CLIENTE',
                                caption: 'Cliente',
                                width: 200,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_MARCA',
                                caption: 'Marca',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_FILIAL_CODIGO_DESCRICAO',
                                caption: 'Filial com Código',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: 'CD_CPF_CNPJ',
                                caption: 'CPF/CNPJ Cliente',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: 'CD_FORNECEDOR',
                                caption: 'Código Fornecedor',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: 'CD_FABRICANTE',
                                caption: 'Código Fabricante',
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: 'DS_CIDADE_CLIENTE',
                                caption: 'Cidade',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_BAIRRO_CLIENTE',
                                caption: 'Bairro',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_REGIAO_CLIENTE',
                                caption: 'Regiao',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'CD_UF_CLIENTE',
                                caption: 'UF',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_RAMO_ATIVIDADE',
                                caption: 'Ramo',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_RECORRENCIA_CLIENTES',
                                caption: 'Recorrência Clientes',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'CD_LOGIN_VENDEDOR',
                                caption: 'Vendedor',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_FAMILIA',
                                caption: 'Família',
                                width: 100,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_NOME_FANTASIA_FILIAL',
                                caption: 'Filial',
                                //width: 150,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'DS_RAZAO_SOCIAL_FORNECEDOR',
                                caption: 'Fornecedor',
                                width: 200,
                                sortBySummaryField: 'VL_TOTAL_VENDA',
                                sortOrder: 'desc',
                                area: 'filter',
                            },
                            {
                                dataField: 'NR_ANO',
                                caption: 'Ano',
                                //dataType: 'date',
                                //area: 'column',
                            },
                            {
                                dataField: 'NR_MES',
                                caption: 'Mês',
                                //dataType: 'date',
                                //area: 'column',
                            },
                            {
                                dataField: 'DT_MES_ANO',
                                caption: 'Período',
                                dataType: 'date',
                                format: 'MM/yyyy',
                                area: 'column',
                                sortOrder: 'desc',
                            },
                            {
                                dataField: 'VL_TOTAL_VENDA',
                                name: "VL_TOTAL_VENDA",
                                displayFolder: "Valores e Percentuais",
                                caption: 'Valor Venda',
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'data',
                            },
                            {
                                dataField: columnData,
                                name: "media",
                                displayFolder: "Valores e Percentuais",
                                caption: 'Média',
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'data',
                                showTotals: true,
                                showValues: false,
                                calculateSummaryValue: function (e) {
                                    let result = 0;
                                    let groupRowTotal = e.grandTotal();
                                    let value = !e.value() ? 0 : e.value();

                                    if (e._data.columns)
                                        result = parseFloat((value / e._data.columns.length)).toFixed(0);

                                    if (result > 0)
                                        return parseInt(result);
                                    return 0;
                                },
                                allowCrossGroupCalculation: true,
                            },
                            {
                                dataField: columnData,
                                name: "total",
                                displayFolder: "Valores e Percentuais",
                                caption: '% Sobre o Total',
                                dataType: 'number',
                                summaryType: 'sum',
                                //format: '###,###,###,###,##0%',
                                area: 'data',
                                showTotals: true,
                                showValues: false,
                                calculateSummaryValue: function (e) {
                                    let result = "";
                                    let groupRowTotal = e.grandTotal();
                                    dxComp.pivotGrid.grandTotal = groupRowTotal.value();

                                    let value = !e.value() ? 0 : e.value();

                                    result = parseFloat((value / groupRowTotal.value()) * 100).toFixed(2);

                                    if (result > 0)
                                        return result.toString().replace('.', ',') + '%';
                                    return '0,01%';
                                },
                                allowCrossGroupCalculation: true,
                            },
                            {
                                name: "pcAcumulado",
                                caption: '% Acumulado',
                                dataType: 'number',
                                summaryType: 'custom',
                                area: 'data',
                                showTotals: true,
                                showValues: false,
                            },
                            {
                                name: 'Sequencial',
                                displayFolder: "Valores e Percentuais",
                                caption: 'Qtde. Registros',
                                //dataType: 'number',
                                summaryType: 'custom',
                                format: '###,###,###,###,###',
                                showTotals: true,
                                showValues: false,
                                area: 'data',
                            },
                            {
                                dataField: 'VL_TOTAL_VENDA',
                                name: "qtdTotal",
                                caption: 'Qtde. Registros',
                                dataType: 'number',
                                summaryType: 'count',
                                format: '###,###,###,###,###',
                                area: 'data',
                                visible: false,
                                showTotals: true,
                                showValues: false,
                            },

                            {
                                dataField: 'VL_TOTAL_CUSTO',
                                displayFolder: "Valores e Percentuais",
                                caption: 'Valor Custo',
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'filter',
                            },
                            {
                                dataField: 'VL_TOTAL_CUSTO_MEDIO',
                                displayFolder: "Valores e Percentuais",
                                caption: 'Valor Custo Médio',
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'filter',
                            },
                            {
                                dataField: 'PC_RENTABILIDADE',
                                displayFolder: "Valores e Percentuais",
                                caption: '% Rentabilidade',
                                dataType: 'number',
                                //summaryType: 'avg',
                                area: 'filter',
                                calculateSummaryValue: function (summaryCell) {
                                    const valorVenda = summaryCell.value("VL_TOTAL_VENDA");
                                    const valorRentabilidade = summaryCell.value("VL_RENTABILIDADE");
                                    if (valorVenda > 0) {
                                        return valorRentabilidade / valorVenda * 100;
                                    } else {
                                        return 0;
                                    }
                                },
                                customizeText: (cellInfo) => {
                                    return cellInfo.value ? cellInfo.value.toFixed(2).replace('.', ',') + '%' : null;
                                },
                            },
                            {
                                dataField: 'PC_LUCRO',
                                displayFolder: "Valores e Percentuais",
                                caption: '% Lucro',
                                dataType: 'number',
                                //summaryType: 'avg',
                                area: 'filter',
                                calculateSummaryValue: function (summaryCell) {
                                    const valorCusto = summaryCell.value("VL_TOTAL_CUSTO");
                                    const valorRentabilidade = summaryCell.value("VL_RENTABILIDADE");
                                    if (valorCusto > 0) {
                                        return valorRentabilidade / valorCusto * 100;
                                    } else {
                                        return 0;
                                    }
                                },
                                customizeText: (cellInfo) => {
                                    return cellInfo.value ? cellInfo.value.toFixed(2).replace('.', ',') + '%' : null;
                                },
                            },
                            {
                                dataField: 'VL_RENTABILIDADE',
                                displayFolder: "Valores e Percentuais",
                                caption: 'Vl. Rentabilidade',
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'filter',
                            },
                            {
                                dataField: 'QT_PEDIDA',
                                displayFolder: "Valores e Percentuais",
                                caption: 'Qtde. Venda',
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'filter',
                            },
                            {
                                dataField: 'VL_DEVOLUCAO',
                                name: "VL_DEVOLUCAO",
                                caption: 'Valor Devolução',
                                displayFolder: "Valores e Percentuais",
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'filter',
                            },
                            {
                                dataField: 'VL_VENDA_MENOS_DEVOLUCAO',
                                name: "VL_VENDA_MENOS_DEVOLUCAO",
                                caption: '(Venda - Devolução)',
                                displayFolder: "Valores e Percentuais",
                                dataType: 'number',
                                summaryType: 'sum',
                                format: '###,###,###,###,##0',
                                area: 'filter',
                            },
                            {
                                dataField: 'QT_ESTOQUE',
                                name: "QT_ESTOQUE",
                                caption: 'Qtde. Estoque',
                                displayFolder: "Valores e Percentuais",
                                dataType: 'number',
                                summaryType: 'min',
                                format: '###,###,###,###,##0.###',
                                area: 'filter',
                                showTotals: true,
                                showValues: false,
                            },
                        ],
                        onChanged: function (e) {
                            try {
                                totalAcumulado = 0;
                                contadorRegistros = 0;

                                var pivotGridDataSource = dxComp.pivotGrid.getDataSource();
                                var columnAreaFields = pivotGridDataSource.getAreaFields("data", true);

                                if (columnAreaFields[0].dataField !== columnData) {

                                    columnData = columnAreaFields[0].dataField;

                                    //console.log("COLUNAS DO TIPO DATA: ", columnData);

                                    /// AJUSTA A COLUNA DE MÉDIA E PERCENTUAIS SOBRE O TOTAL PARA A NOVA COLUNA SELECIONADA DE VALOR ////
                                    pivotGridDataSource.field("media", { dataField: columnData });
                                    pivotGridDataSource.field("total", { dataField: columnData });


                                    /// CONCLUIR A CONFIGURAÇÃO DA ORDENAÇÃO ////
                                    pivotGridDataSource.field("CD_ABC_PRODUTO", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_PRODUTO_COM_CODIGO", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_RAZAO_SOCIAL_CLIENTE", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_RAMO_ATIVIDADE_CLIENTE", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_CIDADE_CLIENTE", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_BAIRRO_CLIENTE", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("CD_UF_CLIENTE", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_REGIAO_CLIENTE", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("CD_LOGIN_VENDEDOR", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_NOME_FANTASIA_FILIAL", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_FAMILIA", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("DS_RAZAO_SOCIAL_FORNECEDOR", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("PC_RENTABILIDADE", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("PC_LUCRO", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("VL_TOTAL_VENDA", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("VL_TOTAL_CUSTO", { sortBySummaryField: columnData });
                                    pivotGridDataSource.field("VL_TOTAL_CUSTO_MEDIO", { sortBySummaryField: columnData });


                                    columnData

                                    pivotGridDataSource.load();

                                    if (columnData == "PC_RENTABILIDADE" || columnData == "PC_LUCRO") {
                                        pivotGridDataSource.field("% Acumulado", { visible: false });
                                        pivotGridDataSource.field("% Sobre o Total", { visible: false });
                                        pivotGridDataSource.field("media", { visible: false });
                                    } else {
                                        pivotGridDataSource.field("% Acumulado", { visible: true });
                                        pivotGridDataSource.field("% Sobre o Total", { visible: true });
                                        pivotGridDataSource.field("media", { visible: true });
                                    }
                                }

                            } catch {
                                console.log("COLUNAS DO TIPO DATA: ", "NENHUM", columnAreaFields[0].dataField);
                            }
                        },
                    }),
                    onInitialized: function (e) {
                        this.LoadValues = () => new Promise((resolve) => {
                            const ivalues = e.component.getDataSource().getData().values.slice();
                            const description = e.component.getDataSource()._descriptions.values;
                            const pcTotalIndex = description.find(a => a.name === "total")?.areaIndex;

                            let i = 0;
                            let total = 0;
                            function getValuesWithPropertyT(obj, c = null) {
                                if (Array.isArray(obj)) {
                                    return obj.map(item => getValuesWithPropertyT(item)).flat();
                                } else if (typeof obj === 'object' && obj !== null) {
                                    let cp = c ? [obj.value, ...c] : [obj.value];
                                    if ('children' in obj) return obj.children.map(item => getValuesWithPropertyT(item, cp)).flat();
                                    i++;
                                    let newObj = {
                                        index: i,
                                        value: ivalues[obj.index][0][0],
                                        pc: Number(ivalues[obj.index][0][pcTotalIndex] == undefined ? 0 : ivalues[obj.index][0][pcTotalIndex].toString().replace(',', '.').replace("%", "")),
                                        valores: ivalues[obj.index][0],
                                        granTotal: dxComp.pivotGrid.grandTotal,
                                        pcTotalIndex: pcTotalIndex,
                                        obj: obj,
                                        key: cp.reverse(),
                                        field: dxComp.pivotGrid.getDataSource().field('total'),
                                    };
                                    total += newObj.pc
                                    newObj.pcSoma = total;
                                    newObj.pcSum = total > 100 ? 100 : total;
                                    newObj.calculo = (newObj.value / newObj.granTotal) * 100;
                                    return newObj;
                                }
                                return [];
                            }
                            let resultado = pcTotalIndex ? getValuesWithPropertyT(e.component.getDataSource().getData().rows) : {};
                            e.component.values = resultado;
                            resolve(resultado);
                        });
                        e.component.isRefreshValues = true;
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) e.component.updateDimensions();
                            });
                        }).observe(e.element[0]);
                    },
                    onContentReady: function (e) {
                        e.component.isRefreshValues = true;
                    },
                    onCellPrepared: async (e) => {
                        if (e.area === "data" && e.cell.columnType) {
                            if (e.cell.columnType === "GT") {
                                if (e.component.isRefreshValues) {
                                    e.component.isRefreshValues = false;
                                    e.component.waitLoad = e.component.LoadValues();
                                }
                                await e.component.waitLoad.then((a) => e.component.isRefreshValues = true);

                                const values = dxComp.pivotGrid.getDataSource()._descriptions.values;
                                if (e.cell.rowType === "D") {

                                    const acumulado = values.find(a => a.name === "pcAcumulado");
                                    const qtdeRegistros = values.find(a => a.name === "Sequencial");

                                    let valueFind = e.component.values.find(a => {
                                        if (a.key.every((elemento, indice) => elemento === e.cell.rowPath[indice])) return a
                                    });

                                    switch (e.cell.dataIndex) {
                                        case acumulado.areaIndex:
                                            const porcentagem = valueFind.pcSum.toFixed(2);
                                            e.cellElement.text(porcentagem.replace('.', ',') + '%');
                                            e.cellElement.addClass('percentage-cell');
                                            let newDiv = $('<div>').addClass('percentage-bar').css('width', `${porcentagem}%`);
                                            e.cellElement.append(newDiv);
                                            break;
                                        case qtdeRegistros.areaIndex:
                                            e.cellElement.text(valueFind.index);
                                            e.cellElement.addClass('alinhamento-cell-center');
                                            break;
                                    }
                                } else {
                                    if (e.cell.text === "NaN") e.cellElement.text("");
                                }

                                const qtdeRegistros = values.find(a => a.name === "qtdTotal");
                                if (e.cell.dataIndex == qtdeRegistros.areaIndex) {
                                    e.cellElement.addClass('alinhamento-cell-center');
                                }

                                const pcSobreTotal = values.find(a => a.name === "total");
                                if (e.cell.dataIndex == pcSobreTotal.areaIndex) {
                                    e.cellElement.addClass(['percentage-cell']);
                                }

                                const qtEstoque = values.find(a => a.name === "QT_ESTOQUE");
                                if (qtEstoque && e.cell.dataIndex == qtEstoque.areaIndex) {
                                    e.cellElement.addClass(['percentage-cell']);
                                }
                            }
                        }
                    },
                    onExporting(e) {
                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Vendas');

                        // Set page orientation to landscape
                        worksheet.pageSetup.orientation = 'landscape';
                        // Configurar ajuste de escala manualmente
                        //worksheet.pageSetup.fitToPage = true;
                        //worksheet.pageSetup.fitToHeight = 0; // Altura da página
                        worksheet.pageSetup.fitToWidth = 1; // Largura da página
                        worksheet.pageSetup.scale = 65;

                        worksheet.columns = [
                            { width: 30 }, { width: 50 }
                        ];

                        const values = e.component.getDataSource()._descriptions.values;
                        const acumulado = values.find(a => a.name === "pcAcumulado");
                        const qtdeRegistros = values.find(a => a.name === "Sequencial");
                        const total = values.find(a => a.name === "total");

                        let somaPorcentagem = 0;
                        let contagemItens = 0;

                        window.celulas = [];

                        DevExpress.excelExporter.exportPivotGrid({
                            component: e.component,
                            worksheet,
                            topLeftCell: { row: 4, column: 1 },
                            keepColumnWidths: false,
                            exportRowFieldHeaders: false,
                            exportColumnFieldHeaders: false,
                            exportDataFieldHeaders: false,
                            exportFilterFieldHeaders: false,
                            customizeCell(options) {
                                const { excelCell } = options;
                                const { pivotCell } = options;

                                window.celulas.push({ excelCell, pivotCell })
                                if (excelCell?.value?.toString().includes('%') && !Number.isNaN(Number(excelCell.value.replace('%', '').replace(',', '.')))) {
                                    excelCell.value = Number(excelCell.value.replace('%', '').replace(',', '.'));
                                }
                                if (pivotCell?.rowType == 'D' && pivotCell?.columnType == 'GT') {
                                    switch (pivotCell.dataIndex) {
                                        case total?.areaIndex:
                                            const porcentagem = Math.floor(Number(pivotCell.value.replace('%', '').replace(',', '.')) * 100) / 100;
                                            somaPorcentagem = somaPorcentagem >= 100 ? 100 : somaPorcentagem + porcentagem;
                                            break;
                                        case acumulado?.areaIndex:
                                            excelCell.value = Number(somaPorcentagem.toFixed(2));
                                            break;
                                        case qtdeRegistros?.areaIndex:
                                            contagemItens++;
                                            excelCell.value = contagemItens;
                                            break;
                                    }
                                }

                                if (isDataCell(pivotCell) || isTotalCell(pivotCell)) {
                                    const appearance = getConditionalAppearance(pivotCell);
                                    Object.assign(excelCell, getExcelCellFormat(appearance));
                                }

                                const borderStyle = { style: 'thin', color: { argb: 'FF7E7E7E' } };
                                excelCell.border = {
                                    bottom: borderStyle,
                                    left: borderStyle,
                                    right: borderStyle,
                                    top: borderStyle,
                                };
                            },
                        }).then(async (cellRange) => {

                            //Logotipo
                            const headerRowLogo = worksheet.getRow(1);
                            const imagePath = result.data[0].DS_CAMINHO_LOGO;
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
                                worksheet.mergeCells(1, 1, 2, 1);

                                worksheet.addImage(image, {
                                    //tl: { col: 0, row: 0 },
                                    //br: { col: 2, row: 1 },

                                    tl: { col: 0, row: 0 },
                                    ext: { width: width, height: height }
                                });
                            }

                            // Header
                            const headerRow = worksheet.getRow(1);
                            headerRow.height = 30;

                            const columnFromIndex = worksheet.views[0].xSplit + 1;
                            const columnToIndex = columnFromIndex + qtdeMesesSelecionados + 2;
                            worksheet.mergeCells(1, columnFromIndex, 1, columnToIndex);

                            const headerCell = headerRow.getCell(columnFromIndex);
                            headerCell.value = $('#labelTitulo').text();
                            headerCell.font = { name: 'Segoe UI Light', size: 22, bold: true };
                            headerCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

                            //Subtítulo
                            const headerRowSubTitulo = worksheet.getRow(2);
                            headerRowSubTitulo.height = 17;
                            worksheet.mergeCells(2, columnFromIndex, 2, columnToIndex);

                            const headerSubTituloCell = headerRowSubTitulo.getCell(columnFromIndex);
                            headerSubTituloCell.value = labelFiltros;
                            headerSubTituloCell.font = { name: 'Segoe UI Light', size: 12, bold: false };
                            headerSubTituloCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

                            // Footer
                            const footerRowIndex = cellRange.to.row + 2;
                            const footerCell = worksheet.getRow(footerRowIndex).getCell(cellRange.to.column);
                            footerCell.value = new Date();
                            footerCell.font = { color: { argb: 'BFBFBF' }, italic: true };
                            footerCell.alignment = { horizontal: 'right' };
                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Rel_Evolução_Venda.xlsx');
                            });
                        });
                        e.cancel = true;
                    },

                });
                let state = dxComp.lkp_selecao_visoes.option().selectedItem;
                carregarVisao(state);
            }

            setTimeout(expand, 0);
            atualizarGrafico();
            ajustaTamanhoGrid();
            verificaEstadoBotaoExibirGrafico();

            function isDataCell(cell) {
                return (cell.area === 'data' && cell.rowType === 'D' && cell.columnType === 'D');
            }
            function isTotalCell(cell) {
                return (cell.type === 'T' || cell.type === 'GT' || cell.rowType === 'T' || cell.rowType === 'GT' || cell.columnType === 'T' || cell.columnType === 'GT');
            }
            function getConditionalAppearance(cell) {
                if (isTotalCell(cell)) {
                    return { fill: 'F2F2F2', font: '3F3F3F', bold: true };
                }
                //if (cell.value < 20000) {
                //    return { font: '9C0006', fill: 'FFC7CE' };
                //}
                //if (cell.value > 50000) {
                //    return { font: '006100', fill: 'C6EFCE' };
                //}
                return { font: '3F3F3F', fill: 'FFFFFF' };
            }
            function getExcelCellFormat(appearance) {
                return {
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: appearance.fill } },
                    font: { color: { argb: appearance.font }, bold: appearance.bold },
                };
            }
            function getCssStyles(appearance) {
                return {
                    'background-color': `#${appearance.fill}`,
                    color: `#${appearance.font}`,
                    'font-weight': appearance.bold ? 'bold' : undefined,
                };
            }
            function expand() {
                const dataSource = dxComp.pivotGrid.getDataSource();
                dataSource.expandHeaderItem('row', [linhaExpandirInicializacao]);
                dataSource.expandHeaderItem('row', ['PRODUTOS DE CURVA B']);
                dataSource.expandHeaderItem('row', ['PRODUTOS DE CURVA C']);
                dataSource.expandHeaderItem('row', ['PRODUTOS DE CURVA D']);
            }
            function atualizarGrafico() {
                dxComp.pivotGrid.bindChart(pivotGridChart, {
                    dataFieldsDisplayMode: "splitPanes",
                    alternateDataFields: false,
                    customizeChart: function (chartOptions) {
                        //Configura apenas o gráfico do primeiro valor para ser visualizado.
                        chartOptions.panes = chartOptions.panes[0];
                        chartOptions.palette = paletaGrafico;
                    },
                    customizeSeries: function (seriesName, seriesOptions) {
                        seriesOptions.type = tipoGrafico;
                        return seriesOptions; // This line is optional
                    },
                    processCell: function (cellData) {

                        //Limita a quantidade de colunas do gráfico 
                        if (cellData.chartDataItem.val !== null && cellData.chartDataItem.series !== labelUltimaColunaPlotada && cellData.visible) {
                            //console.log(contadorColunas, cellData.visible, cellData.chartDataItem.series, " *** ", labelUltimaColunaPlotada);
                            contadorColunas = contadorColunas + 1;
                            labelUltimaColunaPlotada = cellData.chartDataItem.series;
                        }

                        //Se a quantidade limite de colunas for atingida, as demais colunas serão suprimidas do gráfico
                        //Se qtdeColunasGrafico não existirá limitação para quantidade de colunas
                        if (contadorColunas > qtdeColunasGrafico && qtdeColunasGrafico !== 0) {
                            cellData.visible = false;
                        }
                        return cellData; // This line is optional
                    },
                });
            }
            function ajustaTamanhoGrid(value) {
                const pageHeight = window.innerHeight;

                console.log("AJUSTA TAMANHO DO GRID: ", pageHeight);

                var heightPivotGrid = pageHeight - comprimentoAdicionalPadrao;

                if (value !== null && value !== undefined)
                    heightPivotGrid = heightPivotGrid + value;

                heightPivotGrid = heightPivotGrid < comprimentoAdicionalPadrao ? comprimentoAdicionalPadrao : heightPivotGrid;

                dxComp.pivotGrid.option("height", heightPivotGrid);
            }
            function exibirGrafico() {

                //ExibirEsconderPaineis('cardGrafico', 'block')
                $('#cardGrafico').slideDown();
                //$('#btn_Exibir_Grafico').dxButton('instance').option('visible', false);
                dxComp.btn_Exibir_Grafico.option('visible', false);

                if (dxComp.lkp_Dimensao_Grid.option('value') <= 0) {
                    setTimeout(function () {
                        ajustaTamanhoGrid();
                    }, 1);
                }

                pivotGridChart.render();
            }
            function fecharGrafico() {
                //ExibirEsconderPaineis('cardGrafico', 'none')
                $('#cardGrafico').slideUp();
                //$('#btn_Exibir_Grafico').dxButton('instance').option('visible', true);
                dxComp.btn_Exibir_Grafico.option('visible', true);

                //console.log('TOLLBAR: ', toolbar);

                if (dxComp.lkp_Dimensao_Grid.option('value') <= 0) {
                    setTimeout(function () {
                        ajustaTamanhoGrid(comprimentoAdicionalSemGrafico);
                    }, 1);
                }
            }
            function verificaEstadoBotaoExibirGrafico() {

                if (document.getElementById('cardGrafico').style.display === "none") {
                    //$('#btn_Exibir_Grafico').dxButton('instance').option('visible', true);
                    dxComp.btn_Exibir_Grafico.option('visible', true);

                    if ($('#lkp_Dimensao_Grid').dxLookup('instance').option('value') <= 0) {
                        setTimeout(function () {
                            ajustaTamanhoGrid(comprimentoAdicionalSemGrafico);
                        }, 1);
                    }
                }
            }
        }
        else {
            //loadPanel.hide();

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
        loadPanel.hide();

    });

    rolar_topo();
}

async function abrirVisao() {

    //Relação de Visões Gravadas no Sistema
    await getDataVisoes.promise.then((result) => {

        loadPanel.show();

        if (result.success) {

            dxComp.gridVisoes = new DevExpress.ui.dxDataGrid('#gridVisoes', {
                //dataSource: result.data,
                dataSource: new DevExpress.data.DataSource({
                    store: {
                        type: 'array',
                        key: 'CD_CRM',
                        data: getDataVisoes.result.data,
                    }
                }),
                //scrolling: { mode: 'virtual' },
                //scrolling: {
                //    columnRenderingMode: 'virtual',
                //},
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                focusedRowEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                editing: {
                    allowUpdating: true,
                    useIcons: true,
                },
                sorting: {
                    mode: "multiple"
                },
                selection: {
                    mode: 'single',
                    //showCheckBoxesMode: 'always',
                },
                //allowColumnResizing: false,
                //columnResizingMode: "widget",
                //allowColumnReordering: false,
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar"
                },
                //paging: {
                //    enabled: false,
                //},

                //grouping: {
                //    contextMenuEnabled: true,
                //    expandMode: 'rowClick',
                //},
                paging: {
                    pageSize: 15
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [15, 20, 50],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Visões');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], {
                                type: 'application/octet-stream'
                            }), 'Visões_CRM.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: {
                    visible: true
                },
                columnChooser: {
                    enabled: false,
                    allowSearch: true,
                },
                columnsAutoWidth: true,
                columns: [
                    //{
                    //    type: "selection",
                    //    width: 90,
                    //},
                    {
                        dataField: "CD_CRM",
                        caption: "Código",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowGrouping: true,
                        visible: false,
                    },
                    {
                        dataField: "DS_CRM",
                        caption: "Visão",
                        //width: 200,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowGrouping: true,
                        editorOptions: {
                            maxLength: 60,
                        },
                    },
                    {
                        dataField: "CD_LOGIN_ALTERACAO",
                        caption: "Última Alteração por",
                        //width: 150,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DT_ULTIMA_ALTERACAO",
                        caption: "Data Alteração",
                        //width: 150,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        dataType: "date",
                        format: 'dd/MM/yyyy HH:mm',
                        cssClass: "column-data-grid",
                    },
                ],
                onCellPrepared: (e) => {
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    }
                },
                onRowUpdating: (e) => {
                    const crm = new CRM;
                    crm.Ds_CRM = e.newData.DS_CRM;
                    crm.Cd_CRM = e.oldData.CD_CRM;
                    e.cancel = Promise.resolve(crm.UpdateDescricao())
                        .then(async (result) => {
                            e.newData = result.data.find(a => a.CD_CRM === e.oldData.CD_CRM)
                            getDataVisoes.get();
                            await getDataVisoes.promise.then((response) => {
                                dxComp.lkp_selecao_visoes.getDataSource().store()._array = response.data;
                                dxComp.lkp_selecao_visoes.getDataSource().load();
                                dxComp.lkp_selecao_visoes.option('value', null);
                                dxComp.lkp_selecao_visoes.option('value', e.oldData.CD_CRM);
                                $('#labelTitulo').fadeOut(500, function () {
                                    $(this).text(e.newData.DS_CRM).fadeIn(500);
                                })
                            });
                            PNotify.messages.success("Descrição alterada", `A descrição "${e.oldData.DS_CRM}", foi alterada para "${crm.Ds_CRM}" com sucesso`);
                            return false;
                        })
                        .catch((error) => {
                            PNotify.messages.error("Erro na alteração da descrição", `A descrição "${e.oldData.DS_CRM}" não foi alterada, segue mensagem do servidor: \n${error.responseJSON.msg}`);
                            console.error('Erro alteração de descrição da visão\n', error);
                            return true;
                        });
                },
                onRowDblClick: function (e) {
                    if (e.rowType === "data") this.abreVisao();
                },
                onInitialized: (e) => {
                    e.component.abreVisao = () => {
                        let selected = e.component.getSelectedRowsData();
                        if (selected.length < 1) {
                            PNotify.messages.notice("Faltando selecão", "Selecione um item do grid para continuar");
                            return;
                        };
                        visaoObjConsulta = selected[0];
                        dxComp.lkp_selecao_visoes.option('value', visaoObjConsulta.CD_CRM);
                        carregarVisao(visaoObjConsulta);
                    }
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) e.component.updateDimensions();
                        });
                    }).observe(e.element[0]);
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            options: {
                                icon: 'hierarchy',
                                text: '',
                                hint: 'Fechar ou expandir os agrupamentos',
                                onClick(e) {
                                    const dataGrid = dxComp.gridVisoes;

                                    const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                    dataGrid.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? '' : 'Expandir Agrupamento');
                                },
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
                        'exportButton',
                        'searchPanel',
                    ],
                },

            });

            loadPanel.hide();

            AbrirModal('#ModalAbrirVisao');
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
}

function carregarVisao(visaoObjConsulta) {
    if (!visaoObjConsulta) return;
    $('#ModalAbrirVisao').modal('hide');
    $('#labelTitulo').fadeOut(500, function () {
        $(this).text(visaoObjConsulta.DS_CRM).fadeIn(500);
    })
    if (visaoObjConsulta.DS_STORAGEKEY.length > 0) {
        dxComp.pivotGrid.getDataSource().state(JSON.parse(visaoObjConsulta.DS_STORAGEKEY));
    }
    else {
        dxComp.pivotGrid.getDataSource().state(null);
    }
    dxComp.lkp_Ordem_Meses.option('value', visaoObjConsulta.NR_ORDEM_MESES);
    dxComp.lkp_Dimensao_Grid.option('value', visaoObjConsulta.NR_ALTURA_GRID);
    dxComp.lkp_Tipos_Graficos.option('value', visaoObjConsulta.CD_TIPO_GRAFICO);
    dxComp.lkp_Paleta_Grafico.option('value', visaoObjConsulta.CD_PALETA_GRAFICO);
    dxComp.lkp_Colunas_Grafico.option('value', visaoObjConsulta.QT_COLUNAS_GRAFICO);
    dxComp.chk_Totais_Primeira_Linha.option('value', visaoObjConsulta.LG_TOTAIS_PRIMEIRA_LINHA);
    dxComp.chk_Valores_Em_Linhas.option('value', visaoObjConsulta.LG_VALORES_EM_LINHAS);
    dxComp.chk_Niveis_Formato_Cascata.option('value', visaoObjConsulta.LG_NIVEIS_FORMATO_CASCATA);
    if (visaoObjConsulta.LG_EXIBIR_GRAFICO && dxComp.btn_Exibir_Grafico.option('visible'))
        dxComp.btn_Exibir_Grafico._clickAction();
    PNotify.messages.success("Visão carregada", `Sua visão "${visaoObjConsulta.DS_CRM}", foi carregada com sucesso`);
}

function limparFiltros() {
    dxComp.dt_Inicial.option('value', null);
    dxComp.dt_Final.option('value', null);
    dxComp.lkp_Filiais.option('value', null);
    dxComp.lkp_Familias.option('value', null);
    dxComp.lkp_Fornecedores.option('value', null);
    dxComp.lkp_Ramos_Atividades.option('value', null);
    dxComp.lkp_Categorias_Clientes.option('value', null);
    dxComp.lkp_Tabelas_Precos.option('value', null);
    dxComp.chk_Incluir_Conta_Corrente.option('value', true);
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

        xhr.send();
    });
}

async function AbrirModalFullScreen() {

    await getDataVisoes.promise.then(result => {

        let abc = result.data.find(b => b.CD_CRM == 4 || b.DS_CRM == 'CURVA ABC DE PRODUTOS');

        dxComp.lkp_selecao_visoes.option({
            dataSource: new DevExpress.data.DataSource({
                store: new DevExpress.data.ArrayStore({
                    key: 'CD_CRM',
                    data: getDataVisoes.result.data,
                    paginate: true,
                }),
            }),
            valueExpr: 'CD_CRM',
            value: typeof abc === 'undefined' ? result.data[0].CD_CRM : abc.CD_CRM,
        });

        $('#ModalTelaCheia').modal('toggle');
        //$('#ModalSalvarVisao').modal('toggle');

    });
}

//Função para deixar a tela em modo full screen
function requestFullScreen() {

    var el = document.body;

    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
        || el.mozRequestFullScreen || el.msRequestFullScreen;

    if (requestMethod) {

        // Native full screen.
        requestMethod.call(el);

    } else if (typeof window.ActiveXObject !== "undefined") {

        // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");

        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }

    overflow: scroll;

    tamanhoInicialGrid = -1;
    comprimentoAdicionalPadrao = comprimentoAdicionalInicial;

}

function desligaFullScreen() {
    // Sai do modo de tela cheia
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function alternaFullScreen() {
    // Verifica se a página está em modo de tela cheia
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        // Sai do modo de tela cheia
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        // Entra no modo de tela cheia no elemento desejado, por exemplo, o corpo da página
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
}

function InativaCRM() {
    $modal = $('#ModalConfirmacaoExclusaoVisao').data('bs.modal');

    let crm = new CRM
    crm.UpdateStatus(dxComp.lkp_selecao_visoes.option().value, false)
        .done((result) => {
            PNotify.messages.success("Visão removida", `A visão "${result.data.Ds_CRM}" foi removida com sucesso`);
            dxComp.btn_Incluir_Visao._clickAction();
            getDataVisoes.get();
            $modal.hide();
        })
        .catch((error) => {
            PNotify.messages.error("Erro remover visão", `Ao tentar remover a visão, o servidor retornou a seguinte mensagem: \n${error.responseJSON.msg}`);
            console.error('UpdateStatus', error);
        });
}

function CreateUpdateCRM(operacao = "create") {
    let selectedItem = dxComp.lkp_selecao_visoes.option().selectedItem;
    let crm = new CRM
    crm.Ds_CRM = selectedItem == null ? null : selectedItem.DS_CRM;
    crm.Cd_CRM = selectedItem == null ? null : selectedItem.CD_CRM;

    if (operacao == "create") {
        dxComp.txt_Nome_Visao.validationRequest.fire();
        if (!dxComp.txt_Nome_Visao.option().isValid) return;
        crm.Ds_CRM = dxComp.txt_Nome_Visao.option().value;
    }

    crm.Ds_StorageKey = JSON.stringify(CurrentState);
    crm.Nr_Ordem_Meses = dxComp.lkp_Ordem_Meses.option().value;
    crm.Nr_Altura_Grid = dxComp.lkp_Dimensao_Grid.option().value;
    crm.Cd_Tipo_Grafico = dxComp.lkp_Tipos_Graficos.option().value;
    crm.Cd_Paleta_Grafico = dxComp.lkp_Paleta_Grafico.option().value;
    crm.Qt_Colunas_Grafico = dxComp.lkp_Colunas_Grafico.option().value;
    crm.Lg_Totais_Primeira_Linha = dxComp.chk_Totais_Primeira_Linha.option().value;
    crm.Lg_Valores_Em_Linhas = dxComp.chk_Valores_Em_Linhas.option().value;
    crm.Lg_Niveis_Formato_Cascata = dxComp.chk_Niveis_Formato_Cascata.option().value;
    crm.Lg_Exibir_Grafico = !dxComp.btn_Exibir_Grafico.option('visible');
    crm.CreateUpdate(operacao)
        .done(async (result) => {
            $modal = $('#ModalSalvarVisao').data('bs.modal');
            $('#labelTitulo').fadeOut(500, function () {
                $(this).text(crm.Ds_CRM).fadeIn(500);
            })
            getDataVisoes.get();
            await getDataVisoes.promise.then((response) => {
                dxComp.lkp_selecao_visoes.getDataSource().store()._array = response.data;
                dxComp.lkp_selecao_visoes.getDataSource().load();
                dxComp.lkp_selecao_visoes.option('value', result.data.Cd_CRM);
            });
            if (operacao == "create") {
                PNotify.messages.success("Visão criada", `Nova visão: "${crm.Ds_CRM}", criada com sucesso`);
                dxComp.txt_Nome_Visao.option({
                    value: null,
                    validationStatus: "valid"
                });
            } else {
                PNotify.messages.success("Visão modificada", `A visão: "${crm.Ds_CRM}", foi modificada com sucesso`);
            }
            if ($modal) $modal.hide();
        })
        .catch((error) => {
            if (operacao == "create") {
                PNotify.messages.error("Erro ao criar visão", `Ao tentar criar a visão "${crm.Ds_CRM}", o servidor retornou a seguinte mensagem: \n${error.responseJSON.msg}`);
            } else {
                PNotify.messages.error("Erro ao modificar visão", `Ao tentar modificar a visão "${crm.Ds_CRM}", o servidor retornou a seguinte mensagem: \n${error.responseJSON.msg}`);
            }
        });
}

async function AtualizarDados() {
    loadPanel.option({
        message: 'Atualizando dados...'
    })
    loadPanel.show();
    let $icon = $('#iconAtualizarDados');
    $icon.addClass('fa-spin');
    parameters.get();
    $.ajax({
        type: 'PUT',
        url: '/Vendas/RelEvolucaoVendas/RefreshDataSource',
        data: { timeOut: 0 },
        success: (result) => {
            $icon.removeClass('fa-spin');
            loadPanel.option({
                message: 'Carregando...'
            })
            PNotify.messages.success("Dados Atualizados", "Atualização concluída, os novos dados serão aplicados");
            $icon.removeClass('fa-spin');
            $('#labelDataProcessamento').text(`${moment(result).format('DD/MM/YYYY HH:mm')}`);
            validaCampos();
        },
        error: (jqXHR, textStatus, errorThrown) => {
            PNotify.messages.error("Erro na Atualização dos dados", `Ao tentar atualizar os dados, o servidor retornou a seguinte mensagem: \n${textStatus} - ${errorThrown}`);
        }
    }).always(async () => {
        await parameters.promise.then(() => {
            let [max, min] = parameters.result.data.minMaxFromData.map(a => moment(a, 'YYYYMM').toDate());
            dxComp.dt_Inicial.option({
                min: moment(min).isValid() ? moment(min).startOf('month').valueOf() : moment().add(-parameters.result.data.maxMeses, 'month').startOf('month').valueOf(),
            });
        });
        loadPanel.hide();
    });
}

class CRM {
    Cd_Empresa
    Cd_CRM;
    Ds_CRM;
    Ds_StorageKey;
    IsActive;
    Cd_Login_Alteracao;
    DataUltimaAlteracao;
    Cd_Login_Inativacao;
    DataInativacao;
    Nr_Ordem_Meses;
    Nr_Altura_Grid;
    Cd_Tipo_Grafico;
    Cd_Paleta_Grafico;
    Qt_Colunas_Grafico;
    Lg_Totais_Primeira_Linha;
    Lg_Valores_Em_Linhas;
    Lg_Niveis_Formato_Cascata;
    Lg_Exibir_Grafico;

    KeyValue = () => Object.entries(this).map(a => {
        if (typeof (a[1]) != 'function') return a;
    }).filter(a => a != undefined);

    CreateUpdate = (operacao = "create") => {
        let objCRM = this.KeyValue();
        let noValue = [];

        objCRM.forEach(a => {
            if (!['Cd_Empresa', 'Cd_CRM', 'Cd_Login_Inativacao', 'DataInativacao', 'IsActive', 'Cd_Login_Alteracao', 'DataUltimaAlteracao'].includes(a[0])) {
                if (a[1] === undefined) noValue.push(a[0])
            }
        })

        if (noValue.length > 0) {
            console.error('Faltando valores para salvar o CRM', noValue);
            return;
        }

        this.CreateUpdate.promise = $.ajax({
            type: operacao == 'create' ? 'POST' : 'PUT',
            url: `/Vendas/RelEvolucaoVendas/${operacao == 'create' ? 'CreateCRM' : `UpdateCRM/${this.Cd_CRM}`}`,
            data: {
                crmRequest: {
                    Cd_Empresa: null,
                    Cd_CRM: -1,
                    Ds_CRM: this.Ds_CRM,
                    Ds_StorageKey: this.Ds_StorageKey,
                    IsActive: true,
                    Cd_Login_Alteracao: null,
                    DataUltimaAlteracao: null,
                    Cd_Login_Inativacao: null,
                    DataInativacao: null,
                    Nr_Ordem_Meses: this.Nr_Ordem_Meses,
                    Nr_Altura_Grid: this.Nr_Altura_Grid,
                    Cd_Tipo_Grafico: this.Cd_Tipo_Grafico,
                    Cd_Paleta_Grafico: this.Cd_Paleta_Grafico,
                    Qt_Colunas_Grafico: this.Qt_Colunas_Grafico,
                    Lg_Totais_Primeira_Linha: this.Lg_Totais_Primeira_Linha,
                    Lg_Valores_Em_Linhas: this.Lg_Valores_Em_Linhas,
                    Lg_Niveis_Formato_Cascata: this.Lg_Niveis_Formato_Cascata,
                    Lg_Exibir_Grafico: this.Lg_Exibir_Grafico,
                },
            },
        });
        return this.CreateUpdate.promise;
    }

    UpdateStatus = (codigo = null, status = null) => {
        this.Cd_CRM = codigo;
        this.IsActive = status;
        if ([this.Cd_CRM, this.IsActive].some(a => [null, undefined, ''].includes(a))) {
            console.error('Faltando valores para alterar o status do CRM', [this.Cd_CRM, this.IsActive]);
            return;
        }
        this.UpdateStatus.promise = $.ajax({
            type: 'PUT',
            url: "/Vendas/RelEvolucaoVendas/UpdateStatusCRM",
            data: {
                cdCRM: this.Cd_CRM,
                isActive: this.IsActive
            },
        });
        return this.UpdateStatus.promise;
    }

    SaveAs = () => {
        if ([this.Cd_CRM, this.Ds_CRM].some(a => [null, undefined, ''].includes(a))) {
            const msg = {
                message: 'Faltando valores para salvar o CRM',
                data: [this.Cd_CRM, this.Ds_CRM],
            };
            console.error(msg);
            return new Error(JSON.stringify(msg));
        }
        this.SaveAs.promise = $.ajax({
            type: 'PUT',
            url: "/Vendas/RelEvolucaoVendas/SaveAsCRM",
            data: {
                crmPadrao: this.Cd_CRM,
                descricao: this.Ds_CRM
            },
            success: (result) => {

            },
        });
        return this.SaveAs.promise;
    }

    UpdateDescricao = () => {
        if ([this.Cd_CRM, this.Ds_CRM].some(a => [null, undefined, ''].includes(a))) {
            const msg = {
                message: 'Faltando valores para atualizar a descrição do CRM',
                data: [this.Cd_CRM, this.Ds_CRM],
            };
            console.error(msg);
            return new Error(JSON.stringify(msg));
        }
        this.UpdateDescricao.promise = $.ajax({
            type: 'PUT',
            url: "/Vendas/RelEvolucaoVendas/UpdateDescricaoCRM",
            data: {
                cdCRM: this.Cd_CRM,
                descricao: this.Ds_CRM
            },
            success: (result) => {

            },
        });
        return this.UpdateDescricao.promise;
    }
}


$(function () {
    // Códigos jQuery a serem executados quando a página carregar e correndo o risco de conflitar com outras bibliotecas JavaScript
    AbrirModalFullScreen();
});
