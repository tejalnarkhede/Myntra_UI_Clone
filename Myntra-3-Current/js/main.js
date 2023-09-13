console.log("running");
let carts = document.getElementsByClassName('add-cart');
//console.log(carts.length);

let products = [
    {
        name:'Women White Floral Print Maxi Dress',
        tag: 'product-1',
        price:879,
        inCart:0
    },
    {
        name:'Pink Printed Layered Dress',
        tag: 'product-2',
        price:759,
        inCart:0
    },
    {
        name:'Mauve Printed A-Line Net Dress',
        tag: 'product-3',
        price:755,
        inCart:0
    },
    {
        name:'Women Green Solid Kurta',
        tag: 'product-4',
        price:1399,
        inCart:0
    },
    {
        name:'Green Embroidered Kurta',
        tag: 'product-5',
        price:2687,
        inCart:0
    },
    {
        name:'Beige & White Printed Kurta',
        tag: 'product-6',
        price:2248,
        inCart:0
    },
    {
        name:'Grey Embroidered Hem Tunic',
        tag: 'product-7',
        price:989,
        inCart:0
    },
    {
        name:'Blue n White Printed Tunic',
        tag: 'product-8',
        price:703,
        inCart:0
    },
    {
        name:'Navyblue-White Printed Tunic',
        tag: 'product-9',
        price:569,
        inCart:0
    },
    {
        name:'Black Slim Fit Solid Trousers',
        tag: 'product-10',
        price:1953,
        inCart:0
    },
    {
        name:'Red Printed Wrap Dress',
        tag: 'product-11',
        price:7000,
        inCart:0
    },
    {
        name:'Pink Jacquard Flared Skirt',
        tag: 'product-12',
        price:1539,
        inCart:0
    }
];

class Products{

    constructor(){
        console.log("products constructor()");
    }
    cartNumber(product){
        console.log("The product clicked is ",product);
        
        let productNumbers = localStorage.getItem('cartNumber');
        productNumbers = parseInt(productNumbers);
    
        if(productNumbers){
            localStorage.setItem('cartNumber',productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        }else{
            localStorage.setItem('cartNumber',1);
            document.querySelector('.cart span').textContent = 1;
        }
        
        this.add_product(product);
    }
    
    add_product(product){
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
       console.log("typeof cartItems is ", typeof cartItems);
       
        if(cartItems != null){
            if(cartItems[product.tag] == undefined){
                cartItems = {
                    ...cartItems,
                    [product.tag]:product
                }
            }
            
            cartItems[product.tag].inCart +=1;
    
        }else{//first time clicking prod
            product.inCart = 1;
            cartItems = {
                [product.tag]:product
            }
        }
        
        //console.log(product);
        
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        location.reload();
    }
}

class CartItems{
    constructor(){
        console.log("Inside cartItems constructor()");
    }
    displayCart(){
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        console.log("cartItems: ", cartItems);
    
        let emptyCart = document.getElementById('emptyCart');
        let productcontainer = document.querySelector("#cartTable");
    
        let totalPrice = document.querySelector('#totalPrice');
        let cartCost = localStorage.getItem('totalCost');
        cartCost = parseInt(cartCost);
        console.log("Cost ", cartCost);
            
        let productNumbers = localStorage.getItem('cartNumber');
        productNumbers = parseInt(productNumbers);
    
        if(cartItems && productcontainer){
            productcontainer.innerHTML += `
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
            `;
            Object.values(cartItems).map(item => {
                productcontainer.innerHTML += `
                <tr>
                <td>
                    <div class="cart-info">
                        <img src="img/${item.tag}.jpg">
                        <div>
                            <p>${item.name}</p>
                            <small>Price: Rs. ${item.price}</small>
                            <br>
                            <a onclick=cartItemsObj.remove('${item.tag}')>Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="${item.inCart}" id="quantity" onchange=cartItemsObj.updatePrice('${item.tag}')></td>
                
                <td>Rs. ${item.inCart * item.price}</td>
            </tr>
                `;
            });
            
    
            if(cartCost != 0 && productNumbers > 0){
                totalPrice.innerHTML += `
                <tr>
                    <td>Subtotal</td>
                    <td>Rs. ${cartCost}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>Rs. 45</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>Rs. ${cartCost + 45}</td>
                </tr>
                <a href="checkout.html" class="btn">Continue to checkout &#8594;</a>
            `;
            }else{
                console.log("Else section");
                productcontainer.innerHTML = '';
                emptyCart.innerHTML = `
                <img src=img/emptyCart.svg height=350px class=empty-cart-img>
                <p style=text-align:center>No products added in the cart.</p>
                `;
            }
            
        }else if(emptyCart){
            console.log("Else section");    
            // let emptyCart = document.getElementById('cartTable');
            productcontainer.innerHTML = '';
            emptyCart.innerHTML = `
            <img src=img/emptyCart.svg height=350px class=empty-cart-img>
            <p style=text-align:center>No products added in the cart.</p>
            `;
        }
    }
    remove(key){
        console.log("remove()", key);
        
        let stored = localStorage.getItem('productsInCart');
        stored = JSON.parse(stored);
        let deletedItemPrice = stored[key].price;
        let deletedItemQty = stored[key].inCart;
        delete stored[key];
    
        localStorage.setItem('productsInCart', JSON.stringify(stored));
        console.log("Delete: Updated products in cart");
    
        //Update Total Cost
        let cartCost = localStorage.getItem('totalCost');
        cartCost = parseInt(cartCost);
        cartCost -= deletedItemQty * deletedItemPrice;
        localStorage.setItem('totalCost', cartCost);
        console.log("Delete: Updated totalCost");
    
        //update cartNumber
        let productNumbers = localStorage.getItem('cartNumber');
        productNumbers = parseInt(productNumbers);
        productNumbers = productNumbers - 1;
        localStorage.setItem('cartNumber', productNumbers);
        console.log("Delete: Updatedcart number");
        location.reload();
        this.displayCart();
    }
    updatePrice(key){ 
        //update inCart
        let qty = document.getElementById('quantity').value;
        console.log("qty: ",qty);
    
        let cartItems= localStorage.getItem('productsInCart');
        cartItems=JSON.parse(cartItems);
    
        if(cartItems != null){
            cartItems[key].inCart = qty;
            console.log("Quantity updated!");
        }else{
            console.log("Product not found!");
        }
        
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        console.log("Updated products in cart");
        
        //update totalCost
        let cartCost = localStorage.getItem('totalCost');
        cartCost = parseInt(cartCost);
        let changeCost = (cartItems[key].inCart - 1) * cartItems[key].price;
        cartCost += changeCost;
        localStorage.setItem('totalCost', cartCost);
        console.log("Updated total cost");
        location.reload();
        return false;
    }
    totalCost(product){
        let cartCost = localStorage.getItem('totalCost');
        
        if(cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', cartCost + product.price);
        }else{
            localStorage.setItem('totalCost',product.price);
        }
    }
    
}

productsObj = new Products();
cartItemsObj = new CartItems();

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click', () =>{
        productsObj.cartNumber(products[i]);
        cartItemsObj.totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumber');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

onLoadCartNumbers();
cartItemsObj.displayCart();