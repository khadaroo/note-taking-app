import { createContext, useState, useCallback, useContext } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed right-10 bottom-10 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex w-98 max-w-md items-center gap-2 rounded-lg bg-white p-2 drop-shadow-xl"
          >
            {toast.type === "success" ? (
              <img
                className="size-6"
                src="src/assets/images/icon-checkmark.svg"
              />
            ) : (
              <img className="size-6" src="src/assets/images/icon-cancel.svg" />
            )}
            <p className="flex-1 text-sm text-neutral-950">{toast.message}</p>
            <button>
              <img
                className="size-6"
                src="src/assets/images/icon-cross.svg"
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
