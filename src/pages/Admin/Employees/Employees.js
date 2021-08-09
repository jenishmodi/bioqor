import { useEffect, useRef, useState } from 'react';
import { Modal, Button as BsButton } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import AddEmployee from 'Components/AddEmployee';
import Table from 'Components/Table';
import Button from 'Components/Button';
import EmployeeService from 'services/EmployeeService';
import { generateCsvFileUrl } from 'utils/helpers';

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

const Employees = () => {
  const fileRef = useRef();

  const [employees, setEmployees] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [idOfDataToDelete, setIdOfDataToDelete] = useState(null);

  const getEmployees = async () => {
    try {
      const { data } = await EmployeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const submitHandler = async (employeeData, isUpdating) => {
    try {
      if (isUpdating) {
        const { data } = await EmployeeService.updateEmployee(
          currentData._id,
          employeeData
        );

        setEmployees((prev) =>
          prev.map((employee) => {
            if (employee._id !== currentData._id) {
              return employee;
            }

            return data;
          })
        );
        setCurrentData(null);
        toast.success('Data updated successfully!');
      } else {
        const { data } = await EmployeeService.addEmployee(employeeData);

        setEmployees((prev) => [...prev, data]);
        setCurrentData(null);
        toast.success('Data saved successfully!');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      await EmployeeService.deleteEmployee(idOfDataToDelete);

      setEmployees((prev) =>
        prev.filter((employee) => employee._id !== idOfDataToDelete)
      );
      setIdOfDataToDelete(null);
      toast.success('Data removed successfully!');
    } catch (error) {
      toast.error(error);
    }
  };

  const csvExportHandler = () => {
    fileRef.current.href = generateCsvFileUrl(employees, [
      '_id',
      'password',
      'createdAt',
    ]);
    fileRef.current.download = 'employees-data.csv';
    fileRef.current.click();
  };

  return (
    <div className="m-3">
      <div className="d-flex justify-content-center justify-content-md-between align-items-center">
        <h1>Employees</h1>
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
        rowData={employees}
        onEdit={setCurrentData}
        onDelete={setIdOfDataToDelete}
      />

      <Modal
        backdrop="static"
        size="lg"
        show={currentData !== null}
        onHide={() => setCurrentData(null)}
      >
        <Modal.Header closeButton>Add Employee</Modal.Header>
        <Modal.Body className="p-2">
          <AddEmployee data={currentData} onSave={submitHandler} />
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

export default Employees;
