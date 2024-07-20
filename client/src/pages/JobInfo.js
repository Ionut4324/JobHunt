import { Button, Tag } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { applyJob } from "../redux/actions/jobActions.";
import "../style/JobInfo.css";
import { useHistory } from 'react-router-dom';

function JobInfo({ match }) {
  const { jobs } = useSelector((state) => state.jobsReducer);

  const job = jobs.find((job) => job._id === match.params.id);

  const userid = JSON.parse(localStorage.getItem("user"))._id;

  const appliedCandidates = job.appliedCandidates;

  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userid === userid
  );

  const dispatch = useDispatch();

  function applyNow() {
    dispatch(applyJob(job));
  }

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  // return (
  //   <div>
  //     <DefaultLayout>
  //       {job && (
  //         <div>
  //           <p>
  //             <b>Title</b> : {job.title}
  //           </p>
  //           <p>
  //             <b>Company</b> : {job.company}
  //           </p>

  //           <p>
  //             <b>Small Description</b> : {job.smallDescription}
  //           </p>
  //           <p>
  //             <b>Full Description</b> : {job.fullDescription}
  //           </p>
  //           <p>
  //             <b>Title</b> : {job.title}
  //           </p>
  //           <p>
  //             <b>Skills Required</b> : {job.skillsRequired}
  //           </p>
  //           <p>
  //             <b>Experience</b> : {job.experience}
  //           </p>
  //           <p>
  //             <b>Minimum Qualification</b> : {job.minimumQualification}
  //           </p>

  //           <hr />

  //           <p>
  //             <b>Salary Range</b> : {job.salaryFrom} - {job.salaryTo}
  //           </p>
  //           <p>
  //             <b>Department</b> : {job.department}
  //           </p>
  //           <p>
  //             <b>Company Profile</b> : {job.companyDescription}
  //           </p>
  //           <p>
  //             <b>Total Candidates applied</b> : {job.appliedCandidates.length}
  //           </p>

  //           <hr />

  //           <div className="flex justify-content-between">
  //             {job.postedBy === userid ? (
  //               <Button>
  //                 <Link to={`/editjob/${job._id}`}>Edit Now</Link>
  //               </Button>
  //             ) : alreadyApplied ? (
  //               <Tag color="green">Already Applied</Tag>
  //             ) : (
  //               <Button onClick={applyNow}>Apply Now</Button>
  //             )}

  //           </div>
  //           <p>
  //             <b>Posted on</b> {moment(job.createdAt).format("MMM DD yyyy")}
  //           </p>
  //           <p>
  //             <b>Posted by</b> {job.postedBy === userid ? "You" : job.postedBy}
  //           </p>
  //         </div>
  //       )}
  //     </DefaultLayout>
  //   </div>
  // );
  return (
    <div className="job-info-container">
      <DefaultLayout>

        {job && (
          <div className="job-details">
            <p className="job-title"><b>Title:</b> {job.title}</p>
            <p className="job-company"><b>Company:</b> {job.company}</p>
            {/* <p className="job-small-desc"><b>Small Description:</b> {job.smallDescription}</p> */}
            <p className="job-full-desc"><b>Job Description:</b> {job.fullDescription}</p>
            <hr />
            <p className="job-skills-required"><b>Skills Required:</b> {job.skillsRequired}</p>
            <p className="job-experience"><b>Experience:</b> {job.experience} years in similar positions</p>
            <p className="job-min-qual"><b>Minimum Qualification:</b> {job.minimumQualification}</p>
            <p className="job-salary-range"><b>Salary Range (RON):</b> {job.salaryFrom} - {job.salaryTo}</p>
            <hr />
            <p className="job-department"><b>Department:</b> {job.department}</p>
            <p className="job-company-profile"><b>Company Profile:</b> {job.companyDescription}</p>
            <p className="job-total-candidates"><b>Total Candidates applied:</b> {job.appliedCandidates.length}</p>
            <hr />
            <div className="job-actions">
              {job.postedBy === userid ? (
                <Button className="edit-job-button"><Link to={`/editjob/${job._id}`}>Edit Now</Link></Button>
              ) : alreadyApplied ? (
                <Tag color="green" className="already-applied-tag">Already Applied</Tag>
              ) : (
                <Button className="apply-now-button" onClick={applyNow}>Apply Now</Button>
              )}
            </div>
            <p className="job-posted-on"><b>Posted on:</b> {moment(job.createdAt).format("MMM DD yyyy")}</p>
            <p className="job-posted-by"><b>Posted by:</b> {job.postedBy === userid ? "You" : job.postedBy}</p>
          </div>
        )}
      <Button onClick={handleGoBack}>Back</Button>
      </DefaultLayout>
    </div>
  );

}

export default JobInfo;

