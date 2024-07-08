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
