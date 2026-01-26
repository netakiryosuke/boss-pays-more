import { RoundingStrategy } from "@/types/roundingStrategy";

/**
 * 1円単位での割り勘計算（切り捨て）
 * 各グループの1人あたりの金額を切り捨てで計算し、不足分はshortfallとして返す
 */
export const roundToYen: RoundingStrategy = (attributes, totalAmount) => {
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
};

/**
 * 1000円単位での割り勘計算（切り上げ）
 * 各グループの1人あたりの金額を1000円単位に切り上げで計算し、余剰分はshortfallとして返す
 * 全グループを重みに基づいて同時に計算するため、公平性が保たれる
 */
export const roundTo1000Yen: RoundingStrategy = (attributes, totalAmount) => {
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

        // 1人あたり（1000円単位に切り上げ）
        const perPersonAmount = Math.ceil(groupAmount / count / 1000) * 1000;

        return {
            position: attribute.position,
            payAmount: perPersonAmount,
            count: count,
        };
    });

    // 実際の合計金額を計算（余剰が出る）
    const calculatedTotal = results.reduce(
        (sum, result) => sum + result.payAmount * result.count,
        0
    );
    // 1000円単位では余剰が出るため、負の値（支払い過ぎ）になる
    const shortfall = totalAmount - calculatedTotal;

    return {
        results: results.map(({ position, payAmount }) => ({
            position,
            payAmount,
        })),
        shortfall,
    };
};
