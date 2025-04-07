import { IEvents } from "../base/events";
import { ISuccess } from "../../types";

export class Success implements ISuccess {
  success: HTMLElement;
  description: HTMLElement;
  button: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.success = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
    this.description = this.success.querySelector('.order-success__description');
    this.button = this.success.querySelector('.order-success__close');

    this.button.addEventListener('click', () => { events.emit('success:close') });
  }

  render(total: number) {
    this.description.textContent = String(`Списано ${total} синапсов`);
    return this.success
  }
}