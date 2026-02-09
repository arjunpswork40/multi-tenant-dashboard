import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const getUsersPaginated = async (
  ds: DataSource,
  page: number,
  limit: number
) => {
  const repo = ds.getRepository(User);

  const [users, total] = await repo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: { id: "ASC" }
  });

  return { users, total };
};
