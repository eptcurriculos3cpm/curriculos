"use strict";

(() => {
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

  function temTexto(valor) {
    return typeof valor === "string" && valor.trim().length > 0;
  }

  function criar(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (temTexto(texto)) elemento.textContent = texto.trim();
    return elemento;
  }

  function avatarPadrao(nome) {
    const iniciais = nome.split(/\s+/).filter(Boolean).slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase()).join("") || "CV";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#1565c0"/><circle cx="200" cy="145" r="78" fill="#fff" opacity=".16"/><path d="M55 400c18-110 72-165 145-165s127 55 145 165" fill="#fff" opacity=".16"/><text x="200" y="235" text-anchor="middle" fill="#fff" font-family="Arial" font-size="90" font-weight="700">${iniciais}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function adicionarContato(rotulo, valor, href, externo = false) {
    if (!temTexto(valor)) return;
    const item = criar("li", "item-contato");
    const rotuloElemento = criar("span", "rotulo-contato", rotulo);
    const conteudo = href ? document.createElement("a") : document.createElement("span");
    conteudo.textContent = valor.trim();
    if (href) {
      conteudo.href = href;
      if (externo) {
        conteudo.target = "_blank";
        conteudo.rel = "noopener noreferrer";
      }
    }
    item.append(rotuloElemento, conteudo);
    elementos.contato.append(item);
  }

  function preencherContato(contato = {}) {
    elementos.contato.replaceChildren();
    adicionarContato("E-mail", contato.email, temTexto(contato.email) ? `mailto:${contato.email.trim()}` : "");
    adicionarContato("Cidade", contato.cidade);
    adicionarContato("LinkedIn", temTexto(contato.linkedin) ? "Ver perfil" : "", contato.linkedin, true);
    adicionarContato("GitHub", temTexto(contato.github) ? "Ver perfil" : "", contato.github, true);
    elementos.secaoContato.hidden = elementos.contato.children.length === 0;
  }

  function preencherCompetencias(lista) {
    const itens = (Array.isArray(lista) ? lista : []).filter((item) => item && temTexto(item.nome))
      .map((competencia) => {
        const item = criar("li", "competencia");
        const cabecalho = criar("div", "competencia-cabecalho");
        cabecalho.append(criar("strong", "", competencia.nome));
        if (temTexto(competencia.nivel)) cabecalho.append(criar("span", "nivel", competencia.nivel));
        item.append(cabecalho);
        return item;
      });
    elementos.competencias.replaceChildren(...itens);
    elementos.secaoCompetencias.hidden = itens.length === 0;
  }

  function preencherFormacoes(lista) {
    const itens = (Array.isArray(lista) ? lista : []).filter((item) => item && temTexto(item.curso))
      .map((formacao) => {
        const item = criar("li", "item-conteudo");
        item.append(criar("h3", "", formacao.curso));
        if (temTexto(formacao.instituicao)) item.append(criar("p", "subtitulo", formacao.instituicao));
        if (temTexto(formacao.periodo)) item.append(criar("p", "periodo", formacao.periodo));
        return item;
      });
    elementos.formacoes.replaceChildren(...itens);
    elementos.secaoFormacao.hidden = itens.length === 0;
  }

  function criarLista(valores, classe) {
    const itens = (Array.isArray(valores) ? valores : []).filter(temTexto)
      .map((valor) => criar("li", "", valor));
    if (!itens.length) return null;
    const lista = criar("ul", classe);
    lista.append(...itens);
    return lista;
  }

  function preencherExperiencias(lista) {
    const itens = (Array.isArray(lista) ? lista : []).filter((item) => item && temTexto(item.cargo))
      .map((experiencia) => {
        const item = criar("li", "item-conteudo");
        item.append(criar("h3", "", experiencia.cargo));
        if (temTexto(experiencia.empresa)) item.append(criar("p", "subtitulo", experiencia.empresa));
        if (temTexto(experiencia.periodo)) item.append(criar("p", "periodo", experiencia.periodo));
        if (temTexto(experiencia.descricao)) item.append(criar("p", "descricao", experiencia.descricao));
        const atividades = criarLista(experiencia.atividades, "lista-atividades");
        const tecnologias = criarLista(experiencia.tecnologias, "lista-tecnologias");
        if (atividades) item.append(atividades);
        if (tecnologias) item.append(tecnologias);
        return item;
      });
    elementos.experiencias.replaceChildren(...itens);
    elementos.secaoExperiencias.hidden = itens.length === 0;
  }

  function preencherProjetos(lista) {
    const itens = (Array.isArray(lista) ? lista : []).filter((item) => item && temTexto(item.nome))
      .map((projeto) => {
        const item = criar("li", "item-conteudo");
        item.append(criar("h3", "", projeto.nome));
        if (temTexto(projeto.descricao)) item.append(criar("p", "descricao", projeto.descricao));
        if (temTexto(projeto.url)) {
          const link = criar("a", "link-projeto", "Visitar projeto");
          link.href = projeto.url.trim();
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          item.append(link);
        }
        return item;
      });
    elementos.projetos.replaceChildren(...itens);
    elementos.secaoProjetos.hidden = itens.length === 0;
  }

  function preencher(aluno) {
    const nome = temTexto(aluno.nome) ? aluno.nome.trim() : "Estudante";
    const titulo = temTexto(aluno.titulo) ? aluno.titulo.trim() : "";
    const turmaArea = [aluno.turma, aluno.area].filter(temTexto).map((valor) => valor.trim()).join(" • ");
    const fallback = avatarPadrao(nome);

    elementos.nome.textContent = nome;
    elementos.titulo.textContent = titulo;
    elementos.titulo.hidden = !titulo;
    elementos.turmaArea.textContent = turmaArea;
    elementos.turmaArea.hidden = !turmaArea;
    elementos.sobre.textContent = temTexto(aluno.sobre) ? aluno.sobre.trim() : "";
    elementos.secaoSobre.hidden = !temTexto(aluno.sobre);
    elementos.foto.src = temTexto(aluno.foto) ? aluno.foto.trim() : fallback;
    elementos.foto.alt = `Foto de ${nome}`;
    elementos.foto.addEventListener("error", () => { elementos.foto.src = fallback; }, { once: true });

    preencherContato(aluno.contato);
    preencherCompetencias(aluno.competencias);
    preencherFormacoes(aluno.formacao);
    preencherExperiencias(aluno.experiencias);
    preencherProjetos(aluno.projetos);

    document.title = `${nome} — ${titulo || "Currículo"} | Currículos 3º CPM`;
    elementos.curriculo.setAttribute("aria-label", `Currículo de ${nome}`);
  }

  function mostrarErro(mensagem, erro) {
    elementos.carregamento.hidden = true;
    elementos.pagina.hidden = true;
    elementos.erro.hidden = false;
    elementos.mensagemErro.textContent = mensagem;
    document.title = "Currículo não encontrado | Currículos 3º CPM";
    if (erro) console.error("[Currículo do aluno]", erro);
  }

  async function iniciar() {
    const id = new URLSearchParams(window.location.search).get("id")?.trim();
    if (!id) {
      mostrarErro("Selecione um estudante na página Ver Currículos.");
      return;
    }

    try {
      const resposta = await fetch("alunos-dados.json");
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();
      if (!Array.isArray(dados.alunos)) throw new TypeError('O JSON não contém o array "alunos".');
      const aluno = dados.alunos.find((item) => item && item.id === id && item.ativo !== false);
      if (!aluno) {
        mostrarErro("O estudante solicitado não existe ou não está disponível.");
        return;
      }
      preencher(aluno);
      elementos.carregamento.hidden = true;
      elementos.pagina.hidden = false;
    } catch (erro) {
      mostrarErro("Não foi possível carregar os dados. Abra o projeto com o Live Server e tente novamente.", erro);
    }
  }

  elementos.imprimir.addEventListener("click", () => window.print());
  iniciar();
})();
