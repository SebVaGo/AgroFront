import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const nav = useNavigate();
    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-center space-x-2 p-4 border-t">
          <button onClick={() => {
            onClose();
            nav('/create-product');
            }} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Seguir vendiendo
          </button>
          <button onClick={() => {
            onClose();
            nav('/homepage');
            }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Regresar al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
