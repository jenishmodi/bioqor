import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'Components/Button';
import { filesToBase64, isObjectEmpty } from 'utils/helpers';

import './AddProduct.scss';

const AddProduct = ({ data = {}, onSave = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [productName, setProductName] = useState('');
  const [images, setImages] = useState([]);
  const [productDescription, setProductDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [brandName, setBrandName] = useState('');
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    if (data && !isObjectEmpty(data)) {
      setIsEditing(true);

      const {
        name,
        description,
        ingredients,
        howToUse,
        price,
        brandName,
        images,
      } = data;

      setImagePreview(
        images.map((image) => ({
          name: image,
          dataURL: `${process.env.REACT_APP_API_ENDPOINT}${image}`,
        }))
      );
      setProductName(name);
      setProductDescription(description);
      setIngredients(ingredients);
      setHowToUse(howToUse);
      setProductPrice(price);
      setBrandName(brandName);
    }
  }, [data]);

  const createImagePreview = async (images) => {
    try {
      const files = Object.values(images);
      const previews = await filesToBase64(files);
      setImagePreview(previews);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    images.length !== 0 && createImagePreview(images);
  }, [images]);

  const submitHandler = (event) => {
    event.preventDefault();

    const reqBody = {
      brandName,
      ingredients,
      howToUse,
      name: productName,
      description: productDescription,
      price: Number(productPrice),
      product_images: [...Object.values(images)],
    };

    onSave(reqBody, isEditing);
  };

  return (
    <div className="my-3">
      <Form>
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={productName}
                onChange={({ target: { value } }) => setProductName(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={productPrice}
                onChange={({ target: { value } }) => setProductPrice(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={brandName}
                onChange={({ target: { value } }) => setBrandName(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={({ target: { files } }) => setImages(files)}
              />
            </Form.Group>
            <div>
              {imagePreview.map((image) => (
                <img
                  key={image.name}
                  src={image.dataURL}
                  alt={image.name}
                  className="preview-image"
                />
              ))}
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Product Description"
                value={productDescription}
                onChange={({ target: { value } }) =>
                  setProductDescription(value)
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Ingredients"
                value={ingredients}
                onChange={({ target: { value } }) => setIngredients(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>How to Use</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter how to use"
                value={howToUse}
                onChange={({ target: { value } }) => setHowToUse(value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="px-3">
          <Button className="btn-sm" onClick={submitHandler}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
