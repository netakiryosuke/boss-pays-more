import { RoundingStrategy } from "@/types/roundingStrategy";

export const roundToYen: RoundingStrategy = (attributes, totalAmount) => {
    const totalWeight = attributes.reduce((sum, attribute) => {
        const weight = Number(attribute.weight);
        const count = Number(attribute.count);
        return sum + weight * count;
    }, 0);

    if (totalWeight === 0) {
        return { results: [], difference: 0 };
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

    // 丸め誤差を計算（切り捨てのため不足が発生）
    const calculatedTotal = results.reduce(
        (sum, result) => sum + result.payAmount * result.count,
        0
    );
    const difference = totalAmount - calculatedTotal;

    return {
        results: results.map(({ position, payAmount }) => ({
            position,
            payAmount,
        })),
        difference,
    };
};


export const roundTo1000Yen: RoundingStrategy = (attributes, totalAmount) => {
    const totalWeight = attributes.reduce((sum, attribute) => {
        const weight = Number(attribute.weight);
        const count = Number(attribute.count);
        return sum + weight * count;
    }, 0);

    if (totalWeight === 0) {
        return { results: [], difference: 0 };
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
    // 1000円単位では切り上げのため、負の値（余剰）になる
    const difference = totalAmount - calculatedTotal;

    return {
        results: results.map(({ position, payAmount }) => ({
            position,
            payAmount,
        })),
        difference,
    };
};
