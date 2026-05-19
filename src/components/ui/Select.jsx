import { cn } from '../../utils/cn';

export default function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
