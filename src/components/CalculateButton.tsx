interface Props {
    onClick: () => void;
}

export default function CalculateButton({ onClick }: Props) {
    return (
        <button
            type="button"
            className="w-full py-2 bg-blue-600 text-white rounded font-medium
                    hover:bg-blue-700 transition cursor-pointer
                    disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={onClick}
        >
            計算
        </button>
    );
}
