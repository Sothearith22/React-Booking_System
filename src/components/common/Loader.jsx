import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = "Loading system..." }) => (
  <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">{message}</p>
    </div>
  </div>
);

export default Loader;
