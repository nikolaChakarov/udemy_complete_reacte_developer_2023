import './cart-item.css';

const CartItem = (props) => {
	const { name, imageUrl, price, quantity } = props;

	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt='cart__image' />
			<div className='item-details'>
				<span className='name'>{name}</span>
				<span className='price'>
					{quantity} x ${price}
				</span>
			</div>
		</div>
	);
};

export default CartItem;
