import PopoverWidget from './PopoverWidget';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.popover-btn');
  const widget = new PopoverWidget(button, 'Popover title', 'And here\'s some amazing content. It\'s very engaging. Right?');
  button.addEventListener('click', widget.toggle);
});
