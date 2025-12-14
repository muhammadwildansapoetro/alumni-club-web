"use client";

import { useState } from "react";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// ✅ GOOD: Button with loading state
export const LoadingButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4 mr-2" />
          Processing...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
};

// ✅ GOOD: Card with loading state
export const LoadingCard = ({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) => {
  return (
    <div className="border rounded-lg p-4">
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

// ✅ GOOD: Section with loading
export const LoadingSection = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Data Section</h2>

      {loading ? (
        <div className="py-8">
          <Loading size="md" text="Loading section data..." />
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="p-4 border">Content 1</div>
          <div className="p-4 border">Content 2</div>
        </div>
      )}

      <Button onClick={() => setLoading(!loading)}>
        Toggle Loading
      </Button>
    </div>
  );
};

// ❌ AVOID: Full-page overlay for simple operations
export const BadExample = () => {
  return (
    <div>
      {/* Don't use overlay for quick operations */}
      <Loading size="lg" overlay={true} text="Loading..." />
    </div>
  );
};