— Painel de Gestão Financeira e de Vendas;

Dashboard corporativo de simulação financeira, construído em HTML5, CSS3 e JavaScript (ES6+) puro — sem frameworks — para consolidar e demonstrar competências fundamentais de front-end e lógica de dados no browser.


Projeto de portfólio pessoal, desenvolvido com meu foco em boas práticas de engenharia: semântica HTML, arquitetura CSS escalável, manipulação de dados com métodos de array, persistência local e visualização de dados com Chart.js.


🎯 Objetivo

Simular um painel administrativo real (padrão SaaS/fintech) onde é possível:


Registar transações (receitas e despesas);
Visualizar KPIs financeiros calculados em tempo real;
Consultar a evolução do saldo e a distribuição de despesas por categoria;
Pesquisar e filtrar transações;
Persistir todos os dados localmente, sem necessidade de backend;



🖥️ Funcionalidades


KPIs dinâmicos: Total de Receitas, Total de Despesas, Saldo Atual e Número de Vendas, recalculados automaticamente a cada transação.
Gráficos interativos (Chart.js):

Gráfico de linha com a evolução do saldo acumulado ao longo do tempo.
Gráfico de rosca com a distribuição de despesas por categoria.


Tabela de transações com pesquisa em tempo real (por descrição ou categoria).
Modal nativo (<dialog>) para adicionar novas transações, com validação de formulário.
Persistência local via localStorage — os dados sobrevivem a atualizações de página.
Design responsivo, com sidebar colapsável em ecrãs móveis e layout adaptado (grids, tabela, gráficos).


🛠️ Stack técnica

| Camada | Tecnologia / Estrutura |
| :--- | :--- |
| **HTML** | HTML5 semântico |
| **Estilo** | CSS3 (Custom Properties, Flexbox, Grid, Media Queries) |
| **Lógica** | JavaScript ES6+ puro (sem frameworks) |
| **Gráficos** | Chart.js via CDN |
| **Ícones** | Font Awesome / Twemoji |
| **Persistência** | Web Storage API (localStorage) |

Nenhuma dependência de build tools, bundlers ou frameworks — o projeto corre diretamente no browser.


🧠 Decisões técnicas & Pessoais ... (e porquê)

Alguns exemplos do raciocínio de engenharia aplicado neste projeto:


crypto.randomUUID() em vez de Date.now() para gerar identificadores de transação, evitando colisões teóricas entre registos criados no mesmo milissegundo.
createElement + textContent em vez de innerHTML na renderização da tabela, prevenindo vulnerabilidades de XSS ao inserir dados fornecidos pelo utilizador.
Separação entre cálculo e renderização: funções como calcularTotalReceitas() são puras (recebem o estado, devolvem um valor) e independentes das funções que atualizam o DOM — facilita testes e manutenção.
Gestão do ciclo de vida do Chart.js: cada gráfico guarda a sua instância numa variável e é destruído (.destroy()) antes de ser recriado, evitando o erro «Canvas is already in use».
<dialog> nativo em vez de um modal construído à mão com divs, aproveitando comportamento de acessibilidade e gestão de foco já fornecidos pelo browser.



🚀 Como correr localmente

Não é necessário nenhum processo de build.

Acesse por aqui: [https://kelvin-arcanjo.github.io/Corporate-Finance-Dashboard/]


🔭 Possíveis melhorias futuras (Decisão Pessoal & Técnica)


Ordenação de colunas na tabela ao clicar no cabeçalho.
"Número de Vendas" segmentado por categoria (ex.: vendas por Marketing, Serviços, etc.), além do total geral.
Edição e remoção de transações existentes.
Exportação de dados para CSV/PDF.
Modo escuro.
Testes automatizados (unitários para as funções de cálculo).



👤 Autor

Desenvolvido por Kelvin Arcanjo , como projeto de estudo e portfólio, com foco no mercado de desenvolvimento web em Portugal.


LinkedIn: [(https://www.linkedin.com/in/kelvinarcanjo/)]
GitHub: [(https://github.com/kelvin-arcanjo)]



📄 Licença

Este projeto está disponível sob a licença MIT — sinta-te à vontade para o usar como referência de estudo ou melhorias.