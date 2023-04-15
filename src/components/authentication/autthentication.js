import SignUpForm from '../sign-up-form/sign-up-form';
import SignInForm from '../sign-in-form/sign-in-form';
import './autthentication.css';

const Authentication = () => {
	// need this flow if we use signInWithGoogleRedirect not if we use signInWithGooglePopup
	// const logGoogleRedirectUser = async () => {
	// 	const { user } = await signInWithGoogleRedirect();
	// 	console.log('user from redirect: ', user);
	// };
	// const initUser = async () => {
	// 	const response = await getRedirectResult(auth);
	// 	if (response) createUserDocumentFromAuth(response.user);
	// };
	// useEffect(() => {
	// 	initUser();
	// }, []);

	return (
		<div className='authentication-container'>
			<SignInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
