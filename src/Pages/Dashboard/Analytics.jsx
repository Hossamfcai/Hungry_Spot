import {
  CalendarDays,
  ClipboardList,
  Clock3,
  Download,
  Package,
  Star,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import {
  useMenuState,
  useOrdersState,
  useUsersState,
} from "../../Contexts/AppContext";
import AnalyticsStatCard from "../../Components/ui/AnalyticsStatCard";
import RevenueChart from "../../Components/ui/RevenueChart";
import TopActiveCourses from "../../Components/ui/TopActiveCourses";
import AnalyticsSummaryCard from "../../Components/ui/AnalyticsSummaryCard";

import "../../styles/Analytics.css";

const Analytics = () => {
  const { users } = useUsersState();
  const { orders } = useOrdersState();
  const { menu } = useMenuState();
  console.log(orders);
  const completedRevenue = orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => {
      const orderTotal = order.items.reduce((itemSum, item) => {
        return itemSum + item.price * item.quantity;
      }, 0);

      return sum + orderTotal;
    }, 0);

  const pendingCount = orders.filter(
    (order) => order.status?.toLowerCase() === "pending",
  ).length;
  return (
    <main className="analytics-page">
      {/* Breadcrumb */}
      <div className="analytics-breadcrumb">
        <span>MAÎTRE D'S & SOMMELIER SANCTUM</span>
        <span>/</span>
        <strong>Executive Ledger</strong>

        <div className="analytics-live-status">
          <span className="live-dot"></span>
          Fiscal Audit Active
        </div>
      </div>

      {/* Header */}
      <section className="analytics-header">
        <div className="analytics-header-content">
          <p className="analytics-eyebrow">HIGH-GASTRONOMY ANALYTICS</p>

          <h1>
            Analytics & Revenue
            <br />
            Performance
          </h1>

          <p className="analytics-description">
            Real-time performance ledger for degustation services, salon covers,
            and vintage allocations.
          </p>
        </div>

        <div className="analytics-header-actions">
          <button className="analytics-date-button">
            <CalendarDays size={12} />
            Last 30 Days - Oct 1 - Oct 30
            <span>⌄</span>
          </button>

          <button className="analytics-export-button">
            <Download size={12} />
            EXPORT PDF REPORT
          </button>
        </div>
      </section>

      {/* Analytics */}
      <section className="analytics-stats-grid">
        <AnalyticsStatCard
          label="TOTAL USERS"
          value={users.length}
          subLabel="PATRONS ENROLLED"
          change="+14.2%"
          icon={<Users size={13} />}
          variant="orange"
        />

        <AnalyticsStatCard
          label="ACTIVE PRODUCTS"
          value={menu.length}
          subLabel="Courses"
          secondaryText="LIVE REPORTING"
          change="96.4%"
          icon={<UtensilsCrossed size={13} />}
          variant="gold"
        />

        <AnalyticsStatCard
          label="TOTAL REVENUE"
          value={`$${completedRevenue}`}
          subLabel="GROSS DEGUSTATION"
          change="+8.7%"
          icon={<TrendingUp size={13} />}
          variant="orange"
        />

        <AnalyticsStatCard
          label="PENDING ORDERS"
          value={`${pendingCount} Pending`}
          subLabel="LIVE SALON FLOOR"
          change="4 Kitchen"
          icon={<ClipboardList size={13} />}
          variant="brown"
        />
      </section>

      {/* Main analytics */}
      <section className="analytics-main-grid">
        <RevenueChart orders={orders} />

        <TopActiveCourses />
      </section>

      {/* Bottom summary numbers */}
      <section className="analytics-summary-grid">
        <AnalyticsSummaryCard
          label="DEGUSTATION COVERS"
          value="522"
          description="12% up from last period"
          icon={<Users size={13} />}
        />

        <AnalyticsSummaryCard
          label="CELLAR VINTAGE SALES"
          value="$58,420"
          description="8.4% above target"
          icon={<Package size={13} />}
        />

        <AnalyticsSummaryCard
          label="SALON TABLE TURN"
          value="1.84"
          description="HOURS (avg)"
          icon={<Clock3 size={13} />}
        />
      </section>

      {/* Bottom operational cards */}
      <section className="analytics-bottom-grid">
        <div className="analytics-operational-card">
          <div className="operational-icon">
            <Clock3 size={14} />
          </div>

          <div>
            <p>PEAK DINING WINDOW</p>
            <strong>7:30 PM - 9:30 PM</strong>
            <span>72% salon occupancy</span>
          </div>
        </div>

        <div className="analytics-operational-card">
          <div className="operational-icon">
            <Star size={14} />
          </div>

          <div>
            <p>SOMMELIER RATING</p>
            <strong>68% ALCHEMY</strong>
            <span>Grand Cru satisfaction</span>
          </div>
        </div>

        <div className="analytics-operational-card">
          <div className="operational-icon">
            <Star size={14} />
          </div>

          <div>
            <p>SERVICE CONSISTENCY</p>
            <strong>94% Excellent</strong>
            <span>Zero table incidents</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Analytics;
