import { useState } from "react";
import { AttributeInput } from "@/types/attribute";

export default function useAttributesForm() {
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

    return {
        attributes,
        updatePosition,
        updateWeight,
        updateCount
    };
}
