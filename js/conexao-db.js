function salvarKey(keyRSA)
{
    stringParaSalvar = (keyRSA.E + ' ' + keyRSA.N + ' ' + keyRSA.phyN + ' ' + keyRSA.E + ' ' + keyRSA.D)
    localStorage.setItem(keyRSA.D, stringParaSalvar)
}

function recuperarKey(key)
{
    stringRecuperada = localStorage.getItem(key)
    if(stringRecuperada != null)
    {
        arrayKey = stringRecuperada.split()
        keyRSA = montarChave(arrayKey[0], arrayKey[1], arrayKey[2], arrayKey[3], arrayKey[4])
        return keyRSA
    }

    return null
}