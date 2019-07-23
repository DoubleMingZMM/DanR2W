import { Request } from '@/utils/';

// 之前这里用async 和 await，个人觉得多余
export function loginByPassword(params) {
  return Request('login', {
    method: 'post',
    data: params
  });
}

