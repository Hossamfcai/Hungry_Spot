import { useEffect, useMemo, useState } from "react";

import {
  TrendingUp,
  PiggyBank, // or CircleDollarSign
  UserCheck,
  UsersRound,
  X,
} from "lucide-react";

import DashboardHeader from "../../components/ui/DashboardHeader";
import UserActivityCard from "../../components/ui/UserActivityCard";
import UserStatCard from "../../components/ui/UserStatCard";
import UsersTable from "../../components/ui/UsersTable";

import { useUsersDispatch, useUsersState } from "../../Contexts/AppContext";

import "./Users.css";
import UsersTableSkeleton from "../../Components/ui/UserTableSkeleton";

function formatDate(date) {
  if (!date) return "—";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "—";
  }

  return value.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getInitials(name = "") {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return initials || "U";
}

function getAvatarClass(id) {
  const classes = [
    "avatar-orange",
    "avatar-gold",
    "avatar-brown",
    "avatar-dark",
  ];

  const value = String(id || "");

  const number = value
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);

  return classes[number % classes.length];
}

function UserModal({ mode, user, loading, error, onClose, onSubmit }) {
  const isView = mode === "view";

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isView) {
      onClose();
      return;
    }

    await onSubmit({
      name: name.trim(),
      email: email.trim(),
      password,
    });
  };

  return (
    <div
      className="users-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="users-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="users-modal-title"
      >
        <div className="users-modal-header">
          <div>
            <span className="users-modal-eyebrow">
              {isView ? "Account details" : "User management"}
            </span>

            <h2 id="users-modal-title">
              {mode === "add" ? "Add User" : "User Details"}
            </h2>
          </div>

          <button
            type="button"
            className="users-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <form className="users-modal-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isView || loading}
              required
            />
          </label>

          <label>
            <span>Email</span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isView || loading}
              required
            />
          </label>

          {mode === "add" && (
            <label>
              <span>Password</span>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={6}
                disabled={loading}
                required
              />
            </label>
          )}

          {isView && (
            <>
              <label>
                <span>Role</span>

                <input
                  value={String(user?.role || "").toUpperCase()}
                  disabled
                />
              </label>

              <div className="users-modal-details">
                <div>
                  <span>Account ID</span>
                  <strong>{user?.id || "—"}</strong>
                </div>

                <div>
                  <span>Created</span>
                  <strong>{formatDate(user?.createdAt)}</strong>
                </div>
              </div>
            </>
          )}

          {error && <p className="users-modal-error">{error}</p>}

          <div className="users-modal-footer">
            <div className="users-modal-footer-right">
              <button
                type="button"
                className="users-modal-secondary"
                onClick={onClose}
                disabled={loading}
              >
                {isView ? "Close" : "Cancel"}
              </button>

              {!isView && (
                <button
                  type="submit"
                  className="users-modal-primary"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add User"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Users() {
  const { users, loadingUsersData, usersDataError, actionLoading } =
    useUsersState();

  const { getAllUsersData, addUserData } = useUsersDispatch();

  const [modal, setModal] = useState(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    getAllUsersData().catch(() => {});
  }, [getAllUsersData]);

  const formattedUsers = useMemo(() => {
    return users.map((user) => ({
      ...user,

      initials: getInitials(user.name),

      role: String(user.role || "user").toUpperCase(),

      roleClass: String(user.role).toLowerCase() === "admin" ? "admin" : "user",

      status: "ACTIVE",

      statusClass: "active",

      lastActivity: user.createdAt
        ? `Joined · ${formatDate(user.createdAt)}`
        : "—",

      avatarClass: getAvatarClass(user.id),
    }));
  }, [users]);

  const activePatrons = users.filter(
    (user) => String(user.role).toLowerCase() === "user",
  ).length;

  const registeredStaff = users.filter(
    (user) => String(user.role).toLowerCase() === "admin",
  ).length;

  const openAddModal = () => {
    setActionError("");

    setModal({
      mode: "add",
      user: null,
    });
  };

  const openViewModal = (user) => {
    setActionError("");

    setModal({
      mode: "view",
      user,
    });
  };

  const openEditModal = () => {
    setActionError(
      "Editing users is not available because the current backend does not provide an update-user API.",
    );
  };

  const closeModal = () => {
    if (actionLoading) {
      return;
    }

    setModal(null);
    setActionError("");
  };

  const handleAddUser = async (formData) => {
    setActionError("");

    try {
      await addUserData({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      await getAllUsersData();

      setModal(null);
    } catch (err) {
      setActionError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create user.",
      );
    }
  };

  return (
    <div className="users-page">
      <DashboardHeader
        eyebrow="Operations Dashboard"
        title="Manage Users"
        description="Manage registered patrons, staff accounts and access permissions."
      />

      <section className="users-stats-grid">
        <UserStatCard
          label="Active Patrons"
          value={activePatrons.toLocaleString()}
          change="Live"
          icon={<UsersRound />}
          iconClass="orange"
        />

        <UserStatCard
          label="Registered Staff"
          value={registeredStaff.toLocaleString()}
          change="Live"
          icon={<UserCheck />}
          iconClass="gold"
        />

        <UserStatCard
          label="Gross Booking Value"
          value="—"
          change="Orders"
          icon={<PiggyBank />}
          iconClass="green"
        />
      </section>

      {loadingUsersData && (
        <div className="users-loading">Loading users...</div>
      )}

      {usersDataError?.isError && (
        <div className="users-error">{usersDataError.message}</div>
      )}

      {!loadingUsersData && !usersDataError?.isError && (
        // <UsersTable
        //   users={formattedUsers}
        //   onAdd={openAddModal}
        //   onView={openViewModal}
        //   onEdit={openEditModal}
        // />
        <UsersTableSkeleton />
      )}

      <section className="users-bottom-grid">
        <UserActivityCard
          title="Orders Placed Per Hour"
          subtitle="Customer engagement throughout the day"
          type="activity"
        />

        <UserActivityCard
          title="Registration Distribution"
          subtitle="Current account distribution by type"
          type="distribution"
        />
      </section>

      <section className="users-info-strip">
        <div className="users-info-icon">
          <TrendingUp />
        </div>

        <div>
          <strong>User management overview</strong>

          <p>
            Monitor account activity, permissions and registration trends from
            one central dashboard.
          </p>
        </div>

        <button type="button">View activity</button>
      </section>

      {modal && (
        <UserModal
          mode={modal.mode}
          user={modal.user}
          loading={actionLoading}
          error={actionError}
          onClose={closeModal}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
}
