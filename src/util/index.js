/*
 * @Author: chenghao
 * @Date: 2020-06-18 17:51:51
 * @Last Modified by: chenghao
 * @Last Modified time: 2020-08-14 15:25:33
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
const FONT_SIZE_KEY = 'font_size'
const GUTTER_KEY = 'show_gutter'
const PIC_BED_KEY = 'pic_bed_avaliable'
const AUTO_SCROLL_KEY = 'auto_scroll'

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

export function setFontSize(str) {
  window.localStorage.setItem(FONT_SIZE_KEY, str)
}

export function getFontSize() {
  return window.localStorage.getItem(FONT_SIZE_KEY)
}

export function setGutter(str) {
  window.localStorage.setItem(GUTTER_KEY, str)
}

export function getGutter() {
  return window.localStorage.getItem(GUTTER_KEY)
}

export function getPicBedStatus() {
  return window.localStorage.getItem(PIC_BED_KEY)
}
export function setPicBedStatus(str) {
  window.localStorage.setItem(PIC_BED_KEY, str)
}

export function setAutoScroll(str) {
  window.localStorage.setItem(AUTO_SCROLL_KEY, str)
}

export function getAutoScroll() {
  return window.localStorage.getItem(AUTO_SCROLL_KEY)
}
