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
        # maria.password_hash = os.getenv('app_password')
        maria.password_hash = 'chess'

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
            ('0/00 ME PLUS Special Mix', 1, '0/00'),
            ('0/66 ME PLUS Special Mix', 1, '0/66'),

            ('2/0 ME PLUS', 1, '2/0'),
            ('2/8 ME PLUS', 1, '2/8'),

            ('3/0 ME PLUS', 1, '3/0'),
            ('33/0 ME PLUS', 1, '33/0'),
            ('33/55 ME PLUS', 1, '33/55'),

            ('4/0 ME PLUS', 1, '4/0'),
            ('4/07 ME PLUS', 1, '4/07'),
            ('4/71 ME PLUS', 1, '4/71'),
            ('4/75 ME PLUS', 1, '4/75'),
            ('4/77 ME PLUS', 1, '4/77'),
            ('44/0 ME PLUS', 1, '44/0'),
            ('44/65 ME PLUS', 1, '44/65'),

            ('5/0 ME PLUS', 1, '5/0'),
            ('5/07 ME PLUS', 1, '5/07'),
            ('5/1 ME PLUS', 1, '5/1'),
            ('5/18 ME PLUS', 1, '5/18'),
            ('5/3 ME PLUS', 1, '5/3'),
            ('5/5 ME PLUS', 1, '5/5'),
            ('5/71 ME PLUS', 1, '5/71'),
            ('5/73 ME PLUS', 1, '5/73'),
            ('5/75 ME PLUS', 1, '5/75'),
            ('55/0 ME PLUS', 1, '55/0'),
            ('55/02 ME PLUS', 1, '55/02'),
            ('55/46 ME PLUS', 1, '55/46'),
            ('55/66 ME PLUS', 1, '55/66'),

            ('6/0 ME PLUS', 1, '6/0'),
            ('6/07 ME PLUS', 1, '6/07'),
            ('6/1 ME PLUS', 1, '6/1'),
            ('6/2 ME PLUS', 1, '6/2'),
            ('6/3 ME PLUS', 1, '6/3'),
            ('6/34 ME PLUS', 1, '6/34'),
            ('6/43 ME PLUS', 1, '6/43'),
            ('6/7 ME PLUS', 1, '6/7'),
            ('6/71 ME PLUS', 1, '6/71'),
            ('6/73 ME PLUS', 1, '6/73'),
            ('6/74 ME PLUS', 1, '6/74'),
            ('6/75 ME PLUS', 1, '6/75'),
            ('6/77 ME PLUS', 1, '6/77'),
            ('6/97 ME PLUS', 1, '6/97'),
            ('66/0 ME PLUS', 1, '66/0'),
            ('66/02 ME PLUS', 1, '66/02'),
            ('66/44 ME PLUS', 1, '66/44'),
            ('66/55 ME PLUS', 1, '66/55'),

            ('7/0 ME PLUS', 1, '7/0'),
            ('7/01 ME PLUS', 1, '7/01'),
            ('7/07 ME PLUS', 1, '7/07'),
            ('7/1 ME PLUS', 1, '7/1'),
            ('7/17 ME PLUS', 1, '7/17'),
            ('7/18 ME PLUS', 1, '7/18'),
            ('7/2 ME PLUS', 1, '7/2'),
            ('7/3 ME PLUS', 1, '7/3'),
            ('7/34 ME PLUS', 1, '7/34'),
            ('7/38 ME PLUS', 1, '7/38'),
            ('7/43 ME PLUS', 1, '7/43'),
            ('7/7 ME PLUS', 1, '7/7'),
            ('7/71 ME PLUS', 1, '7/71'),
            ('7/73 ME PLUS', 1, '7/73'),
            ('7/75 ME PLUS', 1, '7/75'),
            ('77/0 ME PLUS', 1, '77/0'),
            ('77/02 ME PLUS', 1, '77/02'),
            ('77/46 ME PLUS', 1, '77/46'),
            

            ('8/0 ME PLUS', 1, '8/0'),
            ('8/01 ME PLUS', 1, '8/01'),
            ('8/03 ME PLUS', 1, '8/03'),
            ('8/07 ME PLUS', 1, '8/07'),
            ('8/1 ME PLUS', 1, '8/1'),
            ('8/2 ME PLUS', 1, '8/2'),
            ('8/34 ME PLUS', 1, '8/34'),
            ('8/38 ME PLUS', 1, '8/38'),
            ('8/41 ME PLUS', 1, '8/41'),
            ('8/43 ME PLUS', 1, '8/43'),
            ('8/71 ME PLUS', 1, '8/71'),
            ('8/74 ME PLUS', 1, '8/74'),
            ('8/97 ME PLUS', 1, '8/97'),
            ('88/0 ME PLUS', 1, '88/0'),

            ('9/0 ME PLUS', 1, '9/0'),
            ('9/01 ME PLUS', 1, '9/01'),
            ('9/1 ME PLUS', 1, '9/1'),
            ('9/16 ME PLUS', 1, '9/16'),
            ('9/3 ME PLUS', 1, '9/3'),
            ('9/38 ME PLUS', 1, '9/38'),
            ('9/81 ME PLUS', 1, '9/81'),
            ('9/97 ME PLUS', 1, '9/97'),
            ('99/0 ME PLUS', 1, '99/0'),

            ('10/0 ME PLUS', 1, '10/0'),
            ('10/16 ME PLUS', 1, '10/16'),
            ('10/3 ME PLUS', 1, '10/3'),
            ('10/8 ME PLUS', 1, '10/8'),
            ('10/97 ME PLUS', 1, '10/97'),

            ('12/0 ME PLUS Special Blonde', 1, '12/0'),
            ('12/03 ME PLUS Special Blonde', 1, '12/03'),
            ('12/1 ME PLUS Special Blonde', 1, '12/1'),
            ('12/81 ME PLUS Special Blonde', 1, '12/81'),
            ('12/89 ME PLUS Special Blonde', 1, '12/89'),

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

            ('4/ Illumina', 3, '4/ Illumina'),

            ('5/ Illumina', 3, '5/ Illumina'),
            ('5/02 Illumina', 3, '5/02 Illumina'),

            ('7/ Illumina', 3, '7/ Illumina'),
            ('7/3 Illumina', 3, '7/3 Illumina'),
            ('7/31 Illumina', 3, '7/31 Illumina'),
            ('7/35 Illumina', 3, '7/35 Illumina'),
            ('7/43 Illumina', 3, '7/43 Illumina'),
            ('7/7 Illumina', 3, '7/7 Illumina'),
            ('7/81 Illumina', 3, '7/81 Illumina'),

            ('8/ Illumina', 3, '8/ Illumina'),
            ('8/1 Illumina', 3, '8/1 Illumina'),
            ('8/13 Illumina', 3, '8/13 Illumina'),
            ('8/38 Illumina', 3, '8/38 Illumina'),
            ('8/69 Illumina', 3, '8/69 Illumina'),
            ('8/93 Illumina', 3, '8/93 Illumina'),

            ('9/ Illumina', 3, '9/ Illumina'),            
            ('9/03 Illumina', 3, '9/03 Illumina'),
            ('9/43 Illumina', 3, '9/43 Illumina'),
            ('9/60 Illumina', 3, '9/60 Illumina'),

            ('10/ Illumina', 3, '10/ Illumina'),
            ('10/69 Illumina', 3, '10/69 Illumina'),

            ('/03 Lightest Natural Blondor Toner', 7, '/03 Lightest Natural'),
            ('/16 Lightest Pearl Blondor Toner', 7, '/16 Lightest Pearl'),
            ('/18 Pale Platinum Blondor Toner', 7, '/18 Pale Platinum'),
            ('/81 Pale Silver Blondor Toner', 7, '/81 Pale Silver'),
            ('/17 Magma', 7, '/17 Magma'),
            ('/89 + Magma', 7, '/89+ Magma'),
            ('/07 + Magma', 7, '/07+ Magma'),
            ('/89 Magma', 7, '/89 Magma'),

            ('High Magenta Color Fresh', 8, 'High Magenta'),
            ('Infinite Orange Color Fresh', 8, 'Infinite Orange'),
            ('Next Red Color Fresh', 8, 'Next Red'),
            ('Nu-Dist Pink Color Fresh', 8, 'Nu-Dist Pink'),
           
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