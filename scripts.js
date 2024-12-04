const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

//incluído uma função de callback para ser chamada quando o evento for disparado. Essa função é a ação de clique do input. Assim, ao clicar no botão ele chamará o clique do input.
uploadBtn.addEventListener("click", () => { 
    inputUpload.click();
})

function lerConteudoDoArquivo (arquivo) { //a função recebe o arquivo em si que será realziada a leitura
    return new Promise((resolve, reject) => { //promessa em JS é algo que não sabemos se vai dar certo ou não. Ele faz um procedimento assíncrono para retornar para nós algo que está acontecendo ainda, que foi recusado ou que foi resolvido. Porque nao sabemos qual o tamanho (ou formato) do arquivo em si) e não dá para garantir que na hora que bater a leitura já vai realizar ela por completo. Por isso dentro da promessa nós temos dois argumentos: um que é o RESOLVE que retornará quando a promessa for resolvida; e ouro o REJECT que vai retornar quando der algum erro
        const leitor = new FileReader(); //funcionalidade JS que está sendo iniciada para fazer o leitor de um arquivo. É ele quem vai ser o responsável por ler o arquivo que está sendo recebido como parâmetro dessa função

        //aqui se inicia a situação onde a promessa é resolvida
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        } //Se tudo der certo, a promessa vai retornar resolvida e informando o URL do arquivo (que será o resultado da leitura) e o nome do arquivo (pois precisamos dessa informação para colocar embaixo da imagem anexada dentro do HTML)

        //aqui se inicia a situação onde a promessa NÃO é resolvida
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        // para usar o leitor como 
        leitor.readAsDataURL(arquivo) //ele é um metodo para ler o conteudo do tipo Blob ou File. No nosso caso ele vai fazer a leitura do arquivo.
    })
}