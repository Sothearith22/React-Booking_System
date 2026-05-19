import { Inbox } from 'lucide-react';

export function EmptyState({
  title = 'Nothing to show yet',
  description = 'There is no data available for this view right now.',
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon size={42} className="mb-4 text-gray-200" />
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default EmptyState;
