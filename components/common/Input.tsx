
import React from 'react';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, className = '', type="text", ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-bold mb-1 ${NEOBRUTALISM_PALETTE.text}">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`
          w-full px-3 py-2 
          ${NEOBRUTALISM_PALETTE.card} 
          ${NEOBRUTALISM_PALETTE.border} border-2 
          ${NEOBRUTALISM_PALETTE.text}
          focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
          transition-all duration-150 ease-in-out
          ${NEOBRUTALISM_PALETTE.shadow} 
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
