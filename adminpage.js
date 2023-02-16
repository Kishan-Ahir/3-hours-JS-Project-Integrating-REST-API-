
function saveproduct(event)
{
    event.preventDefault();

    let productname = event.target.productname.value;
    let productprice = event.target.productprice.value;
    let finalprice = document.getElementById("totalvalue");
    finalprice.value = parseInt(finalprice.value) + parseInt(productprice);


    let data = {
        productname,
        productprice
    };

        axios.post("https://crudcrud.com/api/116a15827297405ab6a066da2ff29f9b/product_list",data)
        .then((data)=>
        {
            let perentelement = document.getElementById("product-list");
            perentelement.innerHTML = "";

                axios.get("https://crudcrud.com/api/116a15827297405ab6a066da2ff29f9b/product_list")
            .then((data)=>
            {
                for(let i=0;i<data.data.length;i++)
                {
                    showonscreen(data.data[i]);
                }
            })
            .catch((err)=>console.log(err));
            
        })
        .catch((err)=>console.log(err)); 


    function showonscreen(data)
    {
        let perentelement = document.getElementById("product-list");
        let childelement = document.createElement('li');
        childelement.className = "list-group-item";
        let text = document.createTextNode(`Name of product is ${data.productname} and Price of product is ${data.productprice}`);
        childelement.appendChild(text);


        let deletbtn = document.createElement("input");
        deletbtn.type = "button";
        deletbtn.className = "btn btn-danger";
        deletbtn.style = "margin-left: 5px";
        deletbtn.value = "Remove Product"
        deletbtn.onclick = removeproduct;

        function removeproduct(){
            perentelement.removeChild(childelement);
            axios
            .delete(`https://crudcrud.com/api/116a15827297405ab6a066da2ff29f9b/product_list/${data._id}`)
            .then(()=>{
                finalprice.value = parseInt(finalprice.value) - parseInt(data.productprice);
            })
            .catch((err)=>{console.log(err)});
        }
        childelement.appendChild(deletbtn);
        perentelement.appendChild(childelement);
    }
}