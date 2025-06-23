
import React from 'react';
import { NEOBRUTALISM_PALETTE } from '../../constants';

interface MainLayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ header, sidebar, children }) => {
  return (
    <div className={`min-h-screen flex flex-col ${NEOBRUTALISM_PALETTE.background} ${NEOBRUTALISM_PALETTE.text}`}>
      {header}
      <div className="flex flex-1 overflow-hidden">
        {sidebar}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
