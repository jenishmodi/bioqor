import { useEffect, useState } from 'react';
import { Modal, Button as BsButton } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import AddSales from 'Components/AddSales';
import Table from 'Components/Table';
import Button from 'Components/Button';
import SalesService from 'services/SalesService';

const columns = [
  {
    Header: 'Firm Name',
    accessor: 'firmName',
  },
  {
    Header: 'Contact Person Name',
    accessor: 'contactPersonName',
  },
  {
    Header: 'Mobile No',
    accessor: 'mobileNo',
  },
];

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [idOfDataToDelete, setIdOfDataToDelete] = useState(null);

  const getSales = async () => {
    try {
      const { data } = await SalesService.getAllSales();
      setSales(data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  const submitHandler = async (salesData, isUpdating) => {
    try {
      if (isUpdating) {
        const { data } = await SalesService.updateSales(
          currentData._id,
          salesData
        );

        setSales((prev) =>
          prev.map((sales) => {
            if (sales._id !== currentData._id) {
              return sales;
            }

            return data;
          })
        );
        setCurrentData(null);
        toast.success('Data updated successfully!');
      } else {
        const { data } = await SalesService.addSales(salesData);

        setSales((prev) => [...prev, data]);
        setCurrentData(null);
        toast.success('Data saved successfully!');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      await SalesService.deleteSales(idOfDataToDelete);

      setSales((prev) =>
        prev.filter((sales) => sales._id !== idOfDataToDelete)
      );
      setIdOfDataToDelete(null);
      toast.success('Data removed successfully!');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="m-3">
      <div className="d-flex justify-content-center justify-content-md-between align-items-center">
        <h1>Sales</h1>
        <Button className="btn-sm mr-2" onClick={() => setCurrentData({})}>
          Add New
        </Button>
      </div>
      <Table
        columns={columns}
        rowData={sales}
        onEdit={setCurrentData}
        onDelete={setIdOfDataToDelete}
      />

      <Modal
        backdrop="static"
        size="lg"
        show={currentData !== null}
        onHide={() => setCurrentData(null)}
      >
        <Modal.Header closeButton>Add Sales</Modal.Header>
        <Modal.Body className="p-2">
          <AddSales data={currentData} onSave={submitHandler} />
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
          <BsButton variant="light" onClick={() => setIdOfDataToDelete(null)}>
            Cancel
          </BsButton>
          <BsButton variant="danger" onClick={deleteHandler}>
            Delete
          </BsButton>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Sales;
