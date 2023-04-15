import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item';
import Button from '../button/button';
// import './cart-dropdown.css';
import {
	CartDropdownContainer,
	EmptyMessage,
	CartItems,
} from './cart-dropdown-styled';

const CartDropdown = () => {
	const { cartItems, setIsCartOpen } = useContext(CartContext);
	const navigate = useNavigate();

	const handleClick = () => {
		setIsCartOpen(false);
		navigate('/checkout');
	};

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((el, i) => <CartItem key={i} {...el} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={handleClick}>GO TO CHECKOUTS</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
