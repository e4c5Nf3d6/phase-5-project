# Color Order

Color Order allows users from a salon to create color orders based on product usage reports from two systems, [Phorest](https://www.phorest.com/) and [Vish](https://getvish.com/).

![Create Order](/client/public/create_order.png)

New products and product categories in the reports are detected automatically; users are given the opportunity to add those products before the order is finalized. Once an order is created, a user can view the order, edit the order, and download a PDF of the order.

![Edit Order](/client/public/edit_order.png)

A user can view the details of any product, edit the product, and see its order history.

![Product](/client/public/product.png)

There is a tracking feature available wherein a user can filter orders by date, product name, and category. Products orders that fit the criteria will be displayed in order of the most to least ordered products.

![Tracking](/client/public/tracking.png)

# Table of Contents

- [Technologies](#technologies)
- [Code](#code)
    - [server](#server)
        - [app.py](#apppy)
        - [models.py](#modelspy)
        - [config.py](#configpy)
        - [seed.py](#seedpy)
    - [client](#client)
        - [index.js](#indexjs)
        - [index.html](#indexhtml)           
        - [index.css](#indexcss)
        - [/hooks/useDocumentTitle.js](#hooksusedocumenttitlejs)
        - [/app/store.js](#appstorejs)
        - [features](#features)
            - [/display/displaySlice.js](#displaydisplayslicejs)
            - [/locations/locatiosnSlice.js](#locationslocatiosnslicejs)
            - [/orders/ordersSlice.js](#ordersordersslicejs)
            - [/productOrders/productOrdersSlice.js](#productordersproductordersslicejs)
            - [/products/productsSlice.js](#productsproductsslicejs)
            - [/user/userSlice.js](#useruserslicejs)
            - [/users/usersSlice.js](#usersusersslicejs)
        - [components](#components)
            - [AddLocation.js](#addlocationjs)
            - [AddProduct.js](#addproductjs)
            - [AddProductOrder.js](#addproductorderjs)
            - [AddUser.js](#adduserjs)
            - [App.js](#appjs)
            - [BackArrow.js](#backarrowjs)
            - [CreateOrder.js](#createorderjs)
            - [EditOrder.js](#editorderjs)
            - [EditProduct.js](#editproductjs)
            - [EditProductOrder.js](#editproductorderjs)
            - [Home.js](#homejs)
            - [Login.js](#loginjs)
            - [NavBar.js](#navbarjs)
            - [NewCategory.js](#newcategoryjs)
            - [NewPhorestProduct.js](#newphorestproductjs)
            - [NewVishProduct.js](#newvishproductjs)
            - [OrderDetails.js](#orderdetailsjs)
            - [OrderDisplay.js](#orderdisplayjs)
            - [OrderList.js](#orderlistjs)
            - [OrderPDF.js](#orderpdfjs)
            - [OrderProducts.js](#orderproductsjs)
            - [Orders.js](#ordersjs)
            - [PrivateRoute.js](#privateroutejs)
            - [ProductDetails.js](#productdetailsjs)
            - [ProductDisplay.js](#productdisplayjs)
            - [ProductFilter.js](#productfilterjs)
            - [ProductHistory.js](#producthistoryjs)
            - [ProductList.js](#productlistjs)
            - [Products.js](#productsjs)
            - [Tracking.js](#trackingjs)
            - [TrackingDisplay.js](#trackingdisplayjs)
            - [TrackingFilter.js](#trackingfilterjs)
- [Acknowledgements](#acknowledgements)

# Technologies

- Python
- Flask
- Pandas
- Javascript
- React
- Redux
- HTML
- CSS

# Code

## `server`

### `app.py` 
Contains the routes.

`Login`
- `post` gets the JSON from the user request and checks for an matching user. If it exists, it sets the `user_id` attribute of the session and returns the user. Otherwise, it returns an error.

`CheckSession`
- `get` checks the session for a `user_id` attribute. If it exists, it returns the associated user. If it does not exist, it returns an error.

`Logout`
- `delete` sets the `user_id` attribute of the session, if it exists, to `None`. If it does not exist, it returns an error.
    
`Users`
- `get` returns all of the users in the database. If no users exist, it returns an error.
- `post` gets the JSON from the user request, creates a new `User` instance, and tries to add it to the database. If the instance can be added, it returns the user. Otherwise, it returns an error.
        
`UsersByID`
- `get` returns the user matching the provided `id` if it exists. Otherwise, it returns an error.
- `patch` gets the JSON from the request and tries to update the user that matches the provided `id`. If the input is valid, it returns the user. Otherwise, it returns an error.   
- `delete` deletes the user matching the provided `id`.

`Locations`
- `get` returns all of the locations in the database. If no locations exist, it returns an error.
- `post` gets the JSON from the user request, creates a new `Location` instance, and tries to add it to the database. If the instance can be added, it returns the location. Otherwise, it returns an error.

`Categories`
- `get` returns all of the categories in the database. If no categories exist, it returns an error.
- `post` gets the JSON from the user request, creates a new `Category` instance, and tries to add it to the database. If the instance can be added, it returns the category. Otherwise, it returns an error.     
        
`Products`
- `get` returns all of the products in the database. If no products exist, it returns an error.
- `post` gets the JSON from the user request and checks for a product with the same `vish_name` and `category_id`. If one exists, it returns an error. If not, it creates a new `Product` instance, and tries to add it to the database. If the instance can be added, it returns the product. Otherwise, it returns an error. 

`ProductsByID`
- `get` returns the product matching the provided `id` if it exists. Otherwise, it returns an error.
- `patch` gets the JSON from the request and checks for a product with a different `id` than the one provided but the same `vish_name` and `category_id`. If one exists, it returns an error. Otherwise, it tries to update the product that matches the provided `id`. If the input is valid, it returns the product. Otherwise, it returns an error.   
- `delete` deletes the product matching the provided `id`.
 
`Orders`
- `get` returns all of the orders in the database. If no orders exist, it returns an error.
- `post` gets the `user_id` from the session object and the `location_id` from the request form and creates an `Order` instance. If files have been added to the request and can be read, it finds the products in the files and adds them to a list of products. If files have been added but cannot be read or do not contain products, it returns an error. If a category is detected that is not in the database, it is added to a list of categories to add. For each product that was found, it tries to find a matching product in the database. If one exists, the product is added to a list of orders. If a match does not exist, the product is added to a list of products that need to be added. It then checks the lists of orders from the two files and filters out duplicates, keeping the product order with the greater order quantity. It then adds the order to the session, creates `ProductOrder` instances for every product order in the filtered lists, and adds them to the session. It adds the order and the product orders to the database and returns a response containing the order, products to add, and categories to add.

`OrdersByID`
- `get` returns the order matching the provided `id` if it exists. Otherwise, it returns an error.
- `delete` deletes the order matching the provided `id`.
        
`ProductOrders`
- `get` returns all of the product orders in the database. If no product orders exist, it returns an error.
- `post` gets the JSON from the user request, creates a new `ProductOrder` instance, and tries to add it to the database. If the instance can be added, it returns the product order. Otherwise, it returns an error.    
    
`ProductOrdersByID`
- `get` returns the product order matching the provided `id` if it exists. Otherwise, it returns an error.
- `patch` gets the JSON from the request and tries to update the product order that matches the provided `id`. If the input is valid, it returns the product order. Otherwise, it returns an error.   
- `delete` deletes the product order matching the provided `id`, if it exists. If it does not exist, it returns an error.

### `models.py`

Contains the models.

`User` model class
- `users` table
- properties
    - `id` is the primary key.
    - `username` is a unique string.
    - `admin` is a Boolean.
    - `_password_hash` is a hybrid property. When it is set, the password provided is encrypted using bycrypt. Trying to access its value will raise an `AttributeError`
- relationships
    - `orders` is all of the orders created by the user.
- methods
    - `authenticate` checks that a provided password matches `_password_hash`    
    
`Location` model class
- `locations` table
- properties
    - `id` is the primary key.
    - `name` = is a unique string.
- relationships
    - `orders` is all of the orders associated with the location.

`Category` model class
- `categories` table
- properties
    - `id` is the primary key.
    - `name` = is a unique string.
- relationships
    - `products` is all of the products associated with the category.

`Product` model class
- `products` table
- properties
    - `id` is the primary key.
    - `name` = is a unique string.
    - `category_id` is a foreign key referencing a category.
    - `phorest_name` is a unique string.
    - `vish_name` is a string.
- relationships
    - `category` is the category associated with the product.
    - `product_orders` is all of the product orders associated with the product.
    - `orders` is all of the orders that include the product.
    
`Order` model class
- `orders` table
- properties
    - `id` is the primary key.
    - `location_id` is a foreign key referencing a location.
    - `user_id` is a foreign key referencing a user.
    - `date` is a datetime that defaults to now.
- relationships
    - `user` is the user associated with the order.
    - `location` is the location associated with the order.
    - `product_orders` is all of the product orders associated with the order.
    - `products` is all of the products included in the order.

`ProductOrder` model class
-`product_orders` table
- properties
    - `id` is the primary key.
    - `product_id` is a foreign key referencing a product.
    - `order_id` is a foreign key referencing an order.
    - `quantity` is an integer.
- relationships
    `product` is the product associated with the product order.
    `order` is the order associated with the product order.

### `config.py`
Contains the database and API configuration.

### `seed.py`
Deletes all record from the database, then seeds the database with users, locations, categories, and products, orders, and product orders.

## `client`

### `index.js`
Renders the `App` component, wrapped in `<BrowserRouter>` and `<Provider>`, to the root of the HTML document.

### `index.html`
Contains the link tag for the application's favicon.

### `index.css`
Contains the styling for the app.

### `/hooks/useDocumentTitle.js`
Sets the document title.

### `/app/store.js`
Configures and exports the store.

### `features`

#### `/display/displaySlice.js`
Uses createSlice to set the initial state and define the reducers for the display state in the application.

#### `/locations/locatiosnSlice.js`
- Uses createSlice to set the initial state and define the reducers and extra reducers for the locations state in the application.
- Defines Thunks for fetching and adding locations.

#### `/orders/ordersSlice.js`
- Uses createSlice to set the initial state and define the reducers and extra reducers for the orders state in the application.
- Defines Thunks for fetching and adding orders.

#### `/productOrders/productOrdersSlice.js`
- Uses createSlice to set the initial state and define the reducers and extra reducers for the product orders state in the application.
- Defines Thunks for fetching, adding, editing, and deleting product orders.

#### `/products/productsSlice.js`
- Uses createSlice to set the initial state and define the reducers and extra reducers for the products and categories state in the application.
- Defines Thunks for fetching and adding categories and fetching, adding, and editing products.

#### `/user/userSlice.js`
- Uses createSlice to set the initial state and define the reducers and extra reducers for the user state in the application.
- Defines Thunks for logging in and out.

#### `/users/usersSlice.js`
- Uses createSlice to set the initial state and define the reducers and extra reducers for the users state in the application.
- Defines Thunks for fetching and adding users.

### `components`

#### `AddLocation.js`
- Houses `showError` and `success` states.
- Uses Yup to set the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `addLocation` and sets the `success` state to `true` unless an error is returned, in which case it sets the `showError` state to `true`
- Returns the `BackArrow` component.
    - Returns a success message if the `success` state is `true`.
    - Returns a form to add a new location if the `success` state is `false`. Returns an error message if the `showError` state is `true`.

#### `AddProduct.js`
- Houses `showError` and `success` states.
- Uses Yup to set the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `addProduct` and sets the `success` state to `true` unless an error is returned, in which case it sets the `showError` state to `true`
- Returns the `BackArrow` component.
    - Returns a success message if the `success` state is `true`.
    - Returns a form to add a new product if the `success` state is `false`. Returns an error message if the `showError` state is `true`.

#### `AddProductOrder.js`
- Houses `showError` state.
- Filters out products already included in the order. They are not displayed as options in the form.
- Uses Yup to set the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `addProduct` and dispatches `addProductToOrder` and `setOrderDisplay` unless an error is returned, in which case it sets the `showError` state to `true`
- Uses `useEffect` to set a timeout for the `showError` state.
- Returns a form to add a new product order. Returns an error message if the `showError` state is `true`.
 
#### `AddUser.js`
- Houses `showError` and `success` states.
- Uses Yup to set the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `addUser` and sets the `success` state to `true` unless an error is returned, in which case it sets the `showError` state to `true`
- Returns the `BackArrow` component.
    - Returns a success message if the `success` state is `true`.
    - Returns a form to add a new user if the `success` state is `false`. Returns an error message if the `showError` state is `true`.

#### `App.js`
- Uses useEffect to send a request to the "/check_session" endpoint. If the response is okay, it dispatches `setUser`.
- Uses useEffect to dispatch `fetchProductCategories`, `fetchProductOrders`, `fetchProducts`, and `fetchLocations`.
- Returns the `NavBar` component. Returns the route to the `Login` component `PrivateRoute` components for the `Products`, `Orders`, `Tracking`, and `Home` components, all wrapped in `<Switch>`.

#### `BackArrow.js`
- Returns a button that dispatches `resetHomeDisplay` when clicked.

#### `CreateOrder.js`
- Houses `orderID`, `error`, `phorestPath`, and `vishPath` states.
- Uses Yup to define the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `createOrder` and dispatches `createOrderDisplay` unless an error is returned, in which case it sets the `error` state to the error message returned.
- Returns the `NewCategory` component if there are any `floatingCategories` in the orders state.
- Returns the `NewPhorestProduct` component if there are any `floatingPhorestProducts` in the orders state.
- Returns the `NewVishProduct` component if there are any `floatingVishProducts` in the orders state.
- If there are no floating categories or poducts, it returns the `BackArrow` component.
    - If the order display state is "success", it returns a success message and a button that, when clicked, dispatches `getOrder` and `setActiveOrder` and redirects the user to the orders page.
    - If the order display state is not "success", it returns buttons to upload reports as well as a form to create an order. It also returns an error message if the `error` state evaluates to `true`.

#### `EditOrder.js`
- Selects the active order from the orders state and sorts the product orders associated with the order by product name and category
- Returns a heading stating there are no product orders if none are found. Otherwise, it returns an `EditProductOrder` component for each product order.
- Returns an add button that dispatches `setOrderDisplay` when clicked.

#### `EditProduct.js`
- Houses `showError` state.
- Uses Yup to define the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `editProduct`, `setProductDisplay`, and `setActiveProduct` unless an error is returned, in which case it sets the `showError` state to `true`.
- Returns a form to edit a product. Returns an error message if the `showError` state is `true`.

#### `EditProductOrder.js`
- Houses `productAmount`, `lastSavedAmount`, and `error` states.
- Defines the async function `handleSave`. When executed, `handleSave` dispatches `patchProductOrder` and `updateActiveOrder` and sets the `lastSavedAmount` state unless there is an error, in which case it sets the `error` state.
- Defines the async function `handleRemove`. When executed, `handleRemove` dispatches `deleteProductOrder` and `removeProductFromOrder` unless there is an error, in which case it sets the `error` state.
- Uses `useEffect` to set a timeout for the `error` state.
- Returns the product name
- Returns a number input with the value `productAmount`.
- Returns a save button that is disabled if `productAmount` equals `lastSavedAmount`. When clicked, the button calls `handleSave`.
- Returns a delete button that calls `handleRemove` when clicked.
- Returns an error message if the `error` state evaluates to `true`.

#### `Home.js`
- Calls the `useDocumentTitle` hook.
- Returns the `AddUser` component if the home display state equals "addUser".
- Returns the `AddLocation` component if the home display state equals "addLocation".
- Returns the `AddProduct` component if the home display state equals "addProduct".
- Returns the `CreateOrder` component if the home display state equals "addOrder".
- If the home display state does not equal any of the values above, it returns buttons which, when clicked, dispatch `setHomeDisplay`. 

#### `Login.js`
- Houses `showError` state.
- Uses Yup to define the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `login` and `setHomeDisplay` unless an error is returned, in which case it sets the `showError` state to `true` and resets the form.
- If a user exists in the user state, it redirects to the the "/" route.
- Returns a login form.

#### `Navbar.js`
- Uses `UseEffect` to dispatch `fetchLocations`.
- Defines the async function `handleLogout`, which dispatches `logout`.
- If no user is defined in the user state, it redirects to "/login/"
- Returns buttons for each location which, when clicked, dispatch `setActiveLocation`. If the location equals the `activeLocation` in the location state, the button is styled differently. 
- Returns `<NavLink>`s to the routes "/", "/products", "/orders", and "/tracking".
- Returns an icon with the user's first initial that displays the user's username on hover and a logout button that calls `handleLogout` when clicked.

#### `NewCategory.js`
- Houses the `showError` state.
- Sets a `category` variable to the first category in `floatingCategories` in the order state, if any exist.
- Defines the async function `handleAdd`, which dispatches `addCategory` and `removeFloatingCategory` and sets the `showError` state to `false`.
- Defines the function `handleSkip`, which dispatches `removeFloatingVishProducts` and `removeFloatingCategory` and sets the `showError` state to `false`.
- Uses `useEffect` to set a timeout for the `showError` state.
- Returns a heading with the new category name and buttons that call `handleAdd` or `handleSkip` when clicked. Returns an error message if the `showError` state evaluates to `true`.

#### `NewPhorestProduct.js`
- Houses the `showError` states.
- Sets a `product` variable to the first product in `floatingPhorestProducts` in the order state, if any exist.
- Uses Yup to define the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `addProduct`, `addProductOrder`, `removeFloatingProduct`, and `removeFloatingVishProduct` and sets the `showError` state to `false` unless an error is returned, in which case it sets the `showError` state to `true`.
- Uses `useEffect` to set the Formik field values to the values of the current product.
- Defines the function `handleSkip`, which dispatches `removeFloatingProduct`.
- Returns a header with the new product's name, a form to add the new product, and a button that, when clicked, calls `handleSkip`. Also returns an error message if `showError` is `true`.

#### `NewVishProduct.js`
- Houses the `showError` states.
- Sets a `product` variable to the first product in `floatingVishProducts` in the order state, if any exist.
- Uses Yup to define the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `addProduct`, `addProductOrder`, and `removeFloatingProduct` and sets the `showError` state to `false` unless an error is returned, in which case it sets the `showError` state to `true`.
- Uses `useEffect` to set the Formik field values to the values of the current product.
- Defines the function `handleSkip`, which dispatches `removeFloatingProduct`.
- Returns headers with the new product's name and category, a form to add the new product, and a button that, when clicked, calls `handleSkip`. Also returns an error message if `showError` is `true`.

#### `OrderDetails.js`
- Returns the active order's location, date, and user.

#### `OrderDisplay.js`
- Returns a message to select an order if there is no active order in the orders state.
- Returns a heading with the order number and buttons which, when clicked, dispatch `setOrderDisplay`.
- Also returns either the `OrderDetails`, the `OrderProducts`, the `EditOrder`, the `AddProductOrder`, or the `OrderPDF` component based on the value of the order display state.

#### `OrderList.js`
- Filters orders based on the `activeLocation` in the locations state.
- Returns a list of filtered orders. Each item, when clicked, dispatches `setOrderDisplay` and `setActiveOrder`. If an order equals the active order, it has different styling.

#### `OrderPDF.js`
- Takes in an order as props.
- Sorts the product orders associated with the order by name and category.
- Defines the function `downloadPDF` which uses jsPDF to create a PDF which is then downloaded to the user's computer.
- Returns a download button that calls `downloadPDF` when clicked. Also returns the order's location, date, and a table of product orders.

#### `OrderProducts.js`
- Sorts the product orders associated with the active order by name and category.
- Returns a message saying there are no product orders if none exist. Otherwise, it returns a list with each product's name and order quantity.

#### `Orders.js`
- Calls the `useDocumentTitle` hook.
- Uses `useEffect` to dispatch `fetchOrders`.
- Returns the components `OrderList` and `OrderDisplay`.
    
#### `PrivateRoute.js`
- Takes in a path and a component as props.
- If the user state is not set, it redirects to "/login".
- Returns a route to the component passed in.

#### `ProductDetails.js`
- Returns the active product's details.

#### `ProductDisplay.js`
- Returns a message to select a product if there is no active product. Otherwise, it returns the product's name, buttons that, when clicked, dispatch `setProductDisplay`, and either the `ProductDetails`, the `EditProduct`, or the `ProductHistory` component, based on the value of the product display state.

#### `ProductFilter.js`
- Returns a text input, set to the value of `productQuery` in the products state, that dispatches `setQuery` on change. Also returns a select input that dispatches `setActiveCategory` on change.

#### `ProductHistory.js`
- Takes in a product as props.
- Filters product orders associated with the product if an active location is set.
- Returns a message that no history was found if there are no product orders in the filtered list. Otherwise, returns the date and quantity for each product order in the filtered list.

#### `ProductList.js`
- Sorts all products by name and category.
- Filters products by active category and `productQuery`.
- Returns a list of product names. When a name is clicked, it dispatches `setProductDisplay` and `setActiveProduct`. If there is an active product, its name is styled differently.

#### `Products.js`
- Calls the `useDocumentTitle` hook.
- Uses `useEffect` to dispatch `fetchProductOrders` and `fetchProducts`.
- Returns the `ProductFilter`, `ProductList`, and `ProductDisplay` components.

#### `Tracking.js`
- Calls the `useDocumentTitle` hook.
- Uses `useEffect` to dispatch `fetchProducts`.
- Returns the `TrackingFilter` and `TrackingDisplay` components.

#### `TrackingDisplay.js`
- Filters products by the category and query in the product orders state.
- Finds the total quantity of all product orders for each product within the set date range and associated with the active location. Filters out any products that have no order history matching the specified criteria.
- Returns a message that there are no products to show if there are no products that match the criteria. Otherwise, returns a list of product names and order quantities, sorted by quantity.

#### `TrackingFilter.js`
- Returns date inputs with the values of `startDate` and `endDate` from the product orders state that dispatch `setStartDate` and `setEndDate` respectively on change. Returns a text input with the value of `query` from the product orders state that dispatches `setQuery` on change. Returns a select input that dispatches `setCategory` on change.

# Acknowledgements
Thanks to Phorest and Vish for their product tracking reports.

