// import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
// import { Button, message } from 'antd';
// import { ProTable } from '@ant-design/pro-table';
// import { useState } from 'react';

// interface StepFormTable {
//   category: string;
//   products: string;
//   price: number;
//   discount: boolean;
// }

// const MyForm = () => {
//   const [dataSource, setDataSource] = useState<StepFormTable[]>([]);

//   const handleTableFinish = (values: any) => {
//     const newData = [...dataSource, values];
//     setDataSource(newData);
//     message.success('Data added successfully');
//   };

//   const columns = [
//     {
//       title: 'Category',
//       dataIndex: 'category',
//     },
//     {
//       title: 'Product',
//       dataIndex: 'products',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//     },
//     {
//       title: 'Discount Availability',
//       dataIndex: 'discount',
//     },
//   ];

//   return (
//     <>
     
//         <ProForm.StepForm
//           name="Step1"
//           title="Step 1"
//           layout="horizontal"
//           columns={2}
//         >
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: '1fr 1fr',
//               gap: '16px',
//             }}
//           >
//             <ProFormSelect
//               name="category"
//               label="Category"
//               rules={[
//                 { required: true, message: 'Please select a category' },
//               ]}
//               options={[
//                 { label: 'Category 1', value: 'category1' },
//                 { label: 'Category 2', value: 'category2' },
//               ]}
//             />
//             <ProFormSelect
//               name="products"
//               label="Products"
//               rules={[{ required: true, message: 'Please select a product' }]}
//               options={[
//                 { label: 'Product 1', value: 'product1' },
//                 { label: 'Product 2', value: 'product2' },
//               ]}
//             />
//             <ProFormText
//               name="price"
//               label="Price"
//               rules={[{ required: true, message: 'Please enter the price' }]}
//             />
//             <ProFormText
//               name="discount"
//               label="Discount Availability"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please enter the discount availability',
//                 },
//               ]}
//             />
//              <ProForm
//         submitter={{
//           render: (props) => [
//             <Button key="add" type="primary" onClick={props.form?.submit}>
//               Add
//             </Button>,
//             <Button key="cancel" onClick={props.form?.reset}>
//               Cancel
//             </Button>,
//           ],
//         }}
//         onFinish={handleTableFinish}
//       ></ProForm>
//        <ProTable
//         columns={columns}
//         dataSource={dataSource}
//         search={false}
//         pagination={false}
//         headerTitle="Saved Data"
//         style={{ marginTop: 16 }}
//       />
//           </div>
//         </ProForm.StepForm>
//       </ProForm>
     
//     </>
//   );
// };

// export default MyForm;