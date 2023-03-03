const dataDeHoje = document.getElementById('hoje');
const date = new Date();

let dia = date.getDate();
let mês = date.getMonth();
let ano = date.getFullYear();

dataDeHoje.value = `${dia}/${mês+1}/${ano}`

const dataDoTratamento = document.getElementById('tratamento');
dataDoTratamento.value = `${dia+1}/${mês+1}/${ano}`

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