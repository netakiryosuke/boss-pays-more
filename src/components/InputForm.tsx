"use client";

import { useState } from "react";
import AttributeInputGroup from "./AttributeInputGroup";
import { AttributeInput } from "@/types/attribute";

export default function InputForm() {
    const [attributes, setAttributes] = useState<AttributeInput[]>([
        { position: "", weight: "", count: "" }
    ]);

    const updatePosition = (index: number, position: string) => {
        setAttributes(prev =>
            prev.map((attributeInput, i) =>
                i === index
                    ? { ...attributeInput, position }
                    : attributeInput
            )
        );
    };

    const updateWeight = (index: number, weight: string) => {
        setAttributes(prev =>
            prev.map((attributeInput, i) =>
                i === index
                    ? { ...attributeInput, weight }
                    : attributeInput
            )
        );
    };

    const updateCount = (index: number, count: string) => {
        setAttributes(prev =>
            prev.map((attributeInput, i) =>
                i === index
                    ? { ...attributeInput, count }
                    : attributeInput
            )
        );
    };


    return (
        <div>
            {attributes.map((attributeInput, index) => {
                return (
                    <AttributeInputGroup
                        key={index}
                        attributeInput={attributeInput}
                        updatePosition={position => updatePosition(index, position)}
                        updateWeight={weight => updateWeight(index, weight)}
                        updateCount={count => updateCount(index, count)}
                    />
                )
            })}
        </div>
    );
}
