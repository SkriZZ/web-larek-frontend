export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IActions {
	onClick: (event: MouseEvent) => void;
}

export interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export interface IOrderLot {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

// тип ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// Modal

export interface IApiModel {
	cdn: string;
	items: IProductItem[];
	getListProductCard: () => Promise<IProductItem[]>;
	postOrderLot: (order: IOrderLot) => Promise<IOrderResult>;
}

export interface IBasketModel {
	basketProducts: IProductItem[];
	getCounter: () => number;
	getSumAllProducts: () => number;
	setSelectedСard(data: IProductItem): void;
	deleteCardToBasket(item: IProductItem): void;
	clearBasketProducts(): void;
}

export interface IDataModel {
	productCards: IProductItem[];
	selectedСard: IProductItem;
	setPreview(item: IProductItem): void;
}

export interface IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	setOrderAddress(field: string, value: string): void;
	validateOrder(): boolean;
	setOrderData(field: string, value: string): void;
	validateContacts(): boolean;
	getOrderLot(): object;
}

// View

export interface IBasket {
	basket: HTMLElement;
	title: HTMLElement;
	basketList: HTMLElement;
	button: HTMLButtonElement;
	basketPrice: HTMLElement;
	headerBasketButton: HTMLButtonElement;
	headerBasketCounter: HTMLElement;
	renderHeaderBasketCounter(value: number): void;
	renderSumAllProducts(sumAll: number): void;
	render(): HTMLElement;
}

export interface IBasketItem {
	basketItem: HTMLElement;
	index: HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	buttonDelete: HTMLButtonElement;
	render(data: IProductItem, item: number): HTMLElement;
}

export interface ICard {
	render(data: IProductItem): HTMLElement;
}

export interface ICardPreview {
	text: HTMLElement;
	button: HTMLElement;
	render(data: IProductItem): HTMLElement;
}

export interface IContacts {
	formContacts: HTMLFormElement;
	inputAll: HTMLInputElement[];
	buttonSubmit: HTMLButtonElement;
	formErrors: HTMLElement;
	render(): HTMLElement;
}

export interface IFormOrder {
	formOrder: HTMLFormElement;
	buttonAll: HTMLButtonElement[];
	paymentSelection: String;
	formErrors: HTMLElement;
	render(): HTMLElement;
}

export interface IModal {
	open(): void;
	close(): void;
	render(): HTMLElement;
}

export interface ISuccess {
	success: HTMLElement;
	description: HTMLElement;
	button: HTMLButtonElement;
	render(total: number): HTMLElement;
}
