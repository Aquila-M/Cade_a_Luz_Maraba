document.addEventListener('DOMContentLoaded', function() {
    const formDenuncia = document.getElementById('form-denuncia');
    const listaDenunciasUL = document.getElementById('lista-denuncias');
    const filtroInput = document.getElementById('filtro-bairro');

    const selectNecessidade = document.getElementById('denuncia-necessidade-especial');
    const containerDescricaoNecessidade = document.getElementById('container-descricao-necessidade');
    const inputArquivo = document.getElementById('denuncia-arquivo');
    const nomeArquivoSpan = document.getElementById('nome-arquivo');

    const form = document.getElementById('form-denuncia');
    const modal = document.getElementById('alert-dialog');
    const entendiBtn = document.getElementById('entendi-btn');
    const cancelarBtn = document.getElementById('cancelar-btn');

    form.addEventListener('submit', function (event){
        event.preventDefault();
        modal.style.display = 'block';
    });

    entendiBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        form.submit();
    });

    cancelarBtn.addEventListener('click', function (){
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event){
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function getTodasDenuncias() {
        return JSON.parse(localStorage.getItem('denuncias')) || [];
    }

    function renderizarDenuncias(denuncias) {
        listaDenunciasUL.innerHTML = '';

        if (denuncias.length === 0) {
            listaDenunciasUL.innerHTML = '<li>Nenhuma denúncia encontrada.</li>';
            return;
        }

        denuncias.forEach(function(denuncia) {
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `
                <span>${denuncia.bairro}</span>
                <span>${denuncia.descricao}</span>
                <span>${new Date(denuncia.data).toLocaleDateString('pt-BR')}</span>
            `;
            listaDenunciasUL.appendChild(itemLista);
        });
    }

    selectNecessidade.addEventListener('change', function() {
        if (selectNecessidade.value === 'sim') {
            containerDescricaoNecessidade.style.display = 'block';
        } else {
            containerDescricaoNecessidade.style.display = 'none';
        }
    });

    inputArquivo.addEventListener('change', function() {
        if (inputArquivo.files.length > 0) {
            nomeArquivoSpan.textContent = inputArquivo.files[0].name;
        } else {
            nomeArquivoSpan.textContent = 'Nenhum arquivo selecionado';
        }
    });

    formDenuncia.addEventListener('submit', function(event) {
        event.preventDefault();

        const bairroValue = document.getElementById('denuncia-bairro').value.trim();
        const descricaoValue = document.getElementById('denuncia-descricao').value.trim();

        if (bairroValue === '' || descricaoValue === '') {
            alert('Por favor, preencha o bairro e a descrição da ocorrência.');
            return;
        }

        const todasDenuncias = getTodasDenuncias();
        const novaDenuncia = {
            bairro: bairroValue,
            descricao: descricaoValue,
            data: new Date().toISOString(),
            id: Date.now()
        };
        todasDenuncias.push(novaDenuncia);
        localStorage.setItem('denuncias', JSON.stringify(todasDenuncias));

        alert('Denúncia realizada com sucesso!');
        
        formDenuncia.reset();
        nomeArquivoSpan.textContent = 'Nenhum arquivo selecionado';
        containerDescricaoNecessidade.style.display = 'none';
        
        filtroInput.value = '';
        renderizarDenuncias(getTodasDenuncias());
    });

    filtroInput.addEventListener('keyup', function() {
        const termoBusca = filtroInput.value.toLowerCase();
        const denunciasFiltradas = getTodasDenuncias().filter(function(denuncia) {
            return denuncia.bairro.toLowerCase().includes(termoBusca);
        });
        renderizarDenuncias(denunciasFiltradas);
    });

    renderizarDenuncias(getTodasDenuncias());
});