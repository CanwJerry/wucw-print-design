export function traverse(array, key) {
  array = array.filter((element, index) => {
    if(["grid"].includes(element.type) && element.columns.length) {
      // 栅格布局
      element.columns.forEach(item => {
        item.list = traverse(item.list, key);
      });
    }

    if (element.type === "table") {
      // 表格布局
      element.trs.forEach(item => {
        item.tds.forEach(val => {
          val.list = traverse(val.list);
        });
      });
    }
    
    if (element.key !== key) {
      return true;
    }else if(element.key === key) {
      return false;
    }
  })
  
  return array;
}