import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faChartPie,
  faCircleCheck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export default function UserActivityCard({
  title,
  subtitle,
  type = "activity",
}) {
  if (type === "distribution") {
    return (
      <article className="user-activity-card">

        <div className="activity-card-heading">
          <div>
            <p className="activity-eyebrow">User quality assurance</p>

            <h3>{title}</h3>

            <p>{subtitle}</p>
          </div>

          <span className="activity-heading-icon">
            <FontAwesomeIcon icon={faChartPie} />
          </span>
        </div>

        <div className="distribution-content">

          <div className="distribution-item">
            <span className="distribution-icon">
              <FontAwesomeIcon icon={faUserGroup} />
            </span>

            <div>
              <strong>1,482</strong>
              <span>Registered patrons</span>
            </div>

            <b>91%</b>
          </div>

          <div className="distribution-item">
            <span className="distribution-icon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>

            <div>
              <strong>28</strong>
              <span>Registered staff</span>
            </div>

            <b>7%</b>
          </div>

          <div className="distribution-item">
            <span className="distribution-icon">
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </span>

            <div>
              <strong>12</strong>
              <span>Pending accounts</span>
            </div>

            <b>2%</b>
          </div>

        </div>

      </article>
    );
  }

  return (
    <article className="user-activity-card">

      <div className="activity-card-heading">
        <div>
          <p className="activity-eyebrow">Engagement trends</p>

          <h3>{title}</h3>

          <p>{subtitle}</p>
        </div>

        <span className="activity-heading-icon">
          <FontAwesomeIcon icon={faArrowTrendUp} />
        </span>
      </div>

      <div className="activity-chart">

        <div className="chart-y-axis">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        <div className="chart-area">

          <div className="chart-grid">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <svg
            className="activity-line"
            viewBox="0 0 500 180"
            preserveAspectRatio="none"
            aria-label="User activity chart"
          >
            <path
              d="M0 145
                 C35 140, 45 125, 70 132
                 S105 145, 125 126
                 S160 112, 180 116
                 S210 100, 230 110
                 S260 82, 285 93
                 S320 128, 345 105
                 S375 65, 400 70
                 S430 98, 450 72
                 S480 42, 500 15"
            />
          </svg>

          <div className="chart-x-axis">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

        </div>

      </div>

    </article>
  );
}