import { AttributeInput } from "@/types/attribute";
import { SplitResult } from "@/types/result";
import { RoundingStrategy } from "@/types/roundingStrategy";

export default function calculateSplit(
    attributes: AttributeInput[],
    totalAmount: number,
    strategy: RoundingStrategy
): SplitResult {
    return strategy(attributes, totalAmount);
}
