var btnCript = document.querySelector('#generate-key')

btnCript.addEventListener('click', function()
{
    // Recuperar a chave
    keyRSA = principalKeyRSA
    // Obter o texto
    text = document.querySelector('#text-to-encript')
    // Transformar o texto em numero
    cod = transformarTexto(text)
    // Efetuar o cálculo e armazenar num array
    arrayCodC = calcular(cod, keyRSA)
    // Mostar o array de numeros

})

function transformarTexto(text)
{
    arrayText = text.split('')
    arrayCod = []
    arrayText.forEach(caracter => {
        arrayCod.push(caracter.charCodeAt())
    });

    return arrayCod
}

function calcular(cod, keyRSA)
{
    var codC = []
    cod.forEach(function(num)
    {
        codC.push((num**keyRSA.E) % keyRSA.N)
    })

    return codC.join(' ')
}

function exibirMensagem(text, campoMsg)
{
    
}