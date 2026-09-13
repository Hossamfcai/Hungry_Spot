import { useMemo, useState } from "react";

import { MoreVertical, Eye, Pencil } from "lucide-react";

export default function UsersTable({ users = [], onAdd, onView, onEdit }) {
  const [filter, setFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    if (filter === "all") {
      return users;
    }

    return users.filter((user) => String(user.role).toLowerCase() === filter);
  }, [users, filter]);

  return (
    <section className="users-table-section">
      <div className="users-table-header">
        <div>
          <h2>Registered Patrons &amp; Staff</h2>
          <p>Manage user accounts, roles, activity and access permissions.</p>
        </div>

        <div className="users-table-actions">
          <select
            className="users-table-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">All Users</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>

          <button type="button" className="users-add-button" onClick={onAdd}>
            + Add User
          </button>
        </div>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Account Status</th>
              <th>Last Activity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className={`user-avatar ${user.avatarClass || ""}`}>
                        {user.initials}
                      </div>

                      <div className="user-cell-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`user-role ${user.roleClass || ""}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span className={`user-status ${user.statusClass || ""}`}>
                      <span className="user-status-dot"></span>
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <span className="user-last-activity">
                      {user.lastActivity}
                    </span>
                  </td>

                  <td>
                    <div className="user-row-actions">
                      <button
                        type="button"
                        aria-label={`View ${user.name}`}
                        title="View user"
                        onClick={() => onView?.(user)}
                      >
                        <Eye />
                      </button>

                      <button
                        type="button"
                        aria-label={`Edit ${user.name}`}
                        title="Edit user"
                        onClick={() => onEdit?.(user)}
                      >
                        <Pencil />
                      </button>

                      <button
                        type="button"
                        aria-label={`More actions for ${user.name}`}
                        title="More actions"
                        onClick={() => onView?.(user)}
                      >
                        <MoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="users-empty-state">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="users-table-footer">
        <span>
          Showing <strong>{filteredUsers.length}</strong> of{" "}
          <strong>{users.length}</strong> users
        </span>
      </div>
    </section>
  );
}
