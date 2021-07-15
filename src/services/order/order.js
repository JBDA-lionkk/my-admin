import  request  from '@/services/request';

export async function queryPage(params) {
  return request('/api/mainOrder/page', {
    method: 'POST',
    data: params,
  });
}

export async function addOrder(param) {
  return request('/api/mainOrder/add', {
    method: 'POST',
    data: param
  });
}

export async function batchDelete(param) {
  return request('/api/mainOrder/delete', {
    method: 'DELETE',
    data: param
  });
}


