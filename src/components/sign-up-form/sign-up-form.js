import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import './sign-up-form.css';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import Error from '../error/error';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const [error, setError] = useState(null);

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
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });

			resetFormFields();
		} catch (err) {
			console.log(err);
			setError(err.code);
			setTimeout(() => setError(null), 3000);
		}
	};

	return (
		<div className='sign-up-container'>
			{error && <Error message={error} />}
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display name'
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
				/>

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

				<FormInput
					label='Confirm Password'
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
