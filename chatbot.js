(function () {
  "use strict";

  const CONFIG = {
    botName: "Nina",
    subtitle: "Assistente Virtual do 3º CPM",
    greeting: "Sou a Assistente Virtual do 3º CPM! Como posso te ajudar hoje?",
    inputPlaceholder: "Como posso te ajudar?",
    footerNote: "Digite sua dúvida ou escolha uma opção abaixo.",
    endMessage: "Obrigada por conversar comigo! Se precisar de algo, é só abrir o chat de novo. 👋",

    colors: {
      accent: "#043175",   // cor do botão e detalhes
      panelBg: "#F3ECD9",  // fundo do painel de chat
      panelBgDim: "#E8DFC6",
      headerBg: "#16223A", // cabeçalho do chat
      text: "#1B2A3D",
      userBubble: "#16223A",
      userText: "#F3ECD9"
    },

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

    rules: [
      {
        keywords: ["funciona"],
        reply: `Nosso site disponibiliza algumas possibilidades:
1- Caso seja empresa, você pode visualizar nosso catálogo de alunos dispostos a serem contratados na página "Ver Currículos" e entrar em contato com eles através de informações disponíveis;
2- Caso seja aluno, você pode criar um currículo diretamente no nosso site clicando em "Criar Currículo";
3- Sites que disponibilizam cursus com certificados gratuítos para aprimorar sua carreira no mercado de trabalho;
4- Vagas disponibilizadas por empresas se houver interesse para nossos alunos entrarem em contato e enviarem seus currículos.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`
      },
      {
        keywords: ["contratar"],
        reply: `Ótimo, fico muito feliz com sua decisão e esperamos ter profissionais qualificados para seu perfil!
Você pode acessar todos os nossos alunos e suas devidas informações de contato e qualificações em "Catálogos", escolher os que mais se encaixam para aquilo que procura e entrar em contato para uma entrevista.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`,
        action: "scrollToCatalog"
      },
      {
        keywords: ["currículo"],
        reply: `Ótimo, fico muito feliz com sua decisão e esperamos ajudar você a entrar no mercado de trabalho.
O processo é bem simples, você pode criar seu currículo diretamente no nosso site clicando em "Criar Currículo" e preenchendo as informações solicitadas. Após isso, você poderá visualizar seu currículo e compartilhá-lo com empresas interessadas.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`
      },
      {
        keywords: ["cpm"],
        reply: `O 3º Colégio da Polícia Militar do Paraná foi criado como um órgão de apoio à Polícia Militar do Paraná e como um estabelecimento de ensino formal, pelo Decreto Governamental nº 11.334 de 15 de outubro de 2018.
Publicado no Diário Oficial nº 10.294 da mesma data, o colégio iniciou oficialmente suas atividades no dia 04 de fevereiro de 2019.
Fundado a partir do antigo Colégio Estadual Alberto Carazzai, em funcionamento desde 1970.
Espero ter conseguido te ajudar! Se precisar de mais algo, estarei disposta a te ajudar!`
      },
      {
        keywords: ["turno"],
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
    fallbackReply: "Desculpe, não entendi sua pergunta. Por favor, tente novamente ou escolha uma das opções do menu.",
    catalogSectionId: "catalogo"
  };

  const style = document.createElement("style");
  style.textContent = `
    #cb-toggle{
      position: fixed; bottom: 30px; right: 30px; z-index: 9999;
      width: 60px; height:60px; border-radius:50%;
      background: ${CONFIG.colors.accent}; border: none; color: #fff;
      box-shadow: 0 10px 24px rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
      font-size:1.5rem; cursor:pointer; transition: transform .15s ease;
      font-family: inherit;
    }
    #cb-toggle:hover{ transform: scale(1.06); }
    #cb-toggle .cb-close-ic{ display:none; }
    #cb-toggle.is-open .cb-chat-ic{ display:none; }
    #cb-toggle.is-open .cb-close-ic{ display:block; }

    #cb-panel{
      position: fixed; bottom: 100px; right: 30px; z-index: 9999;
      width: 340px; max-width: calc(100vw - 32px);
      height: 460px; max-height: calc(100vh - 140px);
      background: ${CONFIG.colors.panelBg}; color: ${CONFIG.colors.text};
      border-radius: 8px; overflow:hidden;
      display:flex; flex-direction:column;
      box-shadow: 0 20px 50px rgba(0,0,0,0.4);
      opacity:0; transform: translateY(14px) scale(0.98); pointer-events:none;
      transition: opacity .18s ease, transform .18s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
    #cb-panel.open{ opacity:1; transform: translateY(0) scale(1); pointer-events:auto; }

    .cb-head{
      background: ${CONFIG.colors.headerBg}; color: #fff;
      padding: 14px 16px; display:flex; align-items:center; gap:10px;
      font-size:0.85rem; border-bottom: 3px solid ${CONFIG.colors.accent};
    }
    .cb-head .cb-dot{ width:8px; height:8px; border-radius:50%; background:#5fbf7a; flex-shrink:0; }
    .cb-head strong{ display:block; font-size:0.95rem; }
    .cb-head small{ opacity:0.7; }

    .cb-body{
      flex:1; overflow-y:auto; padding: 14px 14px 6px;
      display:flex; flex-direction:column; gap:10px; font-size: 0.88rem;
    }
    .cb-msg{ max-width: 86%; padding: 9px 12px; border-radius: 10px; line-height:1.4; white-space: pre-line; }
    .cb-msg.bot{ background: ${CONFIG.colors.panelBgDim}; align-self:flex-start; border-bottom-left-radius:2px; }
    .cb-msg.user{ background: ${CONFIG.colors.userBubble}; color: ${CONFIG.colors.userText}; align-self:flex-end; border-bottom-right-radius:2px; }

    .cb-typing{ display:flex; align-items:center; gap:4px; padding: 12px 14px; }
    .cb-typing span{
      width:6px; height:6px; border-radius:50%;
      background:#8a7f64; opacity:0.4;
      animation: cb-blink 1.2s infinite ease-in-out;
    }
    .cb-typing span:nth-child(2){ animation-delay: 0.2s; }
    .cb-typing span:nth-child(3){ animation-delay: 0.4s; }
    @keyframes cb-blink{
      0%, 80%, 100% { opacity:0.3; transform: translateY(0); }
      40% { opacity:1; transform: translateY(-3px); }
    }

    .cb-quick-replies{ display:flex; flex-direction:column; gap:6px; margin-top:2px; }
    .cb-quick-replies button{
      text-align:left; background:#fff; border:1px solid #cabf9e; border-radius:6px;
      padding: 8px 10px; font-size:0.85rem; color: ${CONFIG.colors.text}; cursor:pointer;
      font-family: inherit;
    }
    .cb-quick-replies button:hover{ background: ${CONFIG.colors.accent}; border-color: ${CONFIG.colors.accent}; }
    .cb-quick-replies a{
      display:block; text-align:left; background:#fff; border:1px solid #cabf9e;
      border-radius:6px; padding:8px 10px; font-size:0.85rem; color:${CONFIG.colors.text};
      cursor:pointer; font-family:inherit; text-decoration:none;
    }
    .cb-quick-replies a:hover{ background:${CONFIG.colors.accent}; border-color:${CONFIG.colors.accent}; color:#fff; }

    .cb-input-row{
      display:flex; gap:8px; padding: 10px 12px 12px;
      border-top: 1px solid ${CONFIG.colors.panelBgDim}; background: ${CONFIG.colors.panelBg};
    }
    .cb-input-row input{
      flex:1; border:1px solid #cabf9e; border-radius:20px; padding: 9px 14px;
      font-size:0.85rem; font-family: inherit;
    }
    .cb-input-row input:focus-visible, #cb-toggle:focus-visible, .cb-quick-replies button:focus-visible{
      outline: 2px solid ${CONFIG.colors.accent}; outline-offset: 2px;
    }
    .cb-input-row button{
      background: ${CONFIG.colors.headerBg}; color: #fff; border:none; border-radius:50%;
      width:38px; height:38px; flex-shrink:0; font-size:1rem; cursor:pointer;
      padding:0; display:flex; align-items:center; justify-content:center;
      line-height:1; transform:none;
    }
    .cb-input-row button:hover{ background: #B23A2F; transform:none; }

    .cb-note{ font-size:0.62rem; text-align:center; color:#7a6f57; padding: 0 12px 10px; }

    @media (prefers-reduced-motion: reduce){
      #cb-panel, #cb-toggle{ transition: none !important; }
      .cb-typing span{ animation: none !important; opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);

  const existingToggle = document.querySelector(".chatbot");
  const toggle = existingToggle || document.createElement("button");
  toggle.id = "cb-toggle";
  toggle.classList.add("chatbot");
  toggle.setAttribute("aria-label", "Abrir chat de atendimento");
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = `<span class="cb-chat-ic">💬</span><span class="cb-close-ic">✕</span>`;

  const panel = document.createElement("div");
  panel.id = "cb-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Chat da assistente virtual");
  panel.innerHTML = `
    <div class="cb-head">
      <span class="cb-dot" aria-hidden="true"></span>
      <div>
        <strong>${CONFIG.botName}</strong>
        <small>${CONFIG.subtitle}</small>
      </div>
    </div>
    <div class="cb-body" id="cb-body"></div>
    <div class="cb-input-row">
      <input id="cb-input" type="text" placeholder="${CONFIG.inputPlaceholder}" aria-label="Digite sua mensagem">
      <button id="cb-send" aria-label="Enviar mensagem">➤</button>
    </div>
    <div class="cb-note">${CONFIG.footerNote}</div>
  `;

  if (!existingToggle) document.body.appendChild(toggle);
  document.body.appendChild(panel);

  const chatBody  = panel.querySelector("#cb-body");
  const chatInput = panel.querySelector("#cb-input");
  const chatSend  = panel.querySelector("#cb-send");

  let started = false;

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen && !started) {
      started = true;
      chatBody.innerHTML = "";
      botSay(CONFIG.greeting, showMainMenu);
    }
  });

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "cb-msg user";
    div.textContent = text;
    chatBody.appendChild(div);
    scrollChat();
  }

  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "cb-msg bot";
    div.textContent = text;
    chatBody.appendChild(div);
    scrollChat();
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "cb-msg bot cb-typing";
    div.id = "cb-typing-indicator";
    div.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(div);
    scrollChat();
  }

  function hideTyping() {
    const el = document.getElementById("cb-typing-indicator");
    if (el) el.remove();
  }

  // Mostra o balão "digitando..." por um instante e só depois exibe a mensagem.
  // callback (opcional) roda depois que a mensagem aparece — usado pra
  // encadear as próximas ações (mostrar menu, botões, etc.) na ordem certa.
  function botSay(text, callback) {
    showTyping();
    const delay = 600 + Math.random() * 500; // varia entre ~0.6s e 1.1s
    setTimeout(() => {
      hideTyping();
      addBotMessage(text);
      if (callback) callback();
    }, delay);
  }

  function scrollChat() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function clearQuickReplies() {
    panel.querySelectorAll(".cb-quick-replies").forEach((el) => el.remove());
  }

  function showMainMenu() {
    clearQuickReplies();
    const wrap = document.createElement("div");
    wrap.className = "cb-quick-replies";
    CONFIG.menuOptions.forEach((opt) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = opt;
      b.addEventListener("click", () => handleOption(opt));
      wrap.appendChild(b);
    });
    chatBody.appendChild(wrap);
    scrollChat();
  }

  function handleOption(opt) {
    addUserMessage(opt);
    clearQuickReplies();
    respond(opt);
  }

  function respond(input) {
    const text = input.toLowerCase();
    const matched = CONFIG.rules.find((rule) =>
      rule.keywords.some((kw) => text.includes(kw))
    );

    if (matched) {
      botSay(matched.reply, () => {
        if (matched.action === "scrollToCatalog") scrollToCatalog();
        showEndOrMenuButtons(matched.action === "openMaps");
      });
    } else {
      botSay(CONFIG.fallbackReply, showEndOrMenuButtons);
    }
  }

  // Depois de cada resposta: só dois botões, em vez do menu inteiro de novo
  function showEndOrMenuButtons(includeMaps = false) {
    clearQuickReplies();
    const wrap = document.createElement("div");
    wrap.className = "cb-quick-replies";

    if (includeMaps) {
      const mapsLink = document.createElement("a");
      mapsLink.href = "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIPCAIQLhgKGMcBGNEDGIAEMgcIAxAAGIAEMgcIBBAAGIAEMgYIBRBFGDwyBggGEEUYPTIGCAcQRRg90gEIMTAzMmowajSoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KWHFMVNA3-qUMbT_bT0-6cnJ&daddr=Av.+Minas+Gerais,+1295+-+Corn%C3%A9lio+Proc%C3%B3pio,+PR,+86300-000";
      mapsLink.target = "_blank";
      mapsLink.rel = "noopener noreferrer";
      mapsLink.textContent = "📍 Ver no Google Maps";
      wrap.appendChild(mapsLink);
    }

    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.textContent = "🔙 Voltar ao menu principal";
    backBtn.addEventListener("click", () => {
      addUserMessage("Voltar ao menu principal");
      clearQuickReplies();
      showMainMenu();
    });

    const endBtn = document.createElement("button");
    endBtn.type = "button";
    endBtn.textContent = "✅ Finalizar conversa";
    endBtn.addEventListener("click", () => {
      addUserMessage("Finalizar conversa");
      endConversation();
    });

    wrap.appendChild(backBtn);
    wrap.appendChild(endBtn);
    chatBody.appendChild(wrap);
    scrollChat();
  }

  function endConversation() {
    clearQuickReplies();
    botSay(CONFIG.endMessage, () => {
      // fecha o painel, apaga o histórico e reinicia a saudação pra próxima vez
      setTimeout(() => {
        panel.classList.remove("open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        chatBody.innerHTML = ""; // apaga a conversa aqui mesmo, não só na reabertura
        started = false;
      }, 1200);
    });
  }

  function scrollToCatalog() {
    const target = document.getElementById(CONFIG.catalogSectionId);
    if (!target) return; // não existe essa seção nesta página: não faz nada, chat continua aberto
    panel.classList.remove("open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    target.scrollIntoView({ behavior: "smooth" });
  }

  chatSend.addEventListener("click", sendUserText);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendUserText();
  });

  function sendUserText() {
    const val = chatInput.value.trim();
    if (!val) return;
    addUserMessage(val);
    clearQuickReplies();
    chatInput.value = "";
    respond(val);
  }
})();
