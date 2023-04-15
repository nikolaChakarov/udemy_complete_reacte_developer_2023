import './category-preview.css';
import ProductCard from '../product-card/product-card';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
	const maxNumberOfProductsToShow = 4;

	return (
		<div className='category-preview-container'>
			<h2>
				<Link className='title' to={title}>
					{title.toUpperCase()}
				</Link>
			</h2>
			<div className='preview'>
				{products
					.filter((_, idx) => idx < maxNumberOfProductsToShow)
					.map((el, i) => (
						<ProductCard key={i} {...el} />
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;
