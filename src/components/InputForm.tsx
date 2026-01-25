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
            prev.map((attribute, i) =>
                i === index
                    ? { ...attribute, position }
                    : attribute
            )
        );
    };

    const updateWeight = (index: number, weight: string) => {
        setAttributes(prev =>
            prev.map((attribute, i) =>
                i === index
                    ? { ...attribute, weight }
                    : attribute
            )
        );
    };

    const updateCount = (index: number, count: string) => {
        setAttributes(prev =>
            prev.map((attribute, i) =>
                i === index
                    ? { ...attribute, count }
                    : attribute
            )
        );
    };


    return (
        <div>
            {attributes.map((attribute, index) => {
                return (
                    <AttributeInputGroup
                        key={index}
                        attribute={attribute}
                        updatePosition={position => updatePosition(index, position)}
                        updateWeight={weight => updateWeight(index, weight)}
                        updateCount={count => updateCount(index, count)}
                    />
                )
            })}
        </div>
    );
}
