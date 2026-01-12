interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({ title, description, confirmLabel, onConfirm, onClose }: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[320px] bg-white rounded-2xl p-5">
        <div className="text-lg font-semibold">{title}</div>
        <p className="text-sm text-slate-500 mt-2">{description}</p>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-slate-200 rounded-xl py-2 text-sm font-semibold"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-brand-500 text-white rounded-xl py-2 text-sm font-semibold"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
