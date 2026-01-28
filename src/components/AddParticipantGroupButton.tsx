"use client";

interface Props {
    onClick: () => void;
}

export default function AddParticipantGroupButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="w-full py-3 bg-white border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-medium
                    hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 
                    transition-all duration-200 cursor-pointer
                    flex items-center justify-center gap-2"
            onClick={onClick}
        >
            <span className="text-xl">+</span>
            <span>参加者を追加</span>
        </button>
    );
}
