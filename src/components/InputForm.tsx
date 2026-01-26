"use client";

import { useState } from "react";
import AttributeInputGroup from "./AttributeInputGroup";
import useAttributesForm from "@/hooks/useAttributesForm";
import CalculateButton from "./CalculateButton";
import calculateSplit from "@/lib/calculateSplit";
import { roundToYen, roundTo1000Yen } from "@/lib/roundingStrategies";
import { Result } from "@/types/result";
import InputField from "./InputField";
import AddAttributeButton from "./AddAttributeButton";

interface Props {
    setResults: (results: Result[]) => void;
    setDifference: (difference: number) => void;
}

export default function InputForm({
    setResults,
    setDifference
}: Props) {
    const [use1000YenUnit, setUse1000YenUnit] = useState(true);
    
    const {
        totalAmount,
        setTotalAmount,
        attributes,
        updatePosition,
        updateWeight,
        updateCount,
        addAttribute,
        removeAttribute
    } = useAttributesForm();

    const handleCalculate = () => {
        const strategy = use1000YenUnit ? roundTo1000Yen : roundToYen;
        const splitResult = calculateSplit(attributes, Number(totalAmount), strategy);
        setResults(splitResult.results);
        setDifference(splitResult.difference);
    };

    const handleRemoveAttribute = (index: number) => {
        const ok = window.confirm("本当にこの参加者を削除しますか？");
        if (!ok) return;

        removeAttribute(index);
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
                        onRemove={() => handleRemoveAttribute(index)}
                    />
                )
            })}
            <AddAttributeButton
                onClick={addAttribute}
            />
            <div className="my-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={use1000YenUnit}
                        onChange={(e) => setUse1000YenUnit(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <span>1000円単位で計算する</span>
                </label>
            </div>
            <CalculateButton
                onClick={handleCalculate}
            />
        </div>
    );
}
