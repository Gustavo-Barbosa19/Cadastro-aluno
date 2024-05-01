var alunos = [];

var alunoAlterado = null

function mostrarModal() {
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "flex"
}

function ocultarModal() {
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "none"
}

function adicionar() {
    document.getElementById("ra").disabled= false;
    alunoAlterado = null;
    mostrarModal();
    limparForm();
    formatarCampos();
}
function alterar(ra) {
    for(let i = 0; i < alunos.length; i++){
        let aluno = alunos[i];
        if(aluno.ra == ra){
            //achou o aluno, então preenche o form
            console.log("Novo array: ", aluno);
            document.getElementById("ra").value = aluno.ra;
            document.getElementById("nome").value = aluno.nome;
            document.getElementById("cidade").value = aluno.cidade;
            document.getElementById("estado").text = estado.options[estado.selectedIndex].text = aluno.estado;
            document.getElementById("curso").value = aluno.curso;
            alunoAlterado = aluno 
        }
    }
    //bloquear o r.a para não permitir alterá-lo
    document.getElementById("ra").disabled = true
    mostrarModal()
}
function excluir(ra) {
    if (confirm("Você deseja realmente excluir")) {
        for(let i=0; i < alunos.length; i++){
            let aluno =alunos[i]
            if(aluno.ra == ra){
                //remove o elemento encontrado na posição "i"
                alunos.splice(i,1)
            }
        }
        exibirDados()
        limparForm()
    }

}
function cancelar() {
    ocultarModal()

    limparForm()
}
function salvar() {
    let ra = document.getElementById("ra").value;
    let nome = document.getElementById("nome").value;
    let cidade = document.getElementById("cidade").value;
    let curso = document.getElementById("curso").value;

    let estado = document.getElementById("estado");
    estado = estado.options[estado.selectedIndex].text;


    if(alunoAlterado == null){
        let aluno = {
            "ra": ra,
            "nome": nome,
            "cidade": cidade,
            "estado": estado,
            "curso": curso
        }
        let validaCampos = validaCamposVazios(aluno);
        if(validaCampos.estaPreenchido) {
            if(window.confirm(validaCampos.menssagem)) {
                document.getElementById(validaCampos.campo).focus();
                return true;
            } else{
                ocultarModal();
            }
        } else {
            if(alunos.length > 0) { //Verifica se contém ao menos 1 registro, por que a primeira não temos nada no array de alunos, ele vem vazio, ai não tem como dar loop
                let checkRA = true; //Enquanto essa variavel checkRA for true, eu posso cadastra um aluno, pois não tem ra repitido
                for(let i = 0; i < alunos.length; i++) {
                    if(aluno.ra == alunos[i].ra) {
                        checkRA = false;
                        if(window.confirm(`Esse RA ${aluno.ra}, já pertece a um aluno.`)) { // dentro do if é o botão ok, ele é executado quando eu clico no ok
                            document.getElementById("ra").focus();
                            return true;
                        } else{ //executa quando eu clicar no cancelar
                            ocultarModal();
                        }
                    }
                }
                if(checkRA) { // Verificando se checkRA é true, ou seja, se for true não cadastra o aluno
                    alunos.push(aluno);
                }
            } else {
                alunos.push(aluno);
            }
            
        }
    }else{
        alunoAlterado.ra = ra
        alunoAlterado.nome = nome
        alunoAlterado.cidade = cidade
        alunoAlterado.estado = estado
        alunoAlterado.curso = curso
    }

    alunoAlterado = null

    limparForm()

    ocultarModal()

    exibirDados()

}
function exibirDados() {
    let tbody = document.querySelector("#table-costumers tbody")
    tbody.innerHTML = ''

    for (let i = 0; i < alunos.length; i++) {
        let linha = `
                <tr>
                    <td>${alunos[i].ra}</td>
                    <td>${alunos[i].nome}</td>
                    <td>${alunos[i].cidade}</td>
                    <td>${alunos[i].estado}</td>
                    <td>${alunos[i].curso}</td>
                    <td>
                        <button onclick="alterar('${alunos[i].ra}')">Alterar</button>
                        <button onclick="excluir('${alunos[i].ra}')">Excluir</button>
                    </td>
                </tr>
        `
        let tr = document.createElement("tr")
        tr.innerHTML = linha

        tbody.appendChild(tr)
    }
}
function limparForm(){
    document.getElementById("ra").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("estado").text = estado.options[estado.selectedIndex].text = "Selecione seu estado";
    document.getElementById("curso").value = "";
    document.getElementById("cidade").value = "";
}

function validaCamposVazios(aluno) {
    if(aluno.ra === "") {
        return {
            campo: "ra",
            menssagem: "Campo RA não pode ficar vázio.",
            estaPreenchido: true
        }
    } else if (aluno.nome === "") {
        return {
            campo: "nome",
            menssagem: "Campo Nome não pode ficar vázio.",
            estaPreenchido: true
        }
    } else if (aluno.estado === "Selecione seu estado") {
        return {
            campo: "estado",
            menssagem: "Você precisa selecionar um estado.",
            estaPreenchido: true
        }
    } else if (aluno.curso === "") {
        return {
            campo: "curso",
            menssagem: "Campo Curso não pode ficar vázio.",
            estaPreenchido: true
        }
    } else if (aluno.cidade === "") {
        return {
            campo: "cidade",
            menssagem: "Campo Cidade não pode ficar vázio.",
            estaPreenchido: true
        }
    } else {
        return {
            campo: "",
            menssagem: "",
            estaPreenchido: false
        }
    }

}

function formatarCampos() {
    //Mascara somente números
    document.getElementById("ra").addEventListener('input', function(e) {
        let x = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = x;
    })
}