import { mapState, createNamespacedHelpers } from 'vuex';
import { useMapper } from './useMapper';

export default function useState(moduleName, mapper) {
  let mapperFn = mapState;
  if(typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState;
  }else {
    // 防止用户第一个参数直接传一个数组或者对象过来
    mapper = moduleName;
  }

  return useMapper(mapper, mapperFn);
}