import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './product-card.css';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button';

const ProductCard = (props) => {
	const { name, price, imageUrl, id } = props;
	const { addItemToCart } = useContext(CartContext);

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt='product_img' />

			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>

			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={() => addItemToCart({ name, price, imageUrl, id })}
			>
				Add to card
			</Button>
		</div>
	);
};

export default ProductCard;
