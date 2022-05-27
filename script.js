




function abreURL() {


    let produt = document.getElementById('produto').value;
    let semAcento = produt.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    var cep = document.getElementById("cep");
    search = cep.value.replace("-", "");
    var loja = '';
    let box = document.querySelector("#box");
    if(cep.value === ""){
        window.alert("Por favor Digite um Cep")
    }if(produt ===""){
        window.alert("Por favor Digite um Produto")
    }
    if(cep.value !== "" && produt !=="" ){

    fetch(`https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=${search}`)
        .then((response) =>
            response.json()
        ).then((data) => {
            console.log("data: ");
            cep.value = "";
            //produt = "";
            loja = data[0].sellers[1].id;


        });




    const getPosts = async () => {
        const response = await fetch(`https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=${loja}`)
        return response.json()

    }
    const addItensIntoDom = async () => {


        const posts = await getPosts()
        box.innerHTML = "";
        const produtoForaDaApi = `<div class='resposta'><h1>Desculpe,Produto Não localizado</h1></div>`
        console.log("fetch 2:")
        console.log(posts)


//Função  que retorna um array se houve o item buscado, e retorna um array vazio se não encontrar o item
        var produtoNaLoja = posts.filter(function (ele) {
            return ele.productName.includes(produt);
           
        });
        /*essa variavel recebe a filtragem  dos itens dentro da api e cria um card do que foi encontrado
         com a imagem e a descrição do produto*/
        const postsTemplate = produtoNaLoja.map(item => `<div id='cards'>
    
        <img src=${item.items[0].images[0].imageUrl}>
        <div>${item.productName}</div>  
        <div><h2 class='price'>R$${item.items[0].sellers[0].commertialOffer.Installments[1].Value}
</h2></div>
</div>` ).join('')

        console.log(produtoNaLoja)
        

        //se a variavel retorna um uma array vazio essa função retorna uma variavel ProdutoForaDaApi
        if(produtoNaLoja.length  === 0){
            box.innerHTML = produtoForaDaApi;
            console.log("item não localizado")
         }


//Se nao ela posta o que encontrou
        box.innerHTML += postsTemplate
        
        
    }


    addItensIntoDom()
}

}

