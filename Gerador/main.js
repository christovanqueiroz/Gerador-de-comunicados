import './style.css'

document.querySelector('#app').innerHTML = `
  <header>
      <h1>Gerador de comunicados fitossanitários</h1>
  </header>

  <main>
      <section class="info">
          <article>
              <div class="data-hoje"> <!-- Ja vem digitado com a data de hoje -->
                  <legend>Data de hoje:</legend>
                  <input type="text" name="hoje" id="hoje">
              </div>

              <div class="numero-comunicado">
                  <legend>Nº Comunicado:</legend>
                  <input type="number" name="comunicado" id="comunicado">
              </div>

              <div class="hora-tratamento">
                  <legend>Horário de início:</legend>
                  <input type="time" name="hora" id="hora">
              </div>
    
              <div class="data-tratamento"> <!-- Ja vem digitado com a data de amanhã -->
                  <legend>Data do tratamento:</legend>
                  <input type="text" name="tratamento" id="tratamento">
              </div>    
          </article>

          <article>
              <div class="endereco"> <!-- Lista de acordo com os cadastrados -->
                  <legend>Endereço do tratamento:</legend>
                  <input type="text" name="endereço" id="endereço">
              </div>

              <div class="cnpj"> <!-- API -->
                  <legend>CNPJ do cliente:</legend>
                  <input type="text" name="cnpj" id="cnpj" onchange="consultaCNPJ()" oninput="transformaEmNumero()">
              </div>
    
              <div class="nome-cliente"> <!-- Completa conforme CNPJ API -->
                  <legend>Nome do cliente:</legend>
                  <input type="text" name="cliente" id="cliente">
              </div>
    
              <div class="quantidade-e-tipo">
                  <div>
                      <legend>Quantidade</legend>
                      <input type="number" name="quantidade" id="quantidade">    
                  </div>

                  <div>
                      <legend>Tipo de embalagem:</legend>
                      <select name="tipo" id="tipo">
                          <option value="pallets">Pallets</option>
                          <option value="caixas">Caixas</option>
                          <option value="suportes">Suportes</option>
                          <option value="madeiraserrada">m³ de madeira serrada para exportação</option>
                      </select>    
                  </div>
                </div>
            </article>
        </section>

        <section class="salvar">
            <div>
                <button type="submit" onclick="salvarDados()">Salvar comunicado</button>
                <button type="submit" onclick="fillForm()">FillForm</button>
            </div>
        </section>
    </main>
`

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

window.transformaEmNumero = transformaEmNumero

// Nome do cliente de acordo com CNPJ digitado
let url;
let data;
let cnpj;
let nomeDoCliente;
let cnpjDoClienteValor;

const consultaCNPJ = async() => {
    cnpjDoClienteValor = document.getElementById('cnpj').value;
    url = `https://publica.cnpj.ws/cnpj/${cnpjDoClienteValor}`;
    data = await fetch(url);
    cnpj = await data.json();
    nomeDoCliente = document.getElementById('cliente');
    nomeDoCliente.value = cnpj.razao_social;
}

window.consultaCNPJ = consultaCNPJ

// Salvar dados do comunicado

const numeroComunicado = document.getElementById('comunicado');
const horarioTratamento = document.getElementById('hora');
const endereçoTratamento = document.getElementById('endereço');
const quantidade = document.getElementById('quantidade');
const tipoDeEmbalagem = document.getElementById('tipo');

function salvarDados() {
    console.log(dataDeHoje.value, numeroComunicado.value, horarioTratamento.value, dataDoTratamento.value, endereçoTratamento.value, cnpjDoClienteValor, nomeDoCliente.value, quantidade.value, tipoDeEmbalagem.value)
}

window.salvarDados = salvarDados

import { PDFDocument } from 'pdf-lib'

async function fillForm() {
  const formUrl = './src/comunicado.pdf'
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
}

window.fillForm = fillForm