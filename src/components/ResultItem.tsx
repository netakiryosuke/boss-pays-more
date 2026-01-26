"use client";

import { Result } from "@/types/result";

interface Props {
    result: Result;
}

export default function ResultItem({ result }: Props) {
    return (
        <div className="py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                    {result.position}
                </div>
            </div>
            <div className="shrink-0 text-right">
                <div className="text-base font-semibold text-gray-900 tabular-nums">
                    {result.payAmount.toLocaleString()}円/人
                </div>
            </div>
        </div>
    );
}
