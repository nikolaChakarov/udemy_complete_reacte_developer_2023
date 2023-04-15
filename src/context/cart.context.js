import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
	increase: () => {},
	decrease: () => {},
	remove: () => {},
	total: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [total, setTotal] = useState(0);

	const addItemToCart = (productToAdd) => {
		const found = cartItems.find((el) => el.id === productToAdd.id);
		setCartCount((prev) => prev + 1);

		if (found) {
			setCartItems((prev) => [
				...prev.map((el) =>
					el.id !== productToAdd.id
						? el
						: { ...el, quantity: el.quantity + 1 }
				),
			]);
			return;
		}

		setCartItems((prev) => [...prev, { ...productToAdd, quantity: 1 }]);
	};

	const decrease = (id) => {
		const index = cartItems.findIndex((el) => el.id === id);
		const product = cartItems[index];
		if (product.quantity <= 1) {
			remove(id);
			return;
		}
		product.quantity--;

		setCartItems((prev) => [
			...prev.slice(0, index),
			product,
			...prev.slice(index + 1),
		]);

		setCartCount((prev) => prev - 1);
	};

	const increase = (id) => {
		const index = cartItems.findIndex((el) => el.id === id);
		const product = cartItems[index];
		product.quantity++;

		setCartItems((prev) => [
			...prev.slice(0, index),
			product,
			...prev.slice(index + 1),
		]);

		setCartCount((prev) => prev + 1);
	};

	const remove = (id) => {
		const product = cartItems.find((el) => el.id === id);

		setCartCount((prev) => prev - product.quantity);
		setCartItems((prev) => prev.filter((el) => el.id !== id));
	};

	useEffect(() => {
		const total = cartItems.reduce(
			(acc, curr) => (acc += curr.price * curr.quantity),
			0
		);
		setTotal(total);
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
		increase,
		decrease,
		remove,
		total,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
