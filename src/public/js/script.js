function buscarEndereco() {
    let cep = document.getElementById('cep').value;
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(urlAPI)
        .then(response => response.json())  // Corrigido o nome da variável para 'response'
        .then(dados => {
            document.getElementById('logradouro').value = dados.logradouro;
            document.getElementById('bairro').value = dados.bairro;
            document.getElementById('cidade').value = dados.localidade;
            document.getElementById('uf').value = dados.uf;
            document.getElementById('complemento').value = dados.complemento;
        })
        .catch(error => console.error('Erro ao buscar o endereço:', error));
}



// Validar CPF
function validaCPF(cpf) {

    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Verifica se tem 11 dígitos e se não é uma sequência repetida (ex: 111.111.111-11)
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

// Checar CPF
function testaCPF() {

    let inputCPF = document.getElementById('cpf');
    let cpfNotificacao = document.getElementById('cpfNotificacao');

    if (!validaCPF(inputCPF.value)) {
        cpfNotificacao.style.display = "block"; // Mostra o popup
        

    } else {
        cpfNotificacao.style.display = "none"; // Esconde o popup
    }
}