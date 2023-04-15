import { createContext, useState, useEffect } from 'react';
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// as the actual values you want to access;
export const UserContext = createContext({
	currentUser: null,
	shopData: [],
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		// it is retruned from FRIREBASE onAuthStateChanged method;
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}

			console.log(user);
			setCurrentUser(user);
		});
		// we stop listening; no memory leak;
		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider value={{ ...value }}>
			{children}
		</UserContext.Provider>
	);
};
