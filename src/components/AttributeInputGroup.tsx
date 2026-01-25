"use client";

import InputField from "./InputField";
import { AttributeInput } from "@/types/attribute";

interface Props {
    attribute: AttributeInput;
    updatePosition: (position: string) => void;
    updateWeight: (weight: string) => void;
    updateCount: (count: string) => void;
}

export default function AttributeInputGroup({
    attribute,
    updatePosition,
    updateWeight,
    updateCount
}: Props) {

    return (
        <div className="flex flex-col gap-4">
            <InputField
                label="属性"
                value={attribute.position}
                onChange={updatePosition}
                placeholder="例：部長"
            />
            <InputField
                label="支払いの重み"
                value={attribute.weight}
                onChange={updateWeight}
                placeholder="例：70"
                type="number"
            />
            <InputField
                label="人数"
                value={attribute.count}
                onChange={updateCount}
                placeholder="例：3"
                type="number"
            />
        </div>
    );
}
