
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const denuncias = JSON.parse(localStorage.getItem('todasDenuncias')) || [];
    const denuncia = denuncias.find(d => d.id === id);

    const div = document.getElementById('detalhes');

    if (denuncia) {
      div.innerHTML = `
        <p><strong>Logradouro:</strong> ${denuncia.logradouro}</p>
        <p><strong>Bairro:</strong> ${denuncia.bairro}</p>
        <p><strong>CEP:</strong> ${denuncia.cep}</p>
        <p><strong>Referência:</strong> ${denuncia.referencia}</p>
        <p><strong>Descrição:</strong> ${denuncia.descricao}</p>
        <p><strong>Moradores:</strong> ${denuncia.moradores}</p>
        <p><strong>Necessidade Especial:</strong> ${denuncia.necessidadeEspecial}</p>
        <p><strong>Descrição da Necessidade:</strong> ${denuncia.textoNecessidade}</p>
      `;
    } else {
      div.innerHTML = `<p>Denúncia não encontrada.</p>`;
    }