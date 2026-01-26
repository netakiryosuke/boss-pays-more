"use client";

import InputField from "./InputField";
import { AttributeInput } from "@/types/attribute";

interface Props {
    attribute: AttributeInput;
    updatePosition: (position: string) => void;
    updateWeight: (weight: string) => void;
    updateCount: (count: string) => void;
    onRemove: () => void;
}

export default function AttributeInputGroup({
    attribute,
    updatePosition,
    updateWeight,
    updateCount,
    onRemove
}: Props) {

    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="space-y-4">
                <InputField
                    label="属性"
                    value={attribute.position}
                    onChange={updatePosition}
                    placeholder="例：部長"
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="支払いの重み"
                        value={attribute.weight}
                        onChange={updateWeight}
                        placeholder="例：2（1なら等分、2なら2倍支払う）"
                        type="number"
                    />
                    <InputField
                        label="人数"
                        value={attribute.count}
                        onChange={updateCount}
                        placeholder="例：3"
                        type="number"
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
