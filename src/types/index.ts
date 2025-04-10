// Интерфейс, описывающий товар
export interface IProduct {
	id: string;
	details: string;
	imageUrl: string;
	name: string;
	type: string;
	cost: number | null;
}

// Интерфейс, описывающий действия, связанные с пользовательскими взаимодействиями.
export interface IUserActions {
	onTrigger: (event: MouseEvent) => void;
}

// Интерфейс описывающий форму заказа.
export interface IOrderDetails {
	paymentMethod?: string;
	shippingAddress?: string;
	contactNumber?: string;
	userEmail?: string;
	totalAmount?: string | number;
}

// Интерфейс, расширяющий IOrderDetails, который описывает заказ
export interface IOrderInfo extends IOrderDetails {
	productIds: string[];
}

// Интерфейс, описывающий лот заказа.
export interface IOrderItem {
	paymentMethod: string;
	userEmail: string;
	contactNumber: string;
	shippingAddress: string;
	totalAmount: number;
	productIds: string[];
}

// Интерфейс, описывающий результат оформления заказа
export interface IOrderResponse {
	orderId: string;
	totalAmount: number;
}

// Тип, описывающий возможные ошибки в форме, представляет собой частичный объект, где ключи соответствуют полям IOrderInfo, а значения - сообщения об ошибках (строки).
export type ValidationErrors = Partial<Record<keyof IOrderInfo, string>>;

// Modal

export interface ICartModel {
	itemsInCart: IProduct[];
	getItemCount: () => number;
	calculateTotalAmount: () => number;
	selectItem(data: IProduct): void;
	removeItemFromCart(item: IProduct): void;
	emptyCartItems(): void;
}

export interface IProductDataModel {
	productListings: IProduct[];
	currentItem: IProduct;
	showPreview(item: IProduct): void;
}

export interface IUserFormModel {
	paymentMethod: string;
	userEmail: string;
	contactNumber: string;
	shippingAddress: string;
	totalAmount: number;
	productIds: string[];
	updateOrderAddress(field: string, value: string): void;
	isOrderValid(): boolean;
	updateOrderInfo(field: string, value: string): void;
	isContactValid(): boolean;
	constructOrderItem(): object;
}

// View

export interface IShoppingCart {
	container: HTMLElement;
	header: HTMLElement;
	itemList: HTMLElement;
	submitButton: HTMLButtonElement;
	totalPriceElement: HTMLElement;
	basketIconButton: HTMLButtonElement;
	basketCountDisplay: HTMLButtonElement;
	displayBasketItemCount(value: number): void;
	displayTotalPrice(total: number): void;
	render(): HTMLElement;
}

export interface ICartItemView {
	itemElement: HTMLElement;
	position: HTMLElement;
	nameElement: HTMLElement;
	costElement: HTMLElement;
	removeButton: HTMLButtonElement;
	render(data: IProduct, item: number): HTMLElement;
}

export interface IProductCard {
	updateText(element: HTMLElement, value: unknown): string;
	set category(value: string);
	setCost(value: number | null): string;
	render(data: IProduct): HTMLElement;
}

export interface IProductPreview {
	text: HTMLElement;
	actionButton: HTMLElement;
	render(data: IProduct): HTMLElement;
}

export interface IPaymentOrder {
	contactForm: HTMLFormElement;
	allInputs: HTMLInputElement[];
	submitButton: HTMLButtonElement;
	errorMessages: HTMLElement;
	render(): HTMLElement;
}

export interface IUserContactForm {
	orderForm: HTMLFormElement;
	actionButtons: HTMLButtonElement[];
	selectedPaymentMethod: string;
	errorMessages: HTMLElement;
	render(): HTMLElement;
}

export interface IModalWindow {
	openWindow(): void;
	closeWindow(): void;
	render(): HTMLElement;
}

export interface IOrderSuccess {
	statusElement: HTMLElement;
	messageElement: HTMLElement;
	actionButton: HTMLButtonElement;
	render(sumAll: number): HTMLElement;
}
