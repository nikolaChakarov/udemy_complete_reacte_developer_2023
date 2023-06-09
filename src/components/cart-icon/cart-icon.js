import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.css';

const CartIcon = () => {
	const { setIsCartOpen, cartCount } = useContext(CartContext);

	return (
		<div
			className='cart-icon-container'
			onClick={() => setIsCartOpen((prev) => !prev)}
		>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
};

export default CartIcon;
