"use client";

import AttributeInputGroup from "./AttributeInputGroup";
import useAttributesForm from "@/hooks/useAttributesForm";
import CalculateButton from "./CalculateButton";
import calculateSplit from "@/lib/calculateSplit";
import { Result } from "@/types/result";

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
        const results = calculateSplit(attributes, 100);
        setResults(results);
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
