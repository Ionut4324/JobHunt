const express = require("express");
const router = express.Router();
const Job = require("../models/jobModel")
const User = require("../models/userModel")
const moment = require("moment");
const fs = require("fs");
const path = require("path");


router.get("/getalljobs", async (req, res) => {

    try {
        const jobs = await Job.find()
        res.send(jobs)
    } catch (error) {
        return res.status(400).json({ error });
    }

});


router.post("/postjob", async (req, res) => {

    try {
        const newjob = new Job(req.body)
        await newjob.save()
        res.send('Job Posted Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }

});



router.post("/editjob", async (req, res) => {

    // const { user } = req.body

    // const logFilePath = path.join(__dirname, "../logs/account.log");
    // const logMessage = `{User ID: ${user._id}, First name: ${user.}, Date: ${moment().format('MMM DD YYYY')}}\n`;

    try {
        const updatedjob = await Job.findOneAndUpdate({ _id: req.body._id }, req.body)
        res.send('Job Updated Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }

});



router.post("/applyjob", async (req, res) => {

    const { user, job } = req.body

    const logFilePath = path.join(__dirname, "../logs/jobApplication.log");
    const logMessage = `{ User ${user.username} with:\n\tUser ID: ${user._id} \n\temail: ${user.email} \n  Applied for: \n\tJob title: ${job.title} \n\tJob ID: ${job._id} \n\tDate: ${moment().utcOffset(-0).format("MMM DD YYYY, HH:mm:ss [UTC]")}\n}\n\n`;

    try {

        const jobDetails = await Job.findOne({ _id: job._id })
        const appliedCandidate = {
            userid: user._id,
            appliedDate: moment().format('MMM DD yyyy')
        }

        jobDetails.appliedCandidates.push(appliedCandidate)
        await jobDetails.save()

        const userDetails = await User.findOne({ _id: user._id })
        const appliedJob = {
            jobid: job._id,
            appliedDate: moment().format('MMM DD yyyy')
        }

        userDetails.appliedJobs.push(appliedJob)
        await userDetails.save()

        // Append the log message to the log file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            } else {
                console.log("Log entry added successfully.");
            }
        });

        res.send('Job Applied Successfully')

    } catch (error) {
        const errorMessage = `{Error: ${error.message} \n\tDate: ${moment().utcOffset(-0).format("MMM DD YYYY, HH:mm:ss [UTC]")}}\n`;
        fs.appendFileSync(logFilePath, errorMessage);
        res.send(error)
    }
});

router.post("/deletejob", async (req, res) => {

    try {
        const deletedjob = await Job.findOneAndDelete({ _id: req.body._id })
        res.send('Job Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }

});

module.exports = router;
