import { useHistory } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const history = useHistory();

  return (
    <div
      className="text-center product-card"
      onClick={() => history.push('/product', { product })}
    >
      <img src={product.imgSrc} alt={`${product.name}.jpg`} />
      <div className="p-3">
        <h4>{product.name}</h4>
        <p>View More</p>
      </div>
    </div>
  );
};

export default ProductCard;
