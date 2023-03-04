// Data de hoje
const dataDeHoje = document.getElementById('hoje');

dataDeHoje.value = new Intl.DateTimeFormat('pt-BR').format(new Date());


// Data do tratamento
const dataDoTratamento = document.getElementById('tratamento');
const date = new Date();

let dia = date.getDate();
let mês = date.getMonth();
let ano = date.getFullYear();

dataDoTratamento.value = `${dia+1}/${mês+1}/${ano}`

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