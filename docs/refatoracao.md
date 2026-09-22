# Relatório de organização e validação

O projeto continua sendo um site estático em HTML, CSS, JavaScript e JSON, sem dependências de execução ou compilação. Todos os HTML permanecem na raiz. Os nove HTML, cinco CSS, quatro JavaScript e o JSON originais foram lidos antes das alterações, incluindo os estilos e scripts internos das páginas auxiliares.

## Arquivos movidos e separados

| Origem | Destino e responsabilidade |
| --- | --- |
| `style.css` | `css/styles.css`: base e componentes genéricos das páginas principais |
| Estrutura compartilhada de `style.css` e `site-chrome.css` | `css/site-chrome.css`: cabeçalho, logo, menu, rodapé e botão de tema |
| `widgets.css` | Incorporado a `css/site-chrome.css`, preservando a variante dos controles das páginas auxiliares |
| Estilos específicos de `style.css` | `css/inicio.css`, `css/curriculo.css` e `css/oportunidades.css` |
| `<style>` de `vercurriculos.html` | `css/vercurriculos.css` |
| CSS criado por `chatbot.js` | `css/chatbot.css` |
| `curriculo-aluno.css` | `css/curriculo-aluno.css` |
| `dark_light.css` | `css/dark_light.css` |
| `<style>` e `<script>` de `modelo-curriculos.html` | `css/modelo-curriculos.css` e `js/modelo-curriculos.js` |
| `main.js`, `chatbot.js`, `vercurriculos.js`, `curriculo-aluno.js` | Arquivos correspondentes em `js/` |
| `alunos-dados.json` | `data/alunos-dados.json`, com conteúdo idêntico byte a byte |

Foram criados os arquivos extraídos indicados na tabela e este relatório. Foram atualizados os nove HTML e o `README.md`. A logo fornecida e todos os arquivos de `fotos/` permanecem intactos na raiz e na pasta original, respectivamente.

## Caminhos e carregamento

- Todos os `href` de CSS e `src` de JavaScript apontam para as novas pastas.
- Os carregamentos de estudantes usam `data/alunos-dados.json`.
- As fotos continuam usando os caminhos `fotos/...` já presentes no JSON, relativos aos HTML da raiz.
- Todas as nove páginas usam `logo3cpm.png`, com texto alternativo. As medidas e o recorte da logo foram preservados nas páginas; o catálogo passou a usar a estrutura da página inicial, conforme solicitado.
- Os links individuais usam `curriculo-aluno.html?id=...` e mantêm os IDs existentes.
- A página auxiliar de modelos tinha um caminho para `dados/alunos.json`, arquivo inexistente, links para o formulário em vez do currículo individual e uma referência a `ano-atual`, elemento ausente que interrompia o script. Essas referências foram corrigidas. Seus exemplos de demonstração continuam disponíveis quando a busca do JSON falha.

## Simplificações de CSS

- As duas regras de `.card` foram reunidas com os valores que efetivamente apareciam na tela, incluindo o preenchimento de 25 px.
- Declarações iguais de navegação, logo, colunas e links do rodapé e copyright foram agrupadas.
- Botões e links das opções do chatbot compartilham a mesma regra de aparência. As diferenças de hover foram mantidas.
- Foram retiradas regras substituídas do botão do chatbot e cores redundantes dos balões no modo escuro.
- Foram removidos estilos sem elementos correspondentes: antigo login (`auth-*`), controle `trilho`, cabeçalho e ações antigos do currículo individual e estrutura antiga da página de modelos.
- O catálogo deixou de repetir estilos de cabeçalho, menu e rodapé dentro do próprio HTML.
- CSS e JavaScript receberam comentários frequentes sobre finalidade, eventos, laços, condições, criação de elementos, variáveis de cor, responsividade e acessibilidade.

As diferenças entre os controles das páginas principais e auxiliares foram preservadas. Também foram mantidos os desenhos distintos dos avatares, as medidas do currículo A4 e os estilos específicos dos dois carrosséis. Unificá-los alteraria o visual. A organização mantém bases de CSS separadas onde o projeto já usava padrões diferentes.

## Simplificações de JavaScript e chatbot

- O currículo individual usa laços diretos para montar competências, formação, experiências e projetos, com verificações simples para campos vazios.
- A leitura do JSON, o filtro `ativo !== false`, os estados de carregamento/erro e a navegação por ID foram preservados e comentados.
- Os cards da página de modelos usam `createElement`, `textContent` e `addEventListener`, incluindo a substituição da foto quando ocorre erro. A busca continua ignorando acentos e diferenças entre maiúsculas e minúsculas.
- `chatbot.js` deixou de gerar CSS. `criarMensagem()` atende tanto às mensagens da pessoa quanto às respostas da assistente; `criarOpcao()` centraliza a criação dos botões.
- `abrirChat()`, `fecharChat()`, `mostrarMensagem()`, `mostrarMenu()`, `enviarMensagem()` e `finalizarConversa()` deixam o fluxo explícito. Os indicadores de digitação são removidos pela própria resposta que os criou.
- As dez opções, onze regras, ordem de correspondência, mensagens, links, tempos de resposta, rolagem, despedida e reinício foram mantidos. Os textos e as regras foram comparados automaticamente com os originais.
- O trecho de rolagem direta chamado `scrollToCatalog` foi removido porque nenhuma regra o acionava. O botão usado pelo chatbot continua abrindo `vercurriculos.html#carrossel`.

## Acessibilidade

- Idioma `pt-BR` em todas as páginas, textos alternativos na logo, identificação da navegação e `aria-current` nos links ativos.
- O chatbot informa abertura e fechamento, associa o botão ao painel, anuncia mensagens com `role="log"` e `aria-live`, permite fechar com Escape e devolve o foco ao botão. O painel fechado fica fora da navegação por teclado com `inert`.
- Cards do catálogo fora da tela também usam `inert`, mantendo `aria-hidden` e os indicadores acessíveis.
- O campo de busca da página de modelos recebeu nome acessível. A rolagem dessa página respeita `prefers-reduced-motion`.
- Foram preservados os rótulos do formulário, os focos visíveis, os avisos de estado e as regras existentes para movimento reduzido.

## Adequação de `vercurriculos.html`

O cabeçalho, nome e logo, espaçamentos do menu, cores gerais, título, rodapé e comportamento responsivo da estrutura externa passaram a seguir a página inicial. Os textos foram mantidos, inclusive o texto próprio do rodapé.

A largura do conteúdo do catálogo, os cards, fotos, etiquetas, sombras, bordas, controles anterior/próximo, indicadores e animação de deslocamento permaneceram. O catálogo continua sendo um carrossel.

## Verificações realizadas

- Carregamento dos nove HTML e de todos os CSS, scripts, imagens e links locais via HTTP em um subcaminho, como acontece em um site de projeto no GitHub Pages.
- Nenhum erro de execução JavaScript nas páginas refatoradas. Nenhum CSS ou script interno restante nos HTML.
- Mesmos dados JSON, fotos, logo e textos dos HTML; a única correção textual foi o caminho do arquivo de dados apresentado na página de modelos.
- Formulário: campos obrigatórios, validação nativa, nomes dos campos, método POST e endereço original do Formspree. O envio foi interceptado localmente, sem transmissão externa.
- Temas: preferência do sistema, troca pelo botão, atributos acessíveis e persistência entre páginas.
- Catálogo: seis estudantes, anterior/próximo, volta entre primeiro e último, setas do teclado, indicadores, foco e abertura do currículo.
- Seis currículos individuais: identificação, apresentação, formação, competências, experiências, projetos, contatos, fotos e ocultação de seções vazias.
- Impressão: acionamento do botão, regras de mídia e geração local de PDF exibindo somente o currículo.
- Dados simulados apenas no navegador: estudante inativo, um estudante, lista vazia, ID ausente/inválido, erro HTTP, JSON inválido e foto ausente. O JSON do projeto não foi modificado por esses testes.
- Página de modelos: busca sem acentos, resultado vazio, restauração da listagem, botões de rolagem, exclusão de inativos e fallback com os quatro exemplos originais.
- Chatbot: dez opções e suas respostas, texto livre, pergunta não reconhecida, agradecimento, campo vazio, link de Maps, navegação para o catálogo, retorno ao menu, despedida, limpeza, reabertura, Enter, Escape, foco e rolagem.
- Responsividade e preferência por movimento reduzido, incluindo o menu e o painel do chatbot em tela de celular.

## Comparação visual e limites

Foram registradas capturas antes e depois em larguras de 1366 e 390 px, nos temas claro e escuro, incluindo o chatbot aberto nas páginas com bases de estilo diferentes. A comparação usa também dimensões e estilos calculados pelo navegador.

As 48 comparações fora do catálogo apresentaram conteúdo visual idêntico. Em uma captura do formulário, foi necessário desconsiderar a faixa adicional da barra de rolagem produzida pelo navegador de testes. Não houve diferenças nos estilos e nas dimensões calculadas dessas páginas. As quatro capturas do catálogo refletem a adequação solicitada da estrutura externa; as medidas dos cards permaneceram iguais.

Para comparar a geometria sem confundir a troca solicitada de imagem com uma alteração de CSS, a URL da logo antiga recebeu a mesma imagem local somente no navegador de teste. A imagem externa do banner foi bloqueada nas duas versões; seu endereço e suas regras CSS não foram alterados. Na página de modelos, o teste da versão antiga corrigiu temporariamente o carregamento e usou os mesmos estudantes para comparar os cards, pois os erros anteriores impediam a exibição normal.

As capturas e ferramentas locais de teste ficaram fora do projeto, em `/tmp/curriculos-validacao/`. Nenhuma ferramenta de testes virou dependência do site.

Ainda cabe conferir manualmente a imagem externa do banner, os destinos externos de cursos e Maps, o recebimento real pelo Formspree, o teclado virtual em um celular físico, a impressão em outros navegadores e o site após a publicação no GitHub Pages. Não houve publicação nem envio de mensagens ou formulários. Os botões de detalhes de vagas continuam sem ação, como estavam no projeto original; não foram acrescentadas funcionalidades fora do escopo.
