export function ActionButton({ onClick, color, hoverColor, tooltip }) {
  return (
    <div className="relative group">
      <div
        onClick={onClick}
        className={`w-4 h-4 ${color} rounded-full group-hover:${hoverColor} cursor-pointer flex items-center justify-center`}
      />
      <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block text-xs text-white bg-[#2a2a2a] px-2 py-1 rounded shadow">
        {tooltip}
      </div>
    </div>
  );
}
