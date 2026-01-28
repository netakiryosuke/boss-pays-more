"use client";

import { Result } from "@/types/result";
import ResultItem from "./ResultItem";

interface Props {
    results: Result[];
    difference: number;
}

export default function ResultList({ results, difference }: Props) {
    const hasResults = results.length > 0;

    return (
        <div className="max-w-2xl mx-auto px-4 pb-6 sm:pb-10">
            <div className="flex items-end justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">計算結果</h2>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                {!hasResults ? (
                    <p className="text-sm text-gray-500">
                        まだ結果がありません。上で入力して「計算する」を押してください。
                    </p>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {results.map((result, index) => (
                            <ResultItem key={index} result={result} />
                        ))}
                    </div>
                )}

                {hasResults && difference !== 0 && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="text-sm font-medium text-amber-900">誤差</div>
                        <div className="mt-1 text-sm text-amber-800">
                            {difference > 0
                                ? `${difference}円（不足分）`
                                : `${Math.abs(difference)}円（余剰分）`}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
