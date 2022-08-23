import { CartEntry, Product } from "../types";
const addItem = (product: Product, quantity: number, cb: () => void): void => {
	
	let cart = [] as CartEntry[];
	if (typeof window !== 'undefined') {
    const returnedCart = localStorage.getItem('snake-way-2-cart');
		if (returnedCart !== null) {
			cart = JSON.parse(returnedCart);
    }
    cart.push({
      product,
      quantity
    });
		console.log(cart)

    localStorage.setItem('snake-way-2-cart', JSON.stringify(cart));
    cb();
	}
}

const totalItems = (): number => {
	if (typeof window !== 'undefined') {
    const returnedCart = localStorage.getItem('snake-way-2-cart');
		if (returnedCart !== null) {
			
			return JSON.parse(returnedCart).length
		}
	} 
	return 0
}

const getCart = (): CartEntry[] => {
	if (typeof window !== 'undefined') {
    const returnedCart = localStorage.getItem('snake-way-2-cart');
		if (returnedCart !== null) {
			return JSON.parse(returnedCart);
		}
	}
	return [] as CartEntry[]; // go back to this
}

const updateCart =(index: number, quantity: number): void => {
	let cart: CartEntry[];
	if (typeof window !== 'undefined') {
    const returnedCart = localStorage.getItem('snake-way-2-cart');
		if (returnedCart !== null) {
			cart = JSON.parse(returnedCart);
      cart[index].quantity = quantity;
		  localStorage.setItem('snake-way-2-cart', JSON.stringify(cart));
		}
		
	}
}

const removeItem = (index: number) => {
	let cart = [] as CartEntry[];
	if (typeof window !== 'undefined') {
    const returnedCart = localStorage.getItem('snake-way-2-cart');
		if (returnedCart !== null) {
			cart = JSON.parse(returnedCart);
      cart.splice(index, 1);
		  localStorage.setItem('snake-way-2-cart', JSON.stringify(cart));
		}
		
	}
	return cart;
}



export default { addItem, totalItems, getCart, updateCart, removeItem }