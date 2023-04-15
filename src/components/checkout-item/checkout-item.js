import './checkout-item.css';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({ item }) => {
	const { imageUrl, id, quantity, price, name } = item;

	const { remove, increase, decrease } = useContext(CartContext);

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt='cart_image' />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<div className='arrow' onClick={() => decrease(id)}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				<div className='arrow' onClick={() => increase(id)}>
					&#10095;
				</div>
			</span>
			<span className='price'>{price}</span>

			<div className='remove-button' onClick={() => remove(id)}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
