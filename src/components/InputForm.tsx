'use client';

import { useState } from "react";

export default function InputForm() {
    const [position, setPosition] = useState<string>("");

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={position}
                onChange={e => setPosition(e.target.value)}
                placeholder="属性を入力してください"
                className="w-auto border rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
            </input>
        </div>
    );
}
