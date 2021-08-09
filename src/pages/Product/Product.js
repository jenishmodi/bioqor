import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Col, Row } from 'react-bootstrap';
import { AppContext } from 'context/AppContext';
import ProductCard from 'Components/ProductCard';
import './Product.scss';

const getImageSrc = (src) => `${process.env.REACT_APP_API_ENDPOINT}${src}`;
const generateListFromString = (value) => value.split('\n');

const Product = () => {
  const { productName } = useParams();
  const { products } = useContext(AppContext);
  const [product, setProduct] = useState({});
  const [otherProducts, setOtherProducts] = useState([]);

  const getProductByName = (products, productName) => {
    const name = productName.replaceAll('-', ' ');
    const [currentProduct, otherProducts] = products.reduce(
      ([currentProduct, otherProducts], product) => {
        if (product.name === name) {
          return [{ ...product }, otherProducts];
        }

        return [currentProduct, [...otherProducts, { ...product }]];
      },
      [{}, []]
    );

    setProduct(currentProduct);
    setOtherProducts(otherProducts);
  };

  useEffect(() => {
    getProductByName(products, productName);
  }, [products, productName]);

  return (
    <div className="p-5">
      <div>
        <Row>
          <Col xs={12} md={6}>
            <div className="p-3">
              <Carousel interval={3000}>
                {product.images?.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={getImageSrc(image || '')}
                      alt="productImage.jpg"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="p-3">
              <h1>{product.name || ''}</h1>
              <ul>
                {generateListFromString(product.description || '').map(
                  (description, index) => (
                    <li key={index}>{description}</li>
                  )
                )}
              </ul>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="p-3">
              <h4>Ingredients</h4>
              <ul>
                {generateListFromString(product.ingredients || '').map(
                  (ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  )
                )}
              </ul>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="p-3">
              <h4>How to Use</h4>
              <ul>
                {generateListFromString(product.howToUse || '').map(
                  (use, index) => (
                    <li key={index}>{use}</li>
                  )
                )}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <h2 className="text-center">Other Products</h2>
        <div className="m-4 d-flex flex-wrap align-items-center">
          {otherProducts.slice(0, 3).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
