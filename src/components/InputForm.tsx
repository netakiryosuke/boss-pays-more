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
        <div className="flex flex-col gap-2 max-w-2xl mx-auto px-4 py-8">
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <InputField
                    label="合計金額"
                    value={totalAmount}
                    onChange={setTotalAmount}
                    placeholder="例：10000"
                    type="number"
                />
            </div>

            <div className="flex flex-col gap-2 mb-8">
                {attributes.map((attribute, index) => (
                    <AttributeInputGroup
                        key={index}
                        attribute={attribute}
                        updatePosition={position => updatePosition(index, position)}
                        updateWeight={weight => updateWeight(index, weight)}
                        updateCount={count => updateCount(index, count)}
                        onRemove={() => handleRemoveAttribute(index)}
                    />
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <AddAttributeButton onClick={addAttribute} />

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={use1000YenUnit}
                            onChange={(e) => setUse1000YenUnit(e.target.checked)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">1000円単位で計算する</span>
                    </label>
                </div>

                <CalculateButton onClick={handleCalculate} />
            </div>
        </div>
    );
}
