
import React from 'react';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={`${NEOBRUTALISM_PALETTE.accent2} p-4 ${NEOBRUTALISM_PALETTE.border} border-b-2 flex items-center justify-between`}>
      <h1 className="text-2xl md:text-3xl font-bold ${NEOBRUTALISM_PALETTE.text} tracking-tight">
        {title}
      </h1>
      <div className="w-8 h-8 bg-yellow-400 border-2 border-black rounded-full animate-pulse"></div>
    </header>
  );
};

export default Header;
