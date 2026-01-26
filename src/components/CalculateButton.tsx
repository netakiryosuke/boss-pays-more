"use client";

interface Props {
    onClick: () => void;
}

export default function CalculateButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-lg
                    hover:bg-blue-700 active:bg-blue-800
                    transition-all duration-200
                    shadow-md hover:shadow-lg"
            onClick={onClick}
        >
            計算する
        </button>
    );
}
