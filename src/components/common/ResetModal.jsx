import React from "react";
import { useAppContext } from "../../context/AppContext";

export default function ResetModal() {
  const { state, setState, resetAll } = useAppContext();

  if (!state.resetModalOpen) return null;

  const cancel = () => setState((p) => ({ ...p, resetModalOpen: false }));
  const confirm = () => { resetAll(); };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="reset-title">
      <div className="modal-box">
        <h2 className="modal-title" id="reset-title">⚠ Reset All Progress?</h2>
        <p className="modal-desc">
          This will clear all quest progress, discovered files, achievements, and XP.
          Your theme preference will be kept. This cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={cancel} autoFocus>Cancel</button>
          <button className="btn-danger" onClick={confirm}>Reset Everything</button>
        </div>
      </div>
    </div>
  );
}
