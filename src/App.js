import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/routes/navigation/navigation';
import Home from './components/routes/home/home';
import Shop from './components/routes/shop/shop';
import Checkout from './components/checkout/checkout';
import Authentication from './components/authentication/autthentication';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop/*' element={<Shop />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='auth' element={<Authentication />} />
			</Route>
		</Routes>
	);
};

export default App;
