var btnInsertKey = document.querySelector('#insert-key')

btnInsertKey.addEventListener('click', function()
{
    // Obter a chave do input
    var key = document.querySelector('#user-key').value

    var ulErros = document.querySelector("#erros-insercao")
    // Validar erros no input
    erros = validarChaveDoInput(key)
    if (erros.length > 0)
    {
        exibirErros(erros, ulErros)
        return
    }

    ulErros.innerHTML = ''
    // Procurar a chave no banco e recuperar objeto keyRSA
    keyRSA = recuperarKey(key)

    erros = validarConsulta(keyRSA)

    if (erros.length > 0)
    {
        exibirErros(erros, ulErros)
        return
    }

    ulErros.innerHTML = ''
    // Mostrar que o processo foi bem sucedido
    document.querySelector('#sucesso-chave').textContent = 'Chave inserida com sucesso'
    principalKeyRSA = keyRSA
})

var btnLimpar = document.querySelector('#clear-key')

btnLimpar.addEventListener('click', function()
{
    // Pegar elementos
    mensagemErro = document.querySelector('#erros-insercao')
    input = document.querySelector('#user-key')
    mensagemSucesso = document.querySelector('#sucesso-chave')

    // Apagar campos
    limpar(mensagemErro)
    limpar(input)

})

function validarChaveDoInput(key)
{
    erros = []
    if(isNaN(key) || key == '')
    {
        erros.push("O campo precisa ser preenchido pelo código numérico!")
    }

    return erros
}

function validarConsulta(keyRSA)
{
    erros = []
    if(keyRSA == null)
    {
        erros.push("Chave não encontrada")
    }

    return erros
}