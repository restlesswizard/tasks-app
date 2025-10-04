import SVG_Cross from "../svg/cross";

export default function Btn_Close({ onClick }) {
  return (
    <button
        className="p-1.5 flex items-center justify-center bg-[#292929] mt-[calc(-1*var(--task-card-padding))] mb-[calc(-1*var(--task-card-padding))] rounded-r-lg"
        onClick={onClick}
        aria-label="Remove task"
    >
      <SVG_Cross color={'text-red-500'}/>
    </button>
  );
}