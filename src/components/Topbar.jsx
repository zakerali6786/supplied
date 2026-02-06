import React from 'react';

const Topbar = ({ title }) => {
  return (
    <header className="w-full py-4 px-6 border-b border-slate-800/50 bg-transparent sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="text-slate-400 text-sm">Consumer View</div>
      </div>
    </header>
  );
};

export default Topbar;
