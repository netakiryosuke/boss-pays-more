import { useMemo } from "react";
import { ParticipantGroupInput } from "@/types/participantGroup";
import {
    ValidationError,
    validatePositiveIntegerString,
    validatePositiveNumberString
} from "@/utils/validation";

export type ParticipantGroupInputErrors = {
    weight: ValidationError;
    count: ValidationError;
};

export default function useSplitFormValidation(
    totalAmount: string,
    participantGroups: ParticipantGroupInput[],
    roundingUnit: string,
    roundingEnabled: boolean
): {
    isValid: boolean;
    totalAmountError: ValidationError;
    participantGroupsError: ValidationError;
    participantGroupErrors: ParticipantGroupInputErrors[];
    roundingUnitError: ValidationError;
} {
    return useMemo(() => {
        const totalAmountError = validatePositiveIntegerString(totalAmount, { label: "合計金額" });

        const participantGroupsError =
            participantGroups.length === 0 ? "参加者を1人以上追加してください" : null;

        const participantGroupErrors: ParticipantGroupInputErrors[] = participantGroups.map(group => ({
            weight: validatePositiveNumberString(group.weight, { label: "支払いの重み" }),
            count: validatePositiveIntegerString(group.count, { label: "人数" })
        }));

        const roundingUnitError: ValidationError = roundingEnabled
            ? "単位は半角数字で入力してください"
            : null;

        const isValid =
            !totalAmountError &&
            !participantGroupsError &&
            participantGroupErrors.every(e => !e.weight && !e.count) &&
            !roundingUnitError;

        return {
            isValid,
            totalAmountError,
            participantGroupsError,
            participantGroupErrors,
            roundingUnitError
        };
    }, [totalAmount, participantGroups, roundingUnit, roundingEnabled]);
}
