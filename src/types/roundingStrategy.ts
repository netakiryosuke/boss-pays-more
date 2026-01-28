import { ParticipantGroupInput } from "./participantGroup";
import { SplitResult } from "./result";

export interface RoundingStrategy {
    (participantGroups: ParticipantGroupInput[], totalAmount: number): SplitResult;
}
