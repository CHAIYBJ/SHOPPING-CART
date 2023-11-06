let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})

close.addEventListener('click', ()=>{
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})

let products = null;
fetch('product.json')
.then(response => response.json())
.then(data =>{
    products = data;
    addDataToHTML();
})

function addDataToHTML() {
    let listProductHTML = document.querySelector('.listProduct')
    listProductHTML.innerHTML = '';


    if (products != null){
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button onclick = "addCart(${product.id})">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
            
        });
    }
}

let listCart = [];
// get cookie data cart
function checkCart(){
var cookieValue = document.cookie
.split('; ')
.find(row => row.startsWith('listCart='));
if(cookieValue){
    listCart = JSON.parse(cookieValue.split('=')[1]);
}
}
checkCart();

function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
//    if product not in cart
    if(!listCart[$idProduct]){
        let dataProduct = productCopy.filter(
            product => product.id ==$idProduct
        )[0];

        // adding data product in cart
        listCart[$idProduct] = dataProduct;
        listCart [$idProduct].quantity = 1;
    }else{
        // if product in cart increase quantity
        listCart[$idProduct].quantity++; }

        
        // save data cart in cookie

        let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
        document.cookie = "listCart="+JSON.stringify(listCart)+"; "+ timeSave+"; path=/;";
addCartToHTML();
   
}

addCartToHTML();
function addCartToHTML(){
    let listCartHTML = document.querySelector('.listCart');
    listCart.innerHTML = '';

    let totalHTML =document.querySelector('.totalQuantity')
}