import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import { AppContext, setIsAdminLoggedIn } from 'context/AppContext';
import Button from 'Components/Button';
import AuthService from 'services/AuthService';

import './Login.scss';

const AdminLogin = () => {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await AuthService.adminLogin(email, password);
      dispatch(setIsAdminLoggedIn(true));
      history.push('/admin/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </Form.Group>

            <Button className="btn-sm" onClick={submitHandler}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminLogin;
