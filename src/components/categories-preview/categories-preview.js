import './categories-preview.css';
import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../category-preview/category-preview';

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<>
			{Object.keys(categoriesMap).map((title, i) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview
						key={i}
						title={title}
						products={products}
					/>
				);
			})}
		</>
	);
};

export default CategoriesPreview;
