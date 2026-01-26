import { AttributeInput } from "@/types/attribute";
import { SplitResult } from "@/types/result";
import { RoundingStrategy } from "@/types/roundingStrategy";
import { roundToYen } from "./roundingStrategies";

export default function calculateSplit(
    attributes: AttributeInput[],
    totalAmount: number,
    strategy: RoundingStrategy = roundToYen
): SplitResult {
    return strategy(attributes, totalAmount);
}
