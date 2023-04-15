// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration; we get this information when we crate our project in FIREBASE
const firebaseConfig = {
	apiKey: 'AIzaSyCjv5iokdRAcGNKGCO-irSjNOcxo7UV_x4',
	authDomain: 'crwn-clothing-db-b1fea.firebaseapp.com',
	projectId: 'crwn-clothing-db-b1fea',
	storageBucket: 'crwn-clothing-db-b1fea.appspot.com',
	messagingSenderId: '1096857807105',
	appId: '1:1096857807105:web:2536abccc5b7806da29300',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((el) => {
		const docRef = doc(collectionRef, el.title.toLowerCase());
		batch.set(docRef, el);
	});

	await batch.commit();
	console.log('done');
};

export const getCategoriesAndDocuments = async (collectionName) => {
	const collectionRef = collection(db, collectionName);
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce((acc, curr) => {
		const { title, items } = curr.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	// we get this current user from collection USERS, even if this collection does not exist yet. this is how GOOGLE works. it give us an ID
	const userDocRef = doc(db, 'users', userAuth.uid);
	// this is a current user document, and again we have a snapshot even that this USER is not yet in our collection. we can aply method exists() to see if this user has been created or not
	const userSnapshot = await getDoc(userDocRef);

	// if user data does not exits
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			// crate / set the document with the data from userAuth in my collection 'USERS'
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.error('error creating the user: ', error.message);
		}
	}

	// if user data exists
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
	// OBSERVER for changes in AUTH singleton object; whenever auth changes, the callback we pass, will be called;
	return onAuthStateChanged(auth, callback);
};
