"use client";

interface Props {
    onClick: () => void;
    disabled?: boolean;
    onDisabledClick?: () => void;
}

export default function CalculateButton({ onClick, disabled, onDisabledClick }: Props) {
    return (
        <button
            type="button"
            aria-disabled={disabled}
            className={
                "w-full py-3.5 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md " +
                (disabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                    : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg")
            }
            onClick={() => {
                if (disabled) {
                    onDisabledClick?.();
                    return;
                }
                onClick();
            }}
        >
            計算する
        </button>
    );
}
