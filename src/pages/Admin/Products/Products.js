import { useContext, useState } from 'react';
import { Modal, Button as BsButton } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { AppContext, setProducts } from 'context/AppContext';
import AddProduct from 'Components/AddProduct';
import Table from 'Components/Table';
import Button from 'Components/Button';
import ProductService from 'services/ProductService';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Brand Name',
    accessor: 'brandName',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
];

const Products = () => {
  const { products, dispatch } = useContext(AppContext);

  const [currentData, setCurrentData] = useState(null);
  const [idOfDataToDelete, setIdOfDataToDelete] = useState(null);

  const submitHandler = async (productData, isUpdating) => {
    try {
      if (isUpdating) {
        const { data } = await ProductService.updateProduct(
          currentData._id,
          productData
        );

        dispatch(
          setProducts(
            products.map((product) => {
              if (product._id !== currentData._id) {
                return product;
              }

              return data;
            })
          )
        );
        setCurrentData(null);
        toast.success('Data updated successfully!');
      } else {
        const { data } = await ProductService.addProduct(productData);

        dispatch(setProducts([...products, data]));
        setCurrentData(null);
        toast.success('Data saved successfully!');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      await ProductService.deleteProduct(idOfDataToDelete);
      const updatedProducts = products.filter(
        (product) => product._id !== idOfDataToDelete
      );

      dispatch(setProducts(updatedProducts));
      setIdOfDataToDelete(null);
      toast.success('Data removed successfully!');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="m-3">
      <div className="d-flex justify-content-center justify-content-md-between align-items-center">
        <h1>Products</h1>
        <Button className="btn-sm mr-2" onClick={() => setCurrentData({})}>
          Add New
        </Button>
      </div>
      <Table
        columns={columns}
        rowData={products}
        onEdit={setCurrentData}
        onDelete={setIdOfDataToDelete}
      />

      <Modal
        backdrop="static"
        size="lg"
        show={currentData !== null}
        onHide={() => setCurrentData(null)}
      >
        <Modal.Header closeButton>Add Product</Modal.Header>
        <Modal.Body className="p-2">
          <AddProduct data={currentData} onSave={submitHandler} />
        </Modal.Body>
      </Modal>

      <Modal
        backdrop="static"
        show={idOfDataToDelete !== null}
        onHide={() => setIdOfDataToDelete(null)}
      >
        <Modal.Header closeButton>Are Your Sure?</Modal.Header>
        <Modal.Body className="p-2">
          Are you sure you want to remove this data?
        </Modal.Body>
        <Modal.Footer>
          <BsButton
            variant="light"
            size="sm"
            onClick={() => setIdOfDataToDelete(null)}
          >
            Cancel
          </BsButton>
          <BsButton variant="danger" size="sm" onClick={deleteHandler}>
            Delete
          </BsButton>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Products;
