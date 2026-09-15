const users = [
  { id: "u1", name: "Somchai Jaidee", email: "somchai@example.com", role: "CUSTOMER" },
  { id: "u2", name: "Admin User", email: "admin@fashionstore.com", role: "ADMIN" },
];

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-admin-text">Users</h1>

      <div className="overflow-hidden rounded-2xl bg-admin-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-admin-muted">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-admin-border/40 text-admin-text">
                <td className="px-5 py-4">{u.name}</td>
                <td className="px-5 py-4 text-admin-muted">{u.email}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    u.role === "ADMIN" ? "bg-admin-accent/20 text-admin-accent" : "bg-admin-cardLight text-admin-muted"
                  }`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* TODO: fetch from GET /admin/users, add role toggle + ban/delete actions */}
    </div>
  );
}
