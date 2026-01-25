"use client";

import InputField from "./InputField";
import { AttributeInput } from "@/types/attribute";

interface Props {
    attributeInput: AttributeInput;
    updatePosition: (position: string) => void;
    updateWeight: (weight: number) => void;
    updateCount: (count: number) => void;
}

export default function AttributeInputGroup({
    attributeInput,
    updatePosition,
    updateWeight,
    updateCount
} : Props) {

    return (
        <div className="flex flex-col gap-4">
            <InputField
                label="属性"
                value={attributeInput.position}
                setValue={updatePosition}
                placeholder="例：部長"
            />
            <InputField
                label="支払いの重み"
                value={attributeInput.weight}
                setValue={value => updateWeight(Number(value))}
                placeholder="例：70"
                type="number"
            />
            <InputField
                label="人数"
                value={attributeInput.count}
                setValue={value => updateCount(Number(value))}
                placeholder="例：3"
                type="number"
            />
        </div>
    );
}
