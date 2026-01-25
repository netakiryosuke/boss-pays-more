"use client";

interface Props {
    onClick: () => void;
}

export default function AddAttributeButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="w-full py-2 bg-transparent border border-gray-300 text-black rounded font-medium
                    hover:bg-gray-300 transition cursor-pointer"
            onClick={onClick}
        >
            参加者を追加
        </button>
    );
}
