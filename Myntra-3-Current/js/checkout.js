let cartItems = localStorage.getItem('productsInCart');
cartItems = JSON.parse(cartItems);
console.log("cartItems: ", cartItems);
    
let productcontainer = document.querySelector('.checkout-container');
console.log(productcontainer);
productcontainer.innerHTML = '';
productcontainer.innerHTML +=`
    
`;
let cartNo = localStorage.getItem('cartNumber');
productcontainer.innerHTML += `
    <h4>Cart
    <span class="price" style="color:black">
        <i class="fa fa-shopping-cart"></i>
        <b>${cartNo}</b>
    </span>
    </h4>
`;
if(cartItems && productcontainer){
    productcontainer.innerHTML += `
        <div class="cart-items" id="cartItems">
    `;
    Object.values(cartItems).map(item => {
        productcontainer.innerHTML += `
            <p><a href="#">${item.tag}</a> <span class="price">Rs. ${item.inCart*item.price}</span></p> 
        `;
    });
    productcontainer.innerHTML +=`
    <p><a href="#">TAX</a> <span class="price">Rs. 45</span></p>
    </div>`;
    let totalPrice = document.querySelector('#totalPrice');
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    productcontainer.innerHTML += `
        <hr>
        <p>Total <span class="price" style="color:black"><b>Rs. ${cartCost+45}</b></span></p>
    `;
}else{
    console.log("Not found!");
}

localStorage.clear();