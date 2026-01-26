import { AttributeInput } from "@/types/attribute";
import { SplitResult } from "@/types/result";

export default function calculateSplit(
    attributes: AttributeInput[],
    totalAmount: number
): SplitResult {
    const totalWeight = attributes.reduce((sum, attribute) => {
        const weight = Number(attribute.weight);
        const count = Number(attribute.count);
        return sum + weight * count;
    }, 0);

    if (totalWeight === 0) {
        return { results: [], shortfall: 0 };
    }

    const results = attributes.map((attribute) => {
        const weight = Number(attribute.weight);
        const count = Number(attribute.count);

        // この役職グループの負担額
        const groupAmount = (totalAmount * weight * count) / totalWeight;

        // 1人あたり（切り捨て）
        const perPersonAmount = Math.floor(groupAmount / count);

        return {
            position: attribute.position,
            payAmount: perPersonAmount,
            count: count,
        };
    });

    // 丸め誤差による不足額を計算
    const calculatedTotal = results.reduce(
        (sum, result) => sum + result.payAmount * result.count,
        0
    );
    const shortfall = totalAmount - calculatedTotal;

    return {
        results: results.map(({ position, payAmount }) => ({
            position,
            payAmount,
        })),
        shortfall,
    };
}
