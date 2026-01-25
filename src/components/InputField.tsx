"use client";

import { useId } from "react";

interface Props {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
}

export default function InputField({
    label,
    value,
    onChange,
    placeholder,
    type
}: Props) {
    const id = useId();

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium">
                {label}
            </label>
            <input
                id={id}
                type={type ?? "text"}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-base 
                       placeholder:text-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       hover:border-gray-400
                       transition-colors duration-200"
            />
        </div>
    );
}
