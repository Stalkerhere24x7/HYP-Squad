
import React from 'react';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        ${NEOBRUTALISM_PALETTE.card} 
        ${NEOBRUTALISM_PALETTE.border} border-2 
        ${NEOBRUTALISM_PALETTE.shadow}
        hover:shadow-[6px_6px_0_#000] /* Slightly increased shadow on hover */
        transition-all duration-200 ease-in-out
        overflow-hidden /* To ensure child content respects borders */
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
