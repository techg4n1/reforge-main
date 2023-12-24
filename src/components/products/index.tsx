import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Avatar, BreadcrumbProps, Form, Modal, Space, Upload } from 'antd';
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
  InboxOutlined ,
  ShoppingOutlined,
} from '@ant-design/icons';

import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import Checkbox from 'antd/lib/checkbox';
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
      key: webRoutes.products,
      title: <Link to={webRoutes.products}>Products</Link>,
    },
  ],
};

const Products = () => {
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
          subTitle: 'Products',
          tooltip: {
            className: 'opacity-60',
            title: 'Products data',
          },
          title: <ShoppingOutlined className="opacity-60" />,
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
        title="Add Product"
        open ={modalVisible}
        onOpenChange ={setModalVisible}
        onFinish={handleAddFormSubmit}
        submitter={{
          render: (_, dom) => <>{dom}</>,
          submitButtonProps: {
            style: { backgroundColor: 'red' },
          },
        }}
      >
        <ProFormText
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        />
        <ProFormText
          name="serialNoModel"
          label="Serial No/Model"
          rules={[
            { required: true, message: 'Please enter the serial number/model' },
          ]}
        />
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select the category' }]}
        >
          <Select>
            <Select.Option value="Power Tools">Power Tools</Select.Option>
            <Select.Option value="Safety Products">
              Safety Products
            </Select.Option>
            <Select.Option value="Fire Welding Accessories">
              Fire Welding Accessories
            </Select.Option>
            <Select.Option value="Hand Tools and Hardware">
              Hand Tools and Hardware
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: 'Please select the brand' }]}
        >
          <Select>
            <Select.Option value="Brand 1">Brand 1</Select.Option>
            <Select.Option value="Brand 2">Brand 2</Select.Option>
            <Select.Option value="Brand 3">Brand 3</Select.Option>
            {/* Add more brand options as needed */}
          </Select>
        </Form.Item>
        <Form.Item
          name="dataSheet"
          label="Data Sheet"
          rules={[{ required: true, message: 'Please upload the data sheet' }]}
          valuePropName="fileList"
          // getValueFromEvent={normFile}
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
        <ProFormText
          name="dataSheetText1"
          label="Data Sheet Text 1"
          rules={[
            { required: true, message: 'Please enter the data sheet text 1' },
          ]}
        />
        <ProFormText
          name="hsnCode"
          label="HSN Code"
          rules={[{ required: true, message: 'Please enter the HSN code' }]}
        />
        <Form.Item
          name="uom"
          label="UOM"
          rules={[{ required: true, message: 'Please select the UOM' }]}
        >
          <Select>
            <Select.Option value="piece">Piece</Select.Option>
            <Select.Option value="kg">Kg</Select.Option>
            <Select.Option value="pair">Pair</Select.Option>
            <Select.Option value="kit">Kit</Select.Option>
            <Select.Option value="nos">Nos</Select.Option>
            <Select.Option value="set">Set</Select.Option>
          </Select>
        </Form.Item>
        <ProFormText
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        />
        <ProFormText
          name="discount"
          label="Discount"
          rules={[{ required: true, message: 'Please enter the discount' }]}
        />
        <ProFormText
          name="gst"
          label="GST"
          rules={[{ required: true, message: 'Please enter the GST' }]}
        />
        <Form.Item name="isActiveInPanel" valuePropName="checked">
          <Checkbox>Active in Panel</Checkbox>
        </Form.Item>
        <Form.Item name="isActiveInWebsite" valuePropName="checked">
          <Checkbox>Active in Website</Checkbox>
        </Form.Item>
      </ModalForm>
    </BasePageContainer>
  );
};

export default Products;
