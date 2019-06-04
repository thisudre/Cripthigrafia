var form = document.querySelector("#form-generate")
var btnGerarChave = document.querySelector("#generate-key")

btnGerarChave.addEventListener("click", function(){
    console.log("clicou no botao")
    keyRSA = obterChavePeloForm(form)

    mostrarChave(keyRSA)
})

function obterChavePeloForm(form)
{
    var primeNum1 = form.querySelector("#prime-number1").value
    var primeNum2 = form.querySelector("#prime-number2").value
    var E = form.querySelector("#prime-number3").value
    // validarCampos(primeNum1, primeNum2, E)
    var erros = validarCampos(primeNum1, primeNum2, E)
    if (erros.len>0)
    {
        exibirErros(erros)
        return
    }

    var mensagensErro = document.querySelector("#erros-geracao")
    mensagensErro.innerHTML = ''
    var N = calcularN(primeNum1, primeNum2)
    var phyN = calcularPhyN(primeNum1, primeNum2)
    console.log("obteve os dados")
    var D = calcularD(E, phyN)
    console.log("calculou D")
    erros = validarChave(E, N, phyN, D)
    if (erros.len>0)
    {
        exibirErros(erros)
        return
    }

    mensagensErro.innerHTML = ''

    var keyRSA = montarChave(E, N, phyN, D)

    return keyRSA
}

function calcularD(E, phyN)
{
    D = 1
    while((D*E) % phyN != 1)
    {
        D = D+1
    }

    return D;
}

function calcularN(primeNum1, primeNum2)
{
    return primeNum1 * primeNum2
}

function calcularPhyN(primeNum1, primeNum2)
{
    return (primeNum1-1) * (primeNum2-1)
}

function mostrarChave(keyRSA)
{
    textSpace = document.querySelector("#chave-gerada")
    textSpace.textContent = keyRSA.D
}

function montarChave(E, N, phyN, D)
{
    var KeyRSA = 
    {
        N : N,
        phyN : phyN,
        E : E,
        D : D
    }

    return KeyRSA
}

function validarCampos(primeNum1, primeNum2, E)
{
    erros = []
    if(!isNaN(primeNum1) && !isNaN(primeNum2) && !isNaN(E))
    {
        // Erros possiveis:
        // os numeros nao serem primos
        if(verificarPrimo(primeNum1))
        {
            erros.push("Primeiro número não é primo")
        }

        if(verificarPrimo(primeNum2))
        {
            erros.push("Segundo número não é primo")
        }
        
        if(verificarPrimo(E))
        {
            erros.push("Terceiro número não é primo")
        }
        
        if(primeNum1 == primeNum2 || primeNum1 == E || primeNum2 == E)
        {
            erros.push("Os números não podem ser iguais")
        }
    }
    else
    {
        erros.push("Todos os campos precisam ser números!")
    }

    return erros
}

function validarChave(E, N, phyN, D)
{
    erros = []
    // Erros possiveis:
    // os numeros serem muito pequenos
    if(N<=127)
    {
        erros.push("Primeiro ou segundo número precisam ser maiores")
    }
    // O numero presente em E não pode dividir N
    if(E % N == 1)
    {
        erros.push("O terceiro número precisa ser diferente")
    }
}

function verificarPrimo(num) {
    for (var i = 2; i < num; i++){
        if (num % i == 0) return false
    }
    return true
}

function exibirErros(erros)
{
    var ulErros = document.querySelector("#erros-geracao")
    ulErros.innerHTML = ''
    erros.forEach(function(erro) {
        console.log(erro)
        var liErro = document.createElement('li')
        liErro.textContent = erro
        ulErros.appendChild(liErro)
    })
}