// Muda o tema da pagina

document.addEventListener("DOMContentLoaded", function () {
  // Verifica se o corpo da página tem a classe "bg-dark" para determinar o tema
  var isDarkTheme = document.body.classList.contains("bg-dark");
  // Seleciona o botão com a classe "btn-dynamic"
  var button = document.querySelector(".btn-dynamic");
  // Se o tema for escuro, adiciona a classe "btn-dark" ao botão
  if (isDarkTheme) {
    button.classList.add("btn-dark");
  }

  // Restaura o tema salvo
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    alterarTema(savedTheme);
  }
});

// Muda o tema da pagina
function alterarTema(tema) {
  const janela = document.getElementById("minhaJanela");
  janela.classList.remove("dark", "light", "system");
  janela.classList.add(tema);
  // Atualizar o texto do botão do dropdown com o tema selecionado
  document.getElementById("dropdownMenuButton").innerText =
    tema.charAt(0).toUpperCase() + tema.slice(1);

  // Salva o tema atual no armazenamento local
  localStorage.setItem("theme", tema);
}

$(document).ready(function () {
  // Captura o evento de clique em um item do dropdown
  $(".dropdown-item").on("click", function () {
    // Obtém o texto do item clicado
    var selectedOptionText = $(this).text();
    // Atualiza o texto no botão do dropdown
    $(".dropdown-toggle").text(selectedOptionText);
    // Altera o tema ao clicar em um item do dropdown
    alterarTema(selectedOptionText.toLowerCase());
  });
});

// Atualizar texto dos dropdown

function tipodemorador(tipo) {
  document.getElementById("tipodemorador").innerText =
    tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

function torredoapto(torre) {
  document.getElementById("torredoapto").innerText =
    torre.charAt(0).toUpperCase() + torre.slice(1);
}

function andardoapto(floor) {
  document.getElementById("andardoapto").innerText =
    floor.charAt(0).toUpperCase() + floor.slice(1);

  // Desativar as opções 8, 9 e 10 no dropdown do apartamento

  var numerodoaptoDropdown = document
    .getElementById("numerodoapto")
    .parentNode.querySelector(".dropdown-menu")
    .querySelectorAll(".dropdown-item");

  if (floor.toLowerCase() === "térreo") {
    for (var i = 7; i <= 10; i++) {
      if (numerodoaptoDropdown[i]) {
        numerodoaptoDropdown[i].classList.add("disabled");
        numerodoaptoDropdown[i].setAttribute("onclick", "");
      }
    }
  } else {
    for (var i = 7; i <= 10; i++) {
      if (numerodoaptoDropdown[i]) {
        numerodoaptoDropdown[i].classList.remove("disabled");
        numerodoaptoDropdown[i].setAttribute(
          "onclick",
          "numerodoapto('" + pad(i + 1) + "')"
        );
      }
    }
  }
}

function numerodoapto(apartmentNumber) {
  document.getElementById("numerodoapto").innerText = apartmentNumber;
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}

// Atualizar texto dos dropdown

function numerodoapto(apto) {
  document.getElementById("numerodoapto").innerText =
    apto.charAt(0).toUpperCase() + apto.slice(1);
}

// Formatar celular

function mask(o, f) {
  setTimeout(function () {
    var v = mphone(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mphone(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}

// Deixar somente letras e espaços no campo nome e a primeira letra maiuscula

function validateInput(event) {
  const input = event.target;
  const value = input.value;

  // Remove todos os caracteres que não são letras ou espaços
  input.value = value.replace(/[^a-zA-Z\s]/g, "");

  // Capitaliza a primeira letra
  input.value = input.value.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Resetar campos

function resetForm() {
  // Resetar o campo de texto
  document.getElementById("nome_morador").value = "";
  $("#nome_morador").removeClass("is-invalid");
  document.getElementById("phone").value = "";
  $("#phone").removeClass("is-invalid");

  // Resetar o dropdown
  document.getElementById("tipodemorador").innerText = "Selecione";
  $("#tipodemorador").removeClass("nao-valido");
  $("#tipodemoradorBtn").removeClass("nao-valido");
  document.getElementById("torredoapto").innerText = "Selecione";
  $("#torredoapto").removeClass("nao-valido");
  $("#torredoaptoBtn").removeClass("nao-valido");
  document.getElementById("andardoapto").innerText = "Selecione";
  $("#andardoapto").removeClass("nao-valido");
  $("#andardoaptoBtn").removeClass("nao-valido");
  document.getElementById("numerodoapto").innerText = "Selecione";
  $("#numerodoapto").removeClass("nao-valido");
  $("#numerodoaptoBtn").removeClass("nao-valido");
}

// Atualizar pagina

function refreshPage() {
  location.reload();
}

// Abrir pagina de consulta

function abrirconsulta() {
  // window.location.href = "consulta.html";
  window.location.href = "consulta";
}

// Abrir pagina de home

function abrirhome() {
  // window.location.href = "index.html";
  window.location.href = "home";
}

// Envia os dados para a planilha

function EnviarDadosMorador() {
  var nome_morador = document.getElementById("nome_morador").value;
  var contato_morador = document.getElementById("phone").value;
  var tipo_morador = document.getElementById("tipodemorador").innerText;
  var torre_morador = document.getElementById("torredoapto").innerText;
  var andar_morador = document.getElementById("andardoapto").innerText;
  var apto_morador = document.getElementById("numerodoapto").innerText;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/enviar-dados", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      nome_morador: nome_morador,
      contato_morador: contato_morador,
      tipo_morador: tipo_morador,
      torre_morador: torre_morador,
      andar_morador: andar_morador,
      apto_morador: apto_morador,
    })
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var resposta = xhr.responseText;

        if (resposta === "1") {
          // Criar e mostrar o modal de sucesso
          var modalContent = `
          <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
              <div class="modal-dialog">
              <div class="modal-content" style="background-color: #d4edda; color: #155724;">
              <div class="modal-header">
                  <h5 class="modal-title" id="successModalLabel" style="color: #155724;">Sucesso!</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          Dados enviados com sucesso!
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="resetForm()">OK</button>
                      </div>
                  </div>
              </div>
          </div>
          `;

          // Inserir o modal no body
          $("body").append(modalContent);

          // Mostrar o modal
          var successModal = new bootstrap.Modal(
            document.getElementById("successModal")
          );
          successModal.show();
        } else if (resposta === "0") {
          // Criar e mostrar o modal de sucesso
          var modalContent = `
          <div class="modal fade" id="existingModal" tabindex="-1" aria-labelledby="existingModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content" style="background-color: #4682B4; color: #fff;">
                      <div class="modal-header">
                          <h5 class="modal-title" id="existingModalLabel" style="color: #fff;">Aviso!</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          Dados existentes no sistema.
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-info" data-bs-dismiss="modal">Fechar</button>
                      </div>
                  </div>
              </div>
          </div>
          `;

          // Inserir o modal no body
          $("body").append(modalContent);

          // Mostrar o modal
          var existingModal = new bootstrap.Modal(
            document.getElementById("existingModal")
          );
          existingModal.show();
        } else if (resposta === "2") {
          // Criar e mostrar o modal de sucesso
          var modalContent = `
          <div class="modal fade" id="erroAptoModal" tabindex="-1" aria-labelledby="erroAptoModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content" style="background-color: #f8d7da; color: #721c24;">
                      <div class="modal-header">
                          <h5 class="modal-title" id="erroAptoModalLabel" style="color: #721c24;">Aviso!</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          Verifique o apartamento.
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn btn-danger" data-bs-dismiss="modal" >OK</button>
                      </div>
                  </div>
              </div>
          </div>
          `;

          // Inserir o modal no body
          $("body").append(modalContent);

          // Mostrar o modal
          var erroAptoModal = new bootstrap.Modal(
            document.getElementById("erroAptoModal")
          );
          erroAptoModal.show();
        }
      } else {
        // Handle the error here
        mostrarMensagem("Erro ao enviar os dados. Tente novamente mais tarde.");
      }
    }
  };
}

function mostrarMensagem(mensagem) {
  // Atualizar o conteúdo da mensagem no modal
  document.getElementById("messageBody").innerText = mensagem;

  // Mostrar o modal
  $("#messageModal").modal("show");
}

// Verifica se os campos estão preenchidos

function ValidarCampos() {
  var nome = $("#nome_morador").val();
  var phone = $("#phone").val();
  var tipo = document.getElementById("tipodemorador").textContent.trim();
  var torre = document.getElementById("torredoapto").textContent.trim();
  var andar = document.getElementById("andardoapto").textContent.trim();
  var apto = document.getElementById("numerodoapto").textContent.trim();

  if (nome === "") {
    $("#nome_morador").addClass("is-invalid");
  } else {
    $("#nome_morador").removeClass("is-invalid");
  }

  if (phone === "") {
    $("#phone").addClass("is-invalid");
  } else {
    $("#phone").removeClass("is-invalid");
  }

  if (tipo === "Selecione") {
    $("#tipodemorador").addClass("nao-valido");
    $("#tipodemoradorBtn").addClass("nao-valido");
  } else {
    $("#tipodemorador").removeClass("nao-valido");
    $("#tipodemoradorBtn").removeClass("nao-valido");
  }

  if (torre === "Selecione") {
    $("#torredoapto").addClass("nao-valido");
    $("#torredoaptoBtn").addClass("nao-valido");
  } else {
    $("#torredoapto").removeClass("nao-valido");
    $("#torredoaptoBtn").removeClass("nao-valido");
  }

  if (andar === "Selecione") {
    $("#andardoapto").addClass("nao-valido");
    $("#andardoaptoBtn").addClass("nao-valido");
  } else {
    $("#andardoapto").removeClass("nao-valido");
    $("#andardoaptoBtn").removeClass("nao-valido");
  }

  if (apto === "Selecione") {
    $("#numerodoapto").addClass("nao-valido");
    $("#numerodoaptoBtn").addClass("nao-valido");
  } else {
    $("#numerodoapto").removeClass("nao-valido");
    $("#numerodoaptoBtn").removeClass("nao-valido");
  }

  if (
    nome === "" ||
    phone === "" ||
    tipo === "Selecione" ||
    torre === "Selecione" ||
    andar === "Selecione" ||
    apto === "Selecione"
  ) {
    // Criar e mostrar o modal de erro
    var modalContent = `
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="background-color: #f8d7da; color: #721c24;">
                <div class="modal-header">
                    <h5 class="modal-title" id="errorModalLabel" style="color: #721c24;">Erro!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    Por favor, preencha todos os campos.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="resetForm()">OK</button>
                </div>
            </div>
        </div>
    </div>
    `;

    // Inserir o modal no body
    $("body").append(modalContent);

    // Mostrar o modal
    var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
  } else {
    EnviarDadosMorador();
  }
}

function ValidarCamposConsulta() {
  var torre = document.getElementById("torredoapto").textContent.trim();
  var andar = document.getElementById("andardoapto").textContent.trim();
  var apto = document.getElementById("numerodoapto").textContent.trim();

  if (torre === "Selecione") {
    $("#torredoapto").addClass("nao-valido");
    $("#torredoaptoBtn").addClass("nao-valido");
  } else {
    $("#torredoapto").removeClass("nao-valido");
    $("#torredoaptoBtn").removeClass("nao-valido");
  }

  if (andar === "Selecione") {
    $("#andardoapto").addClass("nao-valido");
    $("#andardoaptoBtn").addClass("nao-valido");
  } else {
    $("#andardoapto").removeClass("nao-valido");
    $("#andardoaptoBtn").removeClass("nao-valido");
  }

  if (apto === "Selecione") {
    $("#numerodoapto").addClass("nao-valido");
    $("#numerodoaptoBtn").addClass("nao-valido");
  } else {
    $("#numerodoapto").removeClass("nao-valido");
    $("#numerodoaptoBtn").removeClass("nao-valido");
  }
  if (torre === "Selecione" || andar === "Selecione" || apto === "Selecione") {
    // Criar e mostrar o modal de erro
    var modalContent = `
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="background-color: #f8d7da; color: #721c24;">
                <div class="modal-header">
                    <h5 class="modal-title" id="errorModalLabel" style="color: #721c24;">Erro!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    Por favor, preencha todos os campos.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="resetForm_Consulta()">OK</button>
                </div>
            </div>
        </div>
    </div>
    `;

    // Inserir o modal no body
    $("body").append(modalContent);

    // Mostrar o modal
    var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
  } else {
    CosultarDadosMorador();
  }
}

function CosultarDadosMorador() {
  var torre_morador = document.getElementById("torredoapto").innerText;
  var andar_morador = document.getElementById("andardoapto").innerText;
  var apto_morador = document.getElementById("numerodoapto").innerText;
  var xhr_cosulta = new XMLHttpRequest();
  xhr_cosulta.open("POST", "/dados-consulta", true);
  xhr_cosulta.setRequestHeader("Content-Type", "application/json");
  xhr_cosulta.send(
    JSON.stringify({
      torre_morador: torre_morador,
      andar_morador: andar_morador,
      apto_morador: apto_morador,
    })
  );
  xhr_cosulta.onreadystatechange = function () {
    if (xhr_cosulta.readyState === 4) {
      if (xhr_cosulta.status === 200) {
        var resposta = xhr_cosulta.responseText;
        // Combine o texto com o valor da variável
        var sql_apto = "O SQL do apartamento é:\n" + resposta;
        if (resposta !== "2") {
          // Criar e mostrar o modal de sucesso
          var modalContent = `
          <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
              <div class="modal-dialog">
              <div class="modal-content" style="background-color: #4682B4; color: #fff;">
              <div class="modal-header">
                  <h5 class="modal-title" id="successModalLabel" style="color: #fff;">Setor Quadra Lote (SQL) para IPTU</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body" id="sql_apartamento"></div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-info" onclick="copiarResposta()">Copiar SQL</button>
                          <button type="button" class="btn btn-info" data-bs-dismiss="modal" onclick="resetForm_Consulta()">Fechar</button>
                      </div>
                  </div>
              </div>
          </div>
          `;

          // Inserir o modal no body
          $("body").append(modalContent);
          document.getElementById("sql_apartamento").innerHTML = sql_apto;

          // Mostrar o modal
          var successModal = new bootstrap.Modal(
            document.getElementById("successModal")
          );
          successModal.show();
        } else if (resposta === "2") {
          // Criar e mostrar o modal de sucesso
          var modalContent = `
          <div class="modal fade" id="erroAptoModal" tabindex="-1" aria-labelledby="erroAptoModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content" style="background-color: #f8d7da; color: #721c24;">
                      <div class="modal-header">
                          <h5 class="modal-title" id="erroAptoModalLabel" style="color: #721c24;">Aviso!</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                      </div>
                      <div class="modal-body">
                          Verifique o apartamento.
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn btn-danger" data-bs-dismiss="modal" >OK</button>
                      </div>
                  </div>
              </div>
          </div>
          `;

          // Inserir o modal no body
          $("body").append(modalContent);

          // Mostrar o modal
          var erroAptoModal = new bootstrap.Modal(
            document.getElementById("erroAptoModal")
          );
          erroAptoModal.show();
        } else {
          // Handle the error here
          mostrarMensagem(
            "Erro ao enviar os dados. Tente novamente mais tarde."
          );
        }
      }
    }
  };
}

// Resetar campos

function resetForm_Consulta() {
  // Resetar o dropdown
  document.getElementById("torredoapto").innerText = "Selecione";
  $("#torredoapto").removeClass("nao-valido");
  $("#torredoaptoBtn").removeClass("nao-valido");
  document.getElementById("andardoapto").innerText = "Selecione";
  $("#andardoapto").removeClass("nao-valido");
  $("#andardoaptoBtn").removeClass("nao-valido");
  document.getElementById("numerodoapto").innerText = "Selecione";
  $("#numerodoapto").removeClass("nao-valido");
  $("#numerodoaptoBtn").removeClass("nao-valido");
}

// Copiar texto do Modal(popup)
function copiarResposta() {
  var resposta = document.getElementById("sql_apartamento").innerText; //Captura o texto do Elemento sql_apatamento
  var inicio = resposta.indexOf(":") + 2; // Encontra a posição do ':' e adiciona 2 para começar após o ': '
  var textoParaCopiar = resposta.substring(inicio); // Extrai o texto a partir da posição 'inicio'

  navigator.clipboard.writeText(textoParaCopiar);
}
