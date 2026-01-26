import { AttributeInput } from "./attribute";
import { SplitResult } from "./result";

export interface RoundingStrategy {
    (attributes: AttributeInput[], totalAmount: number): SplitResult;
}
