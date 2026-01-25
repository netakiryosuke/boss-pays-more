"use client";

import { useState } from "react";
import AttributeInputGroup from "./AttributeInputGroup";
import { AttributeInput } from "@/types/attribute";

export default function InputForm() {
    const [attributes, setAttributes] = useState<AttributeInput[]>([
        { position: "", weight: 0, count: 0 }
    ]);

    return (
        <div>
            {attributes.map((attributeInput, index) => {
                return (
                    <AttributeInputGroup
                        key={index}
                        attributeInput={attributeInput}
                    />
                )
            })}
        </div>
    );
}
