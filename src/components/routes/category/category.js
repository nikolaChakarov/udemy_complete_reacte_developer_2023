import './category.css';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../../context/categories.context';
import ProductCard from '../../product-card/product-card';

const Category = () => {
	const params = useParams();
	const { categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categoriesMap[params.category]);
	}, [params.category, categoriesMap]);

	return (
		<>
			<h2 className='category-container-title'>{params.category}</h2>
			<div className='category-container'>
				{products &&
					products.map((product, i) => (
						<ProductCard key={i} {...product} />
					))}
			</div>
		</>
	);
};

export default Category;
