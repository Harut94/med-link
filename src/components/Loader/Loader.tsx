import { type FC } from 'react';
import './index.scss';

const Loader: FC = () => (
  <div className="loader">
    <div className="icon">
      <img src="/images/loader.svg" alt="" />
    </div>
  </div>
);

export default Loader;
