/*
  Requirement: Prevent the button from being clicked multiple times in a short period. Use a throttle function to ensure it can only be clicked once within a specified time.

  Approach:
    1. On the first click, immediately call the method and disable the button. After the delay, re-enable the button.
    2. Bind the method to be triggered to the directive.
  
  Usage: Add v-throttle and the callback function to the DOM element.
  <button v-throttle="debounceClick">Throttle Submit</button>
*/
import type { Directive, DirectiveBinding } from 'vue';
interface ElType extends HTMLElement {
  __handleClick__: () => any;
  disabled: boolean;
}
const throttle: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function';
    }
    let timer: NodeJS.Timeout | null = null;
    el.__handleClick__ = function () {
      if (timer) {
        clearTimeout(timer);
      }
      if (!el.disabled) {
        el.disabled = true;
        binding.value();
        timer = setTimeout(() => {
          el.disabled = false;
        }, 1000);
      }
    };
    el.addEventListener('click', el.__handleClick__);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__);
  },
};

export default throttle;
