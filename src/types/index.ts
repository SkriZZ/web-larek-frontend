interface IProduct {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	price: number | null;
}

interface IBasketItem {
	product: IProduct;
	quantity: number;
}

interface IBasket {
	items: IBasketItem[];
	total: number;
}

interface IUser {
	email: string;
	phone: string;
	address: string;
	paymentMethod: string;
}

interface IOrderData {
	items: IBasketItem[];
	total: number;
	user: IUser;
}

interface IContactFormData {
	email: string;
	phone: string;
}

interface IOrderFormData {
	paymentMethod: string;
	address: string;
}

interface IOrderResult {
	orderId: string;
	status: string;
	message: string;
}
