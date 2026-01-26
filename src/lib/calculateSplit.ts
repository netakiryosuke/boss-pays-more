import { AttributeInput } from "@/types/attribute";
import { Result } from "@/types/result";

export default function calculateSplit(
    attributes: AttributeInput[],
    totalAmount: number
): Result[] {
    // 全体の重み合計（weight × count）
    const totalWeight = attributes.reduce((sum, attribute) => {
        const weight = Number(attribute.weight);
        const count = Number(attribute.count);
        return sum + weight * count;
    }, 0);

    if (totalWeight === 0) {
        return [];
    }

    return attributes.map((attribute) => {
        const weight = Number(attribute.weight);
        const count = Number(attribute.count);

        // この役職グループの負担額
        const groupAmount = (totalAmount * weight * count) / totalWeight;

        // 1人あたり
        const perPersonAmount = Math.round(groupAmount / count);

        return {
            position: attribute.position,
            payAmount: perPersonAmount,
        };
    });
}
