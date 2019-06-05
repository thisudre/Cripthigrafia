var btnInsertKey = document.querySelector('#insert-key')

btnInsertKey.addEventListener('click', function()
{
    console.log("Clicou no botão")
    // Obter a chave do input
    key = document.querySelector('#user-key').value

    // Validar erros no input
    // Procurar a chave no banco e recuperar objeto keyRSA
    // Mostrar que o processo foi bem sucedido
})

var btnLimpar = document.querySelector('#clear-key')

btnLimpar.addEventListener('click', function()
{
    console.log("Clicou no botão")
    // Apagar erros
    // Apagar input
    // Apagar mensagem de sucesso
})

function validarChaveDoInput(key)
{
    if(!isNaN(primeNumbers.prime1) && !isNaN(primeNumbers.prime2) && !isNaN(primeNumbers.E) && primeNumbers.prime1 != '' && primeNumbers.prime2 != '' && primeNumbers.E != '')
    {

    }
    else
    {
        erros.push("O campo precisa ser preenchido por número!")
    }
}