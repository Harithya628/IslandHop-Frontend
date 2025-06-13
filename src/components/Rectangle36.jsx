import { FunctionComponent } from 'react';
import styles from './Rectangle36.module.css';

const Rectangle36 = ({ onClick, children }) => {
  return (
    <div className={styles.rectangleDiv} onClick={onClick}>
      {children}
    </div>
  );
};

export default Rectangle36;
