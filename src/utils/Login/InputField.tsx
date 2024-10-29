import React from 'react';
import styles from './styles/InputField.module.css';

interface InputFieldProps {
  type: string;
  name: string;  // Cambiar 'id' a 'name'
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, value, onChange, placeholder, label }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={styles.formControl}
        id={name}  // Cambia 'id' a 'name' en el input también
        name={name}  // Asegúrate de que el input tenga el atributo 'name'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
