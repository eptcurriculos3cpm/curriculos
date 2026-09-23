// Ativa verificações do JavaScript para ajudar a detectar erros de programação.
"use strict";

// Executa o código da página mantendo suas variáveis separadas dos outros scripts.
(() => {
  // Reúne as áreas do HTML para preencher o currículo do estudante escolhido.
  const elementos = {
    carregamento: document.getElementById("carregamento"),
    pagina: document.getElementById("pagina-curriculo"),
    curriculo: document.getElementById("curriculo"),
    erro: document.getElementById("estado-erro"),
    mensagemErro: document.getElementById("mensagem-erro"),
    imprimir: document.getElementById("botao-imprimir"),
    foto: document.getElementById("foto-aluno"),
    nome: document.getElementById("nome-aluno"),
    titulo: document.getElementById("titulo-profissional"),
    turmaArea: document.getElementById("turma-area"),
    sobre: document.getElementById("sobre-aluno"),
    contato: document.getElementById("lista-contato"),
    competencias: document.getElementById("lista-competencias"),
    formacoes: document.getElementById("lista-formacoes"),
    experiencias: document.getElementById("lista-experiencias"),
    projetos: document.getElementById("lista-projetos"),
    secaoContato: document.getElementById("secao-contato"),
    secaoCompetencias: document.getElementById("secao-competencias"),
    secaoSobre: document.getElementById("secao-sobre"),
    secaoFormacao: document.getElementById("secao-formacao"),
    secaoExperiencias: document.getElementById("secao-experiencias"),
    secaoProjetos: document.getElementById("secao-projetos")
  };

  // Um campo de lista ausente funciona como uma lista vazia.
  function obterLista(valor) {
    return Array.isArray(valor) ? valor : [];
  }

  // Confere se o campo contém texto, além de espaços em branco.
  function temTexto(valor) {
    return typeof valor === "string" && valor.trim().length > 0;
  }

  // Cria os itens das listas usando texto seguro, sem montar HTML com os dados.
  function criar(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (temTexto(texto)) elemento.textContent = texto.trim();
    return elemento;
  }

  // Mantém o avatar original para quando o estudante está sem foto.
  function avatarPadrao(nome) {
    const partes = nome.split(/\s+/).filter(Boolean);
    let iniciais = "";
    // Pega a primeira letra dos dois primeiros nomes para montar as iniciais do avatar.
    for (const parte of partes.slice(0, 2)) {
      iniciais += parte.charAt(0).toUpperCase();
    }
    if (!iniciais) iniciais = "CV";
    // Descreve o desenho do avatar em SVG, um formato de imagem feito com texto.
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#1565c0"/><circle cx="200" cy="145" r="78" fill="#fff" opacity=".16"/><path d="M55 400c18-110 72-165 145-165s127 55 145 165" fill="#fff" opacity=".16"/><text x="200" y="235" text-anchor="middle" fill="#fff" font-family="Arial" font-size="90" font-weight="700">${iniciais}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  // Monta um contato; e-mail e perfis podem virar links, e a cidade continua como texto.
  function adicionarContato(rotulo, valor, href, externo = false) {
    if (!temTexto(valor)) return;
    const item = criar("li", "item-contato");
    const rotuloElemento = criar("span", "rotulo-contato", rotulo);
    const conteudo = href ? document.createElement("a") : document.createElement("span");
    conteudo.textContent = valor.trim();
    // Transforma o contato em um link quando foi recebido um endereço.
    if (href) {
      conteudo.href = href;
      // Os perfis externos abrem em outra aba sem acesso à página de origem.
      if (externo) {
        conteudo.target = "_blank";
        conteudo.rel = "noopener noreferrer";
      }
    }
    item.append(rotuloElemento, conteudo);
    elementos.contato.append(item);
  }

  // Só exibe os contatos que foram preenchidos no JSON.
  function preencherContato(contato = {}) {
    elementos.contato.replaceChildren();
    adicionarContato("E-mail", contato.email, temTexto(contato.email) ? `mailto:${contato.email.trim()}` : "");
    adicionarContato("Cidade", contato.cidade);
    adicionarContato("LinkedIn", temTexto(contato.linkedin) ? "Ver perfil" : "", contato.linkedin, true);
    adicionarContato("GitHub", temTexto(contato.github) ? "Ver perfil" : "", contato.github, true);
    // Se a seção não tiver conteúdo, ela fica oculta.
    elementos.secaoContato.hidden = elementos.contato.children.length === 0;
  }

  // Mostra as competências e, quando informado, o nível de cada uma.
  function preencherCompetencias(lista) {
    const itens = [];
    // Ignora entradas vazias e mantém a ordem dos dados do estudante.
    for (const competencia of obterLista(lista)) {
      if (!competencia || !temTexto(competencia.nome)) continue;
      const item = criar("li", "competencia");
      const cabecalho = criar("div", "competencia-cabecalho");
      cabecalho.append(criar("strong", "", competencia.nome));
      if (temTexto(competencia.nivel)) cabecalho.append(criar("span", "nivel", competencia.nivel));
      item.append(cabecalho);
      itens.push(item);
    }
    elementos.competencias.replaceChildren(...itens);
    // Se a seção não tiver conteúdo, ela fica oculta.
    elementos.secaoCompetencias.hidden = itens.length === 0;
  }

  // Mostra cada curso com a instituição e o período que estiverem disponíveis.
  function preencherFormacoes(lista) {
    const itens = [];
    // Ignora entradas vazias e mantém a ordem dos dados do estudante.
    for (const formacao of obterLista(lista)) {
      if (!formacao || !temTexto(formacao.curso)) continue;
      const item = criar("li", "item-conteudo");
      item.append(criar("h3", "", formacao.curso));
      if (temTexto(formacao.instituicao)) item.append(criar("p", "subtitulo", formacao.instituicao));
      if (temTexto(formacao.periodo)) item.append(criar("p", "periodo", formacao.periodo));
      itens.push(item);
    }
    elementos.formacoes.replaceChildren(...itens);
    // Se a seção não tiver conteúdo, ela fica oculta.
    elementos.secaoFormacao.hidden = itens.length === 0;
  }

  // Monta listas de atividades e tecnologias; sem itens, não cria uma lista vazia.
  function criarLista(valores, classe) {
    const itens = [];
    // Cria um item da lista para cada texto preenchido, ignorando os valores vazios.
    for (const valor of obterLista(valores)) {
      if (temTexto(valor)) itens.push(criar("li", "", valor));
    }
    if (!itens.length) return null;
    const lista = criar("ul", classe);
    lista.append(...itens);
    return lista;
  }

  // Acrescenta as experiências e suas listas opcionais de atividades e tecnologias.
  function preencherExperiencias(lista) {
    const itens = [];
    // Ignora entradas vazias e mantém a ordem dos dados do estudante.
    for (const experiencia of obterLista(lista)) {
      if (!experiencia || !temTexto(experiencia.cargo)) continue;
      const item = criar("li", "item-conteudo");
      item.append(criar("h3", "", experiencia.cargo));
      if (temTexto(experiencia.empresa)) item.append(criar("p", "subtitulo", experiencia.empresa));
      if (temTexto(experiencia.periodo)) item.append(criar("p", "periodo", experiencia.periodo));
      if (temTexto(experiencia.descricao)) item.append(criar("p", "descricao", experiencia.descricao));
      const atividades = criarLista(experiencia.atividades, "lista-atividades");
      const tecnologias = criarLista(experiencia.tecnologias, "lista-tecnologias");
      if (atividades) item.append(atividades);
      if (tecnologias) item.append(tecnologias);
      itens.push(item);
    }
    elementos.experiencias.replaceChildren(...itens);
    // Se a seção não tiver conteúdo, ela fica oculta.
    elementos.secaoExperiencias.hidden = itens.length === 0;
  }

  // Exibe os projetos e cria o link de visita somente quando há uma URL.
  function preencherProjetos(lista) {
    const itens = [];
    // Ignora entradas vazias e mantém a ordem dos dados do estudante.
    for (const projeto of obterLista(lista)) {
      if (!projeto || !temTexto(projeto.nome)) continue;
      const item = criar("li", "item-conteudo");
      item.append(criar("h3", "", projeto.nome));
      if (temTexto(projeto.descricao)) item.append(criar("p", "descricao", projeto.descricao));
      // Só cria o link de visita quando o projeto tem um endereço preenchido.
      if (temTexto(projeto.url)) {
        const link = criar("a", "link-projeto", "Visitar projeto");
        link.href = projeto.url.trim();
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        item.append(link);
      }
      itens.push(item);
    }
    elementos.projetos.replaceChildren(...itens);
    // Se a seção não tiver conteúdo, ela fica oculta.
    elementos.secaoProjetos.hidden = itens.length === 0;
  }

  // Preenche os dados principais e chama as funções responsáveis por cada seção.
  function preencher(aluno) {
    const nome = temTexto(aluno.nome) ? aluno.nome.trim() : "Estudante";
    const titulo = temTexto(aluno.titulo) ? aluno.titulo.trim() : "";
    const turmaArea = [aluno.turma, aluno.area].filter(temTexto).map((valor) => valor.trim()).join(" • ");
    const fallback = avatarPadrao(nome);

    // Preenche a identificação e esconde os campos opcionais que não têm informação.
    elementos.nome.textContent = nome;
    elementos.titulo.textContent = titulo;
    elementos.titulo.hidden = !titulo;
    elementos.turmaArea.textContent = turmaArea;
    elementos.turmaArea.hidden = !turmaArea;
    elementos.sobre.textContent = temTexto(aluno.sobre) ? aluno.sobre.trim() : "";
    // Se a seção não tiver conteúdo, ela fica oculta.
    elementos.secaoSobre.hidden = !temTexto(aluno.sobre);
    // O caminho fotos/ continua relativo ao HTML na raiz, não à pasta do JSON.
    elementos.foto.src = temTexto(aluno.foto) ? aluno.foto.trim() : fallback;
    elementos.foto.alt = `Foto de ${nome}`;
    // Se a imagem não carregar, troca pela ilustração com as iniciais uma única vez.
    elementos.foto.addEventListener("error", () => { elementos.foto.src = fallback; }, { once: true });

    // Distribui os dados do estudante entre as funções que montam cada seção.
    preencherContato(aluno.contato);
    preencherCompetencias(aluno.competencias);
    preencherFormacoes(aluno.formacao);
    preencherExperiencias(aluno.experiencias);
    preencherProjetos(aluno.projetos);

    // O título da aba e o nome acessível passam a identificar este estudante.
    document.title = `${nome} — ${titulo || "Currículo"} | Curriculum CPM`;
    elementos.curriculo.setAttribute("aria-label", `Currículo de ${nome}`);
  }

  // Esconde o carregamento e apresenta o motivo de não encontrar o currículo.
  function mostrarErro(mensagem, erro) {
    elementos.carregamento.hidden = true;
    elementos.pagina.hidden = true;
    elementos.erro.hidden = false;
    elementos.mensagemErro.textContent = mensagem;
    document.title = "Currículo não encontrado | Curriculum CPM";
    if (erro) console.error("[Currículo do aluno]", erro);
  }

  // Lê o ID enviado pelo card, busca o JSON e procura o estudante ativo.
  async function iniciar() {
    // URLSearchParams lê a parte ?id=... do endereço da página.
    const id = new URLSearchParams(window.location.search).get("id")?.trim();
    // Interrompe o carregamento e orienta a escolher um estudante se o endereço estiver sem ID.
    if (!id) {
      mostrarErro("Selecione um estudante na página Ver Currículos.");
      return;
    }

    // Tenta carregar o currículo; qualquer erro deste trecho será tratado no catch abaixo.
    try {
      // Aguarda o arquivo local; uma resposta HTTP com erro vai para o catch.
      const resposta = await fetch("data/alunos-dados.json");
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      // Converte o texto JSON em um objeto e confere a lista alunos.
      const dados = await resposta.json();
      if (!Array.isArray(dados.alunos)) throw new TypeError('O JSON não contém o array "alunos".');
      // Um ID inexistente ou um aluno com ativo: false não abre o currículo.
      const aluno = dados.alunos.find((item) => item && item.id === id && item.ativo !== false);
      // Mostra um aviso quando o ID não corresponde a um estudante disponível.
      if (!aluno) {
        mostrarErro("O estudante solicitado não existe ou não está disponível.");
        return;
      }
      // Monta o currículo e troca a tela de carregamento pela página preenchida.
      preencher(aluno);
      elementos.carregamento.hidden = true;
      elementos.pagina.hidden = false;
    // Apresenta uma orientação na página se a leitura dos dados falhar.
    } catch (erro) {
      mostrarErro("Não foi possível carregar os dados. Abra o projeto com o Live Server e tente novamente.", erro);
    }
  }

  // O navegador oferece a impressão ou a opção de salvar o currículo como PDF.
  elementos.imprimir.addEventListener("click", () => window.print());
  // Inicia a busca dos dados assim que este script é executado.
  iniciar();
})();
