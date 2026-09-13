import React from "react";
import { SlidersHorizontal } from "lucide-react";

const courses = [
  {
    number: "01",
    name: "Grilled Chilean Seabass",
    price: "$36,400",
    description: "Saffron reduction & gilded 24ct truffle.",
  },
  {
    number: "02",
    name: "Miyazaki Wagyu A5 Striploin",
    price: "$28,800",
    description: "Binchotan ash with a wildwood jus.",
  },
  {
    number: "03",
    name: "Nori Black Truffle Tortellini",
    price: "$19,800",
    description: "Aged parmesan velouté.",
  },
  {
    number: "04",
    name: "Citrus Blossom & Honey Domaine",
    price: "$11,400",
    description: "Vintage citrus & candied violet.",
  },
];

const TopActiveCourses = () => {
  return (
    <article className="top-courses-card">
      <div className="top-courses-header">
        <div>
          <p className="top-courses-eyebrow">
            COURSE CONTRIBUTION
          </p>

          <h2>Top Active Courses</h2>
        </div>

        <button>
          <SlidersHorizontal size={13} />
        </button>
      </div>

      <div className="courses-list">
        {courses.map((course) => (
          <div className="course-item" key={course.number}>
            <span className="course-number">
              {course.number}
            </span>

            <div className="course-info">
              <div className="course-title-row">
                <strong>{course.name}</strong>
                <b>{course.price}</b>
              </div>

              <p>{course.description}</p>
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