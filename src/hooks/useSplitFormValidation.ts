import { useMemo } from "react";
import { AttributeInput } from "@/types/attribute";
import {
    ValidationError,
    validatePositiveIntegerString,
    validatePositiveNumberString
} from "@/utils/validation";

export type AttributeInputErrors = {
    weight: ValidationError;
    count: ValidationError;
};

export default function useSplitFormValidation(
    totalAmount: string,
    attributes: AttributeInput[]
): {
    isValid: boolean;
    totalAmountError: ValidationError;
    attributesError: ValidationError;
    attributeErrors: AttributeInputErrors[];
} {
    return useMemo(() => {
        const totalAmountError = validatePositiveIntegerString(totalAmount, { label: "合計金額" });

        const attributesError =
            attributes.length === 0 ? "参加者を1人以上追加してください" : null;

        const attributeErrors: AttributeInputErrors[] = attributes.map(attribute => ({
            weight: validatePositiveNumberString(attribute.weight, { label: "支払いの重み" }),
            count: validatePositiveIntegerString(attribute.count, { label: "人数" })
        }));

        const isValid =
            !totalAmountError &&
            !attributesError &&
            attributeErrors.every(e => !e.weight && !e.count);

        return {
            isValid,
            totalAmountError,
            attributesError,
            attributeErrors
        };
    }, [totalAmount, attributes]);
}
