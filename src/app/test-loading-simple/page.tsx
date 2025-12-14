"use client";

import { Loading } from "@/components/ui/loading";

export default function TestLoadingSimple() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8">
            <h1 className="text-2xl font-bold">Test Loading Component</h1>

            {/* Test 1: Inline loading */}
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Inline Loading (no overlay)</h2>
                <Loading size="lg" />
            </div>

            {/* Test 2: Overlay loading */}
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Overlay Loading</h2>
                <Loading size="lg" overlay={true} />
            </div>
        </div>
    );
}