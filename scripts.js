const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

//incluído uma função de callback para ser chamada quando o evento for disparado. Essa função é a ação de clique do input. Assim, ao clicar no botão ele chamará o clique do input.
uploadBtn.addEventListener("click", () => { 
    inputUpload.click();
})