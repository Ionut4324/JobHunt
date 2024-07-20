import { Input, Modal, Form, Select, Button } from "antd";
import React, { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { searchJobs, sortJobs } from "../redux/actions/jobActions.";


const { Search } = Input;
const { Option } = Select;
function Filter() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function sort(values) {

    dispatch(sortJobs(values))

    handleCancel()
  }
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div className="flex">
      <Search onSearch={(value) => { dispatch(searchJobs(value)) }} />
      <FilterOutlined onClick={showModal} />

      <Modal title="Select filters" footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false}>
        <Form form={form} layout='vertical' onFinish={sort}>
          <Form.Item name='experience' label='Experience'>

            <Select>
              <Option value={0}>Fresher</Option>
              <Option value={1}>1 Year</Option>
              <Option value={2}>2 Years</Option>
              <Option value={3}>3 Years</Option>
              <Option value={4}>4 Years</Option>
              <Option value={5}>5 Years</Option>

            </Select>

          </Form.Item>

          <Form.Item name='salary' label='Salary'>

            <Select>
              <Option value={2000}>2000$+</Option>
              <Option value={3500}>3500$+</Option>
              <Option value={5000}>5000$+</Option>
              <Option value={7500}>7500$+</Option>
              <Option value={10000}>10000$+</Option>
              <Option value={15000}>15000$+</Option>

            </Select>

          </Form.Item>

          <Form.Item name='department' label='Department'>

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

          <Form.Item name='company' label='Company'>

            {/* <Select>
              <Option value={"Google"}>Google</Option>
              <Option value={"Facebook"}>Facebook</Option>
              <Option value={"Amazon"}>Amazon</Option>
              <Option value={"Microsoft"}>Microsoft</Option>
              <Option value={"Apple"}>Apple</Option>
              <Option value={"Netflix"}>Netflix</Option>
              <Option value={"Twitter"}>Twitter</Option>
              <Option value={"Linkedin"}>Linkedin</Option>
              <Option value={"Uber"}>Uber</Option>
              <Option value={"Airbnb"}>Airbnb</Option>
              <Option value={"Idemia"}>Idemia</Option>
              <Option value={"Tesla"}>Tesla</Option>

            </Select> */}
            <Input/>

          </Form.Item>

          <Button htmlType="submit">Filter</Button>

          <Button onClick={handleReset}>Reset</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Filter;
