# Currículos 3º CPM

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
├── certificados.html          # Cursos e certificados
├── alunos-dados.json          # Dados dos estudantes
├── main.js                    # Controle do tema da interface
├── chatbot.js                 # Comportamento do chatbot
├── vercurriculos.js           # Carregamento da listagem
├── curriculo-aluno.js         # Carregamento do currículo individual
├── styles.css                 # Estilos gerais
├── curriculo-aluno.css        # Estilos do currículo individual
├── site-chrome.css            # Estilos compartilhados da interface
├── widgets.css                # Estilos dos controles flutuantes
└── fotos/                     # Fotos dos estudantes
```

## Atualização dos currículos

Os dados exibidos nas páginas de listagem e de currículo individual ficam em `alunos-dados.json`. As fotos referenciadas nesse arquivo devem estar na pasta `fotos/`.

## Contato

E-mail: eptcurriculos@gmail.com
