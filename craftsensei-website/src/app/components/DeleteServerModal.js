'use client';

export default function DeleteServerModal({ server, onConfirm, onCancel }) {
  if (!server) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="rounded-2xl border border-red-500/40 bg-black/80 p-8 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-white">Delete Server</h2>
        <p className="mt-2 text-zinc-300 text-sm">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">{server.name}</span>?
          This action is irreversible and will remove all associated data.
        </p>
        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="rounded-xl border border-zinc-500 px-5 py-2.5 text-sm text-zinc-200 hover:bg-white/5 hover:cursor-pointer transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(server.id)}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-400 hover:cursor-pointer active:scale-95 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}