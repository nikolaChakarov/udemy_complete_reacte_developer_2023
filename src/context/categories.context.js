import { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../_data';

import {
	addCollectionAndDocument,
	getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	// we need this only once to set the data into firestore
	// useEffect(() => {
	// 	addCollectionAndDocument('categories', SHOP_DATA);
	// }, []);

	const getCategoriesMap = async () => {
		const categoryMap = await getCategoriesAndDocuments('categories');
		setCategoriesMap(categoryMap);
	};

	useEffect(() => {
		getCategoriesMap();
	}, []);

	const value = { categoriesMap };

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
