'use client';
import {ActionButton} from "./ActionButton"

export function HeaderCard({ title, onClear, onAdd, onRemove }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        <ActionButton
          onClick={onClear}
          color="bg-[#FF5F5A]"
          hoverColor="bg-[#FF514B]"
          tooltip="Clear"
        />
        <ActionButton
          onClick={onAdd}
          color="bg-[#FFBE2E]"
          hoverColor="bg-[#FEB615]"
          tooltip="Add Row/Col"
        />
        <ActionButton
          onClick={onRemove}
          color="bg-[#2ACA44]"
          hoverColor="bg-[#15CD33]"
          tooltip="Min Row/Col"
        />
      </div>
      <span className="text-white font-medium">{title}</span>
    </div>
  );
}
