import type { FC } from 'react'
import React from 'react'
import TYPE_SVG_MAP from './svg'

export { TYPE_SVG_MAP };
export type ZHSvgInterface = typeof TYPE_SVG_MAP

const hasOwnProperty = Object.prototype.hasOwnProperty

function has(object: any, key: any) {
  return object != null && hasOwnProperty.call(object, key)
}

export interface IZhiIcon extends React.SVGAttributes<SVGElement> {
  /** 如果传入 className 会自动在 svg 外层包裹一层 div */
  className?: string
  /** svg 文件名 */
  type: keyof ZHSvgInterface
}
/**
 * 图标组件
 * @param type 图标类型
 * @param className 自定义类名( 如果传入 className 会在外层包裹一层 div )
 * @returns
 */
const ZHIcon: FC<IZhiIcon> = (props) => {
  const { type, className } = props
  if (!has(TYPE_SVG_MAP, type)) {
    throw new Error(
      `${String(type)} 不是 ${Object.keys(TYPE_SVG_MAP).join('、')} 中的值`,
    )
  }

  const Icon = TYPE_SVG_MAP[type]
  return <Icon className={className} {...props} />
}

export default ZHIcon
