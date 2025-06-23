
import React from 'react';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({ label, name, options, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-bold mb-1 ${NEOBRUTALISM_PALETTE.text}">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          className={`
            appearance-none w-full px-3 py-2.5 
            ${NEOBRUTALISM_PALETTE.card} 
            ${NEOBRUTALISM_PALETTE.border} border-2 
            ${NEOBRUTALISM_PALETTE.text}
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
            transition-all duration-150 ease-in-out
            ${NEOBRUTALISM_PALETTE.shadow} 
            pr-8 
            ${className}
          `}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black border-l-2 border-black">
          <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
