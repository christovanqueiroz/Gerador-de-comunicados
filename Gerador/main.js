import './style.css'

document.querySelector('#app').innerHTML = `
  <header>
      <h1>Gerador de comunicados fitossanitário</h1>
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
              
              <div class="data-tratamento"> <!-- Ja vem digitado com a data de amanhã -->
                  <legend>Data do tratamento:</legend>
                  <input type="text" name="tratamento" id="tratamento">
              </div>

              <div class="hora-tratamento">
                  <legend>Horário de início:</legend>
                  <input type="time" name="hora" id="hora">
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
                          <option value="m³ de madeira serrada para exportação">m³ de madeira serrada para exportação</option>
                      </select>    
                  </div>
                </div>
            </article>
        </section>

        <section class="salvar">
            <div>
                <button type="submit" onclick="fillFormSW()">Salvar comunicado SW</button>
            </div>
            
            <div>
                <button type="submit" onclick="fillFormTQFMetro()">Salvar comunicado TQF Metro</button>
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

const botao = document.querySelector('.salvar div button')

if(cnpjDoClienteValor = "") {
    botao.style.backGroundColor = '#FF0000';
}

import { PDFDocument } from 'pdf-lib'

// Comunicado SW

async function fillFormSW() {
  const formUrl = './src/Comunicado SW.pdf'
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(formPdfBytes)

  const form = pdfDoc.getForm()

  const dataDeHojeField = form.getTextField('Data de hoje');
  const comunicadoField = form.getTextField('Comunicado');
  const dataDoTratamentoField = form.getTextField('Data do tratamento');
  const horaField = form.getTextField('Hora');
  const localField = form.getTextField('Local');
  const cnpjField = form.getTextField('CNPJ');
  const clienteField = form.getTextField('Cliente');
  const quantidadeField = form.getTextField('Quantidade');
  const embalagemField = form.getTextField('Embalagem');

  dataDeHojeField.setText(dataDeHoje.value);
  comunicadoField.setText(numeroComunicado.value);
  dataDoTratamentoField.setText(dataDoTratamento.value);
  horaField.setText(horarioTratamento.value);
  localField.setText(endereçoTratamento.value);
  cnpjField.setText(cnpjDoClienteValor);
  clienteField.setText(nomeDoCliente.value);
  quantidadeField.setText(quantidade.value);
  embalagemField.setText(tipoDeEmbalagem.value);

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, `${nomeDoCliente.value} ${numeroComunicado.value}.pdf`, "application/pdf");
}

window.fillFormSW = fillFormSW

// Comunicado TQF Metro

async function fillFormTQFMetro() {
    const formUrl = './src/Comunicado TQF Metro.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(formPdfBytes)
  
    const form = pdfDoc.getForm()
  
    const localField = form.getTextField('Local')
    const clienteField = form.getTextField('Cliente')
    const cnpjField = form.getTextField('CNPJ')
  
    localField.setText(endereçoTratamento.value)
    clienteField.setText(nomeDoCliente.value)
    cnpjField.setText(cnpjDoClienteValor)
  
    const pdfBytes = await pdfDoc.save()
  
    download(pdfBytes, `${nomeDoCliente.value}.pdf`, "application/pdf");
  }
  
  window.fillFormTQFMetro = fillFormTQFMetro