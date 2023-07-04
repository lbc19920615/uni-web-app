import http from '@/utils/request';
import { sleep } from "@/utils/time";

const apiTest: Record<any, any> = {
  getTest: (params: GetTest.params) => http.get<GetTest.data>('/test', params),
  postTest: (params: PostTest.params) =>
    http.post<PostTest.data>('/test', params)
};

/**
 * 获取商店skus
 */
apiTest.getShopSkus = async function() {
  let data = {"skus":[{"id":1,"sku_id":"p000001","sku_name":"产品1","sku_num":10,"shop_id":"shop000001","create_time":"2023-06-30 16:36:47","update_time":"2023-06-30 16:52:40"},{"id":2,"sku_id":"p000002","sku_name":"产品2","sku_num":10,"shop_id":"shop000001","create_time":"2023-06-30 16:37:21","update_time":"2023-06-30 16:52:40"},{"id":3,"sku_id":"p000003","sku_name":"产品3","sku_num":10,"shop_id":"shop000001","create_time":"2023-06-30 16:37:21","update_time":"2023-06-30 16:52:40"}],"shop":{"id":1,"shopId":"shop000001","shopUserId":null,"shopCategorys":"ca000001,ca000002","create_time":"2023-06-30","udpate_time":null,"state":"online"},"categories":[{"id":1,"category_id":"ca000001","category_skus":"p000001,p000002","create_time":"2023-06-30 16:34:36","update_time":null},{"id":2,"category_id":"ca000002","category_skus":"p000003","create_time":"2023-06-30 16:34:54","update_time":null}],"categoryIds":["ca000001","ca000002"]}
  await sleep(100);
  return data
}

export default apiTest;
