'use client';

import { useState } from "react";
import InputField from "./InputField";

export default function InputForm() {
    const [position, setPosition] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [count, setCount] = useState<string>("");

    return (
        <div className="flex flex-col justify-center">
            <InputField
                value={position}
                setValue={setPosition}
                placeholder="属性を入力してください"
            />
            <InputField
                value={weight}
                setValue={setWeight}
                placeholder="支払いの重みを入力してください"
            />
            <InputField
                value={count}
                setValue={setCount}
                placeholder="人数を入力してください"
            />
        </div>
    );
}
