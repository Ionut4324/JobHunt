import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Tabs, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editJob, deleteJob } from "../redux/actions/jobActions.";
import { useHistory } from "react-router-dom";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
function EditJob({ match }) {
  const [jobInfo, setJobInfo] = useState({});
  const [activeTab, setActiveTab] = useState("0");
  const dispatch = useDispatch()

  function onFirstFormFinish(values) {
    setJobInfo(values);
    setActiveTab("1");
  }

  function onFinalFormFinish(values) {
    const finalObj = { ...jobInfo, ...values };

    finalObj._id = match.params.id
    console.log(finalObj)
    dispatch(editJob(finalObj))
  }


  const { jobs } = useSelector(state => state.jobsReducer)

  const job = jobs.find(job => job._id === match.params.id)

  console.log(job)

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(deleteJob({ _id: match.params.id }))
  }

  return (
    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="0" activeKey={activeTab}>
          <TabPane tab="Job Info" key="0">
            <Form layout="vertical" onFinish={onFirstFormFinish} initialValues={job}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                    label="Title"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="department"
                    rules={[{ required: true }]}
                    label="Department"
                  >
                    <Select>
                      <Option value={"Software Development"}>Software Development</Option>
                      <Option value={"IT"}>IT</Option>
                      <Option value={"Cyber Security"}>Cyber Security</Option>
                      <Option value={"Networking"}>Networking</Option>
                      <Option value={"Infrastructure"}>Infrastructure</Option>
                      <Option value={"Key management"}>Key management</Option>
                      <Option value={"DevOps"}>DevOps</Option>
                      <Option value={"Database"}>Database</Option>
                      <Option value={"Data science"}>Data Science</Option>
                      <Option value={"Project management"}>Project management</Option>
                      <Option value={"Other"}>Other</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="experience"
                    rules={[{ required: true }]}
                    label="Experience"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="salaryFrom"
                    rules={[{ required: true }]}
                    label="Salary From"
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="salaryTo"
                    rules={[{ required: true }]}
                    label="Salary To"
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="skillsRequired"
                    rules={[{ required: true }]}
                    label="Skills"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="minimumQualification"
                    rules={[{ required: true }]}
                    label="Minimum Qualification"
                  >
                    <Select>
                      <Option value="Bachelor's Degree">Bachelor's Degree</Option>
                      <Option value="Master">Master</Option>
                      <Option value="Certificates">Certificates</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="smallDescription"
                    rules={[{ required: true }]}
                    label="Small description"
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="fullDescription"
                    rules={[{ required: true }]}
                    label="Full description"
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
              </Row>

              <Button htmlType="submit">Next</Button>
              <Button onClick={handleGoBack}>Back</Button>
            </Form>
          </TabPane>
          <TabPane tab="Company Info" key="1">
            <Form layout='vertical' onFinish={onFinalFormFinish} initialValues={job}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="company"
                    label="Company Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="email"
                    label="Company Email"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone number"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    name="companyDescription"
                    label="Company Description"
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>

              </Row>
              <Button onClick={() => { setActiveTab("0") }}>Previous</Button>
              <Button htmlType="submit">Edit Job</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </Form>
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default EditJob;
