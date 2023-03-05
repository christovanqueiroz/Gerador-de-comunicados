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

// Nome do cliente de acordo com CNPJ
let cnpjDoCliente;
let url;
let data;
let cnpj;

const consultaCNPJ = async() => {
    cnpjDoCliente = document.getElementById('cnpj').value;
    url = `https://publica.cnpj.ws/cnpj/${cnpjDoCliente}`;
    data = await fetch(url);
    cnpj = await data.json();
    let nomeDoCliente = document.getElementById('cliente');
    nomeDoCliente.value = cnpj.razao_social
}