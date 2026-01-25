"use client";

import { useState } from "react";
import InputField from "./InputField";
import { AttributeInput } from "@/types/attribute";

interface Props {
    attributeInput: AttributeInput;
}

export default function AttributeInputGroup({ attributeInput } : Props) {
    const [position, setPosition] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [count, setCount] = useState<string>("");

    return (
        <div className="flex flex-col gap-4">
            <InputField
                label="属性"
                value={position}
                setValue={setPosition}
                placeholder="例：部長"
            />
            <InputField
                label="支払いの重み"
                value={weight}
                setValue={setWeight}
                placeholder="例：70"
            />
            <InputField
                label="人数"
                value={count}
                setValue={setCount}
                placeholder="例：3"
            />
        </div>
    );
}
