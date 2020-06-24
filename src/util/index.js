/*
 * @Author: chenghao
 * @Date: 2020-06-18 17:51:51
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-06-24 16:21:27
 * @Desc: 工具函数
 */

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler)
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  }
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler)
    }
  }
})()

/**
 * 存储和清除code区域的值
 */
const CODE_KEY = 'code_value'
export const FIRST_ENTRY_KEY = 'first_entry'
const THEME_KEY = 'theme'

export function setCode(str) {
  window.localStorage.setItem(CODE_KEY, str)
}

export function getCode() {
  return window.localStorage.getItem(CODE_KEY)
}

export function removeCode() {
  window.localStorage.removeItem(CODE_KEY)
}

export function isFirstEntry() {
  return window.localStorage.getItem(FIRST_ENTRY_KEY) === null
}

export function setTheme(str) {
  window.localStorage.setItem(THEME_KEY, str)
}

export function getTheme() {
  return window.localStorage.getItem(THEME_KEY)
}
