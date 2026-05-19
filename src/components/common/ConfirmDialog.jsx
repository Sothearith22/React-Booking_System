import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm action',
  message = 'Please confirm you want to continue.',
  itemName,
  confirmLabel = 'Confirm',
  confirmVariant = 'danger',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-slate-600">{message}</p>
          {itemName ? (
            <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
              {itemName}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
