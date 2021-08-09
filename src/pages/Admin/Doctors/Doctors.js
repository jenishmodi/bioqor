import { useEffect, useRef, useState } from 'react';
import { Modal, Button as BsButton } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import AddDoctor from 'Components/AddDoctor';
import Table from 'Components/Table';
import Button from 'Components/Button';
import DoctorService from 'services/DoctorService';
import { generateCsvFileUrl } from 'utils/helpers';

const columns = [
  {
    Header: 'Doctor Name',
    accessor: 'doctorName',
  },
  {
    Header: 'Clinic Name',
    accessor: 'clinicName',
  },
  {
    Header: 'Mobile No',
    accessor: 'mobileNo',
  },
];

const Doctors = () => {
  const fileRef = useRef();

  const [doctors, setDoctors] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [idOfDataToDelete, setIdOfDataToDelete] = useState(null);

  const getDoctors = async () => {
    try {
      const { data } = await DoctorService.getAllDoctors();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const submitHandler = async (productData, isUpdating) => {
    try {
      if (isUpdating) {
        const { data } = await DoctorService.updateDoctor(
          currentData._id,
          productData
        );

        setDoctors((prev) =>
          prev.map((doctor) => {
            if (doctor._id !== currentData._id) {
              return doctor;
            }

            return data;
          })
        );
        setCurrentData(null);
        toast.success('Data updated successfully!');
      } else {
        const { data } = await DoctorService.addDoctor(productData);

        setDoctors((prev) => [...prev, data]);
        setCurrentData(null);
        toast.success('Data saved successfully!');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      await DoctorService.deleteDoctor(idOfDataToDelete);

      setDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== idOfDataToDelete)
      );
      setIdOfDataToDelete(null);
      toast.success('Data removed successfully!');
    } catch (error) {
      toast.error(error);
    }
  };

  const csvExportHandler = () => {
    fileRef.current.href = generateCsvFileUrl(doctors, ['_id', 'createdAt']);
    fileRef.current.download = 'doctors-data.csv';
    fileRef.current.click();
  };

  return (
    <div className="m-3">
      <div className="d-flex justify-content-center justify-content-md-between align-items-center">
        <h1>Doctors</h1>
        <div>
          <Button className="btn-sm mr-2" onClick={csvExportHandler}>
            Export
          </Button>
          <Button className="btn-sm mr-2" onClick={() => setCurrentData({})}>
            Add New
          </Button>
          {/* eslint-disable-next-line */}
          <a ref={fileRef} style={{ display: 'none' }} />
        </div>
      </div>
      <Table
        columns={columns}
        rowData={doctors}
        onEdit={setCurrentData}
        onDelete={setIdOfDataToDelete}
      />

      <Modal
        backdrop="static"
        size="lg"
        show={currentData !== null}
        onHide={() => setCurrentData(null)}
      >
        <Modal.Header closeButton>Add Doctor</Modal.Header>
        <Modal.Body className="p-2">
          <AddDoctor data={currentData} onSave={submitHandler} />
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

export default Doctors;
