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
                  <input type="text" name="cnpj" id="cnpj" oninput="transformaEmNumero()">
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
    console.log(dataDeHoje.value, numeroComunicado.value, horarioTratamento.value, dataDoTratamento.value, endereçoTratamento.value, cnpjDoClienteValor, nomeDoCliente.value, quantidade.value, tipoDeEmbalagem.value)
}

window.salvarDados = salvarDados

import { PDFDocument } from 'pdf-lib'

async function fillForm() {
  const formUrl = './src/comunicado.pdf'
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

  const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png'
  const marioImageBytes = await fetch(marioUrl).then(res => res.arrayBuffer())

  const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
  const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(formPdfBytes)

  const marioImage = await pdfDoc.embedPng(marioImageBytes)
  const emblemImage = await pdfDoc.embedPng(emblemImageBytes)

  const form = pdfDoc.getForm()

  const nameField = form.getTextField('CharacterName 2')
  const ageField = form.getTextField('Age')
  const heightField = form.getTextField('Height')
  const weightField = form.getTextField('Weight')
  const eyesField = form.getTextField('Eyes')
  const skinField = form.getTextField('Skin')
  const hairField = form.getTextField('Hair')

  const alliesField = form.getTextField('Allies')
  const factionField = form.getTextField('FactionName')
  const backstoryField = form.getTextField('Backstory')
  const traitsField = form.getTextField('Feat+Traits')
  const treasureField = form.getTextField('Treasure')

  const characterImageField = form.getButton('CHARACTER IMAGE')
  const factionImageField = form.getButton('Faction Symbol Image')

  nameField.setText('Mario')
  ageField.setText('24 years')
  heightField.setText(`5' 1"`)
  weightField.setText('196 lbs')
  eyesField.setText('blue')
  skinField.setText('white')
  hairField.setText('brown')

  characterImageField.setImage(marioImage)

  alliesField.setText(
    [
      `Allies:`,
      `  • Princess Daisy`,
      `  • Princess Peach`,
      `  • Rosalina`,
      `  • Geno`,
      `  • Luigi`,
      `  • Donkey Kong`,
      `  • Yoshi`,
      `  • Diddy Kong`,
      ``,
      `Organizations:`,
      `  • Italian Plumbers Association`,
    ].join('\n'),
  )

  factionField.setText(`Mario's Emblem`)

  factionImageField.setImage(emblemImage)

  backstoryField.setText(
    [
      `Mario is a fictional character in the Mario video game franchise, `,
      `owned by Nintendo and created by Japanese video game designer Shigeru `,
      `Miyamoto. Serving as the company's mascot and the eponymous `,
      `protagonist of the series, Mario has appeared in over 200 video games `,
      `since his creation. Depicted as a short, pudgy, Italian plumber who `,
      `resides in the Mushroom Kingdom, his adventures generally center `,
      `upon rescuing Princess Peach from the Koopa villain Bowser. His `,
      `younger brother and sidekick is Luigi.`,
    ].join('\n'),
  )

  traitsField.setText(
    [
      `Mario can use three basic three power-ups:`,
      `  • the Super Mushroom, which causes Mario to grow larger`,
      `  • the Fire Flower, which allows Mario to throw fireballs`,
      `  • the Starman, which gives Mario temporary invincibility`,
    ].join('\n'),
  )

  treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'))

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, "pdf-lib_form_creation_example.pdf", "application/pdf");
}

window.fillForm = fillForm