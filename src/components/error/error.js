import './error.css';

const Error = ({ message }) => {
	return (
		<div className='error-wrapper'>
			<span>{message}</span>
		</div>
	);
};

export default Error;
