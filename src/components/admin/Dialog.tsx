import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/** Popup modals for the admin, replacing window.alert / confirm / prompt. */

type Field = { name: string; label: string; placeholder?: string; value?: string; type?: "text" | "url"; hint?: string };
type Options = {
  title: string;
  message?: ReactNode;
  fields?: Field[];
  confirmLabel?: string;
  cancelLabel?: string | null; // null = no cancel button (alert)
  danger?: boolean;
};
type Result = Record<string, string> | null;
type Open = Options & { resolve: (r: Result) => void };

const Ctx = createContext<((o: Options) => Promise<Result>) | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<Open | null>(null);
  const show = useCallback((o: Options) => new Promise<Result>((resolve) => setOpen({ ...o, resolve })), []);
  return <Ctx.Provider value={show}>
    {children}
    {open && <Modal key={open.title} {...open} onClose={(r) => { open.resolve(r); setOpen(null); }} />}
  </Ctx.Provider>;
}

export function useDialog() {
  const show = useContext(Ctx);
  if (!show) throw new Error("useDialog must be used inside <DialogProvider>");
  return {
    /** Resolves true when confirmed. */
    confirm: async (title: string, message?: ReactNode, o: { confirmLabel?: string; danger?: boolean } = {}) =>
      (await show({ title, message, confirmLabel: o.confirmLabel ?? "Confirm", ...(o.danger ? { danger: true } : {}) })) !== null,
    alert: async (title: string, message?: ReactNode) => { await show({ title, message, confirmLabel: "OK", cancelLabel: null }); },
    /** Resolves the field values, or null when cancelled. */
    form: (o: Options & { fields: Field[] }) => show(o),
  };
}

function Modal({ title, message, fields = [], confirmLabel = "OK", cancelLabel = "Cancel", danger, onClose }: Options & { onClose: (r: Result) => void }) {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.name, f.value ?? ""])));
  const box = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<Element | null>(null);

  useEffect(() => {
    prevFocus.current = document.activeElement;
    const first = box.current?.querySelector<HTMLElement>("input, button.adm-modal-ok");
    first?.focus();
    if (first instanceof HTMLInputElement) first.select();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(null); }
      if (e.key === "Tab" && box.current) { // keep focus inside the modal
        const els = [...box.current.querySelectorAll<HTMLElement>("input, button")];
        const i = els.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); els[els.length - 1]?.focus(); }
        else if (!e.shiftKey && i === els.length - 1) { e.preventDefault(); els[0]?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); (prevFocus.current as HTMLElement | null)?.focus?.(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e: React.FormEvent) => { e.preventDefault(); onClose(values); };

  return <div className="adm-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget && cancelLabel !== null) onClose(null); }}>
    <div ref={box} className="adm-modal" role="dialog" aria-modal="true" aria-labelledby="adm-modal-title">
      <form onSubmit={submit}>
        <h2 id="adm-modal-title">{title}</h2>
        {message && <div className="adm-modal-msg">{message}</div>}
        {fields.map((f) => <label key={f.name} className="adm-field">{f.label}
          <input type={f.type ?? "text"} value={values[f.name] ?? ""} placeholder={f.placeholder}
            onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} />
          {f.hint && <small className="adm-hint">{f.hint}</small>}
        </label>)}
        <div className="adm-modal-actions">
          {cancelLabel !== null && <button type="button" className="adm-btn" onClick={() => onClose(null)}>{cancelLabel}</button>}
          <button type="submit" className={`adm-btn adm-modal-ok ${danger ? "adm-btn--danger" : "adm-btn--primary"}`}>{confirmLabel}</button>
        </div>
      </form>
    </div>
  </div>;
}
