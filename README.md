# umi-plugin-svgs

<p align="center">
  <a href="https://www.npmjs.com/package/umi-plugin-svgs"><img src="https://img.shields.io/npm/v/umi-plugin-svgs.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/umi-plugin-svgs"><img src="https://img.shields.io/npm/dm/umi-plugin-svgs.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/leeguooooo/umi-plugin-svgs/blob/main/LICENSE"><img src="https://img.shields.io/github/license/leeguooooo/umi-plugin-svgs.svg?style=flat-square" alt="license" /></a>
</p>

一个让 SVG 图标使用更简单的 Umi 插件。自动将 SVG 文件转换为 React 组件，支持 TypeScript 类型提示。

## ✨ 特性

- 🚀 **自动转换** - 将 SVG 文件自动转换为 React 组件
- 📦 **按需加载** - 只打包使用到的 SVG 图标
- 🎯 **TypeScript 支持** - 完整的类型提示和自动补全
- 🔥 **热更新** - 开发时自动监听 SVG 文件变化
- 🛡️ **安全验证** - 内置 SVG 内容验证和 XSS 防护

## 📦 安装

```bash
# npm
npm install umi-plugin-svgs --save-dev

# yarn
yarn add umi-plugin-svgs -D

# pnpm
pnpm add umi-plugin-svgs -D
```

## 🔨 使用

### 1. 配置插件

在 `.umirc.ts` 或 `config/config.ts` 中配置：

```ts
import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  plugins: ['umi-plugin-svgs'],
  svgs: {
    // SVG 文件夹路径（必填）
    entry: resolve(__dirname, './src/assets/svg'),
    // 组件导入别名（可选，默认 @svgs）
    alias: '@svgs',
  },
});
```

### 2. TypeScript 配置

在 `tsconfig.json` 中添加路径映射：

```json
{
  "compilerOptions": {
    "paths": {
      "@svgs": ["src/.umi/plugin-svgs"]
    }
  }
}
```

### 3. 使用组件

启动项目后，插件会自动生成图标组件，支持 TypeScript 智能提示：

![](https://pic1.zhimg.com/v2-9c9a5698bc8fd9f0e02f389ab7714b53.png)

```tsx
import React from 'react';
import Icon from '@svgs';

export default function App() {
  return (
    <div>
      {/* 基础用法 */}
      <Icon type="logo" />
      
      {/* 自定义样式 */}
      <Icon type="user" style={{ fontSize: 32, color: '#1890ff' }} />
      
      {/* 自定义类名 */}
      <Icon type="setting" className="custom-icon" />
      
      {/* 支持所有 SVG 属性 */}
      <Icon type="heart" fill="red" width={24} height={24} />
    </div>
  );
}
```

## 📖 API

### Icon 组件属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图标类型（必填） | `keyof ZHSvgInterface` | - |
| className | CSS 类名 | `string` | - |
| style | 行内样式 | `CSSProperties` | - |
| ...props | 其他 SVG 属性 | `SVGAttributes<SVGElement>` | - |

### 配置项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| entry | SVG 文件夹路径 | `string` | - |
| alias | 组件导入别名 | `string` | `'@svgs'` |

## 🎯 文件名转换规则

SVG 文件名会自动转换为驼峰命名：

- `user-avatar.svg` → `userAvatar`
- `arrow_down.svg` → `arrowDown`
- `GitHub-Logo.svg` → `gitHubLogo`

## 💡 最佳实践

### 1. SVG 文件优化

建议使用 [SVGO](https://github.com/svg/svgo) 优化 SVG 文件：

```bash
npx svgo -f ./src/assets/svg
```

### 2. 组织 SVG 文件

```
src/assets/svg/
├── common/          # 通用图标
│   ├── arrow.svg
│   └── close.svg
├── business/        # 业务图标
│   ├── logo.svg
│   └── banner.svg
└── social/          # 社交图标
    ├── github.svg
    └── twitter.svg
```

### 3. 样式管理

```css
/* 全局图标样式 */
.custom-icon {
  transition: all 0.3s;
  cursor: pointer;
}

.custom-icon:hover {
  transform: scale(1.2);
  color: #1890ff;
}
```

## 🔄 版本兼容性

| 插件版本 | Umi 版本 |
| --- | --- |
| 2.x | Umi 4.x |
| 1.x | Umi 3.x |

### 从 v1 升级到 v2

v2 版本主要是为了支持 Umi 4，API 保持向后兼容：

```bash
# 升级到 v2
npm install umi-plugin-svgs@2 --save-dev
```

主要变化：
- 修复了 Umi 4 热重载冲突问题
- 改进了文件名转换算法
- 添加了 SVG 内容验证
- 增强了 TypeScript 支持

## 🐛 故障排除

### 1. 图标不显示

检查 SVG 文件是否有效：
- 文件必须包含 `<svg>` 标签
- 确保文件扩展名是 `.svg`

### 2. 类型提示不工作

- 确保配置了 `tsconfig.json` 中的路径映射
- 重启 TypeScript 服务：VS Code 中使用 `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

### 3. 热更新不生效

- 检查是否正确配置了 `entry` 路径
- 确保 SVG 文件在监听的目录内

## 🤝 贡献

欢迎贡献代码！请查看 [Contributing Guide](CONTRIBUTING.md) 了解更多信息。

## 📄 许可证

[ISC](LICENSE) © leeguoo