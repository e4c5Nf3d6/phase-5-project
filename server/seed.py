import os

from faker import Faker

from app import app
from models import db, User, Location, Category, Product, Order, ProductOrder

if __name__ == '__main__':

    with app.app_context():

        print('Deleting records...')
        User.query.delete()
        Location.query.delete()
        Category.query.delete()
        Product.query.delete()
        Order.query.delete()
        ProductOrder.query.delete()

        fake = Faker()

        print('Creating users...')

        users=[]
        usernames = []

        maria = User(username='Maria', admin=True)
        maria.password_hash = os.getenv('app_password')

        usernames.append('Maria')
        users.append(maria)

        for i in range(20):

            username = fake.first_name()

            while username in usernames:

                username = fake.first_name()

            usernames.append(username)

            user = User(
                username=username,
                admin=False
            )

            user.password_hash = user.username + 'password'

            users.append(user)
        
        db.session.add_all(users)


        print('Creating locations...')

        jv = Location(name='Jones Valley')
        mt = Location(name='Midtown')
        madison = Location(name="Madison")

        db.session.add_all([jv, mt, madison])

        print('Creating categories...')

        kp = Category(name='Koleston Perfect')
        color_touch = Category(name='Color Touch')
        illumina = Category(name='Illumina')
        shinefinity = Category(name='Shinefinity')
        additives = Category(name='Additives')
        developers = Category(name='Developers')
        blondor = Category(name='Blondor')
        color_create = Category(name='Color Create')

        db.session.add_all([kp, color_touch, illumina, shinefinity, additives, developers, blondor, color_create])

        print('Creating products...')

        colors = [
            ('/16 Lightest Pearl Blondor Toner', 7, '/16 Lightest Pearl'),
            ('/81 Pale Silver Blondor Toner', 7, '/81 Pale Silver'),
            ('/03 Lightest Natural Blondor Toner', 7, '/03 Lightest Natural'),
            ('/18 Pale Platinum Blondor Toner', 7, '/18 Pale Platinum'),
            ('Next Red Color Fresh', 8, 'Next Red'),
            ('Infinite Orange Color Fresh', 8, 'Infinite Orange'),
            ('Nu-Dist Pink Color Fresh', 8, 'Nu-Dist Pink'),
            ('High Magenta Color Fresh', 8, 'High Magenta'),
            ('0/45 Color Touch Special Mix', 2, '0/45 RED RED-VIOL'),
            ('0/00 Color Touch Special Mix', 2, '0/00 CLEAR'),
            ('0/68 Color Touch Special Mix', 2, '0/68 VIOL BLUE'),            
            ('9/01 Color Touch', 2, '9/01 '),
            ('8/81 Color Touch', 2, '8/81 '),
            ('4/0 Color Touch', 2, '4/0 '),
            ('9/03 Color Touch', 2, '9/03 '),
            ('77/45 Color Touch', 2, '77/45 '),
            ('8/73 Color Touch', 2, '8/73 '),
            ('6/77 Color Touch', 2, '6/77 '),
            ('6/7 Color Touch', 2, '6/7 '),
            ('10/3 Color Touch', 2, '10/3 '),
            ('7/7 Color Touch', 2, '7/7 '),
            ('5/0 Color Touch', 2, '5/0 '),
            ('10/01 Color Touch', 2, '10/01 '),
            ('6/75 Color Touch', 2, '6/75 '),
            ('6/71 Color Touch', 2, '6/71 '),
            ('8/03 Color Touch', 2, '8/03 '),
            ('10/0 Color Touch', 2, '10/0 '),
            ('8/43 Color Touch', 2, '8/43 '),
            ('6/45 Color Touch', 2, '6/45 '),
            ('5/73 Color Touch', 2, '5/73 '),
            ('5/66 Color Touch', 2, '5/66 '),
            ('6/4 Color Touch', 2, '6/4 '),
            ('6/3 Color Touch', 2, '6/3 '),
            ('4/6 Color Touch', 2, '4/6 '),
            ('6/73 Color Touch', 2, '6/73 '),
            ('9/86 Color Touch', 2, '9/86 '),
            ('6/0 Color Touch', 2, '6/0 '),
            ('7/43 Color Touch', 2, '7/43 '),
            ('2/0 Color Touch', 2, '2/0 '),
            ('10/81 Color Touch', 2, '10/81 '),
            ('5/71 Color Touch', 2, '5/71 '),
            ('7/73 Color Touch', 2, '7/73 '),
            ('4/77 Color Touch', 2, '4/77 '),
            ('6/47 Color Touch', 2, '6/47 '),
            ('9/16 Color Touch', 2, '9/16 '),
            ('8/3 Color Touch', 2, '8/3 '),
            ('7/86 Color Touch', 2, '7/86 '),
            ('7/71 Color Touch', 2, '7/71 '),
            ('7/4 Color Touch', 2, '7/4 '),
            ('5/ Illumina Lightest Brown/Neutral', 3, '5/ Illumina')
        ]

        products = []

        for color in colors:

            product = Product(
                name=color[0],
                category_id=color[1],
                phorest_name=color[0],
                vish_name=color[2]
            )

            products.append(product)

        db.session.add_all(products)

        print('Creating orders...')

        o1 = Order(
            location_id=1,
            user_id=1
        )

        o2 = Order(
            location_id=2,
            user_id=1
        )

        o3 = Order(
            location_id=3,
            user_id=1
        )

        db.session.add_all([o1, o2, o3])

        print('Creating product orders...')

        po1 = ProductOrder(
            product_id=1,
            order_id=1,
            quantity=5
        )

        po2 = ProductOrder(
            product_id=2,
            order_id=1,
            quantity=4
        )

        po3 = ProductOrder(
            product_id=3,
            order_id=1,
            quantity=6
        )

        po4 = ProductOrder(
            product_id=3,
            order_id=2,
            quantity=4
        )

        db.session.add_all([po1, po2, po3, po4])

        db.session.commit()

        print('Database seeded.')