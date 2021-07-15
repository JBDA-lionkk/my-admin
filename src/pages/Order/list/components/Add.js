import React from 'react';
import ProForm, {ModalForm, ProFormRadio, ProFormText,} from '@ant-design/pro-form';


const AddModal = (prop) => {
  const {addVisible, cancel, finished, data} = prop;
  // console.log(data);
  return (
    <ModalForm
      title={data ? '编辑' : '新增'}
      visible={addVisible}
      modalProps={{
        onCancel: cancel
      }}
      onFinish={finished}
    >
      <ProFormText hidden name="id" initialValue={data ? data.id : undefined}/>
      <ProForm.Group>
        <ProFormText allowClear width="md" name="orderId" label="订单号" placeholder="请输入订单号"
                     initialValue={data ? data.orderId : undefined}
        />

        <ProFormText
          allowClear
          width="md"
          name="username"
          label="用户名"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{required: true, message: 'Please input your username!'}]}
          initialValue={data ? data.username : undefined}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText allowClear width="md" name="price" label="价格" placeholder="请输入价格"
                     initialValue={data ? data.price : undefined}/>
        <ProFormText allowClear width="md" name="macId" label="机器编码" placeholder="请输入机器编码"
                     initialValue={data ? data.price : undefined}/>

      </ProForm.Group>
      <ProForm.Group>
        <ProFormRadio.Group
          label="性别"
          name="gender"
          options={[
            {value: 0, label: '男'},
            {value: 1, label: '女'},
          ]}
          initialValue={data ? data.gender : undefined}
        />
      </ProForm.Group>


    </ModalForm>
  );
};

export default AddModal;
