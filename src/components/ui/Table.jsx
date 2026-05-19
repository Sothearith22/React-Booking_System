import { cn } from '../../utils/cn';

export default function Table({ className, children }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full text-sm">{children}</table>
    </div>
  );
}
