import { useHistory } from 'react-router-dom';
import './ProductCard.scss';

const getImageSrc = (src) => `${process.env.REACT_APP_API_ENDPOINT}${src}`;

const ProductCard = ({ product }) => {
  const history = useHistory();

  return (
    <div
      className="text-center product-card"
      onClick={() =>
        history.push(`/products/${product.name.replaceAll(' ', '-')}`)
      }
    >
      <img
        src={getImageSrc(product.images[0])}
        className="d-block w-100"
        alt={`${product.name}.jpg`}
      />
      <div className="p-3">
        <h4>{product.name}</h4>
        <p>View More</p>
      </div>
    </div>
  );
};

export default ProductCard;
