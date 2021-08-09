import { useContext, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { AppContext } from 'context/AppContext';
import Button from 'Components/Button';
import DoctorService from 'services/DoctorService';
import DistributorService from 'services/DistributorService';
import { isObjectEmpty } from 'utils/helpers';

const AddSales = ({ data = {}, onSave = () => {} }) => {
  const { products } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);

  const [isDoctor, setIsDoctor] = useState('false');
  const [name, setName] = useState('');
  const [doctorNames, setDoctorNames] = useState([]);
  const [distributorsNames, setDistributorsNames] = useState([]);
  const [isDoctorConverted, setIsDoctorConverted] = useState('false');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState('');
  const [remark, setRemark] = useState('');
  const [registeredBy, setRegisteredBy] = useState('');

  useEffect(() => {
    if (data && !isObjectEmpty(data)) {
      setIsEditing(true);

      const {
        amount,
        product,
        quantity,
        remark,
        doctor,
        distributor,
        doctorConverted,
        registeredBy,
      } = data;

      setIsDoctor(doctor ? 'true' : 'false');
      setName(doctor || distributor);
      setIsDoctorConverted(`${doctorConverted}`);
      setAmount(amount);
      setQuantity(quantity);
      setProduct(product);
      setRemark(remark);
      setRegisteredBy(registeredBy);
    }
  }, [data]);

  const submitHandler = (event) => {
    event.preventDefault();

    const reqBody = {
      amount,
      product,
      quantity,
      remark,
      registeredBy,
      doctor: isDoctor && name,
      distributor: !isDoctor && name,
      doctorConverted: isDoctorConverted,
    };

    onSave(reqBody, isEditing);
  };

  const getNameOptions = async (isDoctor) => {
    try {
      if (isDoctor) {
        const { data } = await DoctorService.getAllDoctors();
        setDoctorNames(
          data.map(({ doctorName, _id }) => ({ name: doctorName, _id }))
        );
      } else {
        const { data } = await DistributorService.getAllDistributors();
        setDistributorsNames(
          data.map(({ contactPersonName, _id }) => ({
            name: contactPersonName,
            _id,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const typeChangeHandler = ({ target: { value } }) => {
    setIsDoctor(value);
    value === 'true' && doctorNames.length === 0 && getNameOptions(true);
    value === 'false' &&
      distributorsNames.length === 0 &&
      getNameOptions(false);
  };

  return (
    <div className="my-3">
      <Form>
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Select Type</Form.Label>
              <div>
                <Form.Check
                  label="Doctor"
                  inline
                  name="type"
                  type="radio"
                  id="doctor"
                  value={true}
                  checked={isDoctor === 'true'}
                  onChange={typeChangeHandler}
                />
                <Form.Check
                  label="Distributor"
                  inline
                  name="type"
                  type="radio"
                  id="distributor"
                  value={false}
                  checked={isDoctor === 'false'}
                  onChange={typeChangeHandler}
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="select"
                value={name}
                onChange={({ target: { value } }) => setName(value)}
              >
                {isDoctor === 'true'
                  ? doctorNames.map(({ _id, name }) => (
                      <option key={_id} value={name}>
                        {name}
                      </option>
                    ))
                  : distributorsNames.map(({ _id, name }) => (
                      <option key={_id} value={name}>
                        {name}
                      </option>
                    ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Doctor Converted</Form.Label>
              <div>
                <Form.Check
                  label="Yes"
                  inline
                  name="doctorConverted"
                  type="radio"
                  id="doctorConverted1"
                  value={true}
                  checked={isDoctorConverted === 'true'}
                  onChange={({ target: { value } }) =>
                    setIsDoctorConverted(value)
                  }
                />
                <Form.Check
                  label="No"
                  inline
                  name="doctorConverted"
                  type="radio"
                  id="doctorConverted2"
                  value={false}
                  checked={isDoctorConverted === 'false'}
                  onChange={({ target: { value } }) =>
                    setIsDoctorConverted(value)
                  }
                />
              </div>
            </Form.Group>
          </Col>
          {isDoctorConverted === 'true' && (
            <Col xs={12} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={({ target: { value } }) => setAmount(value)}
                />
              </Form.Group>
            </Col>
          )}
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control
                as="select"
                value={product}
                onChange={({ target: { value } }) => setProduct(value)}
              >
                {products.map(({ _id, name }) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={({ target: { value } }) => setQuantity(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Remark"
                value={remark}
                onChange={({ target: { value } }) => setRemark(value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Registered By</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Registered By"
                value={registeredBy}
                onChange={({ target: { value } }) => setRegisteredBy(value)}
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

export default AddSales;
