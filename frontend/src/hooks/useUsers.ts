import { useEffect, useState } from "react";
import { fetchUsers } from "../api/user.api";
import { PaginatedUserResponse } from "../types/user";
import { getCache, setCache } from "../utils/cache";

export const useUsers = (
  tenantId: string,
  role: string,
  page: number,
  limit: number
) => {
  const [data, setData] = useState<PaginatedUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const key = `${tenantId}_${role}_${page}_${limit}`;
    if(tenantId && role) {

    console.log("Fetching users with key:", key);
    const cached = getCache<PaginatedUserResponse>(key);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchUsers(tenantId, role, page, limit)
      .then((res) => {
        setCache(key, res);
        setData(res);
      })
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
    }
  }, [tenantId, role, page, limit]);

  return { data, loading, error };
};
