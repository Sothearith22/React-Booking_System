import ConfirmDialog from '../common/ConfirmDialog';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete item?',
  message = 'This action cannot be undone.',
  itemName,
}) => (
  <ConfirmDialog
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={onConfirm}
    title={title}
    message={message}
    itemName={itemName}
    confirmLabel="Delete"
    confirmVariant="danger"
  />
);

export default DeleteConfirmationModal;
