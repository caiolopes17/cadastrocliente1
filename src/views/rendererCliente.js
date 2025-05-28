// Buscar CEP
function buscarCEP() {
    //console.log("teste do evento blur")
    //armazenar o cep digitado na variável
    let cep = document.getElementById('inputCEPClient').value
    //console.log(cep) //teste de recebimento do CEP
    //"consumir" a API do ViaCEP
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    //acessando o web service par abter os dados
    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            //extração dos dados
            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighborhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value = dados.localidade
            document.getElementById('inputUFClient').value = dados.uf
        })
        .catch(error => console.log(error))
}

// capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificado como 'searchClient'
const foco = document.getElementById('searchClient')

// Criar um vetor global para extrair os dados do cliente
let arrayClient = []

// Iniciar a janela de clientes alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded', () => {
    // Desativar os botões editar e excluir
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Ativar o botão adicionar
    btnCreate.disabled = false
    // Foco na busca do cliente
    foco.focus()
})

//captura dos dados dos inputs do formulário (Passo 1: Fluxo)
let frmClient = document.getElementById('formClient')
let nameClient = document.getElementById('inputNameClient')
let cpfClient = document.getElementById('inputCPFClient')
let emailClient = document.getElementById('inputEmailClient')
let phoneClient = document.getElementById('inputPhoneClient')
let cepClient = document.getElementById('inputCEPClient')
let addressClient = document.getElementById('inputAddressClient')
let numberClient = document.getElementById('inputNumberClient')
let complementClient = document.getElementById('inputComplementClient')
let neighborhoodClient = document.getElementById('inputNeighborhoodClient')
let cityClient = document.getElementById('inputCityClient')
let ufClient = document.getElementById('inputUFClient')
// Uso do ID para o delete e update
let idClient = document.getElementById('inputIdClient')

// ============================================================
// == Manipulação do Enter ====================================

function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault() // ignorar o comportamento padrão
        // executar o método de busca do cliente
        searchName()
    }
}

// "Escuta" do teclado ('keydown' = pressionar tecla)
frmClient.addEventListener('keydown', teclaEnter)

// função para restaurar o padrão (tecla Enter)
function restaurarEnter() {
    frmClient.removeEventListener('keydown', teclaEnter)
}

// == Fim - Manipulação do Enter ==============================
// ============================================================


// ============================================================
// == CRUD Create/Update ======================================

//Evento associado ao botão submit (uso das validações do html)
frmClient.addEventListener('submit', async (event) => {
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
    //console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, complementClient.value, neighborhoodClient.value, cityClient.value, ufClient.value)
    //Criar um objeto para armazenar os dados do cliente antes de enviar ao main

    // Estratégia para usar o submit para cadastrar um novo cliente ou editar os dados de um cliente já existente
    // verificar se existe o id do cliente
    if (idClient.value === "") {
        // cadastrar um novo cliente
        const client = {
            nameCli: nameClient.value,
            cpfCli: cpfClient.value,
            emailCli: emailClient.value,
            phoneCli: phoneClient.value,
            cepCli: cepClient.value,
            addressCli: addressClient.value,
            numberCli: numberClient.value,
            complementCli: complementClient.value,
            neighborhoodCli: neighborhoodClient.value,
            cityCli: cityClient.value,
            ufCli: ufClient.value
        }
        // Enviar ao main o objeto client - (Passo 2: fluxo)
        // uso do preload.js
        api.newClient(client)
    } else {
        // alterar os dados de um cliente existente
        // teste de validação do id
       // console.log(idClient.value)  // teste de validação
       // editar um cliente existente
       const client = {
        idCli: idClient.value,
        nameCli: nameClient.value,
        cpfCli: cpfClient.value,
        emailCli: emailClient.value,
        phoneCli: phoneClient.value,
        cepCli: cepClient.value,
        addressCli: addressClient.value,
        numberCli: numberClient.value,
        complementCli: complementClient.value,
        neighborhoodCli: neighborhoodClient.value,
        cityCli: cityClient.value,
        ufCli: ufClient.value
    }
    // Enviar ao main o objeto client - (Passo 2: fluxo)
    // Uso do preload.js
    api.updateClient(client)
    }
})

// == Fim CRUD Create/Update ==================================
// ============================================================


// ============================================================
// == CRUD Read ===============================================

// setar o nome do cliente para fazer um novo cadastro se a busca retornar que o cliente não está cadastrado.
api.setName((args) => {
    console.log("teste do IPC 'set-name'")
    // "recortar" o nome da busca e setar no campo nome do form
    let busca = document.getElementById('searchClient').value
    // limpar o campo de busca (foco foi capturado de forma global)
    foco.value = ""
    // foco no campo nome
    nameClient.focus()
    // copiar o nome do cliente para o campo nome
    nameClient.value = busca
    // restaurar tecla Enter
    restaurarEnter()
})

function searchName() {
    //console.log("teste do botão buscar")
    //capturar o nome a ser pesquisado (passo 1)
    let cliName = document.getElementById('searchClient').value
    console.log(cliName) // teste do passo 1
    // validação de campo obrigatório
    // se o campo de busca não foi preenchido
    if (cliName === "") {
        // enviar ao main um pedido para alertar o usuário
        // precisa usar o preload.js
        api.validateSearch()
    } else {
        //enviar o nome do cliente ao main (passo 2)
        api.searchName(cliName)
        //receber os dados do cliente (passo 5)
        api.renderClient((event, client) => {
            //teste de recebimento dos dados do cliente
            console.log(client)
            //passo 6 renderização dos dados do cliente (preencher os inputs do form) - Não esquecer de converte os dados de string para JSON
            const clientData = JSON.parse(client)
            arrayClient = clientData
            // uso do forEach para percorrer o vetor e extrair os dados
            arrayClient.forEach((c) => {
                idClient.value = c._id
                nameClient.value = c.nomeCliente
                cpfClient.value = c.cpfCliente
                emailClient.value = c.emailCliente
                phoneClient.value = c.foneCliente
                cepClient.value = c.cepCliente
                addressClient.value = c.logradouroCliente
                numberClient.value = c.numeroCliente
                complementClient.value = c.complementoCliente
                neighborhoodClient.value = c.bairroCliente
                cityClient.value = c.cidadeCliente
                ufClient.value = c.ufCliente
                // restaurar a tecla Enter
                restaurarEnter()
                // desativar o botão adicionar
                btnCreate.disabled = true
                // ativar os botões editar e excluir
                btnUpdate.disabled = false
                btnDelete.disabled = false
            })
        })
    }
}

// == Fim - CRUD Read =========================================
// ============================================================


// ============================================================
// == CRUD Delete =============================================

function removeClient() {
    //console.log(idClient.value) // teste do Passo 1
    // Passo 2 - Envio do id para o main
    api.deleteClient(idClient.value)
}

// == Fim - CRUD Delete =======================================
// ============================================================


// ============================================================
// == Reset Form ==============================================
function resetForm() {
    location.reload()
}

api.resetForm((args) => {
    resetForm()
})
// == Fim Reset Form ==========================================
// ============================================================