import { useHistory } from 'react-router-dom';
import Button from 'Components/Button';

import './Home.scss';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <div className="top-section">
        <div className="text-area">
          <h5 className="font-weight-bold">Herbal Products</h5>
          <div className="big-text mt-4 font-weight-bold">
            Where Health Meets Nature
          </div>
          <h4 className="mt-4">
            At BioQor, we nurture your physical and mental state to lead you
            towards inner peace and strength. Come step with us to heal your
            insides.
          </h4>
          <div className="mt-5">
            <Button onClick={() => history.push('/about-us')}>ABOUT US</Button>
          </div>
        </div>
      </div>
      <div className="bg-light bottom-section py-5">
        <div className="card">
          <div className="header-text">
            Take Care Of Your Body. It’s The Only One You’ve Got.
          </div>
          <p className="description">
            Time And health are two precious assets that we don’t recognize and
            appreciate until they have been depleted.{' '}
          </p>
          <div className="mt-3">
            <Button onClick={() => history.push('/about-us')}>ABOUT US</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
