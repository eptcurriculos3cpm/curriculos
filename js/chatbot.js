// Executa a configuração do chat em um espaço próprio, sem misturar suas variáveis com outros arquivos.
(function () {
  // Ativa verificações do JavaScript que ajudam a identificar erros, como variáveis não declaradas.
  "use strict";

  // Reúne os textos e as respostas originais do chatbot em um único lugar.
  const CONFIG = {
    botName: "Nina",
    subtitle: "Assistente Virtual do 3º CPM",
    greeting: "Sou a Assistente Virtual do 3º CPM! Como posso te ajudar hoje?",
    inputPlaceholder: "Como posso te ajudar?",
    footerNote: "Digite sua dúvida ou escolha uma opção abaixo.",
    endMessage: "Obrigada por conversar comigo! Se precisar de algo, é só abrir o chat de novo. 👋",

    // Estas são as opções exibidas quando a conversa começa.
    menuOptions: [
      "Como funciona nosso site?",
      "Quer contratar um estagiário?",
      "Quero enviar meu currículo",
      "Sobre o 3º CPM",
      "Informações de turno",
      "Localização do colégio",
      "Quantidade de estudantes",
      "Curso profissionalizante",
      "Sobre o projeto",
      "Desafio EPT"

    ],

    // A primeira regra com uma palavra da pergunta define a resposta.
    // A ordem foi mantida porque algumas palavras aparecem em mais de uma regra.
    rules: [
      {
        keywords: ["funciona", "site", "como", "opções", "como é"],
        reply: `Nosso site disponibiliza algumas possibilidades:
1- Caso seja empresa, você pode visualizar nosso catálogo de alunos dispostos a serem contratados na página "Ver Currículos" e entrar em contato com eles através de informações disponíveis;
2- Caso seja aluno, você pode criar um currículo diretamente no nosso site clicando em "Criar Currículo";
3- Sites que disponibilizam cursos com certificados gratuitos para aprimorar sua carreira no mercado de trabalho;
4- Vagas disponibilizadas por empresas para alunos interessados entrarem em contato e enviarem seus currículos.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`
      },
      {
        keywords: ["contratar", "estagiario", "estagiário", "estagiarios", "estágiarios", "emprego"],
        reply: `Ótimo, fico muito feliz com sua decisão e esperamos ter profissionais qualificados para seu perfil!
Você pode acessar todos os nossos alunos e suas devidas informações de contato e qualificações em "Ver Currículos", escolher os que mais se encaixam para aquilo que procura e entrar em contato para uma entrevista.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`,
        action: "openCatalog"
      },
      {
        keywords: ["currículo", "curriculo", "enviar", "quero enviar", "quero criar", "criar currículo", "criar curriculo"],
        reply: `Ótimo, fico muito feliz com sua decisão e esperamos ajudar você a entrar no mercado de trabalho.
O processo é bem simples: você pode criar seu currículo diretamente no nosso site clicando em "Criar Currículo" e preenchendo as informações solicitadas. Após isso, suas informações serão enviadas para nossa equipe, que enviará um e-mail com a confirmação dos dados e um anexo do termo da LGPD (Lei Geral de Proteção de Dados). O documento deverá ser assinado e enviado a nós pelo mesmo endereço de e-mail. Em seguida, cadastraremos seus dados na plataforma e deixaremos seu perfil disponível.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`
      },
      {
        keywords: ["cpm", "3º cpm", "3 cpm"],
        reply: `O 3º Colégio da Polícia Militar do Paraná foi criado como um órgão de apoio à Polícia Militar do Paraná e como um estabelecimento de ensino formal, pelo Decreto Governamental nº 11.334 de 15 de outubro de 2018.
Publicado no Diário Oficial nº 10.294 da mesma data, o colégio iniciou oficialmente suas atividades no dia 04 de fevereiro de 2019.
Fundado a partir do antigo Colégio Estadual Alberto Carazzai, em funcionamento desde 1970.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`
      },
      {
        keywords: ["turno", "periodos", "periodo", "matutino", "vespertino", "noturno"],
        reply: `O nosso colégio possui alunos em três turnos, sendo eles: Matutino para Ensino Médio regular, Vespertino para Anos Finais (6º ao 9º ano) e Noturno para Ensino Médio integrado com curso técnico de Desenvolvimento de Sistemas.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`
      },
      {
        keywords: ["local", "localização", "localizacao", "onde fica"],
        reply: `Nosso colégio fica localizado na Av. Minas Gerais, 1295, na região central de Cornélio Procópio. Estamos abertos de segunda a sexta, das 7h às 18h, para atendimento.
Espero ter ajudado. Caso precise de mais alguma coisa, estou à disposição!`,
        action: "openMaps"
      },
      {
        keywords: ["quantos alunos", "alunos", "quantidade", "estudantes"],
        reply: `Nosso colégio tem em torno de 770 a 780 alunos matriculados entre Ensino Fundamental, Ensino Médio Regular e Ensino Médio Profissionalizante.
Espero ter ajudado. Caso precise de mais alguma coisa, estou à disposição!`
      },
      {
        keywords: ["técnico", "tecnico", "curso", "noturno"],
        reply: `O nosso Curso Técnico Integrado em Desenvolvimento de Sistemas é uma formação completa com três anos de duração. Ao longo desse período, o estudante cursa todas as disciplinas da Base Nacional Comum Curricular do Ensino Médio Regular e, simultaneamente, mergulha em uma grade focada em tecnologia e preparação prática para o mercado de trabalho.

Nas aulas técnicas, os alunos desenvolvem competências essenciais, como lógica de programação, criação de sistemas, desenvolvimento web e gerenciamento de banco de dados.
Espero ter ajudado. Caso precise de mais alguma coisa, estou à disposição!`
      },
      {
        keywords: ["projeto", "equipe"],
        reply: `O nosso projeto nasceu da união de alunas dedicadas e focadas em fazer a diferença por meio da tecnologia. A nossa equipe é formada por estudantes do curso técnico que compartilham o mesmo propósito: aplicar o conhecimento adquirido em sala de aula para desenvolver soluções reais, inovadoras e com impacto social. Cada integrante traz uma habilidade única para o grupo, desde a liderança e organização até a programação e o design. Trabalhar em equipe tem sido uma experiência enriquecedora, fortalecendo nossa colaboração e nos preparando para os desafios do mercado de trabalho.
Espero ter ajudado. Caso precise de mais alguma coisa, estou à disposição!`
      },
      {
        keywords: ["desafio", "ept"],
        reply: `O Desafio EPT (Educação Profissional e Tecnológica) é uma iniciativa incrível que estimula estudantes de cursos técnicos a desenvolverem projetos inovadores e soluções práticas para problemas reais da sociedade. Mais do que uma competição, o desafio é um espaço de aprendizado prático, criatividade e empreendedorismo, onde podemos testar nossas habilidades tecnológicas e de gestão. Participar do Desafio EPT é uma oportunidade única de dar visibilidade ao nosso projeto, receber mentorias e mostrar o potencial da educação pública e técnica.
Espero ter ajudado. Caso precise de mais alguma coisa, estou à disposição!`
      },
      {
        keywords: ["obg", "obrigad", "valeu", "agradeço"],
        reply: "Fico feliz em poder ajudar! Se precisar de mais alguma coisa, estarei sempre à disposição para te ajudar!"
      }
    ],
    // Esta resposta aparece quando nenhuma palavra combina com as regras acima.
    fallbackReply: "Desculpe, não entendi sua pergunta. Por favor, tente novamente ou escolha uma das opções do menu."
  };

  // Reaproveita o botão que já existe no HTML de cada página.
  const botaoChat = document.querySelector(".chatbot") || document.createElement("button");
  botaoChat.id = "cb-toggle";
  botaoChat.type = "button";
  botaoChat.classList.add("chatbot");
  botaoChat.setAttribute("aria-label", "Abrir chat de atendimento");
  botaoChat.setAttribute("aria-expanded", "false");
  botaoChat.setAttribute("aria-controls", "cb-panel");
  botaoChat.innerHTML = '<span class="cb-chat-ic" aria-hidden="true">💬</span><span class="cb-close-ic" aria-hidden="true">✕</span>';
  if (!botaoChat.isConnected) document.body.append(botaoChat);

  // O HTML abaixo é fixo. Mensagens digitadas são inseridas com textContent.
  const painel = document.createElement("div");
  painel.id = "cb-panel";
  painel.setAttribute("role", "dialog");
  painel.setAttribute("aria-label", "Chat da assistente virtual");
  painel.setAttribute("aria-hidden", "true");
  // inert impede que o teclado alcance os campos enquanto o painel está fechado.
  painel.inert = true;
  painel.innerHTML = `
    <div class="cb-head">
      <span class="cb-dot" aria-hidden="true"></span>
      <div><strong>${CONFIG.botName}</strong><small>${CONFIG.subtitle}</small></div>
    </div>
    <div class="cb-body" id="cb-body" role="log" aria-live="polite" aria-relevant="additions" aria-label="Mensagens da conversa"></div>
    <div class="cb-input-row">
      <input id="cb-input" type="text" placeholder="${CONFIG.inputPlaceholder}" aria-label="Digite sua mensagem">
      <button id="cb-send" type="button" aria-label="Enviar mensagem">➤</button>
    </div>
    <div class="cb-note">${CONFIG.footerNote}</div>
  `;
  document.body.append(painel);

  // Guarda as partes que usamos para mostrar mensagens e ler o que foi digitado.
  const mensagens = painel.querySelector("#cb-body");
  const campoMensagem = painel.querySelector("#cb-input");
  const botaoEnviar = painel.querySelector("#cb-send");
  // Evita repetir a saudação quando a pessoa apenas fecha e reabre o painel.
  let conversaIniciada = false;
  // Guarda os temporizadores ainda pendentes para cancelá-los ao finalizar.
  const respostasPendentes = new Set();

  // Abre o painel, atualiza o leitor de tela e coloca o foco no campo de mensagem.
  function abrirChat() {
    painel.inert = false;
    painel.classList.add("open");
    painel.setAttribute("aria-hidden", "false");
    botaoChat.classList.add("is-open");
    botaoChat.setAttribute("aria-expanded", "true");
    botaoChat.setAttribute("aria-label", "Fechar chat de atendimento");
    campoMensagem.focus({ preventScroll: true });
    // Mostra a saudação e o menu apenas na primeira abertura da conversa.
    if (!conversaIniciada) {
      conversaIniciada = true;
      mostrarMensagem(CONFIG.greeting, mostrarMenu);
    }
  }

  // Fecha sem apagar o histórico; a pessoa pode continuar ao abrir novamente.
  function fecharChat() {
    botaoChat.focus({ preventScroll: true });
    painel.classList.remove("open");
    painel.setAttribute("aria-hidden", "true");
    painel.inert = true;
    botaoChat.classList.remove("is-open");
    botaoChat.setAttribute("aria-expanded", "false");
    botaoChat.setAttribute("aria-label", "Abrir chat de atendimento");
  }

  // Sempre acompanha a mensagem mais recente dentro da área de rolagem.
  function rolarConversa() {
    mensagens.scrollTop = mensagens.scrollHeight;
  }

  // A classe bot ou user mantém os balões com suas cores e posições originais.
  function criarMensagem(texto, autor) {
    const mensagem = document.createElement("div");
    mensagem.className = "cb-msg " + autor;
    mensagem.textContent = texto;
    mensagens.append(mensagem);
    rolarConversa();
    return mensagem;
  }

  // As três bolinhas aparecem por 600 a 1100 ms antes da resposta da Nina.
  function mostrarMensagem(texto, depoisDeMostrar) {
    const digitando = criarMensagem("", "bot cb-typing");
    digitando.setAttribute("aria-hidden", "true");
    digitando.innerHTML = "<span></span><span></span><span></span>";
    rolarConversa();
    // Espera um pequeno intervalo antes de trocar as bolinhas pela resposta.
    const espera = setTimeout(() => {
      respostasPendentes.delete(espera);
      digitando.remove();
      criarMensagem(texto, "bot");
      // Algumas respostas mostram botões depois de terminar a mensagem.
      if (depoisDeMostrar) depoisDeMostrar();
    }, 600 + Math.random() * 500);
    respostasPendentes.add(espera);
  }

  // Remove as opções antigas antes de montar o próximo grupo de botões.
  function limparOpcoes() {
    mensagens.querySelectorAll(".cb-quick-replies").forEach((grupo) => grupo.remove());
  }

  // Cria a caixa que reúne as novas opções e a coloca no histórico da conversa.
  function criarGrupoOpcoes() {
    limparOpcoes();
    const grupo = document.createElement("div");
    grupo.className = "cb-quick-replies";
    mensagens.append(grupo);
    return grupo;
  }

  // Evita repetir a criação e o evento de clique de cada botão da conversa.
  function criarOpcao(grupo, texto, aoClicar) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.addEventListener("click", aoClicar);
    grupo.append(botao);
  }

  // Monta os botões dos assuntos disponíveis no menu inicial.
  function mostrarMenu() {
    const grupo = criarGrupoOpcoes();
    // Cada opção usa a mesma função que recebe as mensagens digitadas.
    for (const opcao of CONFIG.menuOptions) {
      criarOpcao(grupo, opcao, () => enviarMensagem(opcao));
    }
    rolarConversa();
  }

  // Procura as palavras na mesma ordem da versão original, sem mudar respostas.
  function responder(pergunta) {
    const texto = pergunta.toLowerCase();
    // Escolhe a primeira regra que contém alguma palavra encontrada na pergunta.
    const regra = CONFIG.rules.find((item) => {
      return item.keywords.some((palavra) => texto.includes(palavra));
    });
    // Quando nenhum assunto combina, mostra a resposta padrão e as opções para continuar.
    if (!regra) {
      mostrarMensagem(CONFIG.fallbackReply, mostrarOpcoesFinais);
      return;
    }
    mostrarMensagem(regra.reply, () => mostrarOpcoesFinais(regra.action));
  }

  // Depois da resposta, permite abrir o destino indicado, voltar ou finalizar.
  function mostrarOpcoesFinais(acao) {
    const grupo = criarGrupoOpcoes();
    // Acrescenta um link para a localização do colégio, aberto em outra aba.
    if (acao === "openMaps") {
      const link = document.createElement("a");
      link.href = "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjokOX75v-VAxUAAAAAHQAAAAAQBA..i&aep=10&cs=1&udm=50&mstk=AUtExfAbI34zETgQ9VuuSbZVpax7hIJ6dwZNo7HZ_pM2qOgHLN4Hi8IYI1EhbhylKyMXL0_QZAvjKXt8nxNLzeaECdBQShctIbWy-jmYYvyM3xakJDluKPyC7ThM3Wq_KRujIDKI0nlksb_e4mHwLa4jyv8AZobrpTK6xTeG4WxyD-CBdiHYHs4csCKEB_kRRiY10yQ5-6_A5GHtC17yxN4EyOXNFqk9XpgYG6dOHFxiXOaesdPJS1BfwB0kjcFGndtWnptSVgLLr_w-Aulbo23LogcndcfNjDOG2btSNyZkJedB8F_8zd_XaCxlRlfuBwia3hxmGy1jtq21rQ&pvq=Cg0vZy8xMWg1cngwMGJ0YmQSYhJgCg1zY2hvb2wgZmFjYWRlCg5zY2hvb2wgbGlicmFyeQoQc2Nob29sIGNvdXJ0eWFyZAoMc3BvcnRzIGNvdXJ0ChFzY2hvb2wgYXVkaXRvcml1bQoMY29tcHV0ZXIgbGFigAEC&fvr=1&um=1&ie=UTF-8&fb=1&gl=br&sa=X&ftid=0x94eadf405331c561:0xc9c9e93e3d6dffb4";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "📍 Ver no Google Maps";
      grupo.append(link);
    }
    // Oferece um botão para abrir o catálogo de estudantes.
    if (acao === "openCatalog") {
      // Ao clicar, leva a pessoa até o carrossel da página de currículos.
      criarOpcao(grupo, "Ver Currículos", () => {
        window.location.href = "vercurriculos.html#carrossel";
      });
    }
    // Registra a escolha no histórico e mostra novamente os assuntos do menu.
    criarOpcao(grupo, "🔙 Voltar ao menu principal", () => {
      criarMensagem("Voltar ao menu principal", "user");
      mostrarMenu();
    });
    criarOpcao(grupo, "✅ Finalizar conversa", finalizarConversa);
    rolarConversa();
  }

  // A despedida continua visível por 1,2 segundo antes de limpar a conversa.
  function finalizarConversa() {
    criarMensagem("Finalizar conversa", "user");
    limparOpcoes();
    // Depois de mostrar a despedida, agenda o fechamento e a limpeza do histórico.
    mostrarMensagem(CONFIG.endMessage, () => {
      // Aguarda 1,2 segundo para dar tempo de ler a despedida antes de fechar.
      setTimeout(() => {
        fecharChat();
        // Cancela respostas ainda aguardando para não repor mensagens após limpar.
        respostasPendentes.forEach((espera) => clearTimeout(espera));
        respostasPendentes.clear();
        mensagens.replaceChildren();
        conversaIniciada = false;
      }, 1200);
    });
  }

  // Recebe uma mensagem, mostra o texto da pessoa e procura a resposta correspondente.
  function enviarMensagem(texto) {
    if (!texto.trim()) return; // Não envia mensagens vazias ou só com espaços.
    criarMensagem(texto, "user");
    limparOpcoes();
    responder(texto);
  }

  // Lê o campo, retira espaços das pontas e limpa a entrada antes de enviar o texto.
  function enviarTextoDigitado() {
    const texto = campoMensagem.value.trim();
    if (!texto) return;
    campoMensagem.value = "";
    enviarMensagem(texto);
  }

  // O mesmo botão abre e fecha. Enter envia e Escape fecha pelo teclado.
  botaoChat.addEventListener("click", () => {
    if (painel.classList.contains("open")) fecharChat();
    else abrirChat();
  });
  // Envia o texto quando a pessoa clica na seta do campo de mensagem.
  botaoEnviar.addEventListener("click", enviarTextoDigitado);
  // Envia com Enter, exceto enquanto o teclado ainda está compondo um caractere.
  campoMensagem.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" && !evento.isComposing) enviarTextoDigitado();
  });
  // Permite fechar o chat aberto usando a tecla Escape.
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && painel.classList.contains("open")) fecharChat();
  });
})();
