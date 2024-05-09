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
            - [CreateOrder.js](#createorder)
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

#### `CreateOrder`
- Houses `orderID`, `error`, `phorestPath`, and `vishPath` states.
- Uses Yup to define the form schema.
- Uses Formik to handle form values and submission. Upon submission, it dispatches `createOrder` and dispatches `createOrderDisplay` unless an error is returned, in which case it sets the `error` state to the error message returned.
- Returns the `NewCategory` component if there are any `floatingCategories` in the orders state.
- Returns the `NewPhorestProduct` component if there are any `floatingPhorestProducts` in the orders state.
- Returns the `NewVishProduct` component if there are any `floatingVishProducts` in the orders state.
- If there are no floating categories or poducts, it returns the `BackArrow` component.
    - If the order display state is "success", it returns a success message and a button that, when clicked, dispatches `getOrder` and `setActiveOrder` and redirects the user to the orders page.
    - If the order display state is not "success", it returns buttons to upload reports as well as a form to create an order. It also returns an error message if the `error` state evaluates to `true`.


# Acknowledgements

