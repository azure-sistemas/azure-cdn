$(() => {

    FormatButtons();

    //Crid de Contas Correntes cadastradas e atribuídas a filiais que o usuário possui acesso
    GetAzureDataSource(43).then((result) => {

        if (result.success) {

            $("#gridContasCorrentes").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: false,
                rowAlternationEnabled: false,
                wordWrapEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                //selection: {
                //    mode: 'multiple',
                //    allowSelectAll: false,
                //    showCheckBoxesMode: 'always',
                //    deferred: false,
                //},
                allowColumnResizing: true,
                columnsAutoWidth: true,
                cellHintEnabled: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 50,
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: false,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Contas');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ContasBancárias.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: {
                    visible: true,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: 'CD_CHAVE',
                columns: [
                    //{
                    //    type: "selection",
                    //    dataField: "CD_SELECAO",
                    //    width: 30,
                    //    value: false,
                    //    allowHiding: false,
                    //},

                    {
                        dataField: 'DS_BANCO_LOGO',
                        caption: null,
                        width: 60,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        cellTemplate: function (e, x) {

                            e.append(`<figure class="mb-0">
                                          <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                      </figure>`);

                        },
                    },
                    {
                        dataField: "DS_BANCO_CODIGO_NOME",
                        caption: "Banco",
                        width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //allowHiding: false,
                        visible: true,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "CD_BANCO",
                        caption: "Código Banco",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_AGENCIA",
                        caption: "Agência",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        allowHiding: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_CONTA_COM_DIGITO",
                        caption: "Conta",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_CONTA_CORRENTE",
                        caption: "Conta",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_CONTA_CORRENTE",
                        caption: "Nome da Conta",
                        //width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_STATUS",
                        caption: "Status",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "NR_CARTEIRA",
                        caption: "Carteira",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    //{
                    //    dataField: "DT_ULTIMA_CONCILIACAO",
                    //    caption: "Última Conciliação",
                    //    width: 100,
                    //    dataType: "date",
                    //    format: "dd/MM/yyyy",
                    //    allowEditing: false,
                    //    allowSorting: true,
                    //    allowHeaderFiltering: true,
                    //    visible: true,
                    //    alignment: 'center',
                    //    cssClass: "column-data-grid",
                    //},
                    //{
                    //    dataField: "CD_LOGIN_ULTIMA_CONCILIACAO",
                    //    caption: "Usuário Conciliação",
                    //    width: 100,
                    //    allowEditing: false,
                    //    allowSorting: true,
                    //    allowHeaderFiltering: true,
                    //    alignment: 'center',
                    //    cssClass: "column-data-grid",
                    //},
                    {
                        dataField: "DS_IMAGEM_EDITAR_CONTA",
                        caption: "Editar",
                        width: 60,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        allowFiltering: false,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        cellTemplate: $('#imgGridEditarConta'),
                    },
                ],

                //summary: {
                //    totalItems: [{
                //        column: 'NR_NOTA_FISCAL',
                //        summaryType: 'count',
                //        displayFormat: "{0} Notas",
                //    },],
                //},

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                    };
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    };
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'plus',
                                text: 'Nova Conta',
                                hint: 'Cadastrar uma nova conta bancária',
                                type: 'success',
                                onClick() {
                                    editarContaCorrente();
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
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Grid de Agências Bancárias cadastradas 
    GetAzureDataSource(57).then((result) => {

        if (result.success) {

            $("#gridAgencias").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: false,
                rowAlternationEnabled: false,
                wordWrapEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                //selection: {
                //    mode: 'multiple',
                //    allowSelectAll: false,
                //    showCheckBoxesMode: 'always',
                //    deferred: false,
                //},
                allowColumnResizing: true,
                columnsAutoWidth: true,
                cellHintEnabled: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 50,
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: false,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Agencias');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'AgênciasBancárias.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: {
                    visible: true,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: 'CD_CHAVE',
                columns: [
                    //{
                    //    type: "selection",
                    //    dataField: "CD_SELECAO",
                    //    width: 30,
                    //    value: false,
                    //    allowHiding: false,
                    //},

                    {
                        dataField: 'DS_BANCO_LOGO',
                        caption: null,
                        width: 60,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        cellTemplate: function (e, x) {

                            e.append(`<figure class="mb-0">
                                          <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                      </figure>`);

                        },
                    },
                    {
                        dataField: "DS_BANCO_CODIGO_NOME",
                        caption: "Banco",
                        width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //allowHiding: false,
                        visible: true,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "CD_BANCO",
                        caption: "Código Banco",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_AGENCIA",
                        caption: "Agência",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        allowHiding: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_AGENCIA",
                        caption: "Nome da Agência",
                        //width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_STATUS_AGENCIA",
                        caption: "Status",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_IMAGEM_EDITAR_AGENCIA",
                        caption: "Editar",
                        width: 60,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        allowFiltering: false,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        cellTemplate: $('#imgGridEditarAgencia'),
                    },
                ],

                //summary: {
                //    totalItems: [{
                //        column: 'NR_NOTA_FISCAL',
                //        summaryType: 'count',
                //        displayFormat: "{0} Notas",
                //    },],
                //},

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS_AGENCIA") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                    };
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    };
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'plus',
                                text: 'Nova Agência',
                                hint: 'Cadastrar uma nova agência bancária',
                                type: 'success',
                                onClick() {
                                    editarAgencia();
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
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Grid de Bancos cadastradas 
    GetAzureDataSource(61).then((result) => {

        if (result.success) {

            $("#gridBancos").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: false,
                rowAlternationEnabled: false,
                wordWrapEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                //selection: {
                //    mode: 'multiple',
                //    allowSelectAll: false,
                //    showCheckBoxesMode: 'always',
                //    deferred: false,
                //},
                allowColumnResizing: true,
                columnsAutoWidth: true,
                cellHintEnabled: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 50,
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: false,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Bancos');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Bancos.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: {
                    visible: true,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: 'CD_BANCO',
                columns: [
                    //{
                    //    type: "selection",
                    //    dataField: "CD_SELECAO",
                    //    width: 30,
                    //    value: false,
                    //    allowHiding: false,
                    //},

                    {
                        dataField: 'DS_BANCO_LOGO',
                        caption: null,
                        width: 60,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        cellTemplate: function (e, x) {

                            e.append(`<figure class="mb-0">
                                          <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                      </figure>`);

                        },
                    },
                    {
                        dataField: "DS_PESQUISA",
                        caption: "Banco",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //allowHiding: false,
                        visible: true,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "CD_BANCO",
                        caption: "Código Banco",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_BANCO",
                        caption: "Nome do Banco",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'left',
                        allowHeaderFiltering: true,
                        allowHiding: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_IMAGEM_EDITAR_BANCO",
                        caption: "Editar",
                        width: 60,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        allowFiltering: false,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        cellTemplate: $('#imgGridEditarBanco'),
                    },
                ],

                //summary: {
                //    totalItems: [{
                //        column: 'NR_NOTA_FISCAL',
                //        summaryType: 'count',
                //        displayFormat: "{0} Notas",
                //    },],
                //},

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS_BANCO") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                    };
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    };
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'plus',
                                text: 'Novo Banco',
                                hint: 'Cadastrar uma nova instituição bancária',
                                type: 'success',
                                onClick() {
                                    editarBanco();
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
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Lookup Bancos - Instituições Bancárias
    GetAzureDataSource(61).then((result) => {

        if (result.success) {

            function getTemplateFoto(data, containerClass) {

                let logoAtual = data.DS_BANCO_LOGO + '?' + new Date().getTime();

                return `<div class='${containerClass}'><img style="width: 35px; height: 35px" src='${logoAtual}' /><div> ${data.DS_PESQUISA}</div></div>`;
            }

            lkpAgenciasBancarias = $('#lkp_Bancos').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_BANCO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Bancos',
                },
                labelMode: 'floating',
                label: 'Banco *',
                placeholder: 'Clique para selecionar um banco',
                showClearButton: true,
                itemTemplate(data) {
                    return getTemplateFoto(data, 'custom-item');

                },
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Banco Obrigatório', }], validationGroup: 'Agencia' }).dxLookup('instance');

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

    //Lookup Agências Bancárias
    GetAzureDataSource(57, '{ CD_STATUS_BANCO: "A", CD_STATUS_AGENCIA: "A" }').then((result) => {

        if (result.success) {

            function getTemplateFoto(data, containerClass) {

                let logoAtual = data.DS_BANCO_LOGO + '?' + new Date().getTime();

                return `<div class='${containerClass}'><img style="width: 35px; height: 35px" src='${logoAtual}' /><div> ${data.DS_PESQUISA}</div></div>`;
            }

            lkpAgenciasBancarias = $('#lkp_Agencias_Bancarias').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_CHAVE',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Agências',
                },
                labelMode: 'floating',
                label: 'Banco/Agência *',
                placeholder: 'Clique para selecionar uma agência',
                showClearButton: true,
                itemTemplate(data) {
                    return getTemplateFoto(data, 'custom-item');

                },
            }).dxValidator({ validationRules: [{ type: 'required', message: 'Banco/Agência Obrigatórios', }], validationGroup: 'Conta' }).dxLookup('instance');

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

    //Formas de Pagamento
    GetAzureDataSource(58, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            lkpFormaPagamentoPix = $('#lkp_Forma_Pagamento_Pix').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_FORMA_PAGAMENTO'],
                displayExpr: 'DS_FORMA_PAGAMENTO',
                valueExpr: 'CD_FORMA_PAGAMENTO',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Formas de Pagamento',
                },
                //labelMode: 'floating',
                //label: 'Forma de Pagamento PIX para esta conta',
                placeholder: 'Forma de Pagamento PIX para esta conta',
                showClearButton: true,
            }).dxLookup('instance');

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

    //Consulta Municípios
    GetAzureDataSource(14).then((result) => {

        if (!result.success) {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }

        dataSourceMunicipios = result.data;

        $('#lkp_Ds_Municipio_Beneficiario_Pix').dxLookup({
            dataSource: result.data,
            searchExpr: ['DS_MUNICIPIO_UF'],
            displayExpr: 'DS_MUNICIPIO_UF',
            valueExpr: 'CD_MUNICIPIO',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Município',
            },
            labelMode: 'floating',
            label: 'Município do Beneficiário',
            placeholder: '',
            showClearButton: true,
        });
    });

    //Filiais que o usuário possui acesso
    GetAzureDataSource(33, '{CD_STATUS: "A"}').then((result) => {

        if (result.success) {

            $('#tag_Filiais_Conta').dxTagBox({
                dataSource: result.data,
                searchEnabled: true,
                searchExpr: ['DS_PESQUISA'],
                cleanSearchOnOpening: true,
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_FILIAL',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Filiais que vão utilizar esta conta',
                },
                labelMode: 'floating',
                label: 'Filiais que vão utilizar esta conta',
                placeholder: '',
                showClearButton: true,
                //applyValueMode: 'useButtons',
                applyValueMode: 'instantly',
                showSelectionControls: true,
                //value: [1,2,3]
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

    //Mensagens Padrão
    var dataSourceMensagemPadrao;
    GetAzureDataSource(60, '{CD_STATUS: "A", CD_IDENTIFICACAO: 2}').then((result) => {
        if (result.success) {
            dataSourceMensagemPadrao = result.data;
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

    //Instruções de protesto para Emissão de Boletos de Cobrança
    GetAzureDataSource(59, '{ CD_BANCO: 237, CD_AGENCIA: "136", CD_CONTA: "126055" }').then((result) => {

        if (result.success) {
            const gridInstrucoesBoleto = $("#grid_Instrucoes_Boleto").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                columnsAutoWidth: true,
                allowColumnResizing: true,
                allowColumnReordering: true,

                editing: {
                    mode: 'popup',
                    allowUpdating: true,
                    startEditAction: 'dblClick',
                    allowAdding: true,
                    allowDeleting: true,
                    useIcons: true,

                    popup: {
                        //title: 'Cadastro de Instruções para Boleto',
                        showTitle: true,
                        titleTemplate: function (element) {
                            const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Cadastro de Instruções para Boleto");
                            element.append($title);
                        },
                        maxWidth: 900,
                        maxHeight: 650,
                        onShown: obj => {
                            //dá o foco na instância da coluna marcada nos itens
                            widgetInstancet.focus();
                        },
                    },

                    form: {
                        labelMode: 'floating',
                        items: [
                            {
                                itemType: 'group',
                                colCount: 8,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "NR_SEQUENCIA",
                                        validationRules: [
                                            {
                                                type: 'readOnly',
                                            },
                                        ],
                                        editorOptions: {
                                            label: "Sequência",
                                        },
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_INSTRUCAO",
                                        editorOptions: {
                                            maxLength: 60,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                caption: 'Juros e multa imediatas após o vencimento',
                                items: [
                                    {
                                        dataField: "PC_JUROS_DIA",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "% Juros Diário após vencimento",
                                            maxLength: 7,
                                            format: "###,###,###,###,##0.00",
                                            min: 0,
                                        },
                                    },
                                    {
                                        dataField: "PC_JUROS_MES",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "% Juros Mensal após vencimento",
                                            maxLength: 7,
                                            format: "###,###,###,###,##0.00",
                                            min: 0,
                                        },
                                    },
                                    {
                                        dataField: "PC_MULTA_FIXA",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "% Multa Fixa após vencimento",
                                            maxLength: 7,
                                            format: "###,###,###,###,##0.00",
                                            min: 0,
                                        },
                                    },
                                ],
                            },

                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                caption: 'Multa condicionada a dias de vencimento',
                                items: [
                                    {
                                        dataField: "QT_DIAS_APOS_VENCIMENTO",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "Dias de vencto. para aplicação da multa",
                                            maxLength: 7,
                                            format: "###,###,###,###,###",
                                            min: 0,
                                        },
                                    },
                                    {
                                        dataField: "PC_MULTA_APOS_VENCIMENTO",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "% Multa após quantidade de dias vencido",
                                            maxLength: 7,
                                            format: "###,###,###,###,##0.00",
                                            min: 0,
                                        },
                                    },
                                ],
                            },

                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                caption: 'Aplicação de Descontos',
                                items: [
                                    {
                                        dataField: "QT_DIAS_DESCONTO_ANTECIPADO",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "Dias de pagto. antecipado para Desconto",
                                            maxLength: 7,
                                            format: "###,###,###,###,###",
                                            min: 0,
                                        },
                                    },
                                    {
                                        dataField: "PC_DESCONTO_DIA",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "% Desconto ao Dia",
                                            maxLength: 7,
                                            format: "###,###,###,###,##0.00",
                                            min: 0,
                                        },
                                    },
                                    {
                                        dataField: "PC_DESCONTO_FIXO",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "% Desconto Fixo",
                                            maxLength: 7,
                                            format: "###,###,###,###,##0.00",
                                            min: 0,
                                        },
                                    },
                                ],
                            },

                            {
                                itemType: 'group',
                                colCount: 3,
                                colSpan: 2,
                                caption: "Datas Limites após Vencimento e Mensagem Padrão",
                                items: [
                                    {
                                        dataField: "QT_DIAS_PROTESTO",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "Limite de dias de atraso para Protestar",
                                            maxLength: 7,
                                            format: "###,###,###,###,###",
                                            min: 0,
                                        },
                                    },
                                    {
                                        dataField: "QT_DIAS_LIMITE_PAGAMENTO",
                                        editorType: 'dxNumberBox',
                                        //validationRules: [
                                        //    {
                                        //        type: "numeric",
                                        //        message: "Este campo aceita apenas números",
                                        //    },
                                        //],
                                        editorOptions: {
                                            label: "Limite de dias em atraso para Pagamento",
                                            maxLength: 7,
                                            format: "###,###,###,###,###",
                                            min: 0,
                                        },
                                    },
                                ],
                            },

                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "CD_MENSAGEM",
                                        editorOptions: {
                                            label: "Mensagem Padrão Opcional",
                                        },
                                    },
                                ],
                            },

                        ],

                    },
                },
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: { mode: "multiple" },
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 20 },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 15, 20],
                    showPageSizeSelector: false,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Instruções');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Instruções_Boleto_Cobrança.xlsx');
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
                columnChooser: { enabled: true, allowSearch: true, height: 350 },
                keyExpr: ['NR_SEQUENCIA'],
                columns: [
                    {
                        dataField: "NR_SEQUENCIA",
                        caption: "Seq.",
                        dataType: "number",
                        format: "##########",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        width: 40,
                    },
                    {
                        dataField: "DS_INSTRUCAO",
                        caption: "Descrição da Instrução",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                        editorOptions: {
                            onContentReady: obj => {
                                widgetInstancet = obj.component; //sava a instância para dar foco na edição
                            },
                        },
                    },
                    {
                        dataField: "PC_JUROS_DIA",
                        caption: "% Juros Diário",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_JUROS_MES",
                        caption: "% Juros Mensal",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_MULTA_FIXA",
                        caption: "% Multa Fixa",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_DESCONTO_DIA",
                        caption: "% Desc. ao Dia",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_DESCONTO_FIXO",
                        caption: "% Desc. Fixo",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "QT_DIAS_DESCONTO_ANTECIPADO",
                        caption: "Dias Desc. Antec.",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,###",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_MULTA_APOS_VENCIMENTO",
                        caption: "% Multa após Vencto.",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'right',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "QT_DIAS_APOS_VENCIMENTO",
                        caption: "Dias Vencto. para Multa",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,###",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_MULTA_APOS_VENCIMENTO",
                        caption: "Multa após Vencto.",
                        width: 85,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "QT_DIAS_LIMITE_PAGAMENTO",
                        caption: "Dias Limite Pagto.",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,###",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "QT_DIAS_PROTESTO",
                        caption: "Dias para Protesto",
                        width: 60,
                        dataType: "number",
                        format: "###,###,###,###,###",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_MENSAGEM",
                        caption: "Cód. Mensagem Padrão",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'center',
                        visible: false,
                        width: 40,
                        lookup: {
                            dataSource: dataSourceMensagemPadrao,
                            valueExpr: "CD_MENSAGEM",
                            displayExpr: "DS_MENSAGEM",
                            searchExpr: ["DS_MENSAGEM"]
                        },
                    },
                    {
                        dataField: "DS_MENSAGEM",
                        caption: "Mensagem Padrão",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        alignment: 'left',
                        visible: false,
                        //width: 40,
                    },
                    {
                        type: "buttons",
                        width: 50,
                        //cssClass: "column-data-grid",
                    },

                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "CD_STATUS" &&
                            e.data.CD_STATUS === 'I') {
                            //e.cellElement.css("background-color", '#f26419');
                            e.cellElement.css("color", '#d00000');
                            e.cellElement.css("font-weight", 'bold');
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
                        {
                            name: 'addRowButton',
                            showText: 'always',
                            options: {
                                type: 'success',
                                text: 'Nova Instrução',
                                hint: 'Cadastra uma nova instrução',
                            },
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
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    var dataSourceStatus = [
        { CD_STATUS: 'A', DS_STATUS: "Ativo" },
        { CD_STATUS: 'I', DS_STATUS: "Inativo" },
    ];

    $('#lkp_Status_Conta').dxLookup({
        dataSource: dataSourceStatus,
        elementAttr: {
            class: 'status_ativo',
        },
        searchExpr: ['DS_STATUS'],
        displayExpr: 'DS_STATUS',
        valueExpr: 'CD_STATUS',
        value: 'A',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Status',
        },
        labelMode: 'floating',
        label: 'Status',
        placeholder: '',
        showClearButton: false,
        onValueChanged(e) {
            if (e.value == 'I') {
                e.component.option('elementAttr', { class: 'status_inativo' });
            } else {
                e.component.option('elementAttr', { class: 'status_ativo' });
            };
        },
    });

    $('#lkp_Status_Agencia').dxLookup({
        dataSource: dataSourceStatus,
        elementAttr: {
            class: 'status_ativo',
        },
        searchExpr: ['DS_STATUS'],
        displayExpr: 'DS_STATUS',
        valueExpr: 'CD_STATUS',
        value: 'A',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Status',
        },
        labelMode: 'floating',
        label: 'Status',
        placeholder: '',
        showClearButton: false,
        onValueChanged(e) {
            if (e.value == 'I') {
                e.component.option('elementAttr', { class: 'status_inativo' });
            } else {
                e.component.option('elementAttr', { class: 'status_ativo' });
            };
        },
    });

    $('#lkp_Status_Banco').dxLookup({
        dataSource: dataSourceStatus,
        elementAttr: {
            class: 'status_ativo',
        },
        searchExpr: ['DS_STATUS'],
        displayExpr: 'DS_STATUS',
        valueExpr: 'CD_STATUS',
        value: 'A',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Status',
        },
        labelMode: 'floating',
        label: 'Status',
        placeholder: '',
        showClearButton: false,
        onValueChanged(e) {
            if (e.value == 'I') {
                e.component.option('elementAttr', { class: 'status_inativo' });
            } else {
                e.component.option('elementAttr', { class: 'status_ativo' });
            };
        },
    });

    $('#txt_Conta_Corrente').dxTextBox({
        labelMode: 'floating',
        label: 'Número da Conta Corrente *',
        maxLength: 15,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Número da Conta Obrigatório', }], validationGroup: 'Conta' });

    $('#txt_Conta_Corrente_Digito').dxTextBox({
        labelMode: 'floating',
        label: 'Digito *',
        maxLength: 3,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Dígito da Conta Obrigatório', }], validationGroup: 'Conta' });

    $('#txt_Conta_Descricao').dxTextBox({
        labelMode: 'floating',
        label: 'Descrição da Conta Corrente *',
        maxLength: 60,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Descrição da Conta Obrigatório', }], validationGroup: 'Conta' });

    $('#chk_Permite_Alterar_Dados_Reimpressao_Boleto').dxCheckBox({
        text: 'Permite alterar valor e vencimento na reimpressão do boleto',
        value: false,
    });

    $('#chk_Informado_Numero_Inicial_Arquivo_Remessa').dxCheckBox({
        text: 'Ative este parâmetro se você já gerou boletos para esta conta em outro sistema e informe abaixo o número do último arquivo remessa gerado',
        value: false,
    });

    $('#nbx_Nr_Ultimo_Arquivo_Remessa_Outro_Sistema').dxNumberBox({
        value: '',
        //format: '00000000',
        min: 0,
        max: 9999999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Último arquivo remessa',
    });

    $('#txt_Nr_Convenio_Cobranca').dxTextBox({
        labelMode: 'floating',
        label: 'Convênio',
        maxLength: 20,
    });

    $('#txt_Nr_Cendente').dxTextBox({
        labelMode: 'floating',
        label: 'Cedente/Remessa',
        maxLength: 15,
    });

    $('#txt_Nr_Cendente_Digito').dxTextBox({
        labelMode: 'floating',
        label: 'Dig',
        maxLength: 3,
    });

    $('#nbx_Nr_Carteira').dxNumberBox({
        value: '',
        //format: '00000000',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Carteira',
    });

    $('#txt_Nr_Carteira_Variacao').dxTextBox({
        labelMode: 'floating',
        label: 'Variação Carteira',
        maxLength: 20,
    });

    $('#txt_Nr_Modalidae').dxTextBox({
        labelMode: 'floating',
        label: 'Modalidade',
        maxLength: 10,
    });

    $('#txt_Especie_Boleto').dxTextBox({
        labelMode: 'floating',
        label: 'Espécie Documento - Boleto',
        maxLength: 10,
    });

    $('#txt_Especie_CNAB').dxTextBox({
        labelMode: 'floating',
        label: 'Espécie Documento - CNAB',
        maxLength: 20,
    });

    $('#txt_Cd_Composicao_Nosso_Numero').dxTextBox({
        labelMode: 'floating',
        label: 'Código Composição Nosso Número',
        maxLength: 10,
    });

    $('#txt_Cd_Posto_Cooperativa_Credito').dxTextBox({
        labelMode: 'floating',
        label: 'Posto Cooperativa de Crédito',
        maxLength: 2,
    });

    $('#txt_Nr_Convenio_Pagamento').dxTextBox({
        labelMode: 'floating',
        label: 'Número do Convênio',
        maxLength: 20,
    });

    //DADOS PARA INTEGRAÇÃO API PIX
    $('#txt_Ds_Beneficiario_Pix').dxTextBox({
        labelMode: 'floating',
        label: 'Nome ou Razão Social do Beneficiário',
        maxLength: 500,
    });

    $('#txt_Ds_Email_Beneficiario_Pix').dxTextBox({
        labelMode: 'floating',
        label: 'E-mail do Beneficiário',
        maxLength: 200,
    });

    $('#txt_Cd_CPF_CNPJ_Beneficiario_Pix').dxTextBox({
        labelMode: 'floating',
        label: 'CPF/CNPJ do Beneficiário',
        mask: '',
        maxLength: 14,
        showClearButton: true,
        onFocusIn(e) {

            if (e.value != undefined) {
                if (e.value.length == 11) {
                    e.component.option('mask', '000.000.000-00');
                    e.component.option('label', 'CPF do Beneficiário');
                } else if (e.value.length == 14) {
                    e.component.option('mask', '00.000.000/0000-00');
                    e.component.option('label', 'CNPJ do Beneficiário');
                } else {
                    e.component.option('mask', '00000000000000');
                    e.component.option('label', 'CPF/CNPJ do Beneficiário');
                };
            }

        },
        onValueChanged(e) {
            if (e.value.length == 11) {
                e.component.option('mask', '000.000.000-00');
                e.component.option('label', 'CPF do Beneficiário');
            } else if (e.value.length == 14) {
                e.component.option('mask', '00.000.000/0000-00');
                e.component.option('label', 'CNPJ do Beneficiário');
            } else {
                e.component.option('mask', '00000000000000');
                e.component.option('label', 'CPF/CNPJ do Beneficiário');
            };
        },
    });

    $('#nbx_Cd_CEP_Beneficiario_Pix').dxNumberBox({
        value: '',
        format: '00000000',
        min: 0,
        max: 99999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'CEP do Beneficiário',
    });


    $('#txt_Cd_Chave_PIX').dxTextBox({
        labelMode: 'floating',
        label: 'Chave PIX',
        maxLength: 100,
    });

    $('#txt_Cd_Identificador_Acesso_API_Pix').dxTextBox({
        labelMode: 'floating',
        label: 'Identificador de Acesso da API',
        maxLength: 100,
    });

    $('#txt_Cd_Chave_Acesso_Pix').dxTextBox({
        labelMode: 'floating',
        label: 'Chave de Acesso',
        maxLength: 100,
    });

    const passwordPix = $('#txt_Cd_Senha_Pix').dxTextBox({
        labelMode: 'floating',
        label: 'Senha',
        maxLength: 100,
        mode: 'password',
        //inputAttr: { 'aria-label': 'Senha' },
        //stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    passwordPix.option('mode', passwordPix.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxTextBox('instance');

    $('#txt_Cd_Versao_Web_Service_Pix').dxTextBox({
        labelMode: 'floating',
        label: 'Versão Web Service',
        maxLength: 100,
    });


    $('#txt_Cd_Agencia').dxTextBox({
        labelMode: 'floating',
        label: 'Agência *',
        maxLength: 7,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Código da Agência Obrigatório', }], validationGroup: 'Agencia' });

    $('#txt_Cd_Agencia_Digito').dxTextBox({
        labelMode: 'floating',
        label: 'Dígito *',
        maxLength: 7,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Dígito da Agência Obrigatório', }], validationGroup: 'Agencia' });

    $('#txt_Ds_Agencia').dxTextBox({
        labelMode: 'floating',
        label: 'Nome da Agência *',
        maxLength: 50,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Nome da Agência Obrigatório', }], validationGroup: 'Agencia' });

    $('#txt_Ds_Agencia_Contato').dxTextBox({
        labelMode: 'floating',
        label: 'Contato',
        maxLength: 60,
    });

    $('#nbx_Cd_DDD_Telefone_Agencia').dxNumberBox({
        value: '',
        format: '000',
        writeStylingMode: 'filled',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD',
    });

    $('#txt_Ds_Telefone_Agencia').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone Agência',
        maxLength: 30,
        showClearButton: true,
    });


    $('#txt_Cd_Banco').dxTextBox({
        labelMode: 'floating',
        label: 'Banco *',
        maxLength: 7,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Código do Banco Obrigatório', }], validationGroup: 'Banco' });

    $('#txt_Cd_Banco_Digito').dxTextBox({
        labelMode: 'floating',
        label: 'Dígito *',
        maxLength: 7,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Dígito do Banco Obrigatório', }], validationGroup: 'Banco' });

    $('#txt_Ds_Banco').dxTextBox({
        labelMode: 'floating',
        label: 'Nome do Banco *',
        maxLength: 50,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Nome do Banco Obrigatório', }], validationGroup: 'Banco' });























});

function desabilitaTodosPanels() {
    ExibirEsconderPaineis('cardCabecalho', 'none');
    ExibirEsconderPaineis('cardMenu', 'none');
    ExibirEsconderPaineis('cardListaContasCorrentes', 'none');
    ExibirEsconderPaineis('cardCadastroContaCorrente', 'none');
    ExibirEsconderPaineis('cardListaAgencias', 'none');
    ExibirEsconderPaineis('cardCadastroAgencia', 'none');
    ExibirEsconderPaineis('cardListaBancos', 'none');
    ExibirEsconderPaineis('cardCadastroBanco', 'none');
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



function retornaMenuPrincipal() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');

    desmarcaBotoesMenu();
}

function iniciaConsultaContaCorrente() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardListaContasCorrentes', 'block');
}

function editarContaCorrente() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardCadastroContaCorrente', 'block');
}

function iniciaConsultaAgencia() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardListaAgencias', 'block');
}

function editarAgencia() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardCadastroAgencia', 'block');
}

function iniciaConsultaBanco() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardListaBancos', 'block');
}

function editarBanco() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardCadastroBanco', 'block');
}

function salvarContaCorrente() {

    const resultConta = DevExpress.validationEngine.validateGroup("Conta");

    if (resultConta.isValid) {

        new PNotify({
            title: 'Conta Corrente',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

        iniciaConsultaContaCorrente();

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

function salvarAgencia() {

    const resultAgencia = DevExpress.validationEngine.validateGroup("Agencia");

    if (resultAgencia.isValid) {

        new PNotify({
            title: 'Agência Bancária',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

        iniciaConsultaAgencia();

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

function salvarBanco() {

    const resultBanco = DevExpress.validationEngine.validateGroup("Banco");

    if (resultBanco.isValid) {

        new PNotify({
            title: 'Banco',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

        iniciaConsultaAgencia();

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

function FormatButtons() {

    let buttonsPrincipal = $("#panelBotoesMenu button");
    buttonsPrincipal.removeClass('btn-dark').addClass('btn-gray');
    buttonsPrincipal.on("click", a => {
        console.log('FORMATA BOTÕES');
        buttonsPrincipal.removeClass('btn-dark').addClass('btn-gray');
        $(a.currentTarget).removeClass('btn-gray').addClass('btn-dark');
    })
}

function desmarcaBotoesMenu() {

    let buttonsPrincipal = $("#panelBotoesMenu button");
    buttonsPrincipal.removeClass('btn-dark').addClass('btn-gray');
}

function rolar_para(elemento) {
    //setTimeout(() => {  $('html, body').animate({ scrollTop: $(elemento).offset().top}, 1300); }, 5000);
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

function AbrirModal(e) {
    $(e).modal('toggle');
}
