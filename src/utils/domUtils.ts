import { upperFirst } from 'lodash-es';

export interface ViewportOffsetResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}

function trim(string: string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

/* istanbul ignore next */
export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/* istanbul ignore next */
export function addClass(el: Element, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/**
 * Get the left and top offset of the current element
 * left: the distance between the leftmost element and the left side of the document
 * top: the distance from the top of the element to the top of the document
 * right: the distance from the far right of the element to the right of the document
 * bottom: the distance from the bottom of the element to the bottom of the document
 * rightIncludeBody: the distance between the leftmost element and the right side of the document
 * bottomIncludeBody: the distance from the bottom of the element to the bottom of the document
 *
 * @description:
 */
export function getViewportOffset(element: HTMLElement): {
  left: number
  top: number
  right: number
  bottom: number
  rightIncludeBody: number
  bottomIncludeBody: number
} {
  const doc = document.documentElement

  const viewportLeft = doc.scrollLeft
  const viewportTop = doc.scrollTop
  const viewportWidth = doc.clientWidth
  const viewportHeight = doc.clientHeight
  const elemRect = element.getBoundingClientRect()
  const bodyEl = document.body as HTMLElement

  return {
    left: elemRect.left + viewportLeft,
    top: elemRect.top + viewportTop,
    right: viewportWidth - elemRect.right + viewportLeft,
    bottom: viewportHeight - elemRect.bottom + viewportTop,
    rightIncludeBody: bodyEl.offsetWidth - elemRect.right,
    bottomIncludeBody: bodyEl.offsetHeight - elemRect.bottom,
  }
}

export function hackCss(attr: string, value: string) {
  const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT'];

  const styleObj: any = {};
  prefix.forEach((item) => {
    styleObj[`${item}${upperFirst(attr)}`] = value;
  });
  return {
    ...styleObj,
    [attr]: value,
  };
}

/* istanbul ignore next */
export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

/* istanbul ignore next */
export function off(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
}

/* istanbul ignore next */
export function once(el: HTMLElement, event: string, fn: EventListener): void {
  const listener = function (this: any, ...args: unknown[]) {
    if (fn) {
      fn.apply(this, args as [Event]);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
}

/**
 * Chuyển đổi hàm thành debounced function
 * @param fn Function cần debounce
 * @param wait Thời gian chờ
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined
  
  return function(...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}

/**
 * Chuyển đổi hàm thành throttled function
 * @param fn Function cần throttle
 * @param wait Thời gian chờ
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, wait: number): (...args: Parameters<T>) => void {
  let lastFn: ReturnType<typeof setTimeout> | undefined
  let lastTime = 0
  
  return function(...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= wait) {
      fn(...args)
      lastTime = now
    } else {
      if (lastFn) clearTimeout(lastFn)
      
      lastFn = setTimeout(() => {
        fn(...args)
        lastTime = Date.now()
      }, wait - (now - lastTime))
    }
  }
}

/**
 * Thêm sự kiện cho element
 * @param element Element hoặc selector
 * @param event Tên sự kiện
 * @param handler Xử lý sự kiện
 */
export function addEventListen(
  element: Window | HTMLElement | Document | string,
  event: string, 
  handler: (e: Event) => void
): { removeListener: () => void } {
  // Nếu element là string (selector), tìm element
  let target: Window | HTMLElement | Document
  if (typeof element === 'string') {
    target = document.querySelector(element) as HTMLElement
  } else {
    target = element
  }
  
  // Thêm sự kiện
  target.addEventListener(event, handler, false)
  
  // Trả về function để gỡ sự kiện
  return {
    removeListener: () => {
      target.removeEventListener(event, handler, false)
    }
  }
}
