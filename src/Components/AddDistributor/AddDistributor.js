import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'Components/Button';
import { isObjectEmpty } from 'utils/helpers';

const AddDistributor = ({ data = {}, onSave = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [firmName, setFirmName] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [panCard, setPanCard] = useState('');
  const [dlNo, setDlNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedProofType, setSelectedProofType] = useState('gstNo');

  useEffect(() => {
    if (data && !isObjectEmpty(data)) {
      setIsEditing(true);

      const {
        firmName,
        contactPersonName,
        mobileNo,
        email,
        gstNo,
        panCard,
        dlNo,
        address,
        city,
        state,
      } = data;

      setFirmName(firmName);
      setContactPersonName(contactPersonName);
      setMobileNo(mobileNo);
      setEmail(email);
      setGstNo(gstNo ?? '');
      setPanCard(panCard ?? '');
      setDlNo(dlNo ?? '');
      setAddress(address);
      setCity(city);
      setState(state);
    }
  }, [data]);

  const proofTypeChangeHandler = ({ target: { value } }) => {
    setGstNo('');
    setPanCard('');
    setDlNo('');
    setSelectedProofType(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const reqBody = {
      firmName,
      contactPersonName,
      mobileNo,
      email,
      gstNo,
      panCard,
      dlNo,
      address,
      city,
      state,
    };

    onSave(reqBody, isEditing);
  };

  const createProofType = (type) => {
    switch (type) {
      case 'gstNo':
        return (
          <Form.Group className="mb-3">
            <Form.Label>GST No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter GST No."
              value={gstNo}
              onChange={({ target: { value } }) => setGstNo(value)}
            />
          </Form.Group>
        );

      case 'panCard':
        return (
          <Form.Group className="mb-3">
            <Form.Label>Pan Card</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Pan Card No."
              value={panCard}
              onChange={({ target: { value } }) => setPanCard(value)}
            />
          </Form.Group>
        );

      case 'dlNo':
        return (
          <Form.Group className="mb-3">
            <Form.Label>DL No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter DL No."
              value={dlNo}
              onChange={({ target: { value } }) => setDlNo(value)}
            />
          </Form.Group>
        );

      default:
        return null;
    }
  };

  return (
    <div className="my-3">
      <Form>
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Firm Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Firm Name"
                value={firmName}
                onChange={({ target: { value } }) => setFirmName(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Person Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact Person Name"
                value={contactPersonName}
                onChange={({ target: { value } }) =>
                  setContactPersonName(value)
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group>
              <Form.Label>Select Proof</Form.Label>
              <div>
                <Form.Check
                  label="GST No."
                  inline
                  name="proof"
                  type="radio"
                  id="gstNo"
                  value="gstNo"
                  checked={selectedProofType === 'gstNo'}
                  onChange={proofTypeChangeHandler}
                />
                <Form.Check
                  label="Pan Card"
                  inline
                  name="proof"
                  type="radio"
                  id="panCard"
                  value="panCard"
                  checked={selectedProofType === 'panCard'}
                  onChange={proofTypeChangeHandler}
                />
                <Form.Check
                  label="DL No"
                  inline
                  name="proof"
                  type="radio"
                  id="dlNo"
                  value="dlNo"
                  checked={selectedProofType === 'dlNo'}
                  onChange={proofTypeChangeHandler}
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            {createProofType(selectedProofType)}
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

export default AddDistributor;
