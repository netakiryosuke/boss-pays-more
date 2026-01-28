export type ValidationError = string | null;

const normalize = (value: string): string => value.trim();

const toNumberOrNull = (value: string): number | null => {
    const normalized = normalize(value);
    if (normalized === "") return null;

    const num = Number(normalized);
    return Number.isFinite(num) ? num : null;
};

export function validatePositiveNumberString(
    value: string,
    opts: { label: string; minExclusive?: number } = { label: "値" }
): ValidationError {
    const num = toNumberOrNull(value);

    if (normalize(value) === "") return `${opts.label}を入力してください`;
    if (num === null) return `${opts.label}は数値で入力してください`;

    const minExclusive = opts.minExclusive ?? 0;
    if (num <= minExclusive) {
        return minExclusive === 0
            ? `${opts.label}は正の値を入力してください`
            : `${opts.label}は${minExclusive}より大きい値を入力してください`;
    }

    return null;
}

export function validatePositiveIntegerString(
    value: string,
    opts: { label: string; minInclusive?: number } = { label: "値" }
): ValidationError {
    const num = toNumberOrNull(value);

    if (normalize(value) === "") return `${opts.label}を入力してください`;
    if (num === null) return `${opts.label}は数値で入力してください`;

    const minInclusive = opts.minInclusive ?? 1;
    if (!Number.isInteger(num)) return `${opts.label}は整数で入力してください`;
    if (num < minInclusive) return `${opts.label}は${minInclusive}以上で入力してください`;

    return null;
}
