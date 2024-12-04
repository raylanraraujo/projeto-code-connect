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

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => { //a leitura do arquivo vai acontecer no momento que ocorre uma mudança do arquivo que está lendo. Quando acontecer alguma mudança no input imagem, vai acontecer uma funcionalidade que será a leitura do arquivo. foi colocado o "async" antes do evento para informar que a função é assíncrona
    const arquivo = evento.target.files[0]; //selecionar o arquivo que está sendo mandado nessa mudança. Ou seja, ele vai pegar o evento do envio, vai entrar dentro desse evento e pegar o arquivo que está sendo enviado

    if (arquivo) { //aqui inicia o processo de validação. Se realmente houver um arquivo...
        try { //eu quero que tente fazer alguma coisa
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); //se eu tô enviado pra função ler conteúdo do arquivo e ela tem que ter aquele tempo para fazer a promessa ser resolvida ou nã0. Não pode ser chamado simplesmente ela porque se nao o caminho do sripts.js será seguido e não vai esperar essa resoluçào da promessa. Para definir que se deseja esperar que essa promessa seja resolvida ou não, precisamos definir a funcionalidade como async antes dos parenteses do evento. Além disso precisa ser definido o que precisa ser esperado.  Por esta razão foi colocar o o "await" antes da função.
            
            imagemPrincipal.src = conteudoDoArquivo.url //Após a leitura do aquivo, eu quero que seja substituído a imagem
            nomeDaImagem.textContent = conteudoDoArquivo.nome; //Após a leitura, trocar o nome da imagem
        
        } catch (Erro) { //caso venha a ocorrer algum erro e a promessa nao seja resolvida, ou seja, a promessa seja reject o catch catura esse erro e vai fazer alguma coisa com ele.
            
            console.error("Erro na leitura do arquivo"); //nesse ele mostra no cosole que deu um erro no upload desse arquivo 
        }
    }
})