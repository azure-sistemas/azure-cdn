
const connectionWS = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Warning)
    .build();

const createPopover = (target, text) => {
    const $body = document.querySelector('body');
    const $div = $body.appendChild(document.createElement('div'));
    $div.classList.add('text-center');
    $div.innerText = text;

    return new DevExpress.ui.dxPopover($div, {
        target: target,
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        maxWidth: 200,
    });
}
const dxComp = new loadComponentes();

function loadComponentes() {
    this.btnNovo = new DevExpress.ui.dxButton('#btnNovo', {
        text: "Novo Upload",
        icon: "fa-solid fa-plus",
        onClick: () => {
            location.reload();
        },
        onInitialized: (e) => {
            createPopover(e.element, "Recarregar a página e realizar novo upload");
        },
    });

    this.btnSair = new DevExpress.ui.dxButton('#btnSair', {
        text: "Voltar ao Painel Central",
        icon: "fa-solid fa-door-open",
        onClick: () => {
            window.location = '/';
        },
        onInitialized: (e) => {
            createPopover(e.element, "Sair para o painel central");
        },
    });

    this.btnSairHeader = new DevExpress.ui.dxButton('#btnSairHeader', {
        icon: "fa-solid fa-x",
        onClick: () => {
            window.location = '/';
        },
        onInitialized: (e) => {
            createPopover(e.element, "Sair para o painel central");
        },
    });

    this.btnCarregar = new DevExpress.ui.dxButton('#btnCarregar', {
        text: "Carregar tabelas",
        icon: "fas fa-table",
        onClick: () => {
            window.location = '/ibpt/carga';
        },
        onInitialized: (e) => {
            createPopover(e.element, "Ir para a tela de carga de tabelas IBPT");
        },
    });

    this.progressBarStatus = new DevExpress.ui.dxProgressBar("#progressBarStatus", {
        min: 0,
        max: 100,
        width: "100%",
        statusFormat: (value) => {
            return "Carregando: " + value * 100 + "%";
        },
    });

    this.fileUploader = new DevExpress.ui.dxFileUploader('#file-uploader', {
        dialogTrigger: '#dropzone-external',
        dropZone: '#dropzone-external',
        multiple: false,
        allowedFileExtensions: ['.csv'],
        uploadMode: 'useButtons',
        uploadMethod: 'POST',
        uploadUrl: '/IBPT/UploadPlanilha',
        visible: false,
        onValueChanged: async (e) => {
            if (!connectionWS.connectionStarted) {
                await connectionWS.start();
            }
            e.component.option('uploadUrl', `/IBPT/UploadPlanilha?connId=${connectionWS.connection.connectionId}`);
            e.component.upload();
            this.progressBarStatus.option('value', 50);
        },
        onDropZoneEnter: (e) => e.component.toggleDropZoneActive(e.dropZoneElement, true),
        onDropZoneLeave: (e) => e.component.toggleDropZoneActive(e.dropZoneElement, false),
        onUploaded: (e) => {
            this.progressBarStatus.option('value', '100');
            connectionWS.stop();
            $('#CarregandoPlanilha').fadeOut(() => {
                const response = JSON.parse(e.request.response);
                $("#versaoAtual").text('Versão: ' + response.versao);
                $("#alterados").text(response.quantidade + ' registros carregados');
                $('#CargaConcluida, #CargaConcluidaBotoes').fadeIn();
            });
        },
        onProgress: (e) => {
            this.progressBarStatus.option('value', Math.trunc((e.bytesLoaded / e.bytesTotal) * 50));
        },
        onUploadStarted: () => {
            $('#UploadArquivo').fadeOut(() => {
                $('#CardResultadoCarga,#EstapasProcesso').fadeIn();
                this.progressBarStatus.option('visible', true);
            })
        },
        onInitialized: (e) => {
            e.component.toggleDropZoneActive = (dropZone, isActive) => {
                dropZone.classList[isActive ? 'remove' : 'add']('dx-theme-border-color');
                dropZone.classList[isActive ? 'add' : 'remove']('dropzone-active', 'dx-theme-accent-as-border-color');
            }
            connectionWS.on("Progresso", (a) => {
                $("#timer").text('1');
                $("#processo").text('Gravação no banco de dados');
                this.progressBarStatus.option('value', Math.trunc(a.progresso));
            });
        },
    });
}