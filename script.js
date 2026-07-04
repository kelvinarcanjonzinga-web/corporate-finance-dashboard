//Carrega as transações guardadas no localStorage ou inicia um array vazio se for o primeiro acesso;

let transacoes = JSON.parse(localStorage.getItem('transacoes')) || []
console.log(transacoes)

//Função para adicionar uma Transação;

function adicionarTransacao(tipo , descricao , valor , data ,  categoria){
    const novaTransacao = {
        id: crypto.randomUUID(),
        type: tipo,
        description: descricao,
        amount: valor,
        date: data,
        category: categoria
    }

    //Adicionar ao array 'transacoes' global

    transacoes.push(novaTransacao)

    //Guardar os dados na memória;

    localStorage.setItem('transacoes' , JSON.stringify(transacoes))
}

//Evento para o Dialog;

const btn_newTransaction = document.getElementById('newTransaction')

btn_newTransaction.addEventListener('click' , ()=>{
    document.getElementById('transactionModal').showModal()
})

//Ligar o formulário do modal a esta função;

const form = document.getElementById('transactionForm')

form.addEventListener('submit' , (event)=>{
    event.preventDefault()

    //Capturar e Ler os valores dos 5 campos do formulário,

    const tipoInput = document.getElementById('modalType').value
    const descricaoInput = document.getElementById('modalDescription').value

    let valorString = document.getElementById('modalAmount').value
    const valorInput = parseFloat(valorString)

    const dataInput = document.getElementById('modalDate').value
    const categoriaInput = document.getElementById('modalCategory').value

    //Chamar adicionarTransacao(...);

    adicionarTransacao(tipoInput , descricaoInput , valorInput , dataInput , categoriaInput)

    renderizarTabela()
    actualizarKPIs()

    //Fechar o modal;

    document.getElementById('transactionModal').close()

    //Limpa o formulário para a próxima abertura;

    form.reset()

})

renderizarTabela()
actualizarKPIs()

//Renderizar a Tabela + Calcular KPIs;

function renderizarTabela(){
    const tbody = document.getElementById('transactionList')

    // Limpar tabela antes de redesenhar;

    tbody.innerHTML = ''

    transacoes.forEach(t =>{
        const tr = document.createElement('tr')
        
        //Element description;

        const tdDescricao = document.createElement('td')
        tdDescricao.textContent = t.description
        tr.appendChild(tdDescricao)

        //Element category;

        const tdCategoria = document.createElement('td')
        tdCategoria.textContent = t.category
        tr.appendChild(tdCategoria)

        //Element date;

        const tdData = document.createElement('td')
        tdData.textContent = t.date
        tr.appendChild(tdData)

        //Element type;

        const tdTipo = document.createElement('td')
        tdTipo.textContent = t.type === 'income' ? 'Receita' : 'Despesa'
        tr.appendChild(tdTipo)

        //Element amount;

        const tdValor = document.createElement('td')
        tdValor.textContent = `${t.amount.toFixed(2)}€`
        tr.appendChild(tdValor)

        //Implementar no tbody da table;

        tbody.appendChild(tr)

    })
}

//Calcular Total das Receitas;

function calcularTotalReceitas() {
    const receitas = transacoes.filter(t => t.type === 'income')

    const totalReceitas = receitas.reduce((acumulator , t)=>{
        return acumulator + t.amount
    }, 0)

    return totalReceitas
}

//Calcular Total das Despesas;

function calcularTotalDespesas(){
    const despesas = transacoes.filter(t => t.type === 'expense')

    const totalDespesas = despesas.reduce((acumulator , t)=>{
        return acumulator + t.amount
    }, 0)

    return totalDespesas
}

//Calcular Saldo;

function calcularSaldo(){
    const saldoDisponivel = calcularTotalReceitas() - calcularTotalDespesas()

    return saldoDisponivel
}

//Calcular quantidades de vendas;

function calcularNumeroVendas(){
    const vendas = transacoes.filter(t => t.type === 'income')
    return vendas.length
}

//Actualização dos KPIs;

function actualizarKPIs(){
    //Executa os cálculos e obtém os valores atualizados;

    const totalReceitas = calcularTotalReceitas()
    const totalDespesas = calcularTotalDespesas()
    const saldo = calcularSaldo()
    const numVendas = calcularNumeroVendas()

    //Seleciona e injeta os valores nos cartões correspondentes HTML;

    //Cartão de Receitas;

    document.querySelector('[data-kpi="income"] .kpi-value').textContent = new Intl.NumberFormat('pt-PT' ,{style: 'currency' , currency: 'EUR'}).format(totalReceitas)

    //Cartão de Despesas;

    document.querySelector('[data-kpi="expense"] .kpi-value').textContent = new Intl.NumberFormat('pt-PT',{ style: 'currency', currency: 'EUR' }).format(totalDespesas)

    //Saldo Actual;

    document.querySelector('[data-kpi="balance"] .kpi-value').textContent = new Intl.NumberFormat('pt-PT',{ style: 'currency', currency: 'EUR' }).format(saldo)

    //Número de Vendas;

    document.querySelector('[data-kpi="total-transactions"] .kpi-value').textContent = numVendas
}

//Filtros de Pesquisa;

function renderizarTabela(lista = transacoes) {
    const tbody = document.getElementById('transactionList')
    
    // Limpar tabela antes de redesenhar
    tbody.innerHTML = ''

    lista.forEach((t) => {
        const tr = document.createElement('tr')

        //Element description;
        const tdDescricao = document.createElement('td')
        tdDescricao.textContent = t.description
        tr.appendChild(tdDescricao)

        //Element category;
        const tdCategoria = document.createElement('td')
        tdCategoria.textContent = t.category;
        tr.appendChild(tdCategoria)

        //Element date;
        const tdData = document.createElement('td')
        tdData.textContent = t.date
        tr.appendChild(tdData)

        // //Element type
        const tdTipo = document.createElement('td')
        tdTipo.textContent = t.type === 'income' ? 'Receita' : 'Despesa'
        tr.appendChild(tdTipo)

        //Element amount; (Formatação monetária nacional)
        const tdValor = document.createElement('td')
        tdValor.textContent = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(t.amount)
        tr.appendChild(tdValor)

        //Implementar no tbody da table;
        tbody.appendChild(tr)
    })
}

const campoPesquisa = document.getElementById('searchInput');

campoPesquisa.addEventListener('input', (event) => {
    const termo = event.target.value.toLowerCase()

    const resultadoFiltrado = transacoes.filter(t => {
        return t.description.toLowerCase().includes(termo) || 
               t.category.toLowerCase().includes(termo)
    })
    renderizarTabela(resultadoFiltrado);
})

