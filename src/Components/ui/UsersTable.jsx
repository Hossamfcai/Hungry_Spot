import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEye,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

export default function UsersTable({ users = [] }) {
  return (
    <section className="users-table-section">

      <div className="users-table-header">
        <div>
          <h2>Registered Patrons &amp; Staff</h2>

          <p>
            Manage user accounts, roles, activity and access permissions.
          </p>
        </div>

        <div className="users-table-actions">
          <button type="button" className="users-table-filter">
            All Users
          </button>

          <button type="button" className="users-add-button">
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
            {users.map((user) => (
              <tr key={user.id}>

                <td>
                  <div className="user-cell">
                    <div
                      className={`user-avatar ${user.avatarClass || ""}`}
                    >
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
                  <span
                    className={`user-status ${user.statusClass || ""}`}
                  >
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
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>

                    <button
                      type="button"
                      aria-label={`Edit ${user.name}`}
                      title="Edit user"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                      type="button"
                      aria-label={`More actions for ${user.name}`}
                      title="More actions"
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="users-table-footer">
        <span>
          Showing <strong>{users.length}</strong> of 1,482 users
        </span>

        <div className="users-pagination">
          <button type="button">Previous</button>
          <button type="button" className="active">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">Next</button>
        </div>
      </div>

    </section>
  );
}