"use client";

import AttributeInputGroup from "./AttributeInputGroup";
import useAttributesForm from "@/hooks/useAttributesForm";
import CalculateButton from "./CalculateButton";
import calculateSplit from "@/lib/calculateSplit";
import { Result } from "@/types/result";
import InputField from "./InputField";
import IncreaseAttributeButton from "./IncreaseAttributeButton";

interface Props {
    results: Result[];
    setResults: (results: Result[]) => void;
}

export default function InputForm({
    results,
    setResults
}: Props) {
    const {
        totalAmount,
        setTotalAmount,
        attributes,
        updatePosition,
        updateWeight,
        updateCount,
        addAttribute
    } = useAttributesForm();

    const handleCalculate = () => {
        const newResults = calculateSplit(attributes, Number(totalAmount));
        setResults(newResults);
    };

    return (
        <div>
            <InputField 
                label="合計金額"
                value={totalAmount} 
                onChange={setTotalAmount} 
                placeholder="例：10000" 
                type="number"
            />
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
            <IncreaseAttributeButton
                onClick={addAttribute}
            />
            <CalculateButton
                onClick={handleCalculate}
            />
        </div>
    );
}
