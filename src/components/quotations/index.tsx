import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
  ProForm,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Col, Form, Modal, Row, Space } from 'antd';
import { useRef } from 'react';
import { FiUsers } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
import { webRoutes } from '../../routes/web';
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
} from '../../utils';
import http from '../../utils/http';
import BasePageContainer from '../layout/PageContainer';
import LazyImage from '../lazy-image';
import Icon, {
  ExclamationCircleOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
// import MyForm from './stepform';

enum ActionKey {
  DELETE = 'delete',
}

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.quotations}>Quotations</Link>,
    },
  ],
};

const Quotations = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddFormSubmit = async (values: FormValues) => {
    // Perform necessary actions with the form values
    console.log(values);
    // Close the modal
    setModalVisible(false);
    // Return a promise that resolves to void
    return Promise.resolve();
  };

  const handleAddButtonClick = () => {
    setModalVisible(true);
  };
  const columns: ProColumns[] = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      align: 'center',
      sorter: false,
      render: (_, row: User) =>
        row.avatar ? (
          <Avatar
            shape="circle"
            size="small"
            src={
              <LazyImage
                src={row.avatar}
                placeholder={<div className="bg-gray-100 h-full w-full" />}
              />
            }
          />
        ) : (
          <Avatar shape="circle" size="small">
            {row.first_name.charAt(0).toUpperCase()}
          </Avatar>
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: User) => `${row.first_name} ${row.last_name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: false,
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row: User) => [
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => handleActionOnSelect(key, row)}
          menus={[
            {
              key: ActionKey.DELETE,
              name: (
                <Space>
                  <DeleteOutlined />
                  Delete
                </Space>
              ),
            },
          ]}
        >
          <Icon component={CiCircleMore} className="text-primary text-xl" />
        </TableDropdown>,
      ],
    },
  ];

  const handleActionOnSelect = (key: string, user: User) => {
    if (key === ActionKey.DELETE) {
      showDeleteConfirmation(user);
    }
  };

  const showDeleteConfirmation = (user: User) => {
    modal.confirm({
      title: 'Are you sure to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <ProDescriptions column={1} title=" ">
          <ProDescriptions.Item valueType="avatar" label="Avatar">
            {user.avatar}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Name">
            {user.first_name} {user.last_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Email">
            {user.email}
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
      okButtonProps: {
        className: 'bg-primary',
      },
      onOk: () => {
        return http
          .delete(`${apiRoutes.users}/${user.id}`)
          .then(() => {
            showNotification(
              'Success',
              NotificationType.SUCCESS,
              'User is deleted.'
            );

            actionRef.current?.reloadAndRest?.();
          })
          .catch((error) => {
            handleErrorResponse(error);
          });
      },
    });
  };

  const stateOptions = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
  ];

  //Step Form 1 for table

  // const [dataSource, setDataSource] = useState<StepFormTable[]>([]);

  // const handleTableFinish = async (values: any) => {
  //   const newData = [...dataSource, values];
  //   setDataSource(newData);
  // };

  // const tableColumns = [
  //   {
  //     title: 'Category',
  //     dataIndex: 'category',
  //   },
  //   {
  //     title: 'Product',
  //     dataIndex: 'products',
  //   },
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //   },
  //   {
  //     title: 'Discount Availability',
  //     dataIndex: 'discount',
  //   },
  // ];

  //ended step form 1 table code

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Quotations',
          tooltip: {
            className: 'opacity-60',
            title: 'Quotations data',
          },
          title: <FileTextOutlined className="opacity-60" />,
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={'fixed'}
        rowSelection={false}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            //   onClick={handleAddButtonClick}
          >
            Import CSV
          </Button>,
          <Button
            key="button"
            icon={<PlusOutlined />}
            // onClick={handleAddButtonClick}
          >
            Export Format
          </Button>,
          <Button
            key="button"
            icon={<PlusOutlined />}
            //   onClick={handleAddButtonClick}
          >
            Export All
          </Button>,
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleAddButtonClick}
          >
            Add
          </Button>,
        ]}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={(params) => {
          return http
            .get(apiRoutes.users, {
              params: {
                page: params.current,
                per_page: params.pageSize,
              },
            })
            .then((response) => {
              const users: [User] = response.data.data;

              return {
                data: users,
                success: true,
                total: response.data.total,
              } as RequestData<User>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<User>;
            });
        }}
        dateFormatter="string"
        search={false}
        rowKey="id"
        options={{
          search: false,
        }}
      />

      {modalContextHolder}

      <ModalForm
        title="Add Quotation"
        open={modalVisible}
        onOpenChange={setModalVisible}
        onFinish={handleAddFormSubmit}
        submitter={{
          render: (_, dom) => <>{dom}</>,
          submitButtonProps: {
            style: { backgroundColor: 'red' },
          },
        }}
      >
        <StepsForm
          onFinish={handleAddFormSubmit}
          submitter={{
            render: (_, dom) => <>{dom}</>,
            submitButtonProps: {
              style: { backgroundColor: 'red' },
            },
          }}
        >
          <StepsForm.StepForm name="Step1" title="Step 1" layout="horizontal">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <ProFormSelect
                name="category"
                label="Category"
                rules={[
                  { required: true, message: 'Please select a category' },
                ]}
                options={[
                  { label: 'Category 1', value: 'category1' },
                  { label: 'Category 2', value: 'category2' },
                ]}
              />
              <ProFormSelect
                name="products"
                label="Products"
                rules={[{ required: true, message: 'Please select a product' }]}
                options={[
                  { label: 'Product 1', value: 'product1' },
                  { label: 'Product 2', value: 'product2' },
                ]}
              />
              <ProFormText
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter the price' }]}
              />
              <ProFormText
                name="discount"
                label="Discount"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the discount availability',
                  },
                ]}
              />
              <ProFormText
                name="availability"
                label="Availability"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the availability',
                  },
                ]}
              />
    </div>
              {/* Start Table for Qutotation 
              <ProForm
                submitter={{
                  render: (props) => [
                    <Button
                      key="add"
                      type="primary"
                      onClick={props.form?.submit}
                      style={{ backgroundColor: 'red' }}
                    >
                      Add
                    </Button>,
                    <Button
                      key="cancel"
                      onClick={() => props.form?.resetFields()}
                    >
                      Cancel
                    </Button>,
                  ],
                }} 
                onFinish={handleTableFinish}
              ></ProForm>
                </div>

            <ProTable
              columns={tableColumns}
              dataSource={dataSource}
              search={false}
              pagination={false}
              headerTitle="Saved Data"
              style={{ marginTop: 16, width: '100%' }}
            />         
              */}
          </StepsForm.StepForm>

          <StepsForm.StepForm name="Step2" title="Step 2">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormSelect
                  name="firmName"
                  label="Firm Name"
                  rules={[
                    { required: true, message: 'Please select a firm name' },
                  ]}
                  options={[
                    { label: 'Firm 1', value: 'firm1' },
                    { label: 'Firm 2', value: 'firm2' },
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormDatePicker
                  name="quotationDate"
                  label="Quotation Date"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a quotation date',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormDatePicker
                  name="inquiryDate"
                  label="Inquiry Date"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an inquiry date',
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="quotationNumber"
                  label="Quotation Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the quotation number',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="inquiryNumber"
                  label="Inquiry Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the inquiry number',
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  name="company"
                  label="Company Name"
                  rules={[
                    { required: true, message: 'Please select a firm name' },
                  ]}
                  options={[
                    { label: 'Company 1', value: 'company1' },
                    { label: 'Company 2', value: 'company2' },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="subject"
                  label="Subject"
                  rules={[
                    { required: true, message: 'Please enter the subject' },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="aboutUs"
                  label="About Us"
                  initialValue="Some pre-filled details of Safety equipments"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="productProfile"
                  label="Product Profile"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the product profile',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="openingGreeting"
                  label="Opening Greeting"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the opening greeting',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="openingLine"
                  label="Opening Line"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the opening line',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="commercialTerms"
                  label="Commercial Terms & Conditions"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the commercial terms',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="closingGreeting"
                  label="Closing Greeting"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the closing greeting',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="nameAtEnd"
                  label="Name at End"
                  rules={[
                    { required: true, message: 'Please enter the name at end' },
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="phoneAtEnd"
                  label="Phone at End"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the phone at end',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="from"
                  label="From"
                  rules={[{ required: true, message: 'Please enter the from' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="additionalEmail"
                  label="Additional Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the additional email',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="customerRequirement"
                  label="Customer Requirement"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the customer requirement',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <ProFormText
                  name="remark"
                  label="Remark"
                  rules={[
                    { required: true, message: 'Please enter the remark' },
                  ]}
                />
              </Col>
            </Row>
          </StepsForm.StepForm>

          <StepsForm.StepForm name="Step3" title="Step 3">
            <p>Quotation Created Successfully</p>
            <Button>Edit Quotation</Button>
            <Button>Preview Quotation</Button>
            <Button>Download Quotation</Button>
            <Button>Send Quotation</Button>
          </StepsForm.StepForm>
        </StepsForm>
      </ModalForm>
    </BasePageContainer>
  );
};

export default Quotations;
