// 根据文本查找其所在菜单的层级(参数1: 树形结构数据, 参数2: 目标文本, 返回值: 层级1 > 层级2 > 层级3)
export function findLabelLevel(list, targetLabel) {
  let result = [];
  if (!targetLabel) return result;
  list.forEach((item) => {
    // if (!item.children && targetLabel && item.label.indexOf(targetLabel) > -1) {
    //   result.push({ key: item.key, label: item.label });
    // }
    if (!item.children) {
      if (item.label.indexOf(targetLabel) > -1) {
        result.push({ key: item.key, label: item.label });
      }
    } else {
      // 递归查找
    }
  });

  return result;
}
