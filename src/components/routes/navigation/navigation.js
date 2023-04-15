import { Fragment, useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../../cart-icon/cart-icon';
import CartDropdown from '../../cart-dropdown/cart-dropdown';
import { UserContext } from '../../../context/user.context';
import { CartContext } from '../../../context/cart.context';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import { ReactComponent as Crown } from '../../../assets/crown.svg';
import './navigation.css';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<Crown className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>

					{!currentUser ? (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					) : (
						<span onClick={signOutUser} className='nav-link'>
							SIGN OUT
						</span>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
