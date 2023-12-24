import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Form, Modal, Space } from 'antd';
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
} from '@ant-design/icons';

import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
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
      title: <Link to={webRoutes.users}>Users</Link>,
    },
  ],
};

const Users = () => {
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

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Users',
          tooltip: {
            className: 'opacity-60',
            title: 'Users data',
          },
          title: <FiUsers className="opacity-60" />,
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
        title="Add User"
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
        <ProFormText
          name="firmName"
          label="Firm Name"
          rules={[{ required: true, message: 'Please enter the firm name' }]}
        />
        <ProFormText
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter the address' }]}
        />
        {/* <ProFormText
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please enter the state' }]}
        /> */}
        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please select the state' }]}
        >
          <Select>
            {stateOptions.map((state) => (
              <Select.Option key={state} value={state}>
                {state}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <ProFormText
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter the email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        />
        <ProFormText
          name="mobilenumber"
          label="Mobile Number"
          rules={[
            { required: true, message: 'Please enter the contact number' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit contact number',
            },
          ]}
        />
        <ProFormText
          name="gstNumber"
          label="GST Number"
          rules={[{ required: true, message: 'Please enter the GST number' }]}
        />
        <ProFormText
          name="panNumber"
          label="PAN Number"
          rules={[{ required: true, message: 'Please enter the PAN number' }]}
        />
        <ProFormText
          name="bankName"
          label="Bank Name"
          rules={[{ required: true, message: 'Please enter the bank name' }]}
        />
        <ProFormText
          name="branchName"
          label="Branch Name"
          rules={[{ required: true, message: 'Please enter the branch name' }]}
        />
        <ProFormText
          name="ifscCode"
          label="IFSC Code"
          rules={[{ required: true, message: 'Please enter the IFSC code' }]}
        />
        <ProFormText
          name="accountNumber"
          label="Account Number"
          rules={[
            { required: true, message: 'Please enter the account number' },
          ]}
        />
      </ModalForm>
    </BasePageContainer>
  );
};

export default Users;
