// Ativa verificações do JavaScript para ajudar a detectar erros de programação.
"use strict";

// A página de modelos usa o mesmo JSON do catálogo principal.


// Guarda os caminhos do arquivo de dados e da página que mostra um currículo completo.
const CONFIG = {
  arquivoDeDados: "data/alunos-dados.json",
  paginaDeCurriculo: "curriculo-aluno.html"
};

// Preserva os exemplos usados somente quando o arquivo JSON não pode ser carregado.
const alunosDeDemonstracao = [
  {
    id: "ana-lima",
    nome: "Ana Lima",
    titulo: "Desenvolvedora Front-end",
    turma: "3º ano",
    area: "Interfaces Web",
    foto: ""
  },
  {
    id: "bruno-santos",
    nome: "Bruno Santos",
    titulo: "Desenvolvedor Back-end",
    turma: "3º ano",
    area: "APIs e Banco de Dados",
    foto: ""
  },
  {
    id: "carolina-mendes",
    nome: "Carolina Mendes",
    titulo: "Desenvolvedora de Software",
    turma: "2º ano",
    area: "Aplicações Web",
    foto: ""
  },
  {
    id: "diego-rocha",
    nome: "Diego Rocha",
    titulo: "Desenvolvedor de Jogos",
    turma: "2º ano",
    area: "Game Development",
    foto: ""
  }
];

// Guarda o campo de busca, os resultados e os botões do carrossel.
const elementos = {
  lista: document.getElementById("lista-alunos"),
  busca: document.getElementById("busca-aluno"),
  status: document.getElementById("status-resultados"),
  mensagemVazia: document.getElementById("mensagem-vazia"),
  avisoDados: document.getElementById("aviso-dados"),
  anterior: document.getElementById("btn-anterior"),
  proximo: document.getElementById("btn-proximo")
};

// Mantém todos os estudantes para poder refazer a busca a cada digitação.
let todosOsAlunos = [];

// Retira acentos e diferenças de maiúsculas para facilitar a busca.
function normalizarTexto(texto = "") {
  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Protege os caracteres especiais usados no texto do avatar SVG.
function escaparHtml(valor = "") {
  return valor
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Mantém o desenho de exemplo quando o estudante não possui uma foto.
function criarAvatarSvg(nome = "Estudante") {
  // Separa o nome em palavras e junta as iniciais das duas primeiras.
  const iniciais = nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");

  // Monta o desenho do avatar em SVG; as iniciais são inseridas como texto protegido.
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#625d5d"/>
          <stop offset="1" stop-color="#302d2d"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#fundo)"/>
      <circle cx="400" cy="238" r="118" fill="rgba(255,255,255,.16)"/>
      <path d="M184 600c24-155 114-237 216-237s192 82 216 237H184Z" fill="rgba(255,255,255,.16)"/>
      <text
        x="400"
        y="330"
        text-anchor="middle"
        fill="#ffffff"
        font-size="126"
        font-family="Arial, sans-serif"
        font-weight="700"
      >${escaparHtml(iniciais || "CV")}</text>
    </svg>
  `;

  // Converte o desenho em um endereço de imagem que pode ser usado diretamente no atributo src.
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// Usa a foto cadastrada ou o avatar com as iniciais.
function obterFoto(aluno) {
  return aluno.foto && aluno.foto.trim()
    ? aluno.foto
    : criarAvatarSvg(aluno.nome);
}

// Cria os elementos do card e usa textContent para os dados do estudante.
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Monta um cartão clicável com foto, turma, nome e área profissional do estudante.
function criarCard(aluno) {
  const nome = aluno.nome || "Nome não informado";
  const card = criarElemento("article", "student-card");
  const link = criarElemento("a", "student-link");
  link.href = `${CONFIG.paginaDeCurriculo}?id=${encodeURIComponent(aluno.id)}`;
  link.setAttribute("aria-label", `Abrir currículo de ${nome}`);

  // Prepara a foto e a etiqueta da turma que aparecem no topo do cartão.
  const perfil = criarElemento("div", "student-photo-wrap");
  const foto = criarElemento("img", "student-photo");
  foto.src = obterFoto(aluno);
  foto.alt = `Foto de ${nome}`;
  foto.loading = "lazy";
  // Se a foto falhar, usa as iniciais uma única vez, sem um evento dentro do HTML.
  foto.addEventListener("error", () => { foto.src = criarAvatarSvg(aluno.nome); }, { once: true });
  perfil.append(foto, criarElemento("span", "student-badge", aluno.turma || "Turma não informada"));

  // Preenche os textos do cartão, usando mensagens de apoio nos campos ausentes.
  const conteudo = criarElemento("div", "student-content");
  conteudo.append(criarElemento("h3", "student-name", nome));
  conteudo.append(criarElemento("p", "student-title", aluno.titulo || "Área profissional não informada"));
  const informacoes = criarElemento("div", "student-meta");
  informacoes.setAttribute("aria-label", "Informações do estudante");
  informacoes.append(criarElemento("span", "", aluno.area || "Área não informada"));

  const chamada = criarElemento("span", "student-cta", "Ver currículo");
  // O desenho da seta é fixo e não recebe dados vindos do JSON.
  chamada.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.3 17.7 1.4 1.4 7.1-7.1-7.1-7.1-1.4 1.4L15 12l-5.7 5.7Z"/></svg>');
  // Encaixa as partes criadas dentro do link e depois dentro do cartão.
  conteudo.append(informacoes, chamada);
  link.append(perfil, conteudo);
  card.append(link);
  return card;
}

// Atualiza a quantidade anunciada pelo leitor de tela após cada busca.
function atualizarStatus(quantidade, total) {
  // Quando todos os alunos aparecem, informa o total de currículos disponíveis.
  if (quantidade === total) {
    elementos.status.textContent =
      `${total} ${total === 1 ? "currículo disponível" : "currículos disponíveis"}`;
    return;
  }

  elementos.status.textContent =
    `${quantidade} ${quantidade === 1 ? "resultado encontrado" : "resultados encontrados"}`;
}

// Substitui os cards exibidos e mostra o aviso quando a lista fica vazia.
function renderizarAlunos(alunos) {
  const cards = alunos.map(criarCard);
  elementos.lista.replaceChildren(...cards);
  elementos.mensagemVazia.classList.toggle("is-visible", alunos.length === 0);
  elementos.lista.hidden = alunos.length === 0;
  atualizarStatus(alunos.length, todosOsAlunos.length);

  // Agenda a atualização dos controles para o próximo quadro de desenho do navegador.
  requestAnimationFrame(atualizarBotoesDoCarrossel);
}

// Compara o termo digitado com nome, título, turma e área de cada estudante.
function filtrarAlunos() {
  const termo = normalizarTexto(elementos.busca.value);

  // Se a busca estiver vazia, volta a mostrar todos os estudantes.
  if (!termo) {
    renderizarAlunos(todosOsAlunos);
    return;
  }

  // Mantém somente os estudantes cujos dados contêm o texto procurado.
  const filtrados = todosOsAlunos.filter((aluno) => {
    const conteudo = [
      aluno.nome,
      aluno.titulo,
      aluno.turma,
      aluno.area
    ]
      .map(normalizarTexto)
      .join(" ");

    return conteudo.includes(termo);
  });

  renderizarAlunos(filtrados);
}

// Mede um card e seu espaçamento para avançar a rolagem na distância correta.
function calcularDeslocamento() {
  const primeiroCard = elementos.lista.querySelector(".student-card");

  // Sem cartão para medir, usa uma parte da largura da lista como distância de rolagem.
  if (!primeiroCard) {
    return elementos.lista.clientWidth * 0.85;
  }

  const estilos = getComputedStyle(elementos.lista);
  const gap = Number.parseFloat(estilos.columnGap || estilos.gap) || 20;

  return primeiroCard.getBoundingClientRect().width + gap;
}

// Move os cards para a esquerda ou direita e respeita a preferência por menos movimento.
function moverCarrossel(direcao) {
  // Aplica a distância calculada; a direção define se a lista anda para a esquerda ou para a direita.
  elementos.lista.scrollBy({
    left: calcularDeslocamento() * direcao,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
  });
}

// Desabilita os botões quando a rolagem chega ao início ou ao fim.
function atualizarBotoesDoCarrossel() {
  const tolerancia = 4;
  const maximo = elementos.lista.scrollWidth - elementos.lista.clientWidth;

  elementos.anterior.disabled = elementos.lista.scrollLeft <= tolerancia;
  elementos.proximo.disabled =
    maximo <= tolerancia || elementos.lista.scrollLeft >= maximo - tolerancia;
}

// Só aceita estudantes com ID, nome e sem ativo: false.
function validarAlunos(dados) {
  const lista = Array.isArray(dados) ? dados : dados?.alunos;

  // Interrompe a leitura se os dados recebidos não tiverem o formato de lista esperado.
  if (!Array.isArray(lista)) {
    throw new Error('O JSON deve conter um array chamado "alunos".');
  }

  // Confere os dados mínimos de cada estudante e exclui os que foram marcados como inativos.
  return lista.filter((aluno) => {
    const possuiDadosMinimos =
      aluno &&
      typeof aluno.id === "string" &&
      aluno.id.trim() &&
      typeof aluno.nome === "string" &&
      aluno.nome.trim();

    const estaAtivo = aluno && aluno.ativo !== false;

    return possuiDadosMinimos && estaAtivo;
  });
}

// Busca os dados dos alunos no JSON e preserva os exemplos se a busca falhar.
async function carregarAlunos() {
  // Tenta buscar e ler o arquivo; se houver falha, o catch usa os exemplos de demonstração.
  try {
    const resposta = await fetch(CONFIG.arquivoDeDados, {
      cache: "no-store"
    });

    // Trata uma resposta HTTP sem sucesso como erro de carregamento.
    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    // json() transforma a resposta em dados que o JavaScript consegue ler.
    const dados = await resposta.json();
    todosOsAlunos = validarAlunos(dados);
  // Registra a falha no console e avisa que os cartões exibidos são exemplos.
  } catch (erro) {
    console.warn("Não foi possível carregar o JSON:", erro);
    todosOsAlunos = alunosDeDemonstracao;
    elementos.avisoDados.classList.add("is-visible");
  }

  renderizarAlunos(todosOsAlunos);
}

// Refaz a busca durante a digitação e atualiza os controles ao rolar ou redimensionar.
elementos.busca.addEventListener("input", filtrarAlunos);
// Os dois botões deslocam a lista em sentidos opostos.
elementos.anterior.addEventListener("click", () => moverCarrossel(-1));
elementos.proximo.addEventListener("click", () => moverCarrossel(1));
// Atualiza as setas durante a rolagem; passive informa que o evento não vai bloquear a rolagem.
elementos.lista.addEventListener("scroll", atualizarBotoesDoCarrossel, {
  passive: true
});
// Recalcula quais setas podem ser usadas quando a janela muda de tamanho.
window.addEventListener("resize", atualizarBotoesDoCarrossel);

// Inicia o carregamento dos estudantes para preencher o catálogo.
carregarAlunos();
