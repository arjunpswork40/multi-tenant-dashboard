import { useRouter } from "next/router";
import { useState } from "react";
import { useUsers } from "../../../src/hooks/useUsers";
import styles from "./UserListPage.module.css";

const PAGE_SIZE = 10;

export default function UserListPage() {
  const router = useRouter();
  const { tenantId, role } = router.query as {
    tenantId?: string;
    role?: string;
  };

  const [page, setPage] = useState<number>(1);

  const isReady = router.isReady && Boolean(tenantId) && Boolean(role);

  const { data, loading, error } = useUsers(
    isReady ? tenantId! : "",
    isReady ? role! : "",
    page,
    PAGE_SIZE
  );

  if (!isReady) {
    return <div className={styles.state}>Initializing...</div>;
  }

  if (loading) {
    return <div className={styles.state}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return null;
  }

  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>User Management</h1>

        <div className={styles.meta}>
          <span>
            <strong>Tenant:</strong> {tenantId}
          </span>
          <span>
            <strong>Role:</strong> {role}
          </span>
        </div>
      </header>

      <section className={styles.summary}>
        Total Users: <strong>{data.total}</strong>
      </section>

      <section className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className={styles.pagination}>
        <button
          className={styles.button}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className={styles.pageInfo}>
          Page {page} of {totalPages}
        </span>

        <button
          className={styles.button}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </footer>
    </div>
  );
}
