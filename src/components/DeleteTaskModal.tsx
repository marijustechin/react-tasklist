import { CgDanger } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";

interface IModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  children: React.ReactNode;
}

export const DeleteTaskModal = ({
  open,
  onClose,
  id,
  children,
}: IModalProps) => {
  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-slate-800/50" : "invisible"
      }`}
      onClick={onClose}
    >
      {/* langas */}
      <div
        // reikia sustabdyti is tevo
        // paveldeta onclik funkcija
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-100 rounded-xl shadow p-6 transition-all text-lg w-[400px] ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-200 hover:text-slate-600"
        >
          <IoMdClose />
        </button>
        {open ? (
          <div className="w-60 mx-auto text-rose-500">
            <CgDanger size={36} />
          </div>
        ) : (
          <div className="text-emerald-500 text-center">
            <IoInformationCircleOutline size={36} />
          </div>
        )}

        {children}
        {open && (
          <div className="flex gap-3 items-center justify-center mt-3">
            <button onClick={onClose} className="btn-red">
              Taip
            </button>
            <button onClick={onClose} className="btn-green">
              Atsisakyti
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
