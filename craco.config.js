// 引入path模块
const path = require("path");

module.exports = {
  // webpack配置
  webpack: {
    // 别名配置 alias
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
