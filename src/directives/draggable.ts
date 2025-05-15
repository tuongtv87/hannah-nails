/*
  Requirement: Implement a drag directive that allows an element to be dragged freely within its parent area.

  Approach:
    1. Set the element to be dragged as absolute, and its parent as relative.
    2. When the mouse is pressed down (onmousedown), record the current left and top values of the target element.
    3. When the mouse moves (onmousemove), calculate the change in horizontal and vertical distances for each movement, and update the element's left and top values.
    4. When the mouse is released (onmouseup), complete the drag operation.

  Usage: Simply add v-draggable to the DOM element
  <div class="dialog-model" v-draggable></div>
*/
import type { Directive } from 'vue';
interface ElType extends HTMLElement {
  parentNode: any;
}
const draggable: Directive = {
  mounted: function (el: ElType) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    el.onmousedown = function (e) {
      const disX = e.pageX - el.offsetLeft;
      const disY = e.pageY - el.offsetTop;
      document.onmousemove = function (e) {
        let x = e.pageX - disX;
        let y = e.pageY - disY;
        const maxX = el.parentNode.offsetWidth - el.offsetWidth;
        const maxY = el.parentNode.offsetHeight - el.offsetHeight;
        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }
        el.style.left = x + 'px';
        el.style.top = y + 'px';
      };
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};
export default draggable;
