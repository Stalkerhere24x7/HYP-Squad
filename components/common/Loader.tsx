import React from 'react';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className={`p-6 ${NEOBRUTALISM_PALETTE.card} ${NEOBRUTALISM_PALETTE.border} border-2 ${NEOBRUTALISM_PALETTE.shadow} flex flex-col items-center justify-center space-y-4`}>
      <div className="flex space-x-2 animate-pulse">
        <div className={`w-4 h-4 ${NEOBRUTALISM_PALETTE.accent1} ${NEOBRUTALISM_PALETTE.border} border-2`}></div>
        <div className={`w-4 h-4 ${NEOBRUTALISM_PALETTE.accent2} ${NEOBRUTALISM_PALETTE.border} border-2`}></div>
        <div className={`w-4 h-4 ${NEOBRUTALISM_PALETTE.accent3} ${NEOBRUTALISM_PALETTE.border} border-2`}></div>
      </div>
      <p className={`font-semibold ${NEOBRUTALISM_PALETTE.text}`}>{message}</p>
      {/* 
        The parent div's animate-pulse class provides the loading animation.
        Individual dot animation delays using only Tailwind CSS typically require
        custom theme extensions or utility classes if more complex sequences are needed.
        For this project, the unified pulse is the intended behavior.
      */}
    </div>
  );
};

export default Loader;