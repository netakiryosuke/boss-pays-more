import { useMemo } from "react";
import { ParticipantGroupInput } from "@/types/participantGroup";
import {
    ValidationError,
    validatePositiveIntegerString,
    validatePositiveNumberString
} from "@/utils/validation";

export type RoleGroupInputErrors = {
    weight: ValidationError;
    count: ValidationError;
};

export default function useSplitFormValidation(
    totalAmount: string,
    participantGroups: ParticipantGroupInput[]
): {
    isValid: boolean;
    totalAmountError: ValidationError;
    participantGroupsError: ValidationError;
    participantGroupErrors: RoleGroupInputErrors[];
} {
    return useMemo(() => {
        const totalAmountError = validatePositiveIntegerString(totalAmount, { label: "合計金額" });

        const participantGroupsError =
            participantGroups.length === 0 ? "参加者を1人以上追加してください" : null;

        const participantGroupErrors: RoleGroupInputErrors[] = participantGroups.map(group => ({
            weight: validatePositiveNumberString(group.weight, { label: "支払いの重み" }),
            count: validatePositiveIntegerString(group.count, { label: "人数" })
        }));

        const isValid =
            !totalAmountError &&
            !participantGroupsError &&
            participantGroupErrors.every(e => !e.weight && !e.count);

        return {
            isValid,
            totalAmountError,
            participantGroupsError,
            participantGroupErrors
        };
    }, [totalAmount, participantGroups]);
}
