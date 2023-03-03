const dataDeHoje = document.getElementById('hoje');
const date = new Date();

let dia = date.getDate();
let mês = date.getMonth();
let ano = date.getFullYear();

dataDeHoje.value = `${dia}/${mês+1}/${ano}`