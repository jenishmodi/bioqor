import { useLocation } from 'react-router-dom';

const Product = () => {
  const {
    state: { product },
  } = useLocation();

  return (
    <div>
      <div className="p-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <img src={product.imgSrc} alt="myIMgae.jpg" />
          </div>
          <div className="col-12 col-md-6">
            <h1>Header</h1>
            <ul>
              <li>list</li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <h4>Ingredients</h4>
            <ul>
              <li>list</li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <h4>How to Use</h4>
            <ul>
              <li>list</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2>Other Products</h2>
        <ul>
          <li>list</li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
