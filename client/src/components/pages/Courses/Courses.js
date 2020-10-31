import React, { Fragment } from "react";
import PropTypes from "prop-types";
import GridWrapper from "../../layout/GridWrapper/GridWrapper";
import Sidebar from "../../layout/Sidebar/Sidebar";
import SidebarElements from "../../layout/Sidebar/SidebarElements";
import RightSidebar from "../../layout/Sidebar/RightSidebar";
import CoursesWrapper from "../../layout/GridWrapper/CoursesWrapper";
import "./Courses.css";
import SidebarButton from "../../layout/Sidebar/SidebarButton";
function Courses(props) {
  return (
    <Fragment>
      <div className="blackBackground">
        <GridWrapper>
          <Sidebar>
            <SidebarElements name="Browse Courses" />
            <SidebarElements name="To-Do" />
            <SidebarElements name="Upcomming Assignments" />
            <br></br>
            <SidebarButton text="+ Add Course"></SidebarButton>
          </Sidebar>
          <div className="course-section">
            <div className="addCourse">Add Courses</div>
          </div>
          <RightSidebar>
            <CoursesWrapper>
              <SidebarElements name="Physics"></SidebarElements>
            </CoursesWrapper>
          </RightSidebar>
        </GridWrapper>
      </div>
    </Fragment>
  );
}

Courses.propTypes = {};

export default Courses;
