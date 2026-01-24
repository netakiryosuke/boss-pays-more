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
            className="w-auto border rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
        </input>
    );
}
