/**
 * @file 通用工具
 */

export function personalTab(key, label) {
  return {
    key,
    label,
    closable: true,
    path: ["个人页", label],
  };
}
