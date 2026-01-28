import { ParticipantGroupInput } from "@/types/participantGroup";
import { SplitResult } from "@/types/result";
import { RoundingStrategy } from "@/types/roundingStrategy";

export default function calculateSplit(
    participantGroups: ParticipantGroupInput[],
    totalAmount: number,
    strategy: RoundingStrategy
): SplitResult {
    return strategy(participantGroups, totalAmount);
}

