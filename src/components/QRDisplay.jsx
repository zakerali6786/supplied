import React from 'react';

const QRDisplay = ({ value, label, size = 160 }) => {
  return (
    <div className="inline-block text-center">
      <div
        style={{ width: size, height: size }}
        className="bg-white/5 rounded-md flex items-center justify-center mb-2 border border-slate-700"
      >
        <div className="text-xs text-slate-300 px-3">QR</div>
      </div>
      {label && <div className="text-xs text-slate-400 font-mono">{label}</div>}
      {value && (
        <div className="text-xs text-slate-500 mt-1 break-all max-w-[200px]">{value}</div>
      )}
    </div>
  );
};

export default QRDisplay;
