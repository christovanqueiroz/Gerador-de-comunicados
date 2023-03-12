// Data de hoje
const dataDeHoje = document.getElementById('hoje');

dataDeHoje.value = new Intl.DateTimeFormat('pt-BR').format(new Date());

// Data do tratamento
const dataDoTratamento = document.getElementById('tratamento');
const date = new Date();

let dia = date.getDate() + 1;
dia = dia.toString().padStart(2, '0');
let mes = date.getMonth() + 1;
mes = mes.toString().padStart(2, '0');
let ano = date.getFullYear();

let proximoDia = dia + '/' + mes + '/' + ano

dataDoTratamento.value = proximoDia

// CNPJ texto para apenas números
function transformaEmNumero() {
    let cnpjDoCliente = document.getElementById('cnpj');
    cnpjDoCliente.value = cnpjDoCliente.value.replace(/\D/g, '')
}

// Nome do cliente de acordo com CNPJ digitado
let url;
let data;
let cnpj;
let nomeDoCliente;

const consultaCNPJ = async() => {
    cnpjDoClienteValor = document.getElementById('cnpj').value;
    url = `https://publica.cnpj.ws/cnpj/${cnpjDoClienteValor}`;
    data = await fetch(url);
    cnpj = await data.json();
    nomeDoCliente = document.getElementById('cliente');
    nomeDoCliente.value = cnpj.razao_social;
}

// Salvar dados do comunicado

const numeroComunicado = document.getElementById('comunicado');
const horarioTratamento = document.getElementById('hora');
const endereçoTratamento = document.getElementById('endereço');
const quantidade = document.getElementById('quantidade');
const tipoDeEmbalagem = document.getElementById('tipo');


function salvarDados() {
    console.log(dataDeHoje.value, numeroComunicado.value, horarioTratamento.value, dataDoTratamento.value, endereçoTratamento.value, cnpjDoClienteValor, nomeDoCliente.value, quantidade.value, tipo.value)
}
