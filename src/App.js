import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppContext } from 'context/AppContext';
import Home from 'pages/Home';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import AboutUs from 'pages/AboutUs';
import ContactUs from 'pages/ContactUs';
import Product from 'pages/Product';

function App() {
  useEffect(() => {
    // TODO: set products
  }, []);

  return (
    <div className="">
      <AppContext.Consumer>
        {() => (
          <>
            <Header />
            <Switch>
              <Route path="/product" component={Product} />
              <Route path="/about-us" component={AboutUs} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/" component={Home} />
            </Switch>
            <Footer />
          </>
        )}
      </AppContext.Consumer>
    </div>
  );
}

export default App;
