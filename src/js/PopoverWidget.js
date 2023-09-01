export default class PopoverWidget {
  static get selector() {
    return '.popover-widget';
  }

  constructor(el, title, text) {
    this.boundElement = el;
    this.checkBindings();
    this.container = document.createElement('div');
    this.container.classList.add('popover-widget');
    const titleEl = document.createElement('h4');
    titleEl.classList.add('popover-widget-title');
    titleEl.textContent = title;
    const textEl = document.createElement('div');
    textEl.classList.add('popover-widget-text');
    textEl.textContent = text;
    this.container.appendChild(titleEl);
    this.container.appendChild(textEl);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  checkBindings() {
    if (!(this.boundElement instanceof HTMLElement)) {
      throw new Error('Widget is not bound to element!');
    }
  }

  show() {
    this.checkBindings();
    const { top, left } = this.boundElement.getBoundingClientRect();
    const center = left + this.boundElement.offsetWidth / 2;
    document.body.appendChild(this.container);
    const x = center - this.container.offsetWidth / 2;
    const y = top - this.container.offsetHeight;
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
  }

  hide() {
    document.body.removeChild(this.container);
  }

  toggle() {
    if (this.container.parentElement === document.body) {
      this.hide();
    } else {
      this.show();
    }
  }
}
