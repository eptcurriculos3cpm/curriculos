# Curriculum CPM

Site desenvolvido para o projeto do 2º Desafio EPT, com o objetivo de divulgar currículos de estudantes do 3º Colégio da Polícia Militar do Paraná e facilitar o acesso a oportunidades profissionais, vagas e cursos.

## Funcionalidades

- Página inicial com apresentação do projeto;
- formulário para envio de dados de currículo;
- listagem de currículos dos alunos em carrossel;
- página individual para cada estudante;
- divulgação de vagas de emprego e estágio;
- indicação de cursos e certificados gratuitos;
- alternância entre os temas claro e escuro;
- chatbot de apoio à navegação;
- layout responsivo para diferentes tamanhos de tela.

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript;
- JSON para armazenamento dos dados exibidos;
- Formspree para o envio do formulário de currículo.

## Como executar

Como os currículos são carregados com `fetch`, o projeto deve ser aberto por meio de um servidor HTTP local, e não diretamente pelo arquivo HTML.

1. Clone ou baixe este repositório.
2. Abra um terminal na pasta do projeto.
3. Inicie um servidor local. Com Python, por exemplo:

```bash
python -m http.server 8000
```

4. Acesse `http://localhost:8000` no navegador.

## Estrutura do projeto

```text
├── index.html                 # Página inicial
├── curriculo.html             # Formulário de currículo
├── vercurriculos.html         # Listagem dos estudantes
├── curriculo-aluno.html       # Página individual do estudante
├── modelo-curriculos.html     # Modelo e apresentação de currículos
├── vagas.html                 # Vagas disponíveis
├── certificados.html         # Cursos e certificados
├── quem-somos-nos.html        # Apresentação da equipe
├── dark_light.html            # Página auxiliar sobre os temas
├── logo3cpm.png               # Logomarca local
├── css/
│   ├── styles.css             # Base e componentes das páginas principais
│   ├── site-chrome.css        # Cabeçalhos, menus, rodapés e controles de tema
│   ├── chatbot.css            # Janela, mensagens e animações do chatbot
│   ├── inicio.css             # Banner e notícias
│   ├── curriculo.css          # Formulário de criação de currículo
│   ├── oportunidades.css      # Áreas de vagas e certificados
│   ├── vercurriculos.css      # Cards e carrossel do catálogo
│   ├── curriculo-aluno.css    # Currículo individual e impressão
│   ├── modelo-curriculos.css  # Página de modelos
│   └── dark_light.css         # Página auxiliar sobre os temas
├── js/
│   ├── main.js               # Preferência de tema no navegador
│   ├── chatbot.js            # Mensagens, opções e eventos do chatbot
│   ├── vercurriculos.js      # Carregamento e navegação do catálogo
│   ├── curriculo-aluno.js    # Dados do estudante escolhido e impressão
│   └── modelo-curriculos.js  # Busca e carrossel da página de modelos
├── data/
│   └── alunos-dados.json     # Dados dos estudantes, sem mudança de estrutura
├── docs/
│   └── refatoracao.md        # Relatório das mudanças e verificações
└── fotos/                    # Fotos dos estudantes, com os nomes originais
```

## Atualização dos currículos

Os dados exibidos no catálogo, na página de modelos e nos currículos individuais ficam em `data/alunos-dados.json`. As fotos referenciadas nesse arquivo continuam na pasta `fotos/`. Mantenha valores como `"foto": "fotos/maria-luisa.png"`: o navegador resolve esse caminho a partir do HTML na raiz, e não da pasta do JSON.

O campo `"ativo": false` retira o estudante das listagens e impede a abertura de seu currículo individual. Os IDs são usados nos links `curriculo-aluno.html?id=...` e devem permanecer estáveis.

## Organização dos estilos e scripts

As páginas principais usam `styles.css` para a base e os componentes genéricos, `site-chrome.css` para a estrutura compartilhada e um CSS específico quando necessário. As páginas auxiliares mantêm sua própria base de estilos para preservar o visual existente. As classes `pagina-padrao` e `pagina-complementar` separam as duas versões de cabeçalho, rodapé e botão de tema que já eram usadas pelo projeto.

Os estilos do chatbot ficam em `css/chatbot.css`, carregado por todas as páginas. O arquivo `js/chatbot.js` contém as respostas originais e funções comentadas para abrir, fechar, mostrar mensagens e criar opções. A troca de tema continua usando a classe `dark-mode` e a chave `theme` do `localStorage`.

## Publicação no GitHub Pages

Publique esta pasta como site estático, mantendo os HTML na raiz e as pastas `css/`, `js/`, `data/` e `fotos/` junto deles. Todos os caminhos internos são relativos, incluindo o carregamento do JSON. Não há instalação de pacotes, servidor de aplicação ou etapa de compilação. O servidor HTTP sugerido acima serve apenas para testar localmente.

Veja o [relatório de refatoração e validação](docs/refatoracao.md) para os detalhes das mudanças e das conferências manuais.

## Contato

E-mail: eptcurriculos@gmail.com
