import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  contentClassName,
  closeOnBackdrop = true,
}) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasHeader = Boolean(title);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[3px] sm:p-6"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Modal'}
        className={cn(
          'relative flex w-full max-w-lg flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_32px_90px_-28px_rgba(15,23,42,0.45)]',
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {hasHeader ? (
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close modal"
            >
              <X size={26} strokeWidth={1.8} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={1.8} />
          </button>
        )}

        <div className={cn('p-6', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
