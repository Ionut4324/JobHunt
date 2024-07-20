// import React from "react";
// import DefaultLayout from "../components/DefaultLayout";
// import { useSelector } from "react-redux";
// function UserInfo({ match }) {
//   const { users } = useSelector((state) => state.usersReducer);

//   const user = users.find((user) => user._id === match.params.id);
//   return (
//     <div>
//       <DefaultLayout>
//         {user && (
//           <div>
//             <h3>
//               <b>Personal information</b>
//             </h3>
//             <p>
//               <b>First name : </b>
//               {user.firstName}
//             </p>
//             <p>
//               <b>Last name : </b>
//               {user.lastName}
//             </p>
//             <p>
//               <b>Email : </b>
//               {user.email}
//             </p>
//             <p>
//               <b>Mobile Number : </b>
//               {user.mobileNumber}
//             </p>
//             <p>
//               <b>Address : </b>
//               {user.address}
//             </p>

//             <hr />
//             <h3>
//               <b>Skills</b>
//             </h3>

//             {user.skills.map((skill) => {
//               return <li>{skill}</li>;
//             })}

//             <hr />
//             <h3>
//               <b>Education</b>
//             </h3>
//             {user.education.map((education) => {
//               return <li>{education}</li>;
//             })}
//             <hr />

//             <h3>
//               <b>Projects</b>
//             </h3>
//             {user.projects.map((project) => {
//               return <li>{project}</li>;
//             })}

//             <hr />
//             <h3>
//               <b>Experience</b>
//             </h3>
//             {user.experience.map((experience) => {
//               return <li>{experience}</li>;
//             })}
//           </div>
//         )}
//       </DefaultLayout>
//     </div>
//   );
// }

// export default UserInfo;

import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import "../style/UserInfo.css";
import { useHistory } from "react-router-dom";
import { Button } from "antd";

function UserInfo({ match }) {
  const { users } = useSelector((state) => state.usersReducer);
  const user = users.find((user) => user._id === match.params.id);

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
        <Button onClick={handleGoBack}>Back</Button>
      </DefaultLayout>
    </div>
  );
}

export default UserInfo;

