import { useState } from 'react';
import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.css';
import FormInput from '../form-input/form-input';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button';
import Error from '../error/error';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [error, setError] = useState(null);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
		// await createUserDocumentFromAuth(user);
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { user } = await signInAuthWithEmailAndPassword(
				email,
				password
			);

			resetFormFields();
		} catch (err) {
			console.log(err.code);
			setError(err.code);

			setTimeout(() => setError(null), 3000);
		}
	};

	return (
		<div className='sign-up-container'>
			{error && <Error message={error} />}

			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
				/>

				<FormInput
					label='Password'
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
