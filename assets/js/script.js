class Produto {
    constructor() {
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
        this.form = document.querySelector("form")
    }

    salvar() {
        const produto = this.lerDados()
        
        if(this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto)
            }
            else {
                this.atualizar(this.editId, produto)
            }
        }
        this.listaTabela()
    }

    listaTabela() {
        const tabela = document.querySelector("#tabela-produtos")
        tabela.innerHTML = ""
        
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            const tr = tabela.insertRow()

            const td_id = tr.insertCell()
            const td_nome = tr.insertCell()
            const td_quantidade = tr.insertCell()
            const td_preco = tr.insertCell()
            const td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id
            td_nome.innerText = this.arrayProdutos[i].nome
            td_quantidade.innerText = this.arrayProdutos[i].quantidade
            td_preco.innerText = this.arrayProdutos[i].preco

            const btnEdita = document.createElement("button")
            btnEdita.textContent = "Editar"
            btnEdita.classList.add("botao-editar")
            btnEdita.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")")

            const btnDeleta = document.createElement("button")
            btnDeleta.textContent = "Deletar"
            btnDeleta.classList.add("botao-deletar")
            btnDeleta.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")")

            td_acoes.appendChild(btnEdita)
            td_acoes.appendChild(btnDeleta)
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto)
        this.id++
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nome = produto.nome
                this.arrayProdutos[i].quantidade = produto.quantidade
                this.arrayProdutos[i].preco = produto.preco
            }
        }
        this.editId = null
        document.querySelector(".botao-adicionar").innerText = "Salvar"
        this.form.reset()

        this.alerta("alertaAtualizar", ".alerta-atualizar", "alerta-atualizar-ativo")
    }

    preparaEdicao(dados) {
        this.editId = dados.id

        this.form.nome.value = dados.nome
        this.form.quantidade.value = dados.quantidade
        this.form.preco.value = dados.preco

        document.querySelector(".botao-adicionar").innerText = "Atualizar"
    }

    lerDados() {
        const produto = {
            id: this.id,
            nome: this.form.nome.value,
            quantidade: this.form.quantidade.value,
            preco: this.form.preco.value
        }

        return produto
    }

    validaCampos(produto) {

        if(produto.value == "" || produto.quantidade == "" || produto.preco == "") {

            this.alerta("alertaCampo", ".alerta-campo" ,"alerta-campo-ativo")

            return false
        }
        return true
    }

    limpar() {
        this.form.reset()
    }

    deletar(id) {
        const tabela = document.querySelector("#tabela-produtos")

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1)
                tabela.deleteRow(i)
                this.alerta("alertaDeletado", ".alerta-deletar" ,"alerta-deletar-ativo")
            }
        }
    }

    alerta(nome, classe, classeAtiva) {
        nome = document.querySelector(classe)
        let timer
        nome.classList.add(classeAtiva)
        timer = setInterval(() => {
            nome.classList.remove(classeAtiva)
            clearInterval(timer)
        }, 3000)
    }
}

const produto = new Produto()