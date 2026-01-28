"use client";

interface Props {
    onClick: () => void;
}

export default function CalculateButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="w-full py-3.5 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md
                    bg-blue-600 text-white cursor-pointer hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg"
            onClick={onClick}
        >
            計算する
        </button>
    );
}
