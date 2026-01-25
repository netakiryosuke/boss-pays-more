"use client";

interface Props {
    onClick: () => void;
}

export default function IncreaseAttributeButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="w-full py-2 bg-transparent border-black text-black rounded font-medium
                    hover:bg-blue-700 transition cursor-pointer"
            onClick={onClick}
        >
            参加者を追加
        </button>
    );
}
