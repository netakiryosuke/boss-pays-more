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

    // 各グループの理論値と候補を計算
    const groups = attributes.map((attribute) => {
        const weight = Number(attribute.weight);
        const count = Number(attribute.count);
        const groupWeight = weight * count;
        
        // このグループの理論上の負担額
        const theoreticalGroupAmount = (totalAmount * groupWeight) / totalWeight;
        const theoreticalPerPerson = theoreticalGroupAmount / count;

        // 1000円単位の候補を生成（理論値の前後3つずつ）
        const MIN_PER_PERSON = 1000;
        const baseAmount = Math.floor(theoreticalPerPerson / MIN_PER_PERSON) * MIN_PER_PERSON;
        const candidates: number[] = [];
        
        for (let i = -3; i <= 3; i++) {
            const candidate = baseAmount + i * MIN_PER_PERSON;
            if (candidate >= MIN_PER_PERSON) {
                candidates.push(candidate);
            }
        }

        return {
            position: attribute.position,
            weight,
            count,
            theoreticalPerPerson,
            candidates,
        };
    });

    // 最適な組み合わせを探索
    let bestCombination: number[] | null = null;
    let bestScore = Infinity;

    // 再帰的に全組み合わせを探索
    function explore(groupIndex: number, currentAmounts: number[]) {
        if (groupIndex === groups.length) {
            // 全グループの金額が決定した
            const totalPaid = groups.reduce(
                (sum, group, i) => sum + currentAmounts[i] * group.count,
                0
            );
            const surplus = totalPaid - totalAmount;

            // 合計が総額を超える場合はスキップ
            if (surplus < 0) return;

            // スコア計算: 余剰 + 重み比率からの乖離
            let deviationScore = 0;
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                const deviation = Math.abs(
                    currentAmounts[i] - group.theoreticalPerPerson
                );
                // 乖離を正規化（理論値に対する割合）
                deviationScore += deviation / (group.theoreticalPerPerson || 1);
            }

            // スコア: 余剰を重視しつつ、乖離も考慮
            const score = surplus * 100 + deviationScore * 10;

            if (score < bestScore) {
                bestScore = score;
                bestCombination = [...currentAmounts];
            }
            return;
        }

        // 現在のグループの各候補を試す
        const group = groups[groupIndex];
        for (const candidate of group.candidates) {
            currentAmounts[groupIndex] = candidate;
            explore(groupIndex + 1, currentAmounts);
        }
    }

    explore(0, new Array(groups.length).fill(0));

    // 結果を構築
    const results = groups.map((group, i) => ({
        position: group.position,
        payAmount: bestCombination![i],
    }));

    const calculatedTotal = groups.reduce(
        (sum, group, i) => sum + bestCombination![i] * group.count,
        0
    );
    const difference = totalAmount - calculatedTotal;

    return {
        results,
        difference,
    };
};
