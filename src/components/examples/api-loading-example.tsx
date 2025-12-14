"use client";

import { useEffect } from "react";
import { useLoadingState } from "@/hooks/use-loading-state";
import { Loading } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ✅ GOOD: API call with proper loading state
export const ApiDataLoader = () => {
  const { data, isLoading, error, execute, reset } = useLoadingState<any>();

  const fetchData = async () => {
    // Simulate API call
    return execute(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ users: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` })), total: 5 });
        }, 2000);
      })
    );
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">API Data Example</h3>
          <Button onClick={fetchData} disabled={isLoading}>
            {isLoading ? "Loading..." : "Fetch Data"}
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-8">
            <Loading size="md" text="Fetching data from API..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-lg">
            <p className="font-medium">Error: {error}</p>
            <Button variant="outline" size="sm" onClick={reset} className="mt-2">
              Retry
            </Button>
          </div>
        )}

        {/* Success State */}
        {data && !isLoading && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Found {data.total} users:</p>
            <ul className="space-y-1">
              {data.users.map((user: any) => (
                <li key={user.id} className="text-sm p-2 bg-gray-50 rounded">
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Empty State */}
        {!data && !isLoading && !error && (
          <div className="text-center py-8 text-gray-500">
            Click "Fetch Data" to load content
          </div>
        )}
      </div>
    </Card>
  );
};

// ✅ GOOD: Optimistic UI with loading
export const OptimisticUpdateExample = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const updateItem = async (id: number) => {
    setUpdatingId(id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setItems(prev => prev.map((item, index) =>
      index === id ? `${item} (Updated)` : item
    ));
    setUpdatingId(null);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Optimistic Updates</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded">
            <span>{item}</span>
            <Button
              size="sm"
              onClick={() => updateItem(index)}
              disabled={updatingId === index}
            >
              {updatingId === index ? (
                <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-3 h-3" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};