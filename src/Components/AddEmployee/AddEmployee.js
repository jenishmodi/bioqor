import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'Components/Button';
import { isObjectEmpty } from 'utils/helpers';

const AddEmployee = ({ data = {}, onSave = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [areaAssigned, setAreaAssigned] = useState('');

  useEffect(() => {
    if (data && !isObjectEmpty(data)) {
      setIsEditing(true);

      const { name, password, mobileNo, email, address, areaAssigned } = data;

      setName(name);
      setPassword(password);
      setMobileNo(mobileNo);
      setEmail(email);
      setAddress(address);
      setAreaAssigned(areaAssigned);
    }
  }, [data]);

  const submitHandler = (event) => {
    event.preventDefault();

    const reqBody = {
      name,
      password,
      mobileNo,
      email,
      address,
      areaAssigned,
    };

    onSave(reqBody, isEditing);
  };

  return (
    <div className="my-3">
      <Form>
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile No."
                value={mobileNo}
                onChange={({ target: { value } }) => setMobileNo(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={({ target: { value } }) => setAddress(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Area Assigned</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Assigned Area"
                value={areaAssigned}
                onChange={({ target: { value } }) => setAreaAssigned(value)}
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

export default AddEmployee;
