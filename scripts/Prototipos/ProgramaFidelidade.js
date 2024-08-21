$(() => {

    //Filiais participantes do programa que o usuário possui acesso
    GetAzureDataSource(66, '{CD_STATUS: "A"}').then((result) => {

        if (result.success) {

            $("#gridFiliais").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: false,
                showRowLines: false,
                showColumnLines: false,
                rowAlternationEnabled: true,
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
                    visible: false,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 99999,
                },
                pager: {
                    visible: false,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: false,
                    showNavigationButtons: false
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Filiais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisParicipantesCashBack.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: false,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: false,
                    allowSearch: false,
                },
                filterPanel: {
                    visible: false,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: 'CD_FILIAL',
                columns: [
                    //{
                    //    type: "selection",
                    //    dataField: "CD_SELECAO",
                    //    width: 30,
                    //    value: false,
                    //    allowHiding: false,
                    //},

                    {
                        dataField: "CD_FILIAL",
                        caption: "Filial",
                        width: 60,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid-lg",
                        visible: true,
                    },
                    {
                        dataField: "DS_NOME_FANTASIA",
                        caption: "Nome",
                        //width: 400,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid-lg",
                        //allowHiding: false,
                        visible: true,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "CD_FILIAL",
                        caption: 'Habilitada',
                        width: 85,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid-lg",
                        cellTemplate: function (e, x) {

                            var imgHabilitada 
                            var btnHabilitada

                            if (x.data.LG_PROGRAMA_FIDELIDADE_ATIVO == true) {
                                imgHabilitada = 'block'
                                btnHabilitada = 'none'
                            } else {
                                imgHabilitada = 'none'
                                btnHabilitada = 'block'
                            }

                            e.append(`
                                <div class="row mt-1 mb-0 text-center">
                                    <div class="col-lg-12 mt-0 mb-0 text-center">
                                        <img src="/img/check2.png" id="imgHabilitada${x.data.CD_FILIAL}" class="ml-4" style="width: 25px; cursor: pointer; display: ${imgHabilitada};" data-toggle="tooltip" data-placement="top" title="Clique para desabilitar a Filial no programa de fidelidade" onclick="habilitaFilial${x.data.CD_FILIAL}(false);">
                                        <button type="button" id="btnHabilitada${x.data.CD_FILIAL}" class="mb-1 mt-0 ml-2 btn btn-xs btn-dark" style="display: ${btnHabilitada};" data-toggle="tooltip" data-placement="right" title="Clique para habilitar a Filial no programa de fidelidade" onclick="habilitaFilial${x.data.CD_FILIAL}(true);"><h6 class="mb-0 mt-0 text-center ml-1 mr-1" style="font-size: 12px">ativar</h6></button>
                                    </div>
                                </div>

                                <script>
                                    function habilitaFilial${x.data.CD_FILIAL}(param) {
                                        AbrirModal("#ModalAtivarParametroDevolucao");
                                        
                                        if (param == true){
                                            document.getElementById("imgHabilitada${x.data.CD_FILIAL}").style.display = "block";
                                            document.getElementById("btnHabilitada${x.data.CD_FILIAL}").style.display = "none";
                                        } else {
                                            document.getElementById("imgHabilitada${x.data.CD_FILIAL}").style.display = "none";
                                            document.getElementById("btnHabilitada${x.data.CD_FILIAL}").style.display = "block";
                                        };
                                    };
                                </script>

                            `);

                        },
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

            $("#gridFiliaisParam").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: false,
                showRowLines: false,
                showColumnLines: false,
                rowAlternationEnabled: true,
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
                    visible: false,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 99999,
                },
                pager: {
                    visible: false,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: false,
                    showNavigationButtons: false
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Filiais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisParicipantesCashBack.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: false,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: false,
                    allowSearch: false,
                },
                filterPanel: {
                    visible: false,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: 'CD_FILIAL',
                columns: [
                    //{
                    //    type: "selection",
                    //    dataField: "CD_SELECAO",
                    //    width: 30,
                    //    value: false,
                    //    allowHiding: false,
                    //},

                    {
                        dataField: "CD_FILIAL",
                        caption: "Filial",
                        width: 60,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_NOME_FANTASIA",
                        caption: "Nome",
                        //width: 400,
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
                        dataField: "CD_FILIAL",
                        caption: 'Habilitada',
                        width: 85,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        cellTemplate: function (e, x) {

                            var imgHabilitada
                            var btnHabilitada

                            if (x.data.LG_PROGRAMA_FIDELIDADE_ATIVO == true) {
                                imgHabilitada = 'block'
                                btnHabilitada = 'none'
                            } else {
                                imgHabilitada = 'none'
                                btnHabilitada = 'block'
                            }

                            e.append(`
                                <div class="row mt-1 mb-0 text-center">
                                    <div class="col-lg-12 mt-0 mb-0 text-center">
                                        <img src="/img/check2.png" id="imgHabilitada${x.data.CD_FILIAL}" class="ml-4" style="width: 25px; cursor: pointer; display: ${imgHabilitada};" data-toggle="tooltip" data-placement="top" title="Clique para desabilitar a Filial no programa de fidelidade" onclick="habilitaFilial${x.data.CD_FILIAL}(false);">
                                        <button type="button" id="btnHabilitada${x.data.CD_FILIAL}" class="mb-1 mt-0 ml-2 btn btn-xs btn-dark" style="display: ${btnHabilitada};" data-toggle="tooltip" data-placement="right" title="Clique para habilitar a Filial no programa de fidelidade" onclick="habilitaFilial${x.data.CD_FILIAL}(true);"><h6 class="mb-0 mt-0 text-center ml-1 mr-1" style="font-size: 12px">ativar</h6></button>
                                    </div>
                                </div>

                                <script>
                                    function habilitaFilial${x.data.CD_FILIAL}(param) {
                                        AbrirModal("#ModalAtivarParametroDevolucao");
                                        
                                        if (param == true){
                                            document.getElementById("imgHabilitada${x.data.CD_FILIAL}").style.display = "block";
                                            document.getElementById("btnHabilitada${x.data.CD_FILIAL}").style.display = "none";
                                        } else {
                                            document.getElementById("imgHabilitada${x.data.CD_FILIAL}").style.display = "none";
                                            document.getElementById("btnHabilitada${x.data.CD_FILIAL}").style.display = "block";
                                        };
                                    };
                                </script>

                            `);

                        },
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


    //Clientes não habilitados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: "A", LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: false, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: false }').then((result) => {

        if (result.success) {

            gridBoxClientesNaoHabilitados = $('#gridBoxClientesNaoHabilitados').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os clientes',
                elementAttr: {
                    class: 'gridbox-font',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    onOptionChanged: (e) => {
                        if (e.name != 'visible') return;
                        if (!e.value) return;
                        const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardClientesParticipantes')[0].getBoundingClientRect().top;
                        this.fnPromise = $('#cardClientesParticipantes').animate({ top: diffTop }, {
                            complete: () => e.component.refreshPosition(),
                        }).promise();
                    },
                    onHiding: (e) => $('#cardClientesParticipantes').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'success',
                                        text: 'Adicionar Clientes',
                                        hint: "Adicionar clientes selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridClientesHabilitados').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                            gridBoxClientesNaoHabilitados.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxClientesNaoHabilitados", false),
                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');

            gridBoxClientesNaoHabilitadosParam = $('#gridBoxClientesNaoHabilitadosParam').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os clientes',
                elementAttr: {
                    class: 'gridbox-font-md',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    //onOptionChanged: (e) => {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardClientesParticipantesParam')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardClientesParticipantesParam').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    //onHiding: (e) => $('#cardClientesParticipantesParam').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'success',
                                        text: 'Adicionar Clientes',
                                        hint: "Adicionar clientes selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridClientesHabilitadosParam').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                            gridBoxClientesNaoHabilitadosParam.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxClientesNaoHabilitadosParam", false),
                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');
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

    //Clientes habilitados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: null, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: null }').then((result) => {

        if (result.success) {

            var dataSourceFiltroConsultaDetalhada = [
                { CD_STATUS: 'A', DS_STATUS: "Ativos" },
                { CD_STATUS: 'I', DS_STATUS: "Inativos" },
                { CD_STATUS: null, DS_STATUS: "Todos" },
            ];

            gridClientesHabilitados = $("#gridClientesHabilitados").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('ClientesHabilitados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesHabilitados.xlsx');
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
                stateStoring: AutoLoad("gridClientesHabilitados", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Clientes por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaClientesDetalhadoGrid(e.value)


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
                                    const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                    gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                type: 'danger',
                                icon: 'trash',
                                text: 'Excluir Clientes',
                                hint: 'Excluir registros selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
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
                                            gridClientesHabilitados.state({});
                                            gridClientesHabilitados.refresh();

                                            gridClientesHabilitados.updateDimensions();
                                        }
                                    });
                                }
                            }
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

            gridClientesHabilitadosParam = $("#gridClientesHabilitadosParam").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('ClientesHabilitados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesHabilitados.xlsx');
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
                stateStoring: AutoLoad("gridClientesHabilitados", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Clientes por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaClientesDetalhadoGrid(e.value)


                                },
                            },
                        },
                        //{
                        //    location: 'after',
                        //    widget: 'dxButton',
                        //    locateInMenu: 'auto',
                        //    options: {
                        //        icon: 'hierarchy',
                        //        text: 'Fechar Agrupamento',
                        //        hint: 'Fechar ou expandir os agrupamentos',
                        //        onClick(e) {
                        //            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                        //            gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                        //            e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                        //        },
                        //    },
                        //},
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                type: 'danger',
                                icon: 'trash',
                                text: 'Excluir Clientes',
                                hint: 'Excluir registros selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
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
                                            gridClientesHabilitadosParam.state({});
                                            gridClientesHabilitadosParam.refresh();

                                            gridClientesHabilitadosParam.updateDimensions();
                                        }
                                    });
                                }
                            }
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

    //Clientes não bloqueados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: "A", LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: false }').then((result) => {

        if (result.success) {

            gridBoxClientesNaoBloqueados = $('#gridBoxClientesNaoBloqueados').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os clientes a serem bloqueados no programa de fidelidade',
                elementAttr: {
                    class: 'gridbox-font',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    onOptionChanged: (e) => {
                        if (e.name != 'visible') return;
                        if (!e.value) return;
                        const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardClientesParticipantes')[0].getBoundingClientRect().top;
                        this.fnPromise = $('#cardClientesParticipantes').animate({ top: diffTop }, {
                            complete: () => e.component.refreshPosition(),
                        }).promise();
                    },
                    onHiding: (e) => $('#cardClientesParticipantes').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'danger',
                                        text: 'Bloquear Clientes',
                                        hint: "Bloquear clientes selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridClientesBloqueados').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'revertButton',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                            gridBoxClientesNaoHabilitados.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxClientesNaoHabilitados", false),

                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');

            gridBoxClientesNaoBloqueadosParam = $('#gridBoxClientesNaoBloqueadosParam').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os clientes a serem bloqueados no programa de fidelidade',
                elementAttr: {
                    class: 'gridbox-font-md',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    
                    //onOptionChanged: (e) => {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardClientesParticipantes')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardClientesParticipantes').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    //onHiding: (e) => $('#cardClientesParticipantes').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'danger',
                                        text: 'Bloquear Clientes',
                                        hint: "Bloquear clientes selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridClientesBloqueadosParam').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'revertButton',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            gridBoxClientesNaoBloqueadosParam = selectedItems.selectedRowKeys;
                            gridBoxClientesNaoBloqueadosParam.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxClientesNaoBloqueadosParam", false),

                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');
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

    //Clientes bloqueados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: null, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: true }').then((result) => {

        if (result.success) {

            var dataSourceFiltroConsultaDetalhada = [
                { CD_STATUS: 'A', DS_STATUS: "Ativos" },
                { CD_STATUS: 'I', DS_STATUS: "Inativos" },
                { CD_STATUS: null, DS_STATUS: "Todos" },
            ];

            gridClientesBloqueados = $("#gridClientesBloqueados").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('ClientesBloqueados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesBloqueados.xlsx');
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
                stateStoring: AutoLoad("gridClientesBloqueados", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Clientes por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaClientesDetalhadoGrid(e.value)


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
                                    const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                    gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                //type: 'success',
                                icon: 'unlock',
                                text: 'Desbloquear Clientes',
                                hint: 'Desbloquear clientes selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os clientes selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },
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
                                            gridClientesBloqueados.state({});
                                            gridClientesBloqueados.refresh();

                                            gridClientesBloqueados.updateDimensions();
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

            gridClientesBloqueadosParam = $("#gridClientesBloqueadosParam").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('ClientesBloqueados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeClientesBloqueados.xlsx');
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
                stateStoring: AutoLoad("gridClientesBloqueadosParam", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Clientes por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaClientesDetalhadoGrid(e.value)


                                },
                            },
                        },
                        //{
                        //    location: 'after',
                        //    widget: 'dxButton',
                        //    locateInMenu: 'auto',
                        //    options: {
                        //        icon: 'hierarchy',
                        //        text: 'Fechar Agrupamento',
                        //        hint: 'Fechar ou expandir os agrupamentos',
                        //        onClick(e) {
                        //            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                        //            gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                        //            e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                        //        },
                        //    },
                        //},
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                //type: 'success',
                                icon: 'unlock',
                                text: 'Desbloquear Clientes',
                                hint: 'Desbloquear clientes selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os clientes selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },
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
                                            gridClientesBloqueadosParam.state({});
                                            gridClientesBloqueadosParam.refresh();

                                            gridClientesBloqueadosParam.updateDimensions();
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
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });



    //Indicadores não habilitados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: "A", LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: false, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: false }').then((result) => {

        if (result.success) {

            gridBoxIndicadoresNaoHabilitados = $('#gridBoxIndicadoresNaoHabilitados').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os indicadores',
                elementAttr: {
                    class: 'gridbox-font',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    onOptionChanged: (e) => {
                        if (e.name != 'visible') return;
                        if (!e.value) return;
                        const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardIndicadoresParticipantes')[0].getBoundingClientRect().top;
                        this.fnPromise = $('#cardIndicadoresParticipantes').animate({ top: diffTop }, {
                            complete: () => e.component.refreshPosition(),
                        }).promise();
                    },
                    onHiding: (e) => $('#cardIndicadoresParticipantes').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'success',
                                        text: 'Adicionar Indicadores',
                                        hint: "Adicionar indicadores selecionados",
                                        width: 165,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridIndicadoresHabilitados').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'revertButton',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listIndicadoresSelecionadosHabilitar = selectedItems.selectedRowKeys;
                            gridBoxIndicadoresNaoHabilitados.option("value", listIndicadoresSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxIndicadoresNaoHabilitados", false),

                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');

            gridBoxIndicadoresNaoHabilitadosParam = $('#gridBoxIndicadoresNaoHabilitadosParam').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os indicadores',
                elementAttr: {
                    class: 'gridbox-font-md',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    //onOptionChanged: (e) => {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardIndicadoresParticipantesParam')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardIndicadoresParticipantesParam').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    //onHiding: (e) => $('#cardIndicadoresParticipantesParam').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'success',
                                        text: 'Adicionar Indicadores',
                                        hint: "Adicionar indicadores selecionados",
                                        width: 165,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridIndicadoresHabilitadosParam').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'revertButton',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listIndicadoresSelecionadosHabilitarParam = selectedItems.selectedRowKeys;
                            gridBoxIndicadoresNaoHabilitadosParam.option("value", listIndicadoresSelecionadosHabilitarParam.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxIndicadoresNaoHabilitadosParam", false),

                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');
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

    //Indicadores habilitados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: null, LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: null }').then((result) => {

        if (result.success) {

            var dataSourceFiltroConsultaDetalhada = [
                { CD_STATUS: 'A', DS_STATUS: "Ativos" },
                { CD_STATUS: 'I', DS_STATUS: "Inativos" },
                { CD_STATUS: null, DS_STATUS: "Todos" },
            ];

            gridIndicadoresHabilitados = $("#gridIndicadoresHabilitados").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('IndicadoresHabilitados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresHabilitados.xlsx');
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
                stateStoring: AutoLoad("gridIndicadoresHabilitados", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Indicadores por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaIndicadoresDetalhadoGrid(e.value)


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
                                    const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                    gridIndicadoresHabilitados.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                type: 'danger',
                                icon: 'trash',
                                text: 'Excluir Indicadores',
                                hint: 'Excluir registros selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },

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
                                            gridIndicadoresHabilitados.state({});
                                            gridIndicadoresHabilitados.refresh();

                                            gridIndicadoresHabilitados.updateDimensions();
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

            gridIndicadoresHabilitadosParam = $("#gridIndicadoresHabilitadosParam").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('IndicadoresHabilitados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresHabilitados.xlsx');
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
                stateStoring: AutoLoad("gridIndicadoresHabilitadosParam", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Indicadores por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaIndicadoresDetalhadoGrid(e.value)


                                },
                            },
                        },
                        //{
                        //    location: 'after',
                        //    widget: 'dxButton',
                        //    locateInMenu: 'auto',
                        //    options: {
                        //        icon: 'hierarchy',
                        //        text: 'Fechar Agrupamento',
                        //        hint: 'Fechar ou expandir os agrupamentos',
                        //        onClick(e) {
                        //            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                        //            gridIndicadoresHabilitadosParam.option('grouping.autoExpandAll', expanding);
                        //            e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                        //        },
                        //    },
                        //},
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                type: 'danger',
                                icon: 'trash',
                                text: 'Excluir Indicadores',
                                hint: 'Excluir registros selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente excluir os registros selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },

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
                                            gridIndicadoresHabilitadosParam.state({});
                                            gridIndicadoresHabilitadosParam.refresh();

                                            gridIndicadoresHabilitadosParam.updateDimensions();
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
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    //Indicadores não bloqueados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: "A", LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: false }').then((result) => {

        if (result.success) {

            gridBoxIndicadoresNaoBloqueados = $('#gridBoxIndicadoresNaoBloqueados').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os indicadores a serem bloqueados no programa de fidelidade',
                elementAttr: {
                    class: 'gridbox-font',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    onOptionChanged: (e) => {
                        if (e.name != 'visible') return;
                        if (!e.value) return;
                        const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardIndicadoresParticipantes')[0].getBoundingClientRect().top;
                        this.fnPromise = $('#cardIndicadoresParticipantes').animate({ top: diffTop }, {
                            complete: () => e.component.refreshPosition(),
                        }).promise();
                    },
                    onHiding: (e) => $('#cardIndicadoresParticipantes').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'danger',
                                        text: 'Bloquear Indicadores',
                                        hint: "Bloquear indicadores selecionados",
                                        width: 160,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridIndicadoresBloqueados').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'revertButton',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listIndicadoresSelecionadosHabilitar = selectedItems.selectedRowKeys;
                            gridBoxIndicadoresNaoBloqueados.option("value", listIndicadoresSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxIndicadoresNaoBloqueados", false),

                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');

            gridBoxClientesNaoBloqueadosParam = $('#gridBoxIndicadoresNaoBloqueadosParam').dxDropDownBox({
                valueExpr: 'CD_CPF_CNPJ',
                displayExpr: 'CD_CPF_CNPJ',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para selecionar os indicadores a serem bloqueados no programa de fidelidade',
                elementAttr: {
                    class: 'gridbox-font-md',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_CPF_CNPJ'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 998);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    //onOptionChanged: (e) => {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardIndicadoresParticipantesParam')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardIndicadoresParticipantesParam').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    //onHiding: (e) => $('#cardIndicadoresParticipantesParam').animate({ top: 0 }),

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_CPF_CNPJ'],
                        displayExpr: 'CD_CPF_CNPJ',
                        valueExpr: 'CD_CPF_CNPJ',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_CPF_CNPJ'],
                        columns: [
                            {
                                type: "selection",
                                width: 30,
                            },
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                            { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                            { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                            { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                            { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                            { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'danger',
                                        text: 'Bloquear Indicadores',
                                        hint: "Bloquear indicadores selecionados",
                                        width: 160,
                                        icon: 'save',
                                        onClick(e) {
                                            $('#cardGridIndicadoresBloqueadosParam').slideDown();
                                        },

                                    },
                                },
                                'groupPanel',
                                'revertButton',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }

                                if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                                    if (e.value === "Sim") {
                                        e.cellElement.css("color", "#b23a48");
                                        e.cellElement.css("background-color", "#fae0e4");
                                    };
                                }

                            }
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listIndicadoresSelecionadosHabilitarParam = selectedItems.selectedRowKeys;
                            gridBoxIndicadoresNaoBloqueadosParam.option("value", listIndicadoresSelecionadosHabilitarParam.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxIndicadoresNaoBloqueadosParam", false),

                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');
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

    //Indicadores bloqueados no programa de fidelidade
    GetAzureDataSource(67, '{CD_STATUS: null, LG_APENAS_INDICADORES: true, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: null, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: true }').then((result) => {

        if (result.success) {

            var dataSourceFiltroConsultaDetalhada = [
                { CD_STATUS: 'A', DS_STATUS: "Ativos" },
                { CD_STATUS: 'I', DS_STATUS: "Inativos" },
                { CD_STATUS: null, DS_STATUS: "Todos" },
            ];

            gridIndicadoresBloqueados = $("#gridIndicadoresBloqueados").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('IndicadoresBloqueados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresBloqueados.xlsx');
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
                stateStoring: AutoLoad("gridIndicadoresBloqueados", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Indicadores por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaIndicadoresDetalhadoGrid(e.value)


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
                                    const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                    gridClientesHabilitados.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'trash',
                                text: 'Desbloquear Indicadores',
                                hint: 'Desbloquear registros selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os indicadores selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },

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
                                            gridIndicadoresBloqueados.state({});
                                            gridIndicadoresBloqueados.refresh();

                                            gridIndicadoresBloqueados.updateDimensions();
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

            gridIndicadoresBloqueadosParam = $("#gridIndicadoresBloqueadosParam").dxDataGrid({
                dataSource: result.data,
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: true,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('IndicadoresBloqueados');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadeIndicadoresBloqueados.xlsx');
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
                stateStoring: AutoLoad("gridIndicadoresBloqueadosParam", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 90, caption: "Habilitado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Bloqueado Programa Fidelidade", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FILIDADE_INDICADOR", caption: "% CashBack", width: 90, format: "###,###,###,###,##0.00%", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSourceFiltroConsultaDetalhada,
                                searchExpr: ['DS_STATUS'],
                                displayExpr: 'DS_STATUS',
                                valueExpr: 'CD_STATUS',
                                value: 'A',
                                hint: 'Filtro de Indicadores por Status',
                                width: 80,
                                elementAttr: {
                                    //class: 'filtro_titulos_parcial',
                                    class: 'filtro-consultal-detalhada',
                                },

                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Filtro por Status',
                                },
                                //labelMode: 'floating',
                                //label: 'Filtro por Situação',
                                placeholder: 'Filtro',
                                showClearButton: false,
                                onValueChanged(e) {

                                    if (e.value == 'I') {
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                    } else {
                                        //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                                        e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                    };
                                    loaPanel.show();
                                    CarregaIndicadoresDetalhadoGrid(e.value)


                                },
                            },
                        },
                        //{
                        //    location: 'after',
                        //    widget: 'dxButton',
                        //    locateInMenu: 'auto',
                        //    options: {
                        //        icon: 'hierarchy',
                        //        text: 'Fechar Agrupamento',
                        //        hint: 'Fechar ou expandir os agrupamentos',
                        //        onClick(e) {
                        //            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                        //            gridIndicadoresBloqueadosParam.option('grouping.autoExpandAll', expanding);
                        //            e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                        //        },
                        //    },
                        //},
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'trash',
                                text: 'Desbloquear Indicadores',
                                hint: 'Desbloquear registros selecionados',
                                onClick(e) {
                                    var result = DevExpress.ui.dialog.confirm("Deseja realmente desbloquear os indicadores selecionados?", "Confirmação");
                                    result.done(function (dialogResult) {

                                    });
                                },
                            },
                        },

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
                                            gridIndicadoresBloqueadosParam.state({});
                                            gridIndicadoresBloqueadosParam.refresh();

                                            gridIndicadoresBloqueadosParam.updateDimensions();
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
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });


    //Filiais para Edição de Percentuais de CashBack Diferenciados
    GetAzureDataSource(66, '{CD_STATUS: "A", LG_PROGRAMA_FIDELIDADE_ATIVO: true }').then((result) => {

        if (result.success) {

            $("#gridFiliaisPercentuaisDiferenciados").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                selection: {
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                allowColumnResizing: true,
                columnsAutoWidth: true,
                cellHintEnabled: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: false,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 99999,
                },
                pager: {
                    visible: false,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: false,
                    showNavigationButtons: false
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Filiais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisPercentuaisCashBack.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: false,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: false,
                    allowSearch: false,
                },
                filterPanel: {
                    visible: false,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: 'CD_FILIAL',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    {
                        dataField: "CD_FILIAL",
                        caption: "Filial",
                        width: 60,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_NOME_FANTASIA",
                        caption: "Nome",
                        //width: 400,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //allowHiding: false,
                        visible: false,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "DS_RAZAO_SOCIAL",
                        caption: "Razão Social",
                        //width: 400,
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
                        dataField: "PC_PROGRAMA_FIDELIDADE",
                        caption: '% CashBack Clientes',
                        dataType: 'number',
                        format: "###,###,###,###,##0.##'%'",
                        width: 85,
                        allowEditing: true,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                        caption: '% CashBack Indicadores',
                        dataType: 'number',
                        format: "###,###,###,###,##0.##'%'",
                        width: 85,
                        allowEditing: true,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },

                ],

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todos as filiais selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todas as filiais selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todas as filiais selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todas as filiais selecionadas',
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

                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR" ) {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                    };
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    };
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

            $("#gridFiliaisPercentuaisDiferenciadosParam").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                selection: {
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                allowColumnResizing: true,
                columnsAutoWidth: true,
                cellHintEnabled: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: false,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 99999,
                },
                pager: {
                    visible: false,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: false,
                    showNavigationButtons: false
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Filiais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'FiliaisPercentuaisCashBack.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: false,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: false,
                    allowSearch: false,
                },
                filterPanel: {
                    visible: false,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: 'CD_FILIAL',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    {
                        dataField: "CD_FILIAL",
                        caption: "Filial",
                        width: 60,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_NOME_FANTASIA",
                        caption: "Nome",
                        //width: 400,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        //allowHiding: false,
                        visible: false,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "DS_RAZAO_SOCIAL",
                        caption: "Razão Social",
                        //width: 400,
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
                        dataField: "PC_PROGRAMA_FIDELIDADE",
                        caption: '% CashBack Clientes',
                        dataType: 'number',
                        format: "###,###,###,###,##0.##'%'",
                        width: 85,
                        allowEditing: true,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                        caption: '% CashBack Indicadores',
                        dataType: 'number',
                        format: "###,###,###,###,##0.##'%'",
                        width: 85,
                        allowEditing: true,
                        allowFiltering: false,
                        allowSorting: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },

                ],

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todos as filiais selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todas as filiais selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todas as filiais selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todas as filiais selecionadas',
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

                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                    };
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    };
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

    //Clientes e Indicadores habilitados para Edição de Percentuais de CashBack Diferenciados
    GetAzureDataSource(67, '{CD_STATUS: null, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE: null, LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR: true, LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR: null  }').then((result) => {

        if (result.success) {

            var dataSourceFiltroConsultaDetalhada = [
                { CD_STATUS: 'A', DS_STATUS: "Ativos" },
                { CD_STATUS: 'I', DS_STATUS: "Inativos" },
                { CD_STATUS: null, DS_STATUS: "Todos" },
            ];

            gridClientesIndicadoresPercentuaisDiferenciados = $("#gridClientesIndicadoresPercentuaisDiferenciados").dxDataGrid({
                dataSource: result.data,
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
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                sorting: { mode: "multiple" },
                selection: {
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: false,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Percentuais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosClientes.xlsx');
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
                stateStoring: AutoLoad("gridClientesIndicadoresPercentuaisDiferenciados", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "LG_INDICADOR", width: 90, caption: "Indicador", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: true, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 100, caption: "Cliente Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 100, caption: "Indicador Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Cliente Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Indicador Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }

                        if (e.column.dataField === "LG_INDICADOR") {
                            if (e.value === "Sim") {
                                e.cellElement.css("background-color", "#33658a");
                                e.cellElement.css("color", "white");
                            };
                        }

                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todos os registros selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todos os registros selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todos os registros selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todos os registros selecionados',
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
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
                                            gridClientesIndicadoresPercentuaisDiferenciados.state({});
                                            gridClientesIndicadoresPercentuaisDiferenciados.refresh();

                                            gridClientesIndicadoresPercentuaisDiferenciados.updateDimensions();
                                        }
                                    });
                                }
                            }
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

            gridClientesIndicadoresPercentuaisDiferenciadosParam = $("#gridClientesIndicadoresPercentuaisDiferenciadosParam").dxDataGrid({
                dataSource: result.data,
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
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                sorting: { mode: "multiple" },
                selection: {
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: false,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Percentuais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosClientes.xlsx');
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
                stateStoring: AutoLoad("gridClientesIndicadoresPercentuaisDiferenciadosParam", false),
                keyExpr: 'CD_CPF_CNPJ',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_FANTASIA", caption: "Nome Fantasia", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "LG_INDICADOR", width: 90, caption: "Indicador", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: true, },
                    { dataField: "DS_CATEGORIA_CLIENTE", caption: "Categoria", width: 95, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE", caption: "Vl. Saldo Conta Corrente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                    { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_RAMO_ATIVIDADE", caption: "Ramo", width: 130, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_CLIENTE_ATUACAO", caption: "Atuação", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preço", width: 120, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_CONTATO", caption: "Contato", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_CADASTRO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_NASCIMENTO_ABERTURA", caption: "Data Aniversário", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_PROFISSAO", caption: "Profissão", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_TITULO_PENDENTE", caption: "Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "VL_TITULO_ABERTO", caption: "Vl. Título Pendente", width: 90, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_LANCAMENTO_TITULO_ABERTO", caption: "Nro. Lancto. Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_DOCUMENTO_TITULO_ABERTO", caption: "Nro. Docto. Título Pendente", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_VENCTO_TITULO_ABERTO", caption: "Vencto. Título Pendente", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_PARCELA_TITULO_ABERTO", caption: "Parcela Título Pendente", width: 90, format: "###,###,###,###,###", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },

                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE", width: 100, caption: "Cliente Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR", width: 100, caption: "Indicador Habilitado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE", width: 100, caption: "Cliente Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR", width: 100, caption: "Indicador Bloqueado Programa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "LG_TITULO_PENDENTE" || e.column.dataField === "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE") {
                            if (e.value === "Sim") {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            };
                        }

                        if (e.column.dataField === "LG_INDICADOR") {
                            if (e.value === "Sim") {
                                e.cellElement.css("background-color", "#33658a");
                                e.cellElement.css("color", "white");
                            };
                        }

                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todos os registros selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todos os registros selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todos os registros selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todos os registros selecionados',
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
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
                                            gridClientesIndicadoresPercentuaisDiferenciadosParam.state({});
                                            gridClientesIndicadoresPercentuaisDiferenciadosParam.refresh();

                                            gridClientesIndicadoresPercentuaisDiferenciadosParam.updateDimensions();
                                        }
                                    });
                                }
                            }
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

    //Famílias para Edição de Percentuais de CashBack Diferenciados
    GetAzureDataSource(68, '{ }').then((result) => {

        if (result.success) {

            // Expandir todas as linhas do TreeList
            function expandAllNodes(treeList) {
                treeList.beginUpdate();
                try {
                    result.data.forEach((object) => {
                        if (object.CD_FAMILIA.toString().length > 0) {
                            treeList.expandRow(object.CD_FAMILIA);
                        }
                    });
                } finally {
                    treeList.endUpdate();
                }
            }

            // Retrair todas as linhas do TreeList
            function collapseAllNodes(treeList) {
                treeList.beginUpdate();
                try {
                    result.data.forEach((object) => {
                        if (object.CD_FAMILIA.toString().length > 0) {
                            treeList.collapseRow(object.CD_FAMILIA);
                        }
                    });
                } finally {
                    treeList.endUpdate();
                }
            }

            const treeFamiliasPercentuaisDiferenciados = $("#treeFamiliasPercentuaisDiferenciados").dxTreeList({
                dataSource: result.data,
                searchExpr: ['DS_FAMILIA'],
                displayExpr: 'DS_FAMILIA',
                valueExpr: 'CD_FAMILIA',

                keyExpr: 'CD_FAMILIA',
                parentIdExpr: 'CD_FAMILIA_PAI',
                autoExpandAll: false,

                wordWrapEnabled: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                loadPanel: { enabled: true, },
                sorting: { mode: "multiple" },
                allowColumnResizing: true,
                columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                focusedRowEnabled: false,
                hoverStateEnabled: true,
                paging: { pageSize: 25 },
                filterRow: { visible: true, applyFilter: "auto" },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: { visible: true },
                columnChooser: { enabled: true, allowSearch: true, },
                columnsAutoWidth: true,
                cellHintEnabled: true,

                columns: [
                    //{
                    //    type: "selection",
                    //    width: 52,
                    //    cssClass: "column-data-grid",
                    //},
                    {
                        dataField: "DS_FAMILIA",
                        caption: "Famílias",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_FAMILIA",
                        caption: "Código Família",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_FAMILIA_PAI",
                        caption: "Código Pai",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_STATUS",
                        caption: "Status",
                        width: 90,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_PROGRAMA_FIDELIDADE",
                        caption: "% CashBack Cliente",
                        width: 110,
                        dataType: "number",
                        format: "###,###,###,##0.##'%'",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        alignment: 'center',
                    },
                    {
                        dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                        caption: "% CashBack Indicador",
                        width: 110,
                        dataType: "number",
                        format: "###,###,###,##0.##'%'",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        alignment: 'center',
                    },

                ],

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'hierarchy',
                                text: 'Expandir Famílias',
                                hint: 'Fechar ou expandir as famílias',
                                onClick(e) {
                                    if (e.component.option('text') === 'Fechar Famílias') {

                                        collapseAllNodes(treeFamiliasPercentuaisDiferenciados);
                                        e.component.option('text', 'Expandir Famílias');
                                        e.component.option('icon', 'hierarchy');

                                    } else {

                                        expandAllNodes(treeFamiliasPercentuaisDiferenciados);
                                        e.component.option('text', 'Fechar Famílias');
                                        e.component.option('icon', 'hidepanel');

                                    };
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todas as famílias selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todas as famílias selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todas as famílias selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todas as famílias selecionadas',
                            },
                        },
                        'groupPanel',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },

                showBorders: true,

                //onInitialized: function (e) {
                //    e.component.option("filterValue", ["DS_STATUS", "=", "Ativo"]);
                //},

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value == "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            }
                        }
                    }
                },

                paging: { enabled: true, pageSize: 10 },
                scrolling: { mode: 'virtual' },
                //selectedRowKeys: [value],
                height: '100%',
                onSelectionChanged(selectedItems) {
                    const keys = selectedItems.selectedRowKeys;
                    e.component.option('value', keys);
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
            }).dxTreeList('instance');

            const treeFamiliasPercentuaisDiferenciadosParam = $("#treeFamiliasPercentuaisDiferenciadosParam").dxTreeList({
                dataSource: result.data,
                searchExpr: ['DS_FAMILIA'],
                displayExpr: 'DS_FAMILIA',
                valueExpr: 'CD_FAMILIA',

                keyExpr: 'CD_FAMILIA',
                parentIdExpr: 'CD_FAMILIA_PAI',
                autoExpandAll: false,

                wordWrapEnabled: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                loadPanel: { enabled: true, },
                sorting: { mode: "multiple" },
                allowColumnResizing: true,
                columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                focusedRowEnabled: false,
                hoverStateEnabled: true,
                paging: { pageSize: 25 },
                filterRow: { visible: true, applyFilter: "auto" },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: { visible: true },
                columnChooser: { enabled: true, allowSearch: true, },
                columnsAutoWidth: true,
                cellHintEnabled: true,

                columns: [
                    //{
                    //    type: "selection",
                    //    width: 52,
                    //    cssClass: "column-data-grid",
                    //},
                    {
                        dataField: "DS_FAMILIA",
                        caption: "Famílias",
                        //width: 250,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_FAMILIA",
                        caption: "Código Família",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_FAMILIA_PAI",
                        caption: "Código Pai",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_STATUS",
                        caption: "Status",
                        width: 90,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_PROGRAMA_FIDELIDADE",
                        caption: "% CashBack Cliente",
                        width: 110,
                        dataType: "number",
                        format: "###,###,###,##0.##'%'",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        alignment: 'center',
                    },
                    {
                        dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR",
                        caption: "% CashBack Indicador",
                        width: 110,
                        dataType: "number",
                        format: "###,###,###,##0.##'%'",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        alignment: 'center',
                    },

                ],

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'hierarchy',
                                text: 'Expandir Famílias',
                                hint: 'Fechar ou expandir as famílias',
                                onClick(e) {
                                    if (e.component.option('text') === 'Fechar Famílias') {

                                        collapseAllNodes(treeFamiliasPercentuaisDiferenciadosParam);
                                        e.component.option('text', 'Expandir Famílias');
                                        e.component.option('icon', 'hierarchy');

                                    } else {

                                        expandAllNodes(treeFamiliasPercentuaisDiferenciadosParam);
                                        e.component.option('text', 'Fechar Famílias');
                                        e.component.option('icon', 'hidepanel');

                                    };
                                },
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todas as famílias selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todas as famílias selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todas as famílias selecionadas',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todas as famílias selecionadas',
                            },
                        },
                        'groupPanel',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },

                showBorders: true,

                //onInitialized: function (e) {
                //    e.component.option("filterValue", ["DS_STATUS", "=", "Ativo"]);
                //},

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {
                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value == "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            }
                        }
                    }
                },

                paging: { enabled: true, pageSize: 10 },
                scrolling: { mode: 'virtual' },
                //selectedRowKeys: [value],
                height: '100%',
                onSelectionChanged(selectedItems) {
                    const keys = selectedItems.selectedRowKeys;
                    e.component.option('value', keys);
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
            }).dxTreeList('instance');
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

    //Produtos para Edição de Percentuais de CashBack Diferenciados
    GetAzureDataSource(69, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            var dataSourceFiltroConsultaDetalhada = [
                { CD_STATUS: 'A', DS_STATUS: "Ativos" },
                { CD_STATUS: 'I', DS_STATUS: "Inativos" },
                { CD_STATUS: null, DS_STATUS: "Todos" },
            ];

            gridProdutosDiferenciados = $("#gridProdutosDiferenciados").dxDataGrid({
                dataSource: result.data,
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
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                sorting: { mode: "multiple" },
                selection: {
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: false,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Percentuais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosProdutos.xlsx');
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
                stateStoring: AutoLoad("gridProdutosDiferenciados", false),
                keyExpr: 'CD_PRODUTO',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_PRODUTO", caption: "Código Interno", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_PRODUTO", caption: "Produto", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "CD_EAN_PRODUTO", caption: "Código Barras", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false },
                    { dataField: "CD_FABRICANTE", caption: "Código Fabricante", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "CD_CURVA_ABC", caption: "ABC", width: 50, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                    { dataField: "CD_ORIGINAL", caption: "Código Original", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_OPCIONAL", caption: "Código Opcional", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_PRODUTO_ECOMMERCE", caption: "Código e-Commerce", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_NCM", caption: "NCM", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_CST", caption: "CEST", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_FCI", caption: "Nro. FCI", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_MARCA", caption: "Marca", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TEXTO_EXPLICATIVO", caption: "Aplicação", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: true, visible: false },
                    { dataField: "DT_INCLUSAO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_FORA_LINHA", caption: "Fora Linha", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_KIT", caption: "Kit", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_ENCOMENDA", caption: "Encomenda", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "DS_FORA_LINHA") {
                            if (e.value === "Sim") {
                                e.cellElement.css("background-color", "#33658a");
                                e.cellElement.css("color", "white");
                            };
                        }

                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todos os produtos selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todos os produtos selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todos os produtos selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todos os produtos selecionados',
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
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
                                            gridProdutosDiferenciados.state({});
                                            gridProdutosDiferenciados.refresh();

                                            gridProdutosDiferenciados.updateDimensions();
                                        }
                                    });
                                }
                            }
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

            gridProdutosDiferenciadosParam = $("#gridProdutosDiferenciadosParam").dxDataGrid({
                dataSource: result.data,
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
                editing: {
                    mode: 'cell',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                sorting: { mode: "multiple" },
                selection: {
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
                    deferred: false,
                },
                focusedRowEnabled: false,
                allowColumnResizing: true,
                //columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
                paging: { pageSize: 10 },
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
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Percentuais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProgramaFidelidadePercentuaisDiferenciadosProdutos.xlsx');
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
                stateStoring: AutoLoad("gridProdutosDiferenciadosParam", false),
                keyExpr: 'CD_PRODUTO',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    { dataField: "CD_PRODUTO", caption: "Código Interno", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "DS_PRODUTO", caption: "Produto", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "CD_EAN_PRODUTO", caption: "Código Barras", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false },
                    { dataField: "CD_FABRICANTE", caption: "Código Fabricante", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", },
                    { dataField: "CD_CURVA_ABC", caption: "ABC", width: 50, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE", caption: "% CashBack Cliente", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
                    { dataField: "PC_PROGRAMA_FIDELIDADE_INDICADOR", caption: "% CashBack Indicador", width: 80, dataType: 'number', format: "###,###,###,###,##0.##'%'", allowEditing: true, allowSorting: true, allowHeaderFiltering: false, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },

                    { dataField: "CD_ORIGINAL", caption: "Código Original", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_OPCIONAL", caption: "Código Opcional", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_PRODUTO_ECOMMERCE", caption: "Código e-Commerce", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_NCM", caption: "NCM", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "CD_CST", caption: "CEST", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "NR_FCI", caption: "Nro. FCI", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_MARCA", caption: "Marca", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_TEXTO_EXPLICATIVO", caption: "Aplicação", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: true, visible: false },
                    { dataField: "DT_INCLUSAO", caption: "Data Cadastro", width: 90, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", width: 100, dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "DS_FORA_LINHA", caption: "Fora Linha", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_KIT", caption: "Kit", width: 70, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                    { dataField: "LG_ENCOMENDA", caption: "Encomenda", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: false, },
                ],

                showBorders: true,

                onCellPrepared: function (e) {

                    if (e.rowType === "data") {
                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }

                        if (e.column.dataField === "DS_FORA_LINHA") {
                            if (e.value === "Sim") {
                                e.cellElement.css("background-color", "#33658a");
                                e.cellElement.css("color", "white");
                            };
                        }

                        if (e.column.dataField === "PC_PROGRAMA_FIDELIDADE" || e.column.dataField === "PC_PROGRAMA_FIDELIDADE_INDICADOR") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("color", "darkred");
                        }
                    }
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-street-view',
                                text: ' Definir % Clientes',
                                hint: 'Define um percentual de Cashback de Clientes para todos os produtos selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-handshake',
                                text: ' Definir % Indicadores',
                                hint: 'Define um percentual de Cashback de Indicadores para todos os produtos selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Clientes',
                                hint: 'Limpa percentual de Cashback de Clientes de todos os produtos selecionados',
                            },
                        },
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'always',
                            options: {
                                icon: 'fa fa-trash',
                                text: ' Limpar % Indicadores',
                                hint: 'Limpa percentual de Cashback de Indicadores de todos os produtos selecionados',
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
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
                                            gridProdutosDiferenciadosParam.state({});
                                            gridProdutosDiferenciadosParam.refresh();

                                            gridProdutosDiferenciadosParam.updateDimensions();
                                        }
                                    });
                                }
                            }
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


    //CLIENTES PARTICIPANTES DO PROGRAMA
    chkParticipantesClientesTodos = $('#chk_Parcipantes_Clientes_Todos').dxCheckBox({
        text: 'Todos os clientes podem participar do programa',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesNenhum.option('value', false);
                chkParticipantesClientesSelecionar.option('value', false);
                chkParticipantesClientesPF.option('value', false);
                chkParticipantesClientesPJ.option('value', false);
            } else if (chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                chkParticipantesClientesTodos.option('value', true);
            }
            $('#cardSelecaoHabilitarClientes').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesPF = $('#chk_Parcipantes_Clientes_PF').dxCheckBox({
        text: 'Apenas clientes Pessoas Físicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesNenhum.option('value', false);
                chkParticipantesClientesSelecionar.option('value', false);
                chkParticipantesClientesTodos.option('value', false);
                chkParticipantesClientesPJ.option('value', false);
            } else if (chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesTodos.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                chkParticipantesClientesPF.option('value', true);
            }
            $('#cardSelecaoHabilitarClientes').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesPJ = $('#chk_Parcipantes_Clientes_PJ').dxCheckBox({
        text: 'Apenas clientes Pessoas Jurídicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesNenhum.option('value', false);
                chkParticipantesClientesSelecionar.option('value', false);
                chkParticipantesClientesTodos.option('value', false);
                chkParticipantesClientesPF.option('value', false);
            } else if (chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesTodos.option('value') == false) {
                chkParticipantesClientesPJ.option('value', true);
            }
            $('#cardSelecaoHabilitarClientes').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesNenhum = $('#chk_Parcipantes_Clientes_Nenhum').dxCheckBox({
        text: 'Nenhum cliente pode participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesTodos.option('value', false);
                chkParticipantesClientesSelecionar.option('value', false);
                chkParticipantesClientesPF.option('value', false);
                chkParticipantesClientesPJ.option('value', false);
            } else if (chkParticipantesClientesTodos.option('value') == false && chkParticipantesClientesSelecionar.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                chkParticipantesClientesNenhum.option('value', true);
            }
            $('#cardSelecaoHabilitarClientes').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesSelecionar = $('#chk_Parcipantes_Clientes_Selecionar').dxCheckBox({
        text: 'Escolher os clientes que podem participar',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesTodos.option('value', false);
                chkParticipantesClientesNenhum.option('value', false);
                chkParticipantesClientesPF.option('value', false);
                chkParticipantesClientesPJ.option('value', false);
            } else if (chkParticipantesClientesTodos.option('value') == false && chkParticipantesClientesNenhum.option('value') == false && chkParticipantesClientesPF.option('value') == false && chkParticipantesClientesPJ.option('value') == false) {
                chkParticipantesClientesSelecionar.option('value', true);
            }

            $('#cardSelecaoHabilitarClientes').slideDown();
        },
    }).dxCheckBox('instance');


    //CLIENTES PARTICIPANTES DO PROGRAMA PARAM
    chkParticipantesClientesTodosParam = $('#chk_Parcipantes_Clientes_Todos_Param').dxCheckBox({
        text: 'Todos os clientes podem participar do programa',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesNenhumParam.option('value', false);
                chkParticipantesClientesSelecionarParam.option('value', false);
                chkParticipantesClientesPFParam.option('value', false);
                chkParticipantesClientesPJParam.option('value', false);
            } else if (chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                chkParticipantesClientesTodosParam.option('value', true);
            }
            $('#cardSelecaoHabilitarClientesParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesPFParam = $('#chk_Parcipantes_Clientes_PF_Param').dxCheckBox({
        text: 'Apenas clientes Pessoas Físicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesNenhumParam.option('value', false);
                chkParticipantesClientesSelecionarParam.option('value', false);
                chkParticipantesClientesTodosParam.option('value', false);
                chkParticipantesClientesPJParam.option('value', false);
            } else if (chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesTodosParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                chkParticipantesClientesPFParam.option('value', true);
            }
            $('#cardSelecaoHabilitarClientesParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesPJParam = $('#chk_Parcipantes_Clientes_PJ_Param').dxCheckBox({
        text: 'Apenas clientes Pessoas Jurídicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesNenhumParam.option('value', false);
                chkParticipantesClientesSelecionarParam.option('value', false);
                chkParticipantesClientesTodosParam.option('value', false);
                chkParticipantesClientesPFParam.option('value', false);
            } else if (chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesTodosParam.option('value') == false) {
                chkParticipantesClientesPJParam.option('value', true);
            }
            $('#cardSelecaoHabilitarClientesParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesNenhumParam = $('#chk_Parcipantes_Clientes_Nenhum_Param').dxCheckBox({
        text: 'Nenhum cliente pode participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesTodosParam.option('value', false);
                chkParticipantesClientesSelecionarParam.option('value', false);
                chkParticipantesClientesPFParam.option('value', false);
                chkParticipantesClientesPJParam.option('value', false);
            } else if (chkParticipantesClientesTodosParam.option('value') == false && chkParticipantesClientesSelecionarParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                chkParticipantesClientesNenhumParam.option('value', true);
            }
            $('#cardSelecaoHabilitarClientesParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesClientesSelecionarParam = $('#chk_Parcipantes_Clientes_Selecionar_Param').dxCheckBox({
        text: 'Escolher os clientes que podem participar',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesClientesTodosParam.option('value', false);
                chkParticipantesClientesNenhumParam.option('value', false);
                chkParticipantesClientesPFParam.option('value', false);
                chkParticipantesClientesPJParam.option('value', false);
            } else if (chkParticipantesClientesTodosParam.option('value') == false && chkParticipantesClientesNenhumParam.option('value') == false && chkParticipantesClientesPFParam.option('value') == false && chkParticipantesClientesPJParam.option('value') == false) {
                chkParticipantesClientesSelecionarParam.option('value', true);
            }

            $('#cardSelecaoHabilitarClientesParam').slideDown();
        },
    }).dxCheckBox('instance');


    //INDICADORES PARTICIPANTES DO PROGRAMA
    chkParticipantesIndicadoresTodos = $('#chk_Parcipantes_Indicadores_Todos').dxCheckBox({
        text: 'Todos os indicadores podem participar do programa',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresNenhum.option('value', false);
                chkParticipantesIndicadoresSelecionar.option('value', false);
                chkParticipantesIndicadoresPF.option('value', false);
                chkParticipantesIndicadoresPJ.option('value', false);
            } else if (chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                chkParticipantesClientesTodos.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadores').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresPF = $('#chk_Parcipantes_Indicadores_PF').dxCheckBox({
        text: 'Apenas indicadores Pessoas Físicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresNenhum.option('value', false);
                chkParticipantesIndicadoresSelecionar.option('value', false);
                chkParticipantesIndicadoresTodos.option('value', false);
                chkParticipantesIndicadoresPJ.option('value', false);
            } else if (chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresTodos.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                chkParticipantesIndicadoresPF.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadores').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresPJ = $('#chk_Parcipantes_Indicadores_PJ').dxCheckBox({
        text: 'Apenas indicadores Pessoas Jurídicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresNenhum.option('value', false);
                chkParticipantesIndicadoresSelecionar.option('value', false);
                chkParticipantesIndicadoresTodos.option('value', false);
                chkParticipantesIndicadoresPF.option('value', false);
            } else if (chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresTodos.option('value') == false) {
                chkParticipantesIndicadoresPJ.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadores').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresNenhum = $('#chk_Parcipantes_Indicadores_Nenhum').dxCheckBox({
        text: 'Nenhum indicador pode participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresTodos.option('value', false);
                chkParticipantesIndicadoresSelecionar.option('value', false);
                chkParticipantesIndicadoresPF.option('value', false);
                chkParticipantesIndicadoresPJ.option('value', false);
            } else if (chkParticipantesIndicadoresTodos.option('value') == false && chkParticipantesIndicadoresSelecionar.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                chkParticipantesIndicadoresNenhum.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadores').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresSelecionar = $('#chk_Parcipantes_Indicadores_Selecionar').dxCheckBox({
        text: 'Escolher os indicadores que podem participar',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresTodos.option('value', false);
                chkParticipantesIndicadoresNenhum.option('value', false);
                chkParticipantesIndicadoresPF.option('value', false);
                chkParticipantesIndicadoresPJ.option('value', false);
            } else if (chkParticipantesIndicadoresTodos.option('value') == false && chkParticipantesIndicadoresNenhum.option('value') == false && chkParticipantesIndicadoresPF.option('value') == false && chkParticipantesIndicadoresPJ.option('value') == false) {
                chkParticipantesIndicadoresSelecionar.option('value', true);
            }

            $('#cardSelecaoHabilitarIndicadores').slideDown();
        },
    }).dxCheckBox('instance');

    //INDICADORES PARTICIPANTES DO PROGRAMA PARAM
    chkParticipantesIndicadoresTodosParam = $('#chk_Parcipantes_Indicadores_Todos_Param').dxCheckBox({
        text: 'Todos os indicadores podem participar do programa',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresNenhumParam.option('value', false);
                chkParticipantesIndicadoresSelecionarParam.option('value', false);
                chkParticipantesIndicadoresPFParam.option('value', false);
                chkParticipantesIndicadoresPJParam.option('value', false);
            } else if (chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                chkParticipantesClientesTodosParam.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresPFParam = $('#chk_Parcipantes_Indicadores_PF_Param').dxCheckBox({
        text: 'Apenas indicadores Pessoas Físicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresNenhumParam.option('value', false);
                chkParticipantesIndicadoresSelecionarParam.option('value', false);
                chkParticipantesIndicadoresTodosParam.option('value', false);
                chkParticipantesIndicadoresPJParam.option('value', false);
            } else if (chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresTodosParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                chkParticipantesIndicadoresPFParam.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresPJParam = $('#chk_Parcipantes_Indicadores_PJ_Param').dxCheckBox({
        text: 'Apenas indicadores Pessoas Jurídicas podem participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresNenhumParam.option('value', false);
                chkParticipantesIndicadoresSelecionarParam.option('value', false);
                chkParticipantesIndicadoresTodosParam.option('value', false);
                chkParticipantesIndicadoresPFParam.option('value', false);
            } else if (chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresTodosParam.option('value') == false) {
                chkParticipantesIndicadoresPJParam.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresNenhumParam = $('#chk_Parcipantes_Indicadores_Nenhum_Param').dxCheckBox({
        text: 'Nenhum indicador pode participar do programa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresTodosParam.option('value', false);
                chkParticipantesIndicadoresSelecionarParam.option('value', false);
                chkParticipantesIndicadoresPFParam.option('value', false);
                chkParticipantesIndicadoresPJParam.option('value', false);
            } else if (chkParticipantesIndicadoresTodosParam.option('value') == false && chkParticipantesIndicadoresSelecionarParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                chkParticipantesIndicadoresNenhumParam.option('value', true);
            }
            $('#cardSelecaoHabilitarIndicadoresParam').slideUp();
        },
    }).dxCheckBox('instance');

    chkParticipantesIndicadoresSelecionarParam = $('#chk_Parcipantes_Indicadores_Selecionar_Param').dxCheckBox({
        text: 'Escolher os indicadores que podem participar',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font-md',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkParticipantesIndicadoresTodosParam.option('value', false);
                chkParticipantesIndicadoresNenhumParam.option('value', false);
                chkParticipantesIndicadoresPFParam.option('value', false);
                chkParticipantesIndicadoresPJParam.option('value', false);
            } else if (chkParticipantesIndicadoresTodosParam.option('value') == false && chkParticipantesIndicadoresNenhumParam.option('value') == false && chkParticipantesIndicadoresPFParam.option('value') == false && chkParticipantesIndicadoresPJParam.option('value') == false) {
                chkParticipantesIndicadoresSelecionarParam.option('value', true);
            }

            $('#cardSelecaoHabilitarIndicadoresParam').slideDown();
        },
    }).dxCheckBox('instance');

    //PERCENTUAIS PADRÃO DE CASHBACK PARA CLIENTES E INDICADORES
    nbx_Pc_CashBack_Clientes = $('#nbx_Pc_CashBack_Clientes').dxNumberBox({
        value: 0,
        format: '###,###0.##%',
        min: 0,
        max: 100,
        showClearButton: false,
        showSpinButtons: false,
        step: 0.01,
        placeholder: '% CashBack',
        elementAttr: {
            class: 'numberBox-format',
        },
        onValueChanged: function (e) {
            var pcCashBack = (e.value * 100).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
            $('#labelPcCashBackPadraoClientes').hide().text(pcCashBack + '%').fadeIn(500);
        },
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });

            var placeholderElement = e.component._$element.find('.dx-placeholder');
            placeholderElement.addClass('numberBox-format');
        },
    }).dxNumberBox('instance');

    nbx_Pc_CashBack_Indicadores = $('#nbx_Pc_CashBack_Indicadores').dxNumberBox({
        value: 0,
        format: '###,###0.##%',
        min: 0,
        max: 100,
        showClearButton: false,
        showSpinButtons: false,
        step: 0.01,
        placeholder: '% CashBack',
        elementAttr: {
            class: 'numberBox-format',
        },
        onValueChanged: function (e) {
            var pcCashBack = (e.value * 100).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
            $('#labelPcCashBackPadraoIndicadores').hide().text(pcCashBack + '%').fadeIn(500);
        },
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });

            var placeholderElement = e.component._$element.find('.dx-placeholder');
            placeholderElement.addClass('numberBox-format');
        },
    }).dxNumberBox('instance');


    //PERCENTUAIS PADRÃO PARA EDIÇÃO DE CASHBACK PARA CLIENTES E INDICADORES
    nbx_Pc_CashBack_Clientes_Param = $('#nbx_Pc_CashBack_Clientes_Param').dxNumberBox({
        value: 0,
        format: '###,###0.##%',
        min: 0,
        max: 100,
        showClearButton: false,
        showSpinButtons: false,
        step: 0.01,
        placeholder: '% CashBack',
        elementAttr: {
            class: 'numberBox-format',
        },
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });

            var placeholderElement = e.component._$element.find('.dx-placeholder');
            placeholderElement.addClass('numberBox-format');
        },
    }).dxNumberBox('instance');

    nbx_Pc_CashBack_Indicadores_Param = $('#nbx_Pc_CashBack_Indicadores_Param').dxNumberBox({
        value: 0,
        format: '###,###0.##%',
        min: 0,
        max: 100,
        showClearButton: false,
        showSpinButtons: false,
        step: 0.01,
        placeholder: '% CashBack',
        elementAttr: {
            class: 'numberBox-format',
        },
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });

            var placeholderElement = e.component._$element.find('.dx-placeholder');
            placeholderElement.addClass('numberBox-format');
        },
    }).dxNumberBox('instance');


    //RESTITUIÇÃO DE CRÉDITO 
    chkNaoPermiteRestituicaoCreditoCliente = $('#chkNaoPermiteRestituicaoCreditoCliente').dxCheckBox({
        text: 'Os Clientes não podem realizar saques, apenas podem utilizar os créditos para novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkPermiteRestituicaoCreditoCliente.option('value', false);
            } else if (chkPermiteRestituicaoCreditoCliente.option('value') == false) {
                chkNaoPermiteRestituicaoCreditoCliente.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkPermiteRestituicaoCreditoCliente = $('#chkPermiteRestituicaoCreditoCliente').dxCheckBox({
        text: 'Os Clientes podem realizar saques em dinheiro de seus créditos diretamente no caixa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoPermiteRestituicaoCreditoCliente.option('value', false);
            } else if (chkNaoPermiteRestituicaoCreditoCliente.option('value') == false) {
                chkPermiteRestituicaoCreditoCliente.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkNaoPermiteRestituicaoCreditoIndicadores = $('#chkNaoPermiteRestituicaoCreditoIndicadores').dxCheckBox({
        text: 'Os Indicadores não podem realizar saques, apenas podem utilizar os créditos para novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkPermiteRestituicaoCreditoIndicadores.option('value', false);
            } else if (chkPermiteRestituicaoCreditoIndicadores.option('value') == false) {
                chkNaoPermiteRestituicaoCreditoIndicadores.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkPermiteRestituicaoCreditoIndicadores = $('#chkPermiteRestituicaoCreditoIndicadores').dxCheckBox({
        text: 'Os Indicadores podem realizar saques em dinheiro de seus créditos diretamente no caixa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoPermiteRestituicaoCreditoIndicadores.option('value', false);
            } else if (chkNaoPermiteRestituicaoCreditoIndicadores.option('value') == false) {
                chkPermiteRestituicaoCreditoIndicadores.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    //RESTITUIÇÃO DE CRÉDITO EDIÇÃO
    chkNaoPermiteRestituicaoCreditoClienteParam = $('#chkNaoPermiteRestituicaoCreditoClienteParam').dxCheckBox({
        text: 'Os Clientes não podem realizar saques, apenas podem utilizar os créditos para novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkPermiteRestituicaoCreditoClienteParam.option('value', false);
            } else if (chkPermiteRestituicaoCreditoClienteParam.option('value') == false) {
                chkNaoPermiteRestituicaoCreditoClienteParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkPermiteRestituicaoCreditoClienteParam = $('#chkPermiteRestituicaoCreditoClienteParam').dxCheckBox({
        text: 'Os Clientes podem realizar saques em dinheiro de seus créditos diretamente no caixa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoPermiteRestituicaoCreditoClienteParam.option('value', false);
            } else if (chkNaoPermiteRestituicaoCreditoClienteParam.option('value') == false) {
                chkPermiteRestituicaoCreditoClienteParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkNaoPermiteRestituicaoCreditoIndicadoresParam = $('#chkNaoPermiteRestituicaoCreditoIndicadoresParam').dxCheckBox({
        text: 'Os Indicadores não podem realizar saques, apenas podem utilizar os créditos para novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkPermiteRestituicaoCreditoIndicadoresParam.option('value', false);
            } else if (chkPermiteRestituicaoCreditoIndicadoresParam.option('value') == false) {
                chkNaoPermiteRestituicaoCreditoIndicadoresParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkPermiteRestituicaoCreditoIndicadoresParam = $('#chkPermiteRestituicaoCreditoIndicadoresParam').dxCheckBox({
        text: 'Os Indicadores podem realizar saques em dinheiro de seus créditos diretamente no caixa',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoPermiteRestituicaoCreditoIndicadoresParam.option('value', false);
            } else if (chkNaoPermiteRestituicaoCreditoIndicadoresParam.option('value') == false) {
                chkPermiteRestituicaoCreditoIndicadoresParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    //GERAÇÃO DE NOVO CASHBACK PARA CRÉDITOS UTILIZADOS EM NOVAS COMPRAS
    chkNaoGerarCashBackCreditosUtilizadosCliente = $('#chkNaoGerarCashBackCreditosUtilizadosCliente').dxCheckBox({
        text: 'Não gerar CashBack quando o Cliente utilizar seus créditos em novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkGerarCashBackCreditosUtilizadosCliente.option('value', false);
            } else if (chkGerarCashBackCreditosUtilizadosCliente.option('value') == false) {
                chkNaoGerarCashBackCreditosUtilizadosCliente.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkGerarCashBackCreditosUtilizadosCliente = $('#chkGerarCashBackCreditosUtilizadosCliente').dxCheckBox({
        text: 'Gerar novo CashBack quando o Cliente utilizar seus créditos em novas compras',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoGerarCashBackCreditosUtilizadosCliente.option('value', false);
            } else if (chkNaoGerarCashBackCreditosUtilizadosCliente.option('value') == false) {
                chkGerarCashBackCreditosUtilizadosCliente.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkNaoGerarCashBackCreditosUtilizadosIndicadores = $('#chkNaoGerarCashBackCreditosUtilizadosIndicadores').dxCheckBox({
        text: 'Não gerar CashBack quando o Indicador utilizar seus créditos em novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkGerarCashBackCreditosUtilizadosIndicadores.option('value', false);
            } else if (chkGerarCashBackCreditosUtilizadosIndicadores.option('value') == false) {
                chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkGerarCashBackCreditosUtilizadosIndicadores = $('#chkGerarCashBackCreditosUtilizadosIndicadores').dxCheckBox({
        text: 'Gerar novo CashBack quando o Indicador utilizar seus créditos em novas compras',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value', false);
            } else if (chkNaoGerarCashBackCreditosUtilizadosIndicadores.option('value') == false) {
                chkGerarCashBackCreditosUtilizadosIndicadores.option('value', true);
            }
        },
    }).dxCheckBox('instance');


    //GERAÇÃO DE NOVO CASHBACK PARA CRÉDITOS UTILIZADOS EM NOVAS COMPRAS (EDIÇÃO)
    chkNaoGerarCashBackCreditosUtilizadosClienteParam = $('#chkNaoGerarCashBackCreditosUtilizadosClienteParam').dxCheckBox({
        text: 'Não gerar CashBack quando o Cliente utilizar seus créditos em novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkGerarCashBackCreditosUtilizadosClienteParam.option('value', false);
            } else if (chkGerarCashBackCreditosUtilizadosClienteParam.option('value') == false) {
                chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkGerarCashBackCreditosUtilizadosClienteParam = $('#chkGerarCashBackCreditosUtilizadosClienteParam').dxCheckBox({
        text: 'Gerar novo CashBack quando o Cliente utilizar seus créditos em novas compras',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value', false);
            } else if (chkNaoGerarCashBackCreditosUtilizadosClienteParam.option('value') == false) {
                chkGerarCashBackCreditosUtilizadosClienteParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam = $('#chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam').dxCheckBox({
        text: 'Não gerar CashBack quando o Indicador utilizar seus créditos em novas compras',
        value: true,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', false);
            } else if (chkGerarCashBackCreditosUtilizadosIndicadoresParam.option('value') == false) {
                chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');

    chkGerarCashBackCreditosUtilizadosIndicadoresParam = $('#chkGerarCashBackCreditosUtilizadosIndicadoresParam').dxCheckBox({
        text: 'Gerar novo CashBack quando o Indicador utilizar seus créditos em novas compras',
        value: false,
        iconSize: 20,
        elementAttr: {
            class: 'checkbox-font',
        },
        onValueChanged(e) {
            if (e.value == true) {
                chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', false);
            } else if (chkNaoGerarCashBackCreditosUtilizadosIndicadoresParam.option('value') == false) {
                chkGerarCashBackCreditosUtilizadosIndicadoresParam.option('value', true);
            }
        },
    }).dxCheckBox('instance');


    $('#chk_Ativar_Programa').dxSwitch({
        value: true,
        switchedOffText: 'DESATIVADO',
        switchedOnText: 'ATIVADO',
        width: '120',
        onOptionChanged: function (e) {
            $('.dx-switch .dx-switch-off').css({
                'color': 'darkred',
            });
            $('.dx-switch .dx-switch-on').css({
                'color': 'rgb(51,122,183)',
            });
        },
        onValueChanged: function (e) {
            if (e.value) {
                $('#cardDataInicioTermino').slideDown();
            } else {
                $('#cardDataInicioTermino').slideUp();
            }
        },
        elementAttr: {
            id: "elementId",
            class: "switch-font"
        },
    });

    $('#chk_Ativar_Programa_Param').dxSwitch({
        value: true,
        switchedOffText: 'DESATIVADO',
        switchedOnText: 'ATIVADO',
        width: '120',
        onOptionChanged: function (e) {
            $('.dx-switch .dx-switch-off').css({
                'color': 'darkred',
            });
            $('.dx-switch .dx-switch-on').css({
                'color': 'rgb(51,122,183)',
            });
        },
        onValueChanged: function (e) {
            if (e.value) {
                $('#cardDataInicioTerminoParam').slideDown();
            } else {
                $('#cardDataInicioTerminoParam').slideUp();
            }
        },
        elementAttr: {
            id: "elementId",
            class: "switch-font"
        },
    });

    $('#dt_Inicio_Programa').dxDateBox({
        //labelMode: 'floating',
        //label: 'Data de Início do Programa',
        //placeholder: 'Data de Início do Programa',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: Date(),
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });
        },
    });

    $('#dt_Inicio_Programa_Param').dxDateBox({
        //labelMode: 'floating',
        //label: 'Data de Início do Programa',
        //placeholder: 'Data de Início do Programa',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: Date(),
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });
        },
    });

    $('#dt_Termino_Programa').dxDateBox({
        //labelMode: 'floating',
        //label: 'Data de Término do Programa',
        placeholder: 'Sem data de término',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        //value: Date(),
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });
        },
    });

    $('#dt_Termino_Programa_Param').dxDateBox({
        //labelMode: 'floating',
        //label: 'Data de Término do Programa',
        placeholder: 'Sem data de término',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        //value: Date(),
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });
        },
    });

    $('#popoverDefinicaoIndicadores').dxPopover({
        target: '#linkDefinicaoIndicadores',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'right',
        //width: 500,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

});

const animateCSS = (elements, animation, operacao = 'in', duration = 400, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        elements = !Array.isArray(elements) ? [elements] : elements;
        const animationName = `${prefix}${animation}`;

        elements.forEach((element, index) => {
            const node = document.querySelector(element);
            node.style.animationDuration = duration + 'ms';
            node.classList.add(`${prefix}animated`, animationName);
            node.addEventListener('animationend', handleAnimationEnd, { once: true });
            if (operacao == 'in')
                $(element).show();
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                if (operacao == 'out') $(element).hide();
                if (index == elements.length - 1) resolve('Animation ended');
            }
        });
    });

function desabilitaTodosPanels() {
    ExibirEsconderPaineis('cardInicio', 'none');
    ExibirEsconderPaineis('cardFiliais', 'none');
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
function alteraClasseLabelExcecaoPercentual(el) {
    if ($(el).hasClass("text-primary") == true) {
        $(el).removeClass("text-primary");
    } else {
        $(el).addClass("text-primary");
    }
}

function avancaProximaEtapa(cardInibir, cardExibir) {
    animateCSS(cardInibir, 'fadeOutLeft', 'out').then(() => {
        animateCSS(cardExibir, 'fadeInRight');
    });

    rolarTopo();
}

function retornaEtapaAnterior(cardInibir, cardExibir) {
    animateCSS(cardInibir, 'fadeOutRight', 'out').then(() => {
        animateCSS(cardExibir, 'fadeInLeft');
    });

    rolarTopo();
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

function rolarTopo() {
    window.scrollTo(0, 0);
};

function AbrirModal(e) {
    $(e).modal('toggle');
}
