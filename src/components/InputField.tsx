"use client";

import { useId } from "react";

interface Props {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type?: string;
    error?: string | null;
    min?: number;
    step?: number | "any";
}

export default function InputField({
    label,
    value,
    onChange,
    placeholder,
    type,
    error,
    min,
    step
}: Props) {
    const id = useId();
    const errorId = `${id}-error`;

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                id={id}
                type={type ?? "text"}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                min={type === "number" ? min : undefined}
                step={type === "number" ? step : undefined}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={
                    "w-full px-4 py-2.5 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent hover:border-gray-400 transition-colors duration-200 " +
                    (error
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500")
                }
            />

            {error ? (
                <p id={errorId} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
