"use client";

import { Result } from "@/types/result";

interface Props {
    result: Result;
}

export default function ResultItem({ result }: Props) {
    return (
        <div>
            {result.position}: {result.payAmount}
        </div>
    );
}
