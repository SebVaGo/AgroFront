import React from 'react';
import styles from './styles/Button.module.css';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
  return (
    <button type={type} className={styles.btnBlock} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
