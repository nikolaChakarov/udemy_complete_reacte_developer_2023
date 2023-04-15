import './directory-item.css';

const DirectoryItem = ({ id, imageUrl, title }) => {
	return (
		<div key={id} className='directory-container'>
			<div
				className='background-image'
				style={{ backgroundImage: `url(${imageUrl})` }}
			/>
			<div className='directory-body-container'>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</div>
	);
};

export default DirectoryItem;
