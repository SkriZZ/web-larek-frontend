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

## Архитектура приложения, основанная на парадигме MVP (Model-View-Presenter), позволяет организовать код так, чтобы он был более модульным, тестируемым и поддерживаемым. Рассмотрим более подробно каждый из слоев.

### 1. Слой данных (Model)
Слой данных отвечает за хранение, извлечение и управление данными приложения. Он может взаимодействовать с базами данных, веб-сервисами или локальным хранилищем. Основные характеристики слоя данных:

- Хранение: Слой данных управляет всеми операциями, связанными с данными: их загрузкой, сохранением и изменением. Это может быть работа с API, локальными базами данных (например, SQLite) или другими источниками данных.
Изоляция бизнес-логики: В слое данных также не содержится бизнес-логика. Он просто обеспечивает доступ к данным и их изменение по запросу презентера.
Адаптируемость: При изменении источника данных в этом слое необходимо вносить изменения только здесь, предоставляя презентеру и представлению чистый интерфейс взаимодействия.

### 2. Слой представления (View)
Слой представления отвечает за отображение данных и взаимодействие с пользователем. Он включает в себя все элементы пользовательского интерфейса (UI), такие как кнопки, текстовые поля, списки и т.д. Основные характеристики этого слоя:

- Отображение: Слой представления формирует визуальную часть приложения. Например, он может отображать список элементов, заголовки, изображения и другую информацию, полученную от презентера.
- Взаимодействие с пользователем: Он также обрабатывает действия пользователя, такие как нажатия кнопок, ввод текста и другие взаимодействия.
Изоляция логики: В слое представления отсутствует бизнес-логика. Он получает информацию от презентера и не сам управляет данными. Это позволяет легко изменять внешний вид приложения, не затрагивая бизнес-логику.

### 3. Презентер (Presenter)
Презентер служит посредником между слоем представления и слоем данных. Он управляет логикой приложения, получая данные из модели и передавая их в представление. Основные характеристики презентера:

- Связь между слоями: Презентер осуществляет связь между слоем данных и слоем представления. Он запрашивает данные из модели и форматирует их для представления.
- Логика приложения: Основная бизнес-логика приложения реализуется в презентере. Он обеспечивает обработку пользовательских действий, запрашивает данные у модели и взаимодействует с представлением.
- Тестируемость: Из-за четкого разделения обязанностей презентер легко тестировать в изоляции от представления и слоя данных. Можно использовать специальные моки или заглушки для имитации взаимодействий.

## Основной код
## Класс `Api`
Отвечает за базовую функциональность отправки HTTP-запросов. Конструктор принимает адрес сервера и необязательный объект с заголовками запросов.

### Методы класса
- `protected handleResponse` Обрабатывает ответ от сервера. В случае успешного завершения запроса возвращает данные в формате JSON, при ошибке выбрасывает исключение с описанием проблемы.
- `get` Выполняет запрос типа GET по заданному URI, возвращая результат.
- `post` Отправляет POST, PUT или DELETE-запрос по указанному URI с переданными данными и возвращает ответ.

### Класс `EventEmitter`
Система управления событиями, позволяющая генерировать события и подписываться на них. Класс применяется в презентере для обработки событий и в других частях приложения для их создания.
Основные методы, реализуемые данным классом, описаны в интерфейсе IEvents:

### Методы класса
- `on` - Добавляет слушатель для определенного события.
- `off` - Убирает слушатель для заданного события.
- `emit` - Запускает событие с указанными данными.
- `onAll` - Добавляет глобальный слушатель, который отслеживает все события.
- `offAll` - Удаляет все слушатели событий.
- `trigger` - Создает функцию для вызова указанного события.

## Описание классов Model

## Класс `NetworkModel`
Отвечает за передачу и получение данных от сервера. Является наследником класса Api.

### Конструктор
- Принимает базовый URL сервера
- Опциональный объект заголовков запросов

### Методы класса
- `getProductList()`Получает массив объектов карточек товаров с сервера.
- `sendOrder(data)`Отправляет данные о заказе на сервер и получает ответ.

## Класс `CartModel`
Сохраняет и управляет данными, предоставленными пользователем.

### Методы класса
- `getProductCount()`Возвращает количество товаров в корзине.
- `getTotalSum()`Считает и возвращает общую сумму всех товаров в корзине.
- `addProduct(product)`Добавляет товар в корзину.
- `removeProduct(id)`Удаляет товар из корзины.
- `clearCart()`Очищает корзину от всех товаров.

## Класс `ProductDataModel`
Сохраняет данные о продуктах, полученные с сервера.

### Методы класса
- `setPreviewData(data)`Сохраняет данные о карточке, которая была открыта пользователем.

## Класс `UserFormModel`
Собирает и хранит данные, полученные от пользователя.

### Методы класса
- `setUserAddress(address)`Сохраняет адрес пользователя.
- `validateOrderData()`Проверяет адрес и способ оплаты пользователя.
- `setUserContacts(data)`Сохраняет контактные данные пользователя, такие как номер телефона и Email.
- `validateContacts()`Проверяет корректность контактных данных пользователя.
- `getOrderData()`Возвращает объект с данными пользователя и выбранными товарами.

## Классы View
## Класс `ShoppingCart`
Управляет отображением корзины.

### Поля:
- `element` - HTMLElement корзины
- `presenter` - EventEmitter

### Методы класса
- `renderProductCount(count)`Отображает количество товаров в корзине.
- `renderTotalSum(sum)`Отображает общую сумму всех товаров в корзине.
- `handleOpenCart()` - обработчик открытия корзины
- `handleRemoveProduct(id)` - обработчик удаления товара

## Класс `CartItemView`
Управляет отображением отдельных продуктов в корзине.

### Поля:
- `element` - HTMLElement элемента корзины
- `presenter` - EventEmitter

### Методы класса
- `formatPrice(price)`Принимает цену продукта в числовом формате и возвращает ее в строковом виде.
- `handleQuantityChange()` - обработчик изменения количества
- `handleRemoveItem()` - обработчик удаления товара

## Класс `ProductCard`
Отвечает за отображение товара в виде карточки.

### Поля:
- `element` - HTMLElement  карточки
- `presenter` - EventEmitter

### Методы класса
- `setText(element, text)`Принимает элемент HTMLElement и текстовое содержимое для него.
- `setCategory(category)`Устанавливает класс для HTMLElement на основе заданной категории.
- `formatPrice(price)`Принимает цену продукта и возвращает ее в текстовом виде.
- `handleCardClick()` - обработчик клика по карточке

## Класс `ProductPreview`
Наследует методы и свойства класса Card, а также управляет отображением детальной информации о товаре в превью и позволяет добавить товар в корзину.

### Поля:
- `element` - HTMLElement превью
- `presenter` - EventEmitter

### Методы класса
- `checkPriceAvailability()` Проверяет данные о продукте и, при отсутствии цены, запрещает покупку.
- `handleAddToCart()` - обработчик добавления в корзину
- `handleClosePreview()` - обработчик закрытия превью

## Класс `PaymentOrder`
Управляет отображением информации в модальном окне, позволяет пользователю выбрать способ оплаты и указать адрес доставки.

### Поля:
- `element` - HTMLElement формы
- `presenter` - EventEmitter

### Методы класса
- `highlightPaymentMethod()`Выделяет выбранный метод оплаты.
- `handlePaymentSelect()` - обработчик выбора способа оплаты
- `handleAddressChange()` - обработчик изменения адреса

## Класс `UserContactForm`
Управляет данными в модальном окне, позволяя пользователю ввести номер телефона и Email.

### Поля:
- `element` - HTMLElement формы
- `presenter` - EventEmitter

### Методы класса
- `handlePhoneInput()` - обработчик ввода телефона
- `handleEmailInput()` - обработчик ввода email
- `handleFormSubmit()` - обработчик отправки формы

## Класс `ModalWindow`
Управляет выводом модальных окон.

### Поля:
- `element` - модального окна
- `presenter` - EventEmitter

### Методы класса
- `open()`Открывает модальное окно.
- `close() `Закрывает
- `handleCloseClick()` - обработчик закрытия

## Класс `OrderSuccess`
Управляет визуализацией успешного заказа в всплывающем окне.

### Поля:
- `element` - модального окно успеха
- `presenter` - EventEmitter

### Методы класса
- `showSuccessMessage()` - показывает сообщение об успехе
- `handleCloseSuccess()` - обработчик закрытия окна успеха

## Каждый класс View должен:

- Иметь конструктор с параметрами: HTMLElement и EventEmitter
- Иметь методы инициализации обработчиков событий
- Иметь методы для обработки пользовательских действий через EventEmitter
- Следовать принципу MVP без прямого взаимодействия между классами
- Использовать только HTMLElement или его производ