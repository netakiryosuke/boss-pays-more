import { RoundingStrategy } from "@/types/roundingStrategy";

const normalizePosition = (position: string): string => {
    const trimmed = position.trim();
    return trimmed === "" ? "名無しさん" : trimmed;
};

export const roundToYen: RoundingStrategy = (participantGroups, totalAmount) => {
    const totalWeight = participantGroups.reduce((sum, group) => {
        const weight = Number(group.weight);
        const count = Number(group.count);
        return sum + weight * count;
    }, 0);

    if (totalWeight === 0) {
        return { results: [], difference: 0 };
    }

    const results = participantGroups.map((group) => {
        const weight = Number(group.weight);
        const count = Number(group.count);

        // この役職グループの負担額
        const groupAmount = (totalAmount * weight * count) / totalWeight;

        // 1人あたり（切り捨て）
        const perPersonAmount = Math.floor(groupAmount / count);

        return {
            position: normalizePosition(group.position),
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


export const roundTo1000Yen: RoundingStrategy = (participantGroups, totalAmount) => {
    const totalWeight = participantGroups.reduce((sum, group) => {
        const weight = Number(group.weight);
        const count = Number(group.count);
        return sum + weight * count;
    }, 0);

    if (totalWeight === 0) {
        return { results: [], difference: 0 };
    }

    // 各グループの理論値と候補を計算
    const MIN_PER_PERSON = 1000;

    const buildGroups = (candidateRange: number) =>
        participantGroups.map((group) => {
            const weight = Number(group.weight);
            const count = Number(group.count);
            const groupWeight = weight * count;

            // このグループの理論上の負担額
            const theoreticalGroupAmount = (totalAmount * groupWeight) / totalWeight;
            const theoreticalPerPerson = theoreticalGroupAmount / count;

            // 1000円単位の候補を生成（理論値の前後 candidateRange ずつ）
            const baseAmount =
                Math.floor(theoreticalPerPerson / MIN_PER_PERSON) * MIN_PER_PERSON;
            const candidates: number[] = [];

            for (let i = -candidateRange; i <= candidateRange; i++) {
                const candidate = baseAmount + i * MIN_PER_PERSON;
                if (candidate >= MIN_PER_PERSON) {
                    candidates.push(candidate);
                }
            }

            return {
                position: normalizePosition(group.position),
                weight,
                count,
                theoreticalPerPerson,
                candidates,
            };
        });

    const findBestCombination = (candidateRange: number) => {
        const groups = buildGroups(candidateRange);

        const satisfiesWeightOrder = (amounts: number[]): boolean => {
            const sorted = groups
                .map((g, i) => ({ weight: g.weight, amount: amounts[i] }))
                .sort((a, b) => a.weight - b.weight);

            let maxSeenAmount = Number.NEGATIVE_INFINITY;
            let maxAllowedFromLowerWeights = Number.NEGATIVE_INFINITY;
            let lastWeight = Number.NEGATIVE_INFINITY;

            for (const item of sorted) {
                if (item.weight > lastWeight) {
                    maxAllowedFromLowerWeights = maxSeenAmount;
                    lastWeight = item.weight;
                }

                if (item.amount < maxAllowedFromLowerWeights) {
                    return false;
                }

                maxSeenAmount = Math.max(maxSeenAmount, item.amount);
            }

            return true;
        };

        // 最適な組み合わせを探索
        let bestCombination: number[] | null = null;
        let bestScore = Infinity;

        // 再帰的に全組み合わせを探索
        function explore(groupIndex: number, currentAmounts: number[]) {
            if (groupIndex === groups.length) {
                const totalPaid = groups.reduce(
                    (sum, group, i) => sum + currentAmounts[i] * group.count,
                    0
                );
                const surplus = totalPaid - totalAmount;

                // 合計が総額を下回る場合はスキップ
                if (surplus < 0) return;

                // 重み順序（高い重みほど安くならない）を満たさない組み合わせは除外
                if (!satisfiesWeightOrder(currentAmounts)) return;

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

        return { groups, bestCombination };
    };

    // まずは従来どおりの候補範囲（±3）で探し、なければ少しだけ広げる
    const rangeSteps = [3, 6, 10, 20, 30];
    const firstResult = findBestCombination(rangeSteps[0]);
    let groups = firstResult.groups;
    let bestCombination: number[] | null = firstResult.bestCombination;

    for (const range of rangeSteps.slice(1)) {
        if (bestCombination) break;
        const result = findBestCombination(range);
        groups = result.groups;
        bestCombination = result.bestCombination;
    }

    if (!bestCombination) {
        // この条件で解が見つからないのは入力が極端な場合のみ想定だが、
        // UI側で「結果なし」表示になるのを避けるため、最後は候補を広げて必ず探す
        const result = findBestCombination(60);
        groups = result.groups;
        bestCombination = result.bestCombination;
    }

    if (!bestCombination) {
        return { results: [], difference: totalAmount };
    }

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
