import { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppContext, setProducts } from 'context/AppContext';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Home from 'pages/Home';
import AboutUs from 'pages/AboutUs';
import ContactUs from 'pages/ContactUs';
import Product from 'pages/Product';
import AdminLogin from 'pages/Admin/Login';
import Products from 'pages/Admin/Products';
import Distributors from 'pages/Admin/Distributors';
import Doctors from 'pages/Admin/Doctors';
import Employees from 'pages/Admin/Employees';
import Sales from 'pages/Admin/Sales';
import ProductService from 'services/ProductService';

const getProducts = async (callback) => {
  try {
    const { data } = await ProductService.getAllProducts();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const { isAdminLoggedIn, dispatch } = useContext(AppContext);

  useEffect(() => {
    getProducts((products) => {
      dispatch(setProducts(products));
    });
  }, [dispatch]);

  return (
    <div className="">
      <Header />
      <Switch>
        {isAdminLoggedIn && (
          <>
            <Route path="/admin/products" component={Products} />
            <Route path="/admin/distributors" component={Distributors} />
            <Route path="/admin/doctors" component={Doctors} />
            <Route path="/admin/employees" component={Employees} />
            <Route path="/admin/sales" component={Sales} />
          </>
        )}
        <Route path="/products/:productName" component={Product} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
