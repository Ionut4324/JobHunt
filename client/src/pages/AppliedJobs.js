import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";
function AppliedJobs() {
    const { jobs } = useSelector(state => state.jobsReducer)

    const user = JSON.parse(localStorage.getItem('user'))

    const userAppliedJobs = []

    const userid = JSON.parse(localStorage.getItem("user"))._id;


    for (var job of jobs) {

        var appliedCandidates = job.appliedCandidates

        var temp = appliedCandidates.find(candidate => candidate.userid === user._id)


        if (temp) {

            var obj = {
                title: job.title,
                company: job.company,
                appliedDate: temp.appliedDate,
                userAppliedJob: job
            }

            userAppliedJobs.push(obj)

        }



    }

    const columns = [
        {
            title: 'Job Title',
            dataIndex: 'title'
        },
        {
            title: 'Company',
            dataIndex: 'company'
        }, {
            title: 'Applied Date',
            dataIndex: 'appliedDate'
        },
        {
            title: 'Post',
            render: (text, data) => (
                <Link to={`/jobs/${data.userAppliedJob._id}`}><Button>View</Button></Link>
            )
        },
        {
            title: 'Chat',
            render: (text, data) => (
                <Link to={`/chat/${data.userAppliedJob.postedBy}`}>
                    <Button>
                        Chat
                    </Button>
                </Link>
            )
        }
    ]

    return (
        <div>
            <DefaultLayout>
                <h1>Applied Jobs</h1>
                <Table columns={columns} dataSource={userAppliedJobs} />
            </DefaultLayout>
        </div>
    )
}

export default AppliedJobs