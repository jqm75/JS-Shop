// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
	{
		id: 1,
		name: "Cooking oil",
		price: 10.5,
		type: "grocery",
		offer: {
			number: 3,
			percent: 20,
		},
	},
	{
		id: 2,
		name: "Pasta",
		price: 6.25,
		type: "grocery",
	},
	{
		id: 3,
		name: "Instant cupcake mixture",
		price: 5,
		type: "grocery",
		offer: {
			number: 10,
			percent: 30,
		},
	},
	{
		id: 4,
		name: "All-in-one",
		price: 260,
		type: "beauty",
	},
	{
		id: 5,
		name: "Zero Make-up Kit",
		price: 20.5,
		type: "beauty",
	},
	{
		id: 6,
		name: "Lip Tints",
		price: 12.75,
		type: "beauty",
	},
	{
		id: 7,
		name: "Lawn Dress",
		price: 15,
		type: "clothes",
	},
	{
		id: 8,
		name: "Lawn-Chiffon Combo",
		price: 19.99,
		type: "clothes",
	},
	{
		id: 9,
		name: "Toddler Frock",
		price: 9.99,
		type: "clothes",
	},
];
// Array with products (objects) added directly with push(). Products in this array are repeated.
let cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];
let total = 0;

// Exercise 1
function buy(id) {
	// 1. Loop for to the array products to get the item to add to cart
	// 2. Add found product to the cartList array

	products.forEach(function(product, index){
		if(product.id == id){
		   cartList.push(product);
		}
	})

	document.getElementById('count_product').innerHTML = cartList.length;
	console.log(cartList);
	calculateTotal()

}

// Exercise 2
function cleanCart() {
	// Vaciar carrito
	cartList = [];
	cart = [];
	total = 0;
	console.log(cartList);
	console.log("Total cart: $" + total);
	document.getElementById("count_product").innerHTML = 0;
	printCart();
}

// Exercise 3
function calculateTotal() {
	// Calculate total price of the cart using the "cartList" array
	total = 0;
	cartList.forEach(function (product) {
		total += product.price;
	});
	console.log("Total cart: $" + total);
}

// Exercise 4
function generateCart() {
	// Using the "cartlist" array that contains all the items in the shopping cart,
	// generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
	cart = [];
    quantities = [];
    cartList.forEach(function(product, index){
        if(quantities[product.id]){
            quantities[product.id] += 1;
        }
        else{
            quantities[product.id] = 1;
        }
    })
    quantities.forEach(function(quantity, id){
        products.forEach(function(product, index){
            if(product.id == id){
                cart.push(product);
                cart[cart.length - 1].quantity = quantity;
            }
        })
    })

    applyPromotionsCart(cart);
 }
	

// Exercise 5

function applyPromotionsCart(cart) {
	// Apply promotions to each item in the array "cart"

	cart.forEach((element) => {

		element.subtotalWithDiscount = element.subtotal;
	
		if ( element.offer && element.quantity >= element.offer.number) {
		  element.subtotalWithDiscount = parseFloat((element.quantity * element.offer.percent).toFixed(2));
		} 
	
	  });
	}



// Exercise 6
function printCart() {
	// Fill the shopping cart modal manipulating the shopping cart dom

	var htmlCartList = cart.length == 0
	? "<tr><th scope='row'>Empty</th><td></td><td></td><td></td><td></td></tr>" 
	: "";
	var subtotal = 0;
	cart.forEach(function(product, index){
	   htmlCartList += "<tr>"
	   htmlCartList += "<th scope='row'>" + product.name + "</th><td>$" + product.price + "</td><td>" + product.quantity + "</td><td>";
	   
	   if(product.subtotalWithDiscount){
		   htmlCartList += "$"+ product.subtotalWithDiscount + " (-" + product.offer.percent+"%)</td>";
		   subtotal += product.subtotalWithDiscount;
	   }
	   else{
		   htmlCartList += "$" + product.quantity * product.price + "</td>";
		   subtotal += (product.quantity * product.price);
	   }
	   htmlCartList += "<td><i rel='" + product.id + "' class='fas fa-trash remove-product'></i></td></tr>";
	})
	document.getElementById('cart_list').innerHTML = htmlCartList;
	document.getElementById('total_price').innerHTML = subtotal;
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
	// Refactor previous code in order to simplify it
	// 1. Loop for to the array products to get the item to add to cart
	// 2. Add found product to the cart array or update its quantity in case it has been added previously.

	let selectedProduct;
	let productOnCart = false;
	let totalQuantity = document.getElementById("count_product").innerHTML;

	products.forEach(function (product) {
		if (product.id == id) {
			selectedProduct = product;
		}
	});
	if (cart.length == 0) {
		cart.push(selectedProduct);
		cart[0].quantity = 1;
		productOnCart = true;
	} else {
		cart.forEach(function (product, index) {
			if (product.id == id) {
				cart[index].quantity++;
				productOnCart = true;
			}
		});
	}
	if (!productOnCart) {
		cart.push(selectedProduct);
		console.log(cart, "cart from addToCart");
		cart[cart.length - 1].quantity = 1;
	}

	document.getElementById("count_product").innerHTML =
		parseInt(totalQuantity) + 1;
	applyPromotionsCart(cart);
	calculateTotal();
	printCart();
}

// Exercise 8 a 9
function removeFromCart(id) {
	// 1. Loop for to the array products to get the item to add to cart
	// 2. Add found product to the cartList array

	cart.forEach(function(product, index){
        if(product.id == id){

            if(cart[index].quantity > 1)
                cart[index].quantity--
            else
                cart.splice(index, 1)
            
            document.getElementById('count_product').innerHTML = parseInt(document.getElementById('count_product').innerHTML) - 1;
            return(printCart());    
        }
     })

 }
 
 function open_modal(){
     console.log("Open Modal");
     printCart();
 }
 document.getElementById('cart_list').addEventListener('click', e => {
	if(e.target.classList.contains('remove-product')){
		id = e.target.getAttribute('rel');
        removeFromCart(id);
	} 
 });
