import Modal from './Modal';
import Button from './Button';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete item?',
  message = 'This action cannot be undone.',
  itemName,
}) => (
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
        <Button type="button" variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  </Modal>
);

export default DeleteConfirmationModal;
