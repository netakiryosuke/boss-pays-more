"use client";

import InputField from "./InputField";
import { ParticipantGroupInput } from "@/types/participantGroup";

interface Props {
    participantGroup: ParticipantGroupInput;
    updatePosition: (position: string) => void;
    updateWeight: (weight: string) => void;
    updateCount: (count: string) => void;
    onRemove: () => void;
    errors?: {
        weight?: string | null;
        count?: string | null;
    };
}

export default function ParticipantGroupInputGroup({
    participantGroup,
    updatePosition,
    updateWeight,
    updateCount,
    onRemove,
    errors
}: Props) {
    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="space-y-4">
                <InputField
                    label="役職"
                    value={participantGroup.position}
                    onChange={updatePosition}
                    placeholder="例：部長"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="支払いの重み（1=等分）"
                        value={participantGroup.weight}
                        onChange={updateWeight}
                        placeholder="例：2（2倍支払う）"
                        type="number"
                        min={0}
                        step="any"
                        error={errors?.weight}
                    />
                    <InputField
                        label="人数"
                        value={participantGroup.count}
                        onChange={updateCount}
                        placeholder="例：3"
                        type="number"
                        min={1}
                        step={1}
                        error={errors?.count}
                    />
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="w-full py-2 px-4 text-sm font-medium text-red-600 bg-red-50 rounded-lg
                            hover:bg-red-100 transition-colors duration-200 cursor-pointer
                            border border-red-200 hover:border-red-300"
                >
                    参加者を削除
                </button>
            </div>
        </div>
    );
}
