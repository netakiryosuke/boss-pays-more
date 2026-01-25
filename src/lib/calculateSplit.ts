import { AttributeInput } from "@/types/attribute";

interface Result {
    position: string;
    payAmount: number;
}

export default function calculateSplit(
    attributes: AttributeInput[],
    totalAmount: number
): Result[] {
    return [];
}
