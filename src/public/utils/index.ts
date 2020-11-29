import { ReactNode } from 'react';

/**
 * 判断使用class
 *
 * @export
 * @param {string} className css类名
 * @param {boolean} cond 条件
 * @returns
 */
export function jClass(className: string, cond: boolean): string {
    return cond ? className : '';
}

/**
 * react-class
 *
 * @export
 * @param {string[]} className css类名数组
 * @returns
 */
export function classNames(classNames: string[]): string {
    return classNames.join(' ');
}

/**
 * 判断元素
 *
 * @export
 * @param {ReactNode | string} element 元素
 * @param {boolean} cond 条件
 * @returns {ReactNode | string}
 */
export function jElement(element: ReactNode | string, cond: boolean): ReactNode | string {
    return cond ? element : '';
}


export function classNameFormat(obj: Object): string {
    return Object.entries(obj).map(([a, b]) => (b ? a:'')).join(' ');
}

export const noop = () => { };

/**
 * 手机号码中间为****
 *
 * @export
 * @param {string} mobile 手机号
 * @returns {string} eg: 132****2222
 */
export const handleMobile = (mobile: string): string => {
    const reg = /^(\d{3})\d{4}(\d{4})$/;
    return mobile.replace(reg, "$1****$2");
};
