import { SlidersHorizontal } from "lucide-react";
import { useOrdersState } from "../../Contexts/AppContext";
import { getTopProductsByRevenue } from "../../utils/topProducts";

const TopActiveCourses = () => {
  const { orders } = useOrdersState();
  const topThree = getTopProductsByRevenue(orders, 3);
  console.log(topThree);
  return (
    <article className="top-courses-card">
      <div className="top-courses-header">
        <div>
          <p className="top-courses-eyebrow">COURSE CONTRIBUTION</p>

          <h2>Top Active Courses</h2>
        </div>

        <button>
          <SlidersHorizontal size={13} />
        </button>
      </div>

      <div className="courses-list">
        {topThree.map((item, i) => (
          <div className="course-item" key={item.id}>
            <span className="course-number">{i + 1}</span>

            <div className="course-info">
              <div className="course-title-row">
                <strong>{item.name}</strong>
                <b>${item.totalRevenue}</b>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="courses-footer">
        <span>Displaying top 4 of 38</span>

        <button>
          FULL
          <br />
          DEGUSTATION
          <br />
          AUDIT
          <span>→</span>
        </button>
      </div>
    </article>
  );
};

export default TopActiveCourses;
