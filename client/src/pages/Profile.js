import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../style/UserInfo.css";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <DefaultLayout>
        {user && (
          <div className="user-details">
            <h3 className="section-title">Personal information</h3>
            <p className="user-detail"><strong>First name:</strong> {user.firstName}</p>
            <p className="user-detail"><strong>Last name:</strong> {user.lastName}</p>
            <p className="user-detail"><strong>Email:</strong> {user.email}</p>
            <p className="user-detail"><strong>Mobile Number:</strong> {user.mobileNumber}</p>
            <p className="user-detail"><strong>Address:</strong> {user.address}</p>

            <hr className="section-divider" />
            <p className="user-detail"><strong>About:</strong> {user.about}</p>

            <hr className="section-divider" />
            <h3 className="section-title">Skills</h3>
            <ul className="skills-list">
              {user.skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>

            <hr className="section-divider" />
            <h3 className="section-title">Education</h3>
            <ul className="education-list">
              {user.education.map((education, index) => <li key={index}>{education}</li>)}
            </ul>

            <hr className="section-divider" />
            <h3 className="section-title">Projects</h3>
            <ul className="projects-list">
              {user.projects.map((project, index) => <li key={index}>{project}</li>)}
            </ul>

            <hr className="section-divider" />
            <h3 className="section-title">Experience</h3>
            <ul className="experience-list">
              {user.experience.map((experience, index) => <li key={index}>{experience}</li>)}
            </ul>

          </div>

        )}
        <Button onClick={() => history.push('/updateprofile')}>Edit your account</Button>
        <Button onClick={handleGoBack}>Back</Button>
      </DefaultLayout>
    </div>
  );
}

export default Profile;