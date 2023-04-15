import DirectoryItem from '../directory-item/directory-item';
import './directory.css';

const Directory = ({ categories }) => {
	return (
		<div className='categories-container'>
			{categories.map((el) => (
				<DirectoryItem key={el.id} {...el} />
			))}
		</div>
	);
};

export default Directory;
