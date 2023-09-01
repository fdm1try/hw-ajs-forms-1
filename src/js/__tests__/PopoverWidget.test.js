import PopoverWidget from '../PopoverWidget';

const spyShow = jest.spyOn(PopoverWidget.prototype, 'show');
const spyHide = jest.spyOn(PopoverWidget.prototype, 'hide');

let popoverButton;

beforeAll(() => {
  document.body.innerHTML = '<button class="popover"></button>';
  popoverButton = document.querySelector('.popover');
});

test('Checking the title and text in the rendered element', () => {
  const title = 'Test title';
  const text = 'Test text';
  const widget = new PopoverWidget(popoverButton, title, text);
  widget.show();
  const element = document.querySelector(PopoverWidget.selector);
  const titleEl = element.querySelector(`${PopoverWidget.selector}-title`);
  const textEl = element.querySelector(`${PopoverWidget.selector}-text`);
  expect(titleEl.textContent).toBe(title);
  expect(textEl.textContent).toBe(text);
});

test('Throws an error if bound element is not instance of HTMLElement', () => {
  const check = () => new PopoverWidget({}, 'title', 'text');
  expect(check).toThrow();
});

test('The show() function throw an error if bound element is not instance of HTMLElement', () => {
  const widget = new PopoverWidget(popoverButton, 'title', 'text');
  widget.boundElement = null;
  expect(widget.show).toThrow();
});

test('The toggle() function shows the widget if it was hidden, and hides it if the widget is shown', () => {
  const widget = new PopoverWidget(popoverButton, 'title', 'text');
  widget.toggle();
  expect(spyShow).toHaveBeenCalled();
  widget.toggle();
  expect(spyHide).toHaveBeenCalled();
});

test('The widget is drawn over the bound element and their centers match', () => {
  const widget = new PopoverWidget(popoverButton, 'title', 'text');
  widget.show();
  const widgetRect = widget.container.getBoundingClientRect();
  const buttonRect = popoverButton.getBoundingClientRect();
  const expectedTop = buttonRect.top - widget.container.offsetHeight;
  expect(widgetRect.top).toBe(expectedTop);
  const widgetCenter = widgetRect.left + widget.container.offsetWidth / 2;
  const buttonCenter = buttonRect.left + popoverButton.offsetWidth / 2;
  expect(widgetCenter).toBe(buttonCenter);
});
