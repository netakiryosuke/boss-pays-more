"use client";

import AttributeInputGroup from "./AttributeInputGroup";
import useAttributesForm from "@/hooks/useAttributesForm";
import CalculateButton from "./CalculateButton";
import calculateSplit from "@/lib/calculateSplit";

export default function InputForm() {
    const {
        attributes,
        updatePosition,
        updateWeight,
        updateCount
    } = useAttributesForm();

    const handleCalculate = () => {
        const results = calculateSplit(attributes, 100);
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
            <CalculateButton
                onClick={handleCalculate}
            />
        </div>
    );
}
