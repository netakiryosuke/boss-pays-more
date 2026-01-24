'use client';

import { useState } from "react";

export default function InputForm() {
    const [position, setPosition] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [count, setCount] = useState<string>("");

    return (
        <div className="flex flex-col justify-center">
            <input
                type="text"
                value={position}
                onChange={e => setPosition(e.target.value)}
                placeholder="属性を入力してください"
                className="w-auto border rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
            </input>
            <input
                type="text"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="支払いの重みを入力してください"
                className="w-auto border rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
            </input>
            <input
                type="text"
                value={count}
                onChange={e => setCount(e.target.value)}
                placeholder="人数を入力してください"
                className="w-auto border rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
            </input>
        </div>
    );
}
