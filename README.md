# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения
Код приложения разделен на слои согласно парадигме MVP:
- слой представления, отвечает за отображение данных на странице,
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

## Базовый код

## Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов. 

### Поля класса
- `baseUrl: string` - базовый URL для API.
- `options: RequestInit` - параметры для HTTP-запросов.

### Методы класса
#### Конструктор
- `constructor(baseUrl: string, options: RequestInit = {})` Инициализирует экземпляр API с базовым URL и параметрами запросов.

- `protected handleResponse(response: Response): Promise<object>` Обрабатывает ответ от сервера. Если запрос успешен, возвращает `JSON`, иначе выбрасывает ошибку с описанием.

- `get(uri: string): Promise<object>` Выполняет GET-запрос по указанному URI и возвращает ответ.

- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` Выполняет POST, PUT или DELETE-запрос по указанному URI с переданными данными и возвращает ответ.

## Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.
Основные методы, реализуемые классом описаны интерфейсом IEvents:

### Поля класса
- `_events: Map<EventName, Set<Subscriber>>` - коллекция событий и их подписчиков.

### Методы класса
#### Конструктор
```typescript
constructor()
```
Инициализирует экземпляр `EventEmitter` с пустой коллекцией событий.

- `on<T extends object>(event: EventName, callback: (data: T) => void): void` - Добавляет обработчик для указанного события.

- `off(event: EventName, callback: Subscriber): void` - Удаляет обработчик для указанного события.

- `emit<T extends object>(event: string, data?: T): void` - Инициирует событие с переданными данными.

- `onAll(callback: (event: EmitterEvent) => void): void` - Добавляет обработчик, который слушает все события.

- `offAll(): void` - Удаляет все обработчики событий.

- `trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - Создаёт функцию, которая инициирует указанное событие при вызове.

## Абстрактный класс Component<T>
Базовый класс для всех компонентов пользовательского интерфейса.

### Методы класса
#### Конструктор
```typescript
constructor(protected readonly container: HTMLElement)
```
Инициализирует компонент с заданным контейнером. Используется для наследования в конкретных компонентах.

- `toggleClass(element: HTMLElement, className: string, force?: boolean): void` - Добавляет или удаляет класс у элемента в зависимости от значения `force`.

- `setDisabled(element: HTMLElement, state: boolean): void` - Устанавливает или снимает атрибут `disabled` у элемента в зависимости от значения `state`.

- `protected setText(element: HTMLElement, value: unknown): void` - Устанавливает текстовое содержимое элемента.

- `protected setImage(element: HTMLImageElement, src: string, alt?: string): void` - Устанавливает `src` и `alt` для изображения.

- `render(data?: Partial<T>): HTMLElement` - Применяет переданные данные к текущему компоненту и возвращает его контейнер.

## Абстрактный класс Model<T>
Базовый класс для моделей данных.

### Методы класса
#### Конструктор
```typescript
constructor(data: Partial<T>, protected events: IEvents)
```
Инициализирует модель с данными и событиями, переданными через параметры. Используется для наследования в конкретных моделях.

- `emitChanges(event: string, payload?: object): void` - Вызывает событие с указанным именем и данными.

## Компоненты модели данных

## Класс LarekApi
Этот класс расширяет базовый класс Api и добавляет специфические методы для взаимодействия с API

### Поля класса
- `cdn: string` - базовый URL для получения изображений.

### Методы класса
#### Конструктор
```typescript
constructor(cdnUrl: string, baseUrl: string, options?: RequestInit)
```
Инициализирует экземпляр класса `LarekApi` с базовым URL для API и CDN.

- `fetchProductList(): Promise<IProductItem[]>` - Получает список продуктов из API.

- `submitOrder(orderData: IOrder): Promise<IOrderResult>` - Отправляет данные заказа на сервер.

## AppState (Модель данных приложения)

Класс AppState является основной моделью для работы с состоянием приложения, и он содержит в себе различные свойства и методы для управления каталогом продуктов, корзиной, заказами. 

### Поля класса
- `catalog: Product[]` - список доступных продуктов.
- `preview: string` - ID продукта, выбранного для предпросмотра.
- `basket: Product[]` - список продуктов, добавленных в корзину.
- `order: IOrder` - текущие данные заказа.
- `formErrors: FormErrors` - текущие ошибки формы.

### Методы класса
#### Конструктор
```typescript
constructor(data: Partial<IAppState>, events: EventEmitter)
```
Инициализирует экземпляр класса `AppData` с начальными данными и подписывает события.

- `clearBasket(): void` - Очищает корзину и удаляет товары из заказа.

- `addToOrder(product: Product): void` - Добавляет продукт в заказ.

- `removeFromOrder(product: Product): void` - Удаляет продукт из заказа.

- `setCatalog(items: IProductItem[]): void` - Загружает список продуктов в каталог.

- `setPreview(product: Product): void` - Устанавливает продукт для предпросмотра.

- `addProductToBasket(product: Product): void` - Добавляет продукт в корзину.

- `removeProductFromBasket(product: Product): void` - Удаляет продукт из корзины.

- `get statusBasket(): boolean` - Возвращает статус корзины (пустая или нет).

- `get bskt(): Product[]` - Возвращает текущий список продуктов в корзине.

- `set total(value: number): void` - Устанавливает общую стоимость заказа.

- `getTotal(): number` - Возвращает общую стоимость всех продуктов в заказе.

- `setOrderField(field: keyof IOrderForm, value: string): void` - Обновляет указанное поле в данных заказа.

- `setContactsField(field: keyof IOrderForm, value: string): void` - Обновляет указанное поле в данных контактной формы.

#### `validateOrder(): boolean` - Валидация данных заказа. Возвращает `true`, если ошибок нет.

#### `validateContacts(): boolean` - Валидация контактных данных. Возвращает `true`, если ошибок нет.

## Класс ProductItem

Является моделью хранения данных товара: идентификатора, заголовка, описания, категории, изображения, цены.
Расширяется базовым абстрактным классом Model<T> по интерфейсу IProductItem.

```
interface IProductItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number | null;
}
```

## Компоненты представления

## Класс Card
Отображает карточку товара и обрабатывает действия пользователя.

```
interface ICard {
  title: string;
  category: string;
  image: string;
  price: number;
  text: string;
}
```

### Поля класса
- `titleElement: HTMLElement` - элемент для отображения заголовка карточки.
- `categoryElement: HTMLElement` - элемент для отображения категории карточки.
- `imageElement: HTMLImageElement` - элемент для отображения изображения карточки.
- `priceElement: HTMLElement` - элемент для отображения цены карточки.
- `categoryMapping: Record<string, string>` - объект для сопоставления категорий с их CSS-классами.

### Методы класса
#### Конструктор
```typescript
constructor(container: HTMLElement, actions?: ICardActions)
```
Инициализирует экземпляр класса `Card` и настраивает обработчики событий, если они переданы.

- `set title(value: string): void` - Устанавливает заголовок карточки.

#### `set category(value: string): void` - Устанавливает категорию карточки и применяет соответствующий CSS-класс.

- `set image(src: string): void` - Устанавливает изображение для карточки.

- `set price(amount: number | null): void` - Устанавливает цену карточки. Если значение `null`, отображается "Бесценно".

## Класс CardPreview
Класс CardPreview наследует все методы и свойства базового класса Card, что позволяет использовать их без необходимости повторного определения. 

### Поля класса
- `textElement: HTMLElement` - элемент для отображения дополнительного текста.
- `buttonElement: HTMLElement` - кнопка для добавления товара в корзину.

### Методы класса
#### Конструктор
```typescript
constructor(container: HTMLElement, actions?: ICardActions)
```
Инициализирует экземпляр класса `CardPreview` и настраивает обработчики событий для кнопки добавления в корзину.

- `set text(content: string): void` - Устанавливает текст описания карточки.


## Класс CardBasket
Отображает товар в корзине и позволяет его удалить.
Поля отвечают за связь с разметкой, методы за наполнение разметки данными.

### Поля класса
- `titleElement: HTMLElement` - элемент для отображения заголовка товара.
- `priceElement: HTMLElement` - элемент для отображения цены товара.
- `indexElement: HTMLElement` - элемент для отображения индекса товара в корзине.
- `deleteButton: HTMLElement` - кнопка для удаления товара из корзины.

### Методы класса
#### Конструктор
```typescript
constructor(container: HTMLElement, actions?: ICardActions)
```
Инициализирует экземпляр класса `CardBasket` и настраивает обработчик удаления товара из корзины.

- `set title(value: string): void` - Устанавливает заголовок товара в корзине.

- `set price(amount: number): void` - Устанавливает цену товара в корзине.

- `set index(num: number): void` - Устанавливает индекс товара в корзине.

## Класс `Page`
Отвечает за отображение данных составляющих элементов страницы: каталог, корзина, счетчик товаров в корзине
Поля отвечают за связь с разметкой, методы за наполнение разметки данными, а также метод закрытия/открытия для прокрутки страницы при открытии/закрытии модального окна.

### Поля класса
- `catalog: HTMLElement[]` - массив DOM-элементов, представляющих товары в каталоге.
- `basketCounterDisplay: HTMLElement` - элемент для отображения количества товаров в корзине.
- `gallerySection: HTMLElement` - элемент секции, где отображается галерея товаров.
- `pageWrapper: HTMLElement` - основной контейнер страницы.
- `basketButton: HTMLElement` - кнопка для открытия корзины.

### Методы класса
#### Конструктор
```typescript
constructor(container: HTMLElement, private eventBus: IEvents)
```
Инициализирует экземпляр класса `Page` с контейнером страницы и шиной событий. Также настраивает элементы интерфейса и подписывает обработчики событий.

- `set counter(count: number): void` - Обновляет отображение количества товаров в корзине.

- `set catalog(items: HTMLElement[]): void` - Обновляет содержимое секции галереи с новыми элементами каталога.

- `set locked(isLocked: boolean): void` - Блокирует или разблокирует интерфейс страницы, добавляя или удаляя CSS-класс `page__wrapper_locked`.

## Класс Modal

Управляет модальными окнами в приложении.

### Поля класса
- `content: HTMLElement | null` - содержимое модального окна.
- `closeButton: HTMLButtonElement` - кнопка для закрытия модального окна.
- `contentArea: HTMLElement` - область, где отображается содержимое модального окна.

### Методы класса
#### Конструктор
```typescript
constructor(container: HTMLElement, private eventBus: IEvents)
```
Инициализирует экземпляр класса `Modal` с контейнером для модального окна и шиной событий. Настраивает элементы интерфейса и подписывает обработчики событий.

- `set content(element: HTMLElement): void` - Устанавливает содержимое модального окна.

- `open(): void` - Открывает модальное окно, добавляя CSS-класс `modal_active`, и вызывает событие `modal:open` через шину событий.

- `close(): void` - Закрывает модальное окно, удаляя CSS-класс `modal_active`, очищает содержимое модального окна и вызывает событие `modal:close` через шину событий.

- `render(data: IModalContent): HTMLElement`

## Класс `Basket`
Отображает содержимое корзины и обрабатывает действия пользователя.Имеет возможность удаления позиции товара из корзины.

### Поля класса
- `items: HTMLElement[]` - массив DOM-элементов, представляющих товары в корзине.
- `totalAmount: HTMLElement` - элемент для отображения общей стоимости товаров.
- `checkoutButton: HTMLButtonElement` - кнопка для перехода к оформлению заказа.

### Методы класса
#### Конструктор
```typescript
constructor(container: HTMLElement, private eventBus: EventEmitter)
```
Инициализирует экземпляр класса `Basket` с контейнером корзины и шиной событий. Настраивает элементы интерфейса и подписывает обработчики событий.

- `set items(elements: HTMLElement[]): void` - Устанавливает список товаров в корзине. Если корзина пуста, отображает сообщение "Корзина пуста".

- `set total(amount: number): void` - Обновляет отображение общей стоимости товаров в корзине с использованием форматирования числа.

- `setDisabled(button: HTMLButtonElement, isDisabled: boolean): void` - Управляет доступностью переданной кнопки, делая её активной или неактивной.


## Класс Order
Отвечает за отображение первого шага заказа в модальном окне.

### Поля класса
- `paymentOptions: HTMLButtonElement[]` - кнопки для выбора способа оплаты.

### Методы класса
#### Конструктор
```typescript
constructor(formElement: HTMLFormElement, eventBus: IEvents)
```
Инициализирует экземпляр класса `Order`. Настраивает кнопки выбора способа оплаты и подписывает их на события изменения.

- `set payment(name: string): void` - Устанавливает активный способ оплаты, добавляя класс `button_alt-active` к выбранной кнопке и убирая его с остальных.

- `set address(value: string): void` - Устанавливает значение для поля адреса в форме.

- `private updatePaymentSelection(selectedName: string): void` - Обновляет выбор способа оплаты и вызывает метод `set payment`.

## Класс Contacts
Отвечает за отображение второго шага заказа в модальном окне.

### Методы класса
#### Конструктор
```typescript
constructor(formElement: HTMLFormElement, eventBus: IEvents)
```
Инициализирует экземпляр класса `Contacts`.

- `set phone(value: string): void` - Устанавливает значение для поля телефона в форме.

- `set email(value: string): void` - Устанавливает значение для поля email в форме.

## Класс Form<T>
Отвечает за основные способы работы с формой и ее валидацию.

### Поля класса
- `formElement: HTMLFormElement` - элемент формы.
- `submitBtn: HTMLButtonElement` - кнопка отправки формы.
- `errorDisplay: HTMLElement` - элемент для отображения ошибок в форме.
- `eventBus: IEvents` - объект для работы с событиями.

### Методы класса
#### Конструктор
```typescript
constructor(formElement: HTMLFormElement, eventBus: IEvents)
```
Инициализирует экземпляр класса `Form` с элементом формы и шиной событий. Настраивает элементы интерфейса и подписывает обработчики событий на ввод и отправку формы.

- `private handleInputChange(field: keyof T, value: string): void` - Обрабатывает изменения в полях формы и вызывает событие изменения значения через шину событий.

- `set valid(isValid: boolean): void` - Управляет доступностью кнопки отправки формы в зависимости от валидности данных формы.

- `set errors(message: string): void` - Отображает сообщение об ошибке в элементе для ошибок формы.

- `render(state: Partial<T> & IFormState): HTMLElement` - Рендерит состояние формы, обновляя валидность, ошибки и другие параметры.

## Класс Success
Отображает сообщение об успешном оформлении заказа.

### Поля класса
- `totalElement: HTMLElement` - элемент для отображения суммы списания.
- `closeBtn: HTMLElement` - кнопка для закрытия сообщения об успешном оформлении.

### Методы класса
#### Конструктор
```typescript
constructor(container: HTMLElement, actions: ISuccessActions)
```
Инициализирует экземпляр класса `Success` с контейнером и действиями. Настраивает элементы интерфейса и подписывает обработчик события на кнопку закрытия.

- `set total(amount: string): void` - Устанавливает сумму списания и обновляет текст в элементе `totalElement`.