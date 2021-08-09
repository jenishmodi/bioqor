import { useEffect, useState } from 'react';
import { Modal, Button as BsButton } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import AddDistributor from 'Components/AddDistributor';
import Table from 'Components/Table';
import DistributorService from 'services/DistributorService';
import Button from 'Components/Button';

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

const Distributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [idOfDataToDelete, setIdOfDataToDelete] = useState(null);

  const getDistributors = async () => {
    try {
      const { data } = await DistributorService.getAllDistributors();
      setDistributors(data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getDistributors();
  }, []);

  const submitHandler = async (distributorData, isUpdating) => {
    try {
      if (isUpdating) {
        const { data } = await DistributorService.updateDistributor(
          currentData._id,
          distributorData
        );

        setDistributors((prev) =>
          prev.map((distributor) => {
            if (distributor._id !== currentData._id) {
              return distributor;
            }

            return data;
          })
        );
        setCurrentData(null);
        toast.success('Data updated successfully!');
      } else {
        const { data } = await DistributorService.addDistributor(
          distributorData
        );

        setDistributors((prev) => [...prev, data]);
        setCurrentData(null);
        toast.success('Data saved successfully!');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      await DistributorService.deleteDistributor(idOfDataToDelete);

      setDistributors((prev) =>
        prev.filter((distributor) => distributor._id !== idOfDataToDelete)
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
        <h1>Distributors</h1>
        <Button className="btn-sm mr-2" onClick={() => setCurrentData({})}>
          Add New
        </Button>
      </div>
      <Table
        columns={columns}
        rowData={distributors}
        onEdit={setCurrentData}
        onDelete={setIdOfDataToDelete}
      />

      <Modal
        backdrop="static"
        size="lg"
        show={currentData !== null}
        onHide={() => setCurrentData(null)}
      >
        <Modal.Header closeButton>Add Distributor</Modal.Header>
        <Modal.Body className="p-2">
          <AddDistributor data={currentData} onSave={submitHandler} />
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

export default Distributors;
