// 根据文本查找其所在菜单的层级(参数1: 树形结构数据, 参数2: 目标文本, 返回值: 层级1 > 层级2 > 层级3)
export function findPathsByKeyword(menuItems, keyword) {
  if (!keyword) return [];

  const paths = [];
  function search(items, path = []) {
    items.forEach((item) => {
      const newPath = [...path, item.label];
      // 检查当前项是否包含关键字，并且没有子项（即末级菜单项）
      if (item.label.includes(keyword) && !item.children) {
        paths.push({ key: item.key, label: newPath.join(" > ") });
      }
      // 如果有子项，继续递归搜索
      if (item.children) {
        search(item.children, newPath);
      }
    });
  }

  search(menuItems);
  return paths;
}

// 根据key查找对应的菜单项label
export function findLabelByKey(items, key) {
  let label = "";
  function search(items) {
    items.forEach((item) => {
      if (item.key === key) {
        label = item.label;
      }
      if (item.children) {
        search(item.children);
      }
    });
  }

  search(items);
  return label;
}

// 根据key查找其所有的祖先元素,如key为dropdown-basic,需要输出['nav', 'dropdown']
export function getKeysListByKey(items, key) {
  const keyPath = [];
  function findAncestors(items, key) {
    for (const item of items) {
      if (item.key === key) {
        return true;
      }
      if (item.children && findAncestors(item.children, key)) {
        keyPath.unshift(item.key);
        return true;
      }
    }
    return false;
  }
  findAncestors(items, key);
  return keyPath;
}

// 计算树形数据中每项的层级，返回一个对象，属性名为项的key，属性值为项的层级
export function getLevelKeys(items1) {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
}

// 根据keyPath查找对应的菜单项labelPath,如['nav', 'dropdown', 'dropdown-basic']，则返回["布局相关", "下拉菜单", "下拉菜单基础"]
export function getBreadcrumbLabelList(menuItems, keyPath) {
  const labelList = [];
  const func = (items, key) => {
    items.forEach((item) => {
      if (item.key === key) {
        labelList.push(item.label);
      }
      if (item.children) {
        func(item.children, key);
      }
    });
  };
  keyPath.forEach((key) => {
    func(menuItems, key);
  });
  return labelList;
}
