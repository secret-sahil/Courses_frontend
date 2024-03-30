import React, { useState, useEffect } from "react";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

export default function MyStats({ courses }) {
  console.log(courses);
  const [maxValues, setMaxValues] = useState({
    first: 0,
    second: 0,
    third: 0,
  }); //setting the maximum value for the progressbar by default to 0

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMaxValues({ first: 0, second: 0, third: 0 });
    }, 1500);

    return () => {
      clearTimeout(timeout);
    }; // Cleanup function to clear timeout on unmount or state change
  }, []);

  const handleCourseClick = (course) => {
    console.log(course);
    setSelectedCourse(course);
  };

  const calculateAverageProgress = (completedAssignments, completedLessons) => {
    const totalCompleted = completedAssignments + completedLessons;
    return totalCompleted > 0
      ? ((completedAssignments + completedLessons) / 2).toFixed(2)
      : 0;
  };

  return (
    <div className="px-[8%] mt-20 mb-24 xsm:px-[5%] xsm:m-[6%]">
      <div className="flex flex-row justify-between xsm:flex-col-reverse xsm:gap-10">
        <div className="w-[43%] xsm:w-full">
          <p className="font-nu font-semibold text-[20px] text-[#243465] xsm:text-[10px]">
            TOTAL COURSES
          </p>
          <div className="">
            {courses?.map((val, ind) => {
              return (
                <div key={ind} onClick={() => handleCourseClick(val)}>
                  {/* Course Item */}
                  <div className="flex justify-evenly py-6 cursor-pointer xsm:justify-between xsm:py-2 xsm:pt-4">
                    <div className="w-[17%] font-nu font-semibold xsm:w-[14%]">
                      <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={val?.completed_lessons.length}
                        duration={1.4}
                        easingFunction={easeQuadInOut}
                      >
                        {(value) => {
                          const roundedValue = Math.round(value);
                          return (
                            <CircularProgressbar
                              value={val?.completed_lessons.length}
                              text={`${val?.completed_lessons.length}%`}
                              styles={buildStyles({
                                pathTransition:
                                  "stroke-dashoffset 1s ease 0s",
                                pathColor: "#04BFDA",
                                trailColor: "#E9EBF3",
                              })}
                            />
                          );
                        }}
                      </AnimatedProgressProvider>
                    </div>
                    <div className="flex items-center justify-between w-[60%]">
                      <div>
                        <p className="font-nu font-semibold text-[#243465] text-[22px] xsm:text-[10px] xsm:pb-1">
                          {val?.course.title}
                        </p>
                      </div>
                      <div>
                        <img
                          className="w-[16px] h-[16px] xsm:w-[8px] xsm:h-[8px]"
                          src="../Icons/MSarrow.svg"
                          alt="arrow"
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border-dashed" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[45%] xsm:w-full xsm:flex xsm:flex-col xsm:gap-2">
          {/* Right Side Progress Bars */}
          <p className="font-nu font-semibold text-[20px] text-[#243465] xsm:text-[10px]">
            Your Spending
          </p>
          <div className="xsm:flex xsm:flex-row xsm:gap-40">
            <div className=" flex items-center justify-center mt-12 w-full h-[350px] xsm:w-[50%] xsm:h-[60%] xsm:mt-0">
              {/* progressbar of each Course */}
              <AnimatedProgressProvider
                valueStart={0}
                valueEnd={calculateAverageProgress(selectedCourse?.completed_assignments.length || 0,selectedCourse?.completed_lessons.length || 0)}
                duration={1.4}
                easingFunction={easeQuadInOut}
              >
                {(value) => {
                  const roundedValue = Math.round(value);
                  return (
                    <CircularProgressbarWithChildren
                      value={calculateAverageProgress(selectedCourse?.completed_assignments.length || 0,selectedCourse?.completed_lessons.length || 0)}
                      strokeWidth={3}
                      styles={buildStyles({
                        pathColor: "#FB67CA",
                        trailColor: "#E9EBF3",
                        pathTransition: "stroke-dashoffset 1s ease 0s",
                      })}
                    >
                      <div style={{ width: "85%" }}>
                        <AnimatedProgressProvider
                          valueStart={0}
                          valueEnd={selectedCourse?.completed_assignments.length || 0}
                          duration={1.4}
                          easingFunction={easeQuadInOut}
                        >
                          {(value) => {
                            const roundedValue = Math.round(value);
                            return (
                              <CircularProgressbarWithChildren
                                value={selectedCourse?.completed_assignments.length || 0}
                                strokeWidth={4}
                                styles={buildStyles({
                                  pathColor: "#FFA84A",
                                  trailColor: "#E9EBF3",
                                  pathTransition:
                                    "stroke-dashoffset 1s ease 0s",
                                })}
                              >
                                <div style={{ width: "80%" }}>
                                  <AnimatedProgressProvider
                                    valueStart={0}
                                    valueEnd={selectedCourse?.completed_lessons.length || 0}
                                    duration={1.4}
                                    easingFunction={easeQuadInOut}
                                  >
                                    {(value) => {
                                      const roundedValue = Math.round(value);
                                      return (
                                        <CircularProgressbarWithChildren
                                          value={selectedCourse?.completed_lessons.length || 0}
                                          strokeWidth={5}
                                          styles={buildStyles({
                                            pathColor: "#04BFDA",
                                            trailColor: "#E9EBF3",
                                            pathTransition:
                                              "stroke-dashoffset 1s ease 0s",
                                          })}
                                        />
                                      );
                                    }}
                                  </AnimatedProgressProvider>
                                </div>
                              </CircularProgressbarWithChildren>
                            );
                          }}
                        </AnimatedProgressProvider>
                      </div>
                    </CircularProgressbarWithChildren>
                  );
                }}
              </AnimatedProgressProvider>
            </div>
            <div className="flex space-x-10 mt-12">
              <div className="flex flex-col items-center">
                <div className="flex space-x-2 items-center">
                  <img
                    className="w-[15px] h-[15px]"
                    src="../Icons/MSpinkcircle.svg"
                  />
                  <p className="font-Inter font-semibold text-[#7A7A7A] text-[18px]">
                    Completed
                  </p>
                </div>
                <p className="font-nu font-semibold text-[20px]">{calculateAverageProgress(selectedCourse?.completed_assignments.length,selectedCourse?.completed_lessons.length)}%</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex space-x-2 items-center">
                  <img
                    className="w-[15px] h-[15px]"
                    src="../Icons/MSorangecircle.svg"
                  />
                  <p className="font-Inter font-semibold text-[#7A7A7A] text-[18px]">
                    Assignment
                  </p>
                </div>
                <p className="font-nu font-semibold text-[20px]">{selectedCourse?.completed_assignments.length}%</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex space-x-2 items-center">
                  <img
                    className="w-[15px] h-[15px]"
                    src="../Icons/MSbluecircle.svg"
                  />
                  <p className="font-Inter font-semibold text-[#7A7A7A] text-[18px]">
                    Lessons
                  </p>
                </div>
                <p className="font-nu font-semibold text-[20px]">{selectedCourse?.completed_lessons.length}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
