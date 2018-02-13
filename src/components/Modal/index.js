import React, { PureComponent } from 'react';
import styles from '../../styles.css';

class Modal extends PureComponent {

  render = () => {
    const { children } = this.props;

    return (
      <div className={styles['modal-wrapper']}>
        <div className={styles['modal']}>
          <div className={styles['modal__close-icon']}>×</div>
          <div className={styles['modal__container']}>{children}</div>
        </div>
      </div>
    )
  }
}

export default Modal;