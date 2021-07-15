import {FormattedMessage, useIntl} from "umi";
import {Button, Dropdown, Menu, message, Space, Table} from "antd";
import React, {useRef, useState} from "react";
import ProTable from "@ant-design/pro-table";
import {PageContainer} from "@ant-design/pro-layout";
import {addOrder, queryPage, batchDelete} from "@/services/order/order";
import moment from "moment";
import {genderEnum} from "@/pages/Order/data.d";
import {DownOutlined, PlusOutlined} from "@ant-design/icons";
import AddModal from "@/pages/Order/list/components/Add";
import {ModalForm} from "@ant-design/pro-form";

const ExceptionLIst = () => {
  const actionRef = useRef();
  const [deleteModVisible, setDeleteModVisible] = useState(false);
  const [deleteOrderIdsVisible, setDeleteOrderIdsVisible] = useState(undefined);
  const [addModelVisible, setAddModelVisible] = useState(false);

  const [recordVisible, setRecordVisible] = useState(undefined);
  const [statusVisible, setStatusVisible] = useState(0);

  const intl = useIntl();

  function showMoal() {
    setAddModelVisible(true)
  }

  function cancel() {
    setAddModelVisible(false)
  }

  async function finished(data) {
    console.log("add data", data)
    const res = await addOrder({...data})
    console.log("add res", res)
    if (res && res.code === 0) {
      setAddModelVisible(false)
      message.success("保存成功")
      setRecordVisible(undefined)
    } else {
      message.error("保存失败")
    }
    actionRef.current?.reload()
  }


  function showDeleteConfirm() {
    setDeleteModVisible(true)
  }

  function handlerUpdate() {

  }


  /**
   * 请求数据
   * @param params
   * @returns {Promise<{total, data: any, success: boolean}|{success: boolean}>}
   */
  async function queryList(params) {
    console.log("queryList params: ", params)
    const current = params.current || 1
    const size = params.pageSize || 20

    const res = await queryPage({current, size, ...params})
    console.log("res data : ", res)
    if (res && res.code === 0) {
      const datas = res.data.records;
      return {data: datas, success: true, total: res.total};
    }
    return {success: false};
  }


  // 下拉操作按钮
  const getMenu = (record) => {
    return (
      <Menu>
        {/* 修改状态 */}
        {
          // eslint-disable-next-line no-nested-ternary

          // <Menu.Item key="1">
          //   <Button type="link" onClick={() => handlerDelete(record, 1)}>
          //     <FormattedMessage id="pages.order.list.operate.delete" defaultMessage="删除"/>
          //   </Button>
          // </Menu.Item>
        }
        {/* 修改 */}
        {
          <Menu.Item key="2">
            <Button type="link" onClick={() => handlerUpdate(record.id)}>
              <FormattedMessage id="pages.order.list.operate.update" defaultMessage="修改"/>
            </Button>
          </Menu.Item>
        }
      </Menu>
    );
  }


  const columns = [
    {
      title: (
        <FormattedMessage id="pages.order.list.id" defaultMessage="订单号"/>
      ),
      dataIndex: 'orderId',
      // tip: 'id是唯一的 key',
      copyable: true,
      // width: '14%'
    },
    {
      title: <FormattedMessage id="pages.order.list.createTime" defaultMessage="下单时间"/>,
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      width: '15%',
      search: {
        transform: (value) => ({createStartTime: value[0], createEndTime: value[1]}),
      },
      render: (_, record) => moment(record.createTime).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: <FormattedMessage id="pages.order.list.price" defaultMessage="价格"/>,
      dataIndex: 'price',
      // ellipsis: true,
      copyable: true,
      hideInSearch: true
    },
    {
      title: <FormattedMessage id="pages.order.list.macId" defaultMessage="机器编码"/>,
      dataIndex: 'macId',
    },
    {
      title: <FormattedMessage id="pages.order.list.username" defaultMessage="用户名"/>,
      dataIndex: 'username',
    },
    {
      title: <FormattedMessage id="pages.order.list.gender" defaultMessage="性别"/>,
      dataIndex: 'gender',
      // hideInForm: true,
      valueEnum: genderEnum
    },
    {
      title: (<FormattedMessage id="pages.order.list.option" defaultMessage="操作"/>),
      ellipsis: true,
      hideInSearch: true,
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Dropdown overlay={getMenu(record)}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            select <DownOutlined/>
          </a>
        </Dropdown>
      )
    },
  ];

  return (
    <PageContainer>

      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.order.list.title',
          defaultMessage: '异常列表',
        })}
        actionRef={actionRef}
        rowKey="orderId"
        search={{
          labelWidth: 'auto',
        }}
        request={async params => queryList(params)}
        columns={columns}
        toolBarRender={() => [
          <Button key="button" type="primary" icon={<PlusOutlined/>} onClick={showMoal}>
            新建
          </Button>,
          <Button key="delete" type="primary" onClick={showDeleteConfirm}>
            批量删除
          </Button>
        ]}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          onChange: (selectedRowKeys) => setDeleteOrderIdsVisible(selectedRowKeys)
        }}
        tableAlertRender={({selectedRowKeys}) => (
          <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
          </span>
          </Space>

        )}

      />
      <ModalForm
        title="确认删除"
        visible={deleteModVisible}
        width="400px"
        modalProps={{
          onCancel: () => setDeleteModVisible(false),
        }}
        onFinish={async (values) => {
          console.log(values)
          console.log("ddd", deleteOrderIdsVisible)
          if (deleteOrderIdsVisible && deleteOrderIdsVisible.length > 0) {
            const res = await batchDelete(deleteOrderIdsVisible)
            console.log("remove res",res)
            if(res && res.code === 0){
              setDeleteModVisible(false)
              setDeleteOrderIdsVisible(undefined)
              message.success("删除成功")
            }
            actionRef.current?.reload()
          }else{
            message.error("没有选中项")
          }

        }}
      >
        是否确认删除选中项?
      </ModalForm>
      <AddModal
        cancel={cancel}
        finished={finished}
        data={recordVisible}
        addVisible={addModelVisible}
        // search={}
      />

    </PageContainer>
  )
}


export default ExceptionLIst;
