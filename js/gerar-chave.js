var btnGerarChave = document.querySelector("#generate-key")

btnGerarChave.addEventListener("click", function(){
    event.preventDefault()

    var form = document.querySelector("#form-generate")
    
    var primeNumbers = obterChavePeloForm(form)
    
    var erros = validarCampos(primeNumbers)
    var mensagensErro = document.querySelector("#erros-geracao")

    if (erros.length > 0)
    {
        exibirErros(erros)
        return
    }
    mensagensErro.innerHTML = ''

    var keyRSA = criarChave(primeNumbers)


    erros = validarChave(keyRSA)
    if (erros.length > 0)
    {
        exibirErros(erros)
        return
    }
    mensagensErro.innerHTML = ''
    
    mostrarChave(keyRSA)

    form.reset()
})

function obterChavePeloForm(form)
{
    var primeNum1 = form.querySelector("#prime-number1").value
    var primeNum2 = form.querySelector("#prime-number2").value
    var E = form.querySelector("#prime-number3").value

    primeNumbers = {
        prime1 : primeNum1,
        prime2 : primeNum2,
        E : E
    }

    return primeNumbers
}

function criarChave(primeNumbers)
{
    var N = calcularN(primeNumbers.prime1, primeNumbers.prime2)
    var phyN = calcularPhyN(primeNumbers.prime1, primeNumbers.prime2)
    var D = calcularD(primeNumbers.E, phyN)

    return (montarChave(primeNumbers.E, N, phyN, D))
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


function calcularD(E, phyN)
{
    D = 1
    while((D * E) % phyN != 0)
    {
        D = D+1
    }
    console.log("Valor de D: " + D)
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


function validarCampos(primeNumbers)
{
    erros = []
    if(!isNaN(primeNumbers.prime1) && !isNaN(primeNumbers.prime2) && !isNaN(primeNumbers.E) && primeNumbers.prime1 != '' && primeNumbers.prime2 != '' && primeNumbers.E != '')
    {
        // Erros possiveis:
        // os numeros nao serem primos
        if(!verificarPrimo(primeNumbers.prime1))
        {
            erros.push("Primeiro número não é primo")
            console.log(erros[erros.len - 1])
        }

        if(!verificarPrimo(primeNumbers.prime2))
        {
            erros.push("Segundo número não é primo")
            console.log(erros[erros.len - 1])
        }
        
        if(!verificarPrimo(primeNumbers.E))
        {
            erros.push("Terceiro número não é primo")
            console.log(erros[erros.len - 1])
        }
        
        if(primeNumbers.prime1 == primeNumbers.prime2 || primeNumbers.prime1 == primeNumbers.E || primeNumbers.prime2 == primeNumbers.E)
        {
            erros.push("Os números não podem ser iguais")
            console.log(erros[erros.len - 1])
        }
    }
    else
    {
        erros.push("Todos os campos precisam ser preenchidos por números!")
        console.log(erros[erros.len - 1])
    }

    return erros
}

function validarChave(keyRSA)
{
    erros = []
    // Erros possiveis:
    // os numeros serem muito pequenos
    if(keyRSA.N<=127)
    {
        erros.push("Primeiro ou segundo número precisam ser maiores")
        console.log(erros[erros.len - 1])
    }
    // O numero presente em E não pode dividir N
    if(keyRSA.E % keyRSA.N == 1)
    {
        erros.push("O terceiro número precisa ser diferente")
        console.log(erros[erros.len - 1])
    }

    return erros
}

function verificarPrimo(num) 
{
    var i = 0

    for (i = 2; i<= Math.sqrt(num); i++)
    {
        if (num % i == 0)
        {
            console.log("Dividido por: " + i)
            return false
        }
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

function limpar(campo)
{
    campo.textContent = ''
}