import { useState } from "react";
import { AttributeInput } from "@/types/attribute";

export default function useAttributesForm() {
    const [totalAmount, setTotalAmount] = useState("");
    const [attributes, setAttributes] = useState<AttributeInput[]>([
        { position: "", weight: "", count: "" }
    ]);

    const addAttribute = () => {
        setAttributes(prev => [...prev, { position: "", weight: "", count: "" }]);
    };

    const updateAttribute = (
        index: number,
        field: keyof AttributeInput,
        value: string
    ) => {
        setAttributes(prev =>
            prev.map((attribute, i) =>
                i === index
                    ? { ...attribute, [field]: value }
                    : attribute
            )
        );
    };

    const updatePosition = (index: number, position: string) => {
        updateAttribute(index, "position", position);
    };

    const updateWeight = (index: number, weight: string) => {
        updateAttribute(index, "weight", weight);
    };

    const updateCount = (index: number, count: string) => {
        updateAttribute(index, "count", count);
    };

    return {
        totalAmount,
        setTotalAmount,
        attributes,
        updatePosition,
        updateWeight,
        updateCount,
        addAttribute
    };
}
