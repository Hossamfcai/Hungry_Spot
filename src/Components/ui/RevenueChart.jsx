import React from "react";
import { MoreHorizontal } from "lucide-react";

const RevenueChart = () => {
  return (
    <article className="revenue-chart-card">
      <div className="revenue-chart-header">
        <div>
          <p className="revenue-eyebrow">REVENUE PERFORMANCE</p>

          <h2>Revenue Over Time</h2>

          <span>May 2024 through October 2024</span>
        </div>

        <button className="chart-filter-button">
          AOV: <strong>$285 Avg</strong>
        </button>
      </div>

      <div className="revenue-chart">
        <div className="chart-y-labels">
          <span>$30K</span>
          <span>$20K</span>
          <span>$10K</span>
          <span>$0</span>
        </div>

        <div className="chart-content">
          <div className="chart-horizontal-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <svg
            className="revenue-svg"
            viewBox="0 0 700 260"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="revenueFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(217, 119, 7, 0.35)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(217, 119, 7, 0)"
                />
              </linearGradient>
            </defs>

            <path
              className="revenue-area"
              d="
                M 0 215
                C 85 205, 125 190, 190 178
                C 270 160, 315 140, 375 125
                C 450 105, 495 82, 545 62
                C 605 42, 650 25, 700 5
                L 700 260
                L 0 260
                Z
              "
            />

            <path
              className="revenue-line"
              d="
                M 0 215
                C 85 205, 125 190, 190 178
                C 270 160, 315 140, 375 125
                C 450 105, 495 82, 545 62
                C 605 42, 650 25, 700 5
              "
            />

            <circle cx="0" cy="215" r="4" />
            <circle cx="190" cy="178" r="4" />
            <circle cx="375" cy="125" r="4" />
            <circle cx="545" cy="62" r="4" />
            <circle cx="700" cy="5" r="4" />
          </svg>

          <div className="chart-months">
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
          </div>
        </div>
      </div>

      <div className="revenue-chart-footer">
        <span>May $18K</span>
        <span>Jun $20.4K</span>
        <span>Jul $22.6K</span>
        <span>Aug $25.1K</span>
        <span>Sep $31.8K</span>
        <strong>Oct $48.4K</strong>
      </div>

      <button className="revenue-more-button">
        <MoreHorizontal size={15} />
      </button>
    </article>
  );
};

export default RevenueChart;