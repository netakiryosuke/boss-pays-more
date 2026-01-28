"use client";

import { useState } from "react";
import ParticipantGroupInputGroup from "./ParticipantGroupInputGroup";
import useParticipantGroupsForm from "@/hooks/useParticipantGroupsForm";
import CalculateButton from "./CalculateButton";
import calculateSplit from "@/utils/calculateSplit";
import { roundToYen, roundTo1000Yen } from "@/utils/roundingStrategies";
import { Result } from "@/types/result";
import InputField from "./InputField";
import AddParticipantGroupButton from "./AddParticipantGroupButton";
import useSplitFormValidation from "@/hooks/useSplitFormValidation";

interface Props {
    setResults: (results: Result[]) => void;
    setDifference: (difference: number) => void;
}

export default function InputForm({
    setResults,
    setDifference
}: Props) {
    const [use1000YenUnit, setUse1000YenUnit] = useState(true);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const {
        totalAmount,
        setTotalAmount,
        participantGroups,
        updatePosition,
        updateWeight,
        updateCount,
        addParticipantGroup,
        removeParticipantGroup
    } = useParticipantGroupsForm();

    const {
        isValid,
        totalAmountError,
        participantGroupsError,
        participantGroupErrors
    } = useSplitFormValidation(totalAmount, participantGroups);

    const displayTotalAmountError = submitAttempted ? totalAmountError : null;

    const handleCalculate = () => {
        if (!isValid) {
            setSubmitAttempted(true);
            return;
        }

        setSubmitAttempted(false);

        const strategy = use1000YenUnit ? roundTo1000Yen : roundToYen;
        const splitResult = calculateSplit(participantGroups, Number(totalAmount), strategy);
        setResults(splitResult.results);
        setDifference(splitResult.difference);
    };

    const handleRemoveParticipantGroup = (index: number) => {
        const ok = window.confirm("本当にこの参加者を削除しますか？");
        if (!ok) return;

        removeParticipantGroup(index);
        setSubmitAttempted(false);
    };

    const handleAddParticipantGroup = () => {
        setSubmitAttempted(false);
        addParticipantGroup();
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
            <div className="flex flex-col gap-4 sm:gap-6">
                <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <InputField
                        label="合計金額"
                        value={totalAmount}
                        onChange={setTotalAmount}
                        placeholder="例：10000"
                        type="number"
                        min={1}
                        step={1}
                        error={displayTotalAmountError}
                    />
                </div>

                <div
                    className="max-h-[45vh] overflow-y-auto border border-gray-200 rounded-xl bg-white p-3 sm:p-4"
                    style={{ scrollbarGutter: "stable" }}
                >
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {submitAttempted && participantGroupsError ? (
                            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                                {participantGroupsError}
                            </div>
                        ) : null}

                        {participantGroups.map((participantGroup, index) => (
                            <ParticipantGroupInputGroup
                                key={index}
                                participantGroup={participantGroup}
                                updatePosition={position => updatePosition(index, position)}
                                updateWeight={weight => updateWeight(index, weight)}
                                updateCount={count => updateCount(index, count)}
                                onRemove={() => handleRemoveParticipantGroup(index)}
                                errors={{
                                    weight:
                                        submitAttempted ? participantGroupErrors[index]?.weight : null,
                                    count:
                                        submitAttempted ? participantGroupErrors[index]?.count : null
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:gap-6">
                    <AddParticipantGroupButton onClick={handleAddParticipantGroup} />

                    {submitAttempted && !isValid && !participantGroupsError ? (
                        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                            未入力または不正な値があります。赤い項目を修正してください。
                        </div>
                    ) : null}

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

                    <CalculateButton
                        onClick={handleCalculate}
                    />
                </div>
            </div>
        </div>
    );
}
