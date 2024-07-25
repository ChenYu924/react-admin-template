/**
 * @file 检查工具(返回值必须是boolean)
 */

/**
 * @description 测试是否是生产环境
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * @description 测试是否是开发环境
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}
