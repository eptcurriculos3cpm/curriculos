"use strict";

(() => {
  const elementos = {
    carregamento: document.getElementById("estado-carregamento"),
    erro: document.getElementById("estado-erro"),
    carrossel: document.getElementById("carrossel"),
    trilha: document.getElementById("trilha"),
    indicadores: document.getElementById("indicadores"),
    anterior: document.getElementById("anterior"),
    proximo: document.getElementById("proximo")
  };
  let slides = [];
  let slideAtual = 0;

  function texto(valor, fallback = "") {
    return typeof valor === "string" && valor.trim() ? valor.trim() : fallback;
  }

  function avatarPadrao(nome) {
    const iniciais = texto(nome, "CV").split(/\s+/).slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase()).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#1565c0"/><circle cx="200" cy="150" r="78" fill="#fff" opacity=".15"/><path d="M55 400c18-110 72-165 145-165s127 55 145 165" fill="#fff" opacity=".15"/><text x="200" y="235" text-anchor="middle" fill="#fff" font-family="Arial" font-size="90" font-weight="700">${iniciais}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function criar(tag, classe, conteudo) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (conteudo) elemento.textContent = conteudo;
    return elemento;
  }

  function criarBloco(titulo, conteudo) {
    const bloco = criar("div", "bloco");
    bloco.append(criar("h3", "", titulo), conteudo);
    return bloco;
  }

  function criarSlide(aluno, indice, total) {
    const nome = texto(aluno.nome, "Estudante");
    const slide = criar("article", "slide");
    const link = criar("a", "link-curriculo");
    const resumo = criar("div", "resumo-curriculo");
    const perfil = criar("div", "perfil");
    const foto = criar("img", "foto-aluno");
    const detalhes = criar("div", "detalhes");
    const grade = criar("div", "grade-informacoes");
    const formacao = Array.isArray(aluno.formacao) ? aluno.formacao[0] : null;
    const competencias = Array.isArray(aluno.competencias) ? aluno.competencias : [];

    slide.setAttribute("aria-label", `Currículo ${indice + 1} de ${total}`);
    slide.setAttribute("aria-hidden", String(indice !== 0));
    link.href = `curriculo-aluno.html?id=${encodeURIComponent(aluno.id)}`;
    link.setAttribute("aria-label", `Abrir currículo de ${nome}`);

    const fotoFallback = avatarPadrao(nome);
    foto.src = texto(aluno.foto, fotoFallback);
    foto.alt = `Foto de ${nome}`;
    foto.addEventListener("error", () => { foto.src = fotoFallback; }, { once: true });
    perfil.append(foto, criar("h2", "nome-aluno", nome), criar("p", "titulo-aluno", texto(aluno.titulo, "Estudante")));

    detalhes.append(criar("p", "sobre", texto(aluno.sobre, "Conheça a trajetória e as competências deste estudante.")));

    const formacaoTexto = criar("p", "", formacao
      ? [texto(formacao.curso), texto(formacao.instituicao), texto(formacao.periodo)].filter(Boolean).join(" — ")
      : "Formação não informada");
    grade.append(criarBloco("Formação", formacaoTexto));
    grade.append(criarBloco("Turma e área", criar("p", "", [texto(aluno.turma), texto(aluno.area)].filter(Boolean).join(" — "))));

    const habilidades = criar("div", "habilidades");
    competencias.slice(0, 4).forEach((competencia) => {
      if (texto(competencia?.nome)) habilidades.append(criar("span", "", competencia.nome));
    });
    if (habilidades.children.length) grade.append(criarBloco("Competências", habilidades));

    const cidade = texto(aluno.contato?.cidade);
    if (cidade) grade.append(criarBloco("Localidade", criar("p", "", cidade)));

    detalhes.append(grade, criar("span", "chamada-card", "Ver currículo completo →"));
    resumo.append(perfil, detalhes);
    link.append(resumo);
    slide.append(link);
    return slide;
  }

  function criarIndicador(aluno, indice) {
    const indicador = criar("button", "indicador");
    indicador.type = "button";
    indicador.setAttribute("aria-label", `Ver currículo de ${texto(aluno.nome, `estudante ${indice + 1}`)}`);
    if (indice === 0) {
      indicador.classList.add("ativo");
      indicador.setAttribute("aria-current", "true");
    }
    indicador.addEventListener("click", () => mostrarSlide(indice));
    return indicador;
  }

  function mostrarSlide(indice) {
    if (!slides.length) return;
    slideAtual = (indice + slides.length) % slides.length;
    elementos.trilha.style.transform = `translateX(-${slideAtual * 100}%)`;
    slides.forEach((slide, i) => slide.setAttribute("aria-hidden", String(i !== slideAtual)));
    [...elementos.indicadores.children].forEach((indicador, i) => {
      indicador.classList.toggle("ativo", i === slideAtual);
      if (i === slideAtual) indicador.setAttribute("aria-current", "true");
      else indicador.removeAttribute("aria-current");
    });
  }

  async function carregar() {
    try {
      const resposta = await fetch("alunos-dados.json");
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();
      if (!Array.isArray(dados.alunos)) throw new TypeError('O JSON não contém o array "alunos".');
      const alunos = dados.alunos.filter((aluno) => aluno && aluno.ativo !== false && aluno.id);
      if (!alunos.length) throw new Error("Nenhum estudante ativo encontrado.");

      slides = alunos.map((aluno, indice) => criarSlide(aluno, indice, alunos.length));
      elementos.trilha.replaceChildren(...slides);
      elementos.indicadores.replaceChildren(...alunos.map(criarIndicador));
      elementos.carregamento.hidden = true;
      elementos.carrossel.hidden = false;
      elementos.anterior.disabled = alunos.length < 2;
      elementos.proximo.disabled = alunos.length < 2;
    } catch (erro) {
      console.error("[Ver Currículos] Falha ao carregar estudantes:", erro);
      elementos.carregamento.hidden = true;
      elementos.erro.hidden = false;
    }
  }

  elementos.anterior.addEventListener("click", () => mostrarSlide(slideAtual - 1));
  elementos.proximo.addEventListener("click", () => mostrarSlide(slideAtual + 1));
  elementos.carrossel.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") mostrarSlide(slideAtual - 1);
    if (evento.key === "ArrowRight") mostrarSlide(slideAtual + 1);
  });
  carregar();
})();
