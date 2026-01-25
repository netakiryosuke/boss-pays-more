"use client";

import AttributeInputGroup from "./AttributeInputGroup";
import useAttributesForm from "@/hooks/useAttributesForm";
import CalculateButton from "./CalculateButton";
import calculateSplit from "@/lib/calculateSplit";
import { Result } from "@/types/result";
import InputField from "./InputField";

interface Props {
    results: Result[];
    setResults: (results: Result[]) => void;
}

export default function InputForm({
    results,
    setResults
}: Props) {
    const {
        attributes,
        updatePosition,
        updateWeight,
        updateCount
    } = useAttributesForm();

    const handleCalculate = () => {
        // TODO: totalAmountをフォームから取得するようにする
        const newResults = calculateSplit(attributes, 100);
        setResults(newResults);
    };

    return (
        <div>
            <InputField 
                label="合計金額"
                value="" 
                onChange={() => {}} 
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
            <CalculateButton
                onClick={handleCalculate}
            />
        </div>
    );
}
