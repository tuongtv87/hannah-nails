import type { DirectiveBinding, ObjectDirective } from 'vue';
import { on } from '@/utils/domUtils';

type DocumentHandler = (e: MouseEvent) => void;

const nodeList = new Map<number, { documentHandler: DocumentHandler; bindingFn: any }>();

let startClick: MouseEvent;
let nodeId = 0;

function createDocumentHandler(
  el: HTMLElement,
  binding: DirectiveBinding
): DocumentHandler {
  let excludes: HTMLElement[] = [];
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  } else if (binding.arg) {
    excludes = [binding.arg as unknown as HTMLElement];
  }

  return function (e: MouseEvent) {
    const target = e.target as Node;
    const isContainsSelf = el.contains(target);
    const isContainsExcluded =
      excludes.length && excludes.some((item) => item?.contains(target));

    if (isContainsSelf || isContainsExcluded) return;

    binding.value(e);
  };
}

const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    if (!binding.value) return;

    nodeId++;
    const documentHandler = createDocumentHandler(el, binding);
    nodeList.set(nodeId, {
      documentHandler,
      bindingFn: binding.value,
    });

    setTimeout(() => {
      document.addEventListener('click', documentHandler);
    }, 0);
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return;

    const id = nodeId;
    const documentHandler = createDocumentHandler(el, binding);
    nodeList.set(id, {
      documentHandler,
      bindingFn: binding.value,
    });
  },
  unmounted(_el) {
    const id = nodeId;
    const handler = nodeList.get(id);
    if (handler) {
      document.removeEventListener('click', handler.documentHandler);
    }
    nodeList.delete(id);
  },
};

export default ClickOutside;
