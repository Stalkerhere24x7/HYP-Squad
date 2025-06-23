
import React from 'react';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  let colors = '';
  switch (variant) {
    case 'primary':
      colors = `${NEOBRUTALISM_PALETTE.accent1} ${NEOBRUTALISM_PALETTE.text} ${NEOBRUTALISM_PALETTE.accent1Hover}`;
      break;
    case 'secondary':
      colors = `${NEOBRUTALISM_PALETTE.accent3} ${NEOBRUTALISM_PALETTE.text} ${NEOBRUTALISM_PALETTE.accent3Hover}`;
      break;
    case 'danger':
      colors = `${NEOBRUTALISM_PALETTE.error} ${NEOBRUTALISM_PALETTE.errorText} hover:bg-red-600`;
      break;
    default:
      colors = `${NEOBRUTALISM_PALETTE.accent1} ${NEOBRUTALISM_PALETTE.text} ${NEOBRUTALISM_PALETTE.accent1Hover}`;
  }

  return (
    <button
      className={`
        px-6 py-3 font-bold 
        ${NEOBRUTALISM_PALETTE.border} border-2 
        ${NEOBRUTALISM_PALETTE.shadow} 
        ${NEOBRUTALISM_PALETTE.shadowHover}
        active:translate-x-0.5 active:translate-y-0.5 ${NEOBRUTALISM_PALETTE.shadowActive}
        transition-all duration-150 ease-in-out 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 disabled:translate-x-0
        ${colors}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
