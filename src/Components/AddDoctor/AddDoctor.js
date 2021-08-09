import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'Components/Button';
import { isObjectEmpty } from 'utils/helpers';

const AddDoctor = ({ data = {}, onSave = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [clinicName, setClinicName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    if (data && !isObjectEmpty(data)) {
      setIsEditing(true);

      const {
        clinicName,
        doctorName,
        mobileNo,
        email,
        registrationNumber,
        specialization,
        address,
        city,
        state,
      } = data;

      setClinicName(clinicName);
      setDoctorName(doctorName);
      setMobileNo(mobileNo);
      setEmail(email);
      setRegistrationNumber(registrationNumber);
      setSpecialization(specialization);
      setAddress(address);
      setCity(city);
      setState(state);
    }
  }, [data]);

  const submitHandler = (event) => {
    event.preventDefault();

    const reqBody = {
      clinicName,
      doctorName,
      mobileNo,
      email,
      specialization,
      city,
      state,
      registrationNumber,
      Address: address,
    };

    onSave(reqBody, isEditing);
  };

  return (
    <div className="my-3">
      <Form>
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Clinic Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Clinic Name"
                value={clinicName}
                onChange={({ target: { value } }) => setClinicName(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Doctor Name"
                value={doctorName}
                onChange={({ target: { value } }) => setDoctorName(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Registration No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Registration No."
                value={registrationNumber}
                onChange={({ target: { value } }) =>
                  setRegistrationNumber(value)
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Specialization"
                value={specialization}
                onChange={({ target: { value } }) => setSpecialization(value)}
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
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={({ target: { value } }) => setCity(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={({ target: { value } }) => setState(value)}
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

export default AddDoctor;
