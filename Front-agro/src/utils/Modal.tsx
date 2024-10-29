import React from 'react';
import styles from './styles/Modal.module.css';

interface ModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, message, onClose }) => {
  if (!show) return null;  // No mostrar el modal si 'show' es falso

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
