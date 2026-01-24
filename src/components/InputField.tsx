"use client";

interface Props {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
}

export default function InputForm({
    value,
    setValue,
    placeholder
}: Props) {
    return (
        <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base 
                       placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       hover:border-gray-400
                       transition-colors duration-200"
        />
    );
}
