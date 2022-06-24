function crypt(msg, hash) {
    // Transformando a string em um array de letras
    let phrase = msg.split("");
    // Loop para passar em cada um dos itens do array
    for (let i = 0; i < phrase.length; i++) {
        //inverte ordem do array
        phrase.reverse();
        // Transformando cada letra em um decimal de ASCII
        phrase[i] = (phrase[i].charCodeAt(0));
        //identifica se número é par ou impar e faz a conta
         if(phrase[i] % 2 == 0) {
            phrase[i] =  phrase[i] * 8 + "$" // $ para ser possivel indentifica-los depois
        }
        else{
            phrase[i] =  phrase[i] / 8
        }
        // Adicionando a hash separadora a cada um dos
        // itens do array (letras)
        phrase[i] += hash;
    }
    // Adicionando a data de criptografia ao ultimo elemento do array
    phrase.push(8);
    // Variável de resposta
    let output = "";
    // Loop adicionando os elementos do array como string
    for (let i = 0; i < phrase.length; i++) {
        output += phrase[i];
    }
    // Retorna a mensagem criptografada
    return output;
}
function decrypt(cypher, hash) {
    // Forço a hash a virar uma string
    let h = String(hash)
    // Uso a hash para dividir a string em um array
    const msg = cypher.split(h);
    //Removeu o ultimo item do array e guardou em "d"
    const d = msg.pop();
    // Passando por cada um dos elementos
    
    for (let i = 0; i < msg.length; i++) {
        //checa numeros que eram pares ou impares
        //realiza a conta inversa
        //volda de decimal para letra
        if(msg[i].slice(-1) === "$") {
            msg[i] = msg[i].slice(0, -1)
            msg[i] = msg[i] / d
            msg[i] = String.fromCharCode(parseInt(msg[i]));
        }
        else{
            msg[i] = msg[i] * d
            msg[i] = String.fromCharCode(parseInt(msg[i])); 
        }
        //inverto para a ordem correta o array
        msg.reverse();
    }

   
    // Defininindo um uma saída no formato de string
    let output = "";
    // Loop concatenando a minha mensagem
    for (let i = 0; i < msg.length; i++) {
        output += msg[i];
    }
    // Retornando a mensagem descriptografada
    return output;
}
//por alguma razaõ o codigo funciona apenas se a frase tiver um numero par de caracteres
const phrase = "ta funcionandoh";
let pass = crypt(phrase, "||");
console.log(pass);
let solve = decrypt(pass, "||")
console.log("   descryptado=  " + solve);