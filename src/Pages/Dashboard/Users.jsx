import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faCircleDollarToSlot,
  faUserCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import DashboardHeader from "../../components/ui/DashboardHeader";
import UserActivityCard from "../../components/ui/UserActivityCard";
import UserStatCard from "../../components/ui/UserStatCard";
import UsersTable from "../../components/ui/UsersTable";

import "./Users.css";

const users = [
  {
    id: 1,
    initials: "AM",
    name: "Amira Hassan",
    email: "amira.hassan@example.com",
    role: "ADMIN",
    roleClass: "admin",
    status: "ACTIVE",
    statusClass: "active",
    lastActivity: "Today · 09:42 AM",
    avatarClass: "avatar-orange",
  },

  {
    id: 2,
    initials: "JM",
    name: "Julian Moreau",
    email: "julian.moreau@example.com",
    role: "ADMIN",
    roleClass: "admin",
    status: "ACTIVE",
    statusClass: "active",
    lastActivity: "Today · 08:17 AM",
    avatarClass: "avatar-gold",
  },

  {
    id: 3,
    initials: "JC",
    name: "Julia Chen",
    email: "julia.chen@example.com",
    role: "USER",
    roleClass: "user",
    status: "ACTIVE",
    statusClass: "active",
    lastActivity: "Yesterday · 06:31 PM",
    avatarClass: "avatar-brown",
  },

  {
    id: 4,
    initials: "MC",
    name: "Marcus Cole",
    email: "marcus.cole@example.com",
    role: "USER",
    roleClass: "user",
    status: "INACTIVE",
    statusClass: "inactive",
    lastActivity: "Sep 10 · 02:14 PM",
    avatarClass: "avatar-dark",
  },

  {
    id: 5,
    initials: "SC",
    name: "Sofia Carter",
    email: "sofia.carter@example.com",
    role: "USER",
    roleClass: "user",
    status: "ACTIVE",
    statusClass: "active",
    lastActivity: "Sep 10 · 11:28 AM",
    avatarClass: "avatar-orange",
  },
];

export default function Users() {
  return (
    <div className="users-page">

      {/* Page Header */}
      <DashboardHeader
        eyebrow="Operations Dashboard"
        title="Manage Users"
        description="Manage registered patrons, staff accounts and access permissions."
      />

      {/* Top Stats */}
      <section className="users-stats-grid">

        <UserStatCard
          label="Active Patrons"
          value="1,482"
          change="+12.4%"
          icon={faUsers}
          iconClass="orange"
        />

        <UserStatCard
          label="Registered Staff"
          value="28"
          change="+2 new"
          icon={faUserCheck}
          iconClass="gold"
        />

        <UserStatCard
          label="Gross Booking Value"
          value="$14,890"
          change="+8.7%"
          icon={faCircleDollarToSlot}
          iconClass="green"
        />

      </section>

      {/* Users Table */}
      <UsersTable users={users} />

      {/* Bottom Analytics */}
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

      {/* Bottom informational strip */}
      <section className="users-info-strip">

        <div className="users-info-icon">
          <FontAwesomeIcon icon={faArrowTrendUp} />
        </div>

        <div>
          <strong>User management overview</strong>

          <p>
            Monitor account activity, permissions and registration trends
            from one central dashboard.
          </p>
        </div>

        <button type="button">
          View activity
        </button>

      </section>

    </div>
  );
}
