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
          val.list = traverse(val.list, key);
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

// 给每一个对应的fields字段赋值
export function traverseItemData(arr, obj) {
  arr.forEach(item => {
    if(item.type === 'grid' && item.columns.length) {
      // 栅格布局
      item.columns.forEach(item => {
        traverseItemData(item.list, obj);
      });
    }

    if (item.type === "table") {
      // 表格布局
      item.trs.forEach(item => {
        item.tds.forEach(val => {
          traverseItemData(val.list, obj);
        });
      });
    }

    switch(item.type) {
      case 'text':
        item.value = obj[item.fields] || '';
        break;
      case 'batchTable':
        item.tableData = obj[item.fields] || '';
        break;
    }
  });
}