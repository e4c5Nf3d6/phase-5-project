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
        - [components](#components)
            - [App.js](#appjs)
            - [NavBar.js](#navbarjs)  
            - [Login.js](#loginjs)
            - [Home.js](#homejs)     
        - [hooks](#hooks)
            - [useDocumentTitle.js](#usedocumenttitlejs)
        - [features](#features)
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

<!-- class ProductOrder(db.Model, SerializerMixin):
    __tablename__ = 'product_orders'

    serialize_rules = (
        '-product.product_orders',
        '-order.product_orders'
    )

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    quantity = db.Column(db.Integer)

    product = db.relationship('Product', back_populates='product_orders')
    order = db.relationship('Order', back_populates='product_orders') -->


### `config.py`

Contains the database and API configuration.

### `seed.py`

<!-- Deletes all record from the database, then seeds the database with users, players, games, and saves. -->

## `client`

### `index.js`

<!-- Renders the `App` component, wrapped in `<BrowserRouter>`, to the root of the HTML document. -->

### `index.html`

<!-- Contains link and script tags for the Chess Tempo PGN viewer. -->

### `index.css`

Contains the styling for the app.

### `components`

#### `App.js`

<!-- Houses state for `user`, `players`, `games`, and `saves`.

Makes a GET request to the /check_session endpoint. If the response is okay, sets the `user` state.
If the user state is set, makes a GET request to the user/id/saved endpoint. If the response is okay, sets the `saves` state.
Makes a GET request to the /players endpoint. If the response is okay, sets the `players` state.
Makes a GET request to the /games endpoint. If the response is okay, sets the `games` state.

Returns the `Navbar` component as well as routes to the `Home`, `SavedGames`, `Login`, and `SignUp` components, wrapped in `<Switch>`. -->

#### `NavBar.js`

<!-- Handles logging a user out by making a DELETE request to the /logout endpoint and redirecting the user to the home page.

Returns `<Navlink>`s to the home, login, and signup routes if no user is logged in.
Returns `<Navlink>`s to the home and saved routes as well as a greeting and a logout button if a user is logged in. -->

<!-- #### `SignUp.js`

Uses yup and formik for form schema and validation.

Makes a POST request to the /signup endpoint on form submission. If the response is okay, sets the `user` state and redirects to the home page.

Returns a form with fields username, password, and password confirmation. -->

#### `Login.js`

<!-- Uses yup and formik for form schema and validation.

Makes a POST request to the /login endpoint on form submission. If the response is okay, sets the `user` state and redirects to the home page.

Returns a form with fields username and password. -->

#### `Home.js`

<!-- Houses state for `activePlayerID`.

Filters games based on `activePlayerID`.

Returns the `Players` and `Games` components. -->

<!-- #### `Players.js`

Houses state for `query`.

Filters displayed players using `query`.

Returns a search bar, the `AddPlayer` component if a user is logged in, and a list of players that, when clicked, set the `activePlayerID` state. -->

<!-- #### `AddPlayer.js`

Houses an `isEditing` state that dictates whether the form is visible.

Uses yup and formik for form schema and validation.

Makes a POST request to the /players endpoint on form submission. If the response is okay, sets the `players` state and clears and closes the form.

Returns an Add Player button if `isEditing` is false.
Returns a form with input for a player name if `isEditing` is true. -->

<!-- #### `Games.js`

Returns the `AddGame` component if a user is logged in and a `GameDisplay` component for each game. -->

<!-- #### `AddGame.js`

Houses an `isEditing` state that dictates whether the form is visible.

Uses yup and formik for form schema and validation.

Makes a POST request to the /games endpoint on form submission. If the response is okay, sets the `games` state and clears and closes the form.

Returns an Add Game button if `isEditing` is false.
Returns a form with input for a game PGN, white player, and black player if `isEditing` is true. -->

<!-- #### `GameDisplay.js`

Houses `display` state.

Handles game deletion by making a DELETE request to the /games/id endpoint. If the response is okay, it sets the `games` state.

Returns a game heading with the player names.
If a user is logged in, also returns the `SaveButton` component.
If the logged in user has saved the game and added a comment, also returns the `EditSave` component.
If the logged in user created the game, also returns edit and delete buttons.
Returns one of the following, based on the value of the `display` state:
- A PGN viewer displaying the game
- The `EditGame` component
- A prompt for the user to confirm or cancel deletion
- The `Save` component -->

<!-- #### `EditGame.js`

Uses yup and formik for form schema and validation.

Makes a PATCH request to the /games/id endpoint on form submission. If the response is okay, sets the `games` state, clears the form, and sets the `display` state to 'game'.

Returns a form with input for a game PGN, white player, and black player, initially set to the values of the game being edited. -->

<!-- #### `SaveButton.js`

Handles save deletion by making a DELETE request to the /saves/id endpoint. If the response is okay, it sets the `saves` state.

Returns either a save or remove save button based on whether a save exists for the game. -->

<!-- #### `Save.js`

Uses yup and formik for form schema and validation.

If the value of the `display` state is 'save', makes a POST request to the /saves endpoint on form submission.
If the value of the `display` state is 'edit save', makes a PATCH request to the /saves/id endpoint on form submission. 
If the response is okay, sets the `saves` state, clears the form, and sets the `display` state to 'game'.

Returns a form with input for category and comment. If the value of the `display` state is 'edit save', the initial values of the form are the values of the current save. -->

<!-- #### `EditSave.js`

Returns the `Save` component if the value of the `display` state is 'editing save'. Otherwise, returns a comment display that sets the `display` state to 'editing save' when clicked. -->
<!-- 
#### `SavedGames.js`

Houses `visible` state.

Filters saves by category specified by `visible` state.
Maps saves to corresponding games.

Returns buttons for each category that, when clicked, set the `visible` state to that category.
Returns a `GameDisplay` component for each game in the category specified by the `visible` state. -->

### `hooks`

#### `useDocumentTitle.js`

Sets the document title.

### `features`

# Acknowledgements

