async function buscaEndereço(cep) {
    let mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        let consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro) {
            throw Error("CEP não existente");
        }
        const cidade = document.getElementById("cidade");
        const logradouro = document.getElementById("endereco");
        const estado = document.getElementById("estado");
        const bairro = document.getElementById("bairro");

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    }
    catch (erro) {
        mensagemErro.innerHTML = `<p> CEP Inválido. Tente Novamente`;
        console.log(erro);
    }
}

let cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereço(cep.value));
