import axios from "axios";
import { PaginatedUserResponse } from "../types/user";

const API_BASE = "http://localhost:4000/api";

export const fetchUsers = async (
  tenantId: string,
  role: string,
  page: number,
  limit: number
): Promise<PaginatedUserResponse> => {
  const res = await axios.get(
    `${API_BASE}/${tenantId}/users?page=${page}&limit=${limit}&role=${role}`
  );
  return res.data;
};
