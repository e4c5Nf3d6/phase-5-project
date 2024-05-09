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
        # madison = Location(name="Madison")

        db.session.add_all([jv, mt])

        print('Creating categories...')

        kp = Category(name='Koleston Perfect')
        color_touch = Category(name='Color Touch')
        illumina = Category(name='Illumina')
        shinefinity = Category(name='Shinefinity')
        additives = Category(name='Additives')
        developers = Category(name='Developers')
        blondor = Category(name='Blondor')
        color_create = Category(name='Color Create')
        koleston_xpress = Category(name='Koleston Xpress')
        miscellaneous = Category(name='Miscellaneous')

        db.session.add_all([kp, color_touch, illumina, shinefinity, additives, developers, blondor, color_create, koleston_xpress, miscellaneous])

        print('Creating products...')

        colors = [ 
            ('0/00 ME PLUS Special Mix', 1, '0/00'),
            ('0/11 ME PLUS Special Mix', 1, '0/11'),
            ('0/28 ME PLUS Special Mix', 1, '0/28'),
            ('0/33 ME PLUS Special Mix', 1, '0/33'),
            ('0/43 ME PLUS Special Mix', 1, '0/43'),
            ('0/65 ME PLUS Special Mix', 1, '0/65'),
            ('0/66 ME PLUS Special Mix', 1, '0/66'),
            ('0/88 ME PLUS Special Mix', 1, '0/88'),
            ('2/0 ME PLUS', 1, '2/0'),
            ('2/8 ME PLUS', 1, '2/8'),
            ('3/0 ME PLUS', 1, '3/0'),
            ('33/0 ME PLUS', 1, '33/0'),
            ('33/55 ME PLUS', 1, '33/55'),
            ('33/66 ME PLUS', 1, '33/66'),
            ('4/0 ME PLUS', 1, '4/0'),
            ('4/07 ME PLUS', 1, '4/07'),
            ('4/3 ME PLUS', 1, '4/3'),
            ('4/71 ME PLUS', 1, '4/71'),
            ('4/75 ME PLUS', 1, '4/75'),
            ('4/77 ME PLUS', 1, '4/77'),
            ('44/0 ME PLUS', 1, '44/0'),
            ('44/44 ME PLUS', 1, '44/44'),
            ('44/65 ME PLUS', 1, '44/65'),           
            ('5/0 ME PLUS', 1, '5/0'),
            ('5/07 ME PLUS', 1, '5/07'),
            ('5/1 ME PLUS', 1, '5/1'),
            ('5/18 ME PLUS', 1, '5/18'),
            ('5/2 ME PLUS', 1, '5/2'),
            ('5/3 ME PLUS', 1, '5/3'),
            ('5/4 ME PLUS', 1, '5/4'),
            ('5/43 ME PLUS', 1, '5/43'),
            ('5/46 ME PLUS', 1, '5/46'),
            ('5/5 ME PLUS', 1, '5/5'),
            ('5/71 ME PLUS', 1, '5/71'),
            ('5/73 ME PLUS', 1, '5/73'),
            ('5/75 ME PLUS', 1, '5/75'),
            ('55/0 ME PLUS', 1, '55/0'),
            ('55/02 ME PLUS', 1, '55/02'),
            ('55/44 ME PLUS', 1, '55/44'),
            ('55/46 ME PLUS', 1, '55/46'),
            ('55/66 ME PLUS', 1, '55/66'),
            ('6/0 ME PLUS', 1, '6/0'),
            ('6/07 ME PLUS', 1, '6/07'),
            ('6/1 ME PLUS', 1, '6/1'),
            ('6/2 ME PLUS', 1, '6/2'),
            ('6/3 ME PLUS', 1, '6/3'),
            ('6/34 ME PLUS', 1, '6/34'),
            ('6/4 ME PLUS', 1, '6/4'),
            ('6/41 ME PLUS', 1, '6/41'),
            ('6/43 ME PLUS', 1, '6/43'),
            ('6/45 ME PLUS', 1, '6/45'),
            ('6/7 ME PLUS', 1, '6/7'),
            ('6/71 ME PLUS', 1, '6/71'),
            ('6/73 ME PLUS', 1, '6/73'),
            ('6/74 ME PLUS', 1, '6/74'),
            ('6/75 ME PLUS', 1, '6/75'),
            ('6/77 ME PLUS', 1, '6/77'),
            ('6/91 ME PLUS', 1, '6/91'),
            ('6/97 ME PLUS', 1, '6/97'),
            ('66/0 ME PLUS', 1, '66/0'),
            ('66/02 ME PLUS', 1, '66/02'),
            ('66/44 ME PLUS', 1, '66/44'),
            ('66/46 ME PLUS', 1, '66/46'),
            ('66/55 ME PLUS', 1, '66/55'),
            ('7/0 ME PLUS', 1, '7/0'),
            ('7/01 ME PLUS', 1, '7/01'),
            ('7/03 ME PLUS', 1, '7/03'),
            ('7/07 ME PLUS', 1, '7/07'),
            ('7/1 ME PLUS', 1, '7/1'),
            ('7/17 ME PLUS', 1, '7/17'),
            ('7/18 ME PLUS', 1, '7/18'),
            ('7/2 ME PLUS', 1, '7/2'),
            ('7/3 ME PLUS', 1, '7/3'),
            ('7/31 ME PLUS', 1, '7/31'),
            ('7/34 ME PLUS', 1, '7/34'),
            ('7/36 ME PLUS', 1, '7/36'),
            ('7/38 ME PLUS', 1, '7/38'),
            ('7/4 ME PLUS', 1, '7/4'),
            ('7/43 ME PLUS', 1, '7/43'),
            ('7/45 ME PLUS', 1, '7/45'),
            ('7/47 ME PLUS', 1, '7/47'),
            ('7/7 ME PLUS', 1, '7/7'),
            ('7/71 ME PLUS', 1, '7/71'),
            ('7/73 ME PLUS', 1, '7/73'),
            ('7/75 ME PLUS', 1, '7/75'),
            ('77/0 ME PLUS', 1, '77/0'),
            ('77/02 ME PLUS', 1, '77/02'),
            ('77/43 ME PLUS', 1, '77/43'),
            ('77/44 ME PLUS', 1, '77/44'),
            ('77/46 ME PLUS', 1, '77/46'),
            ('8/0 ME PLUS', 1, '8/0'),
            ('8/01 ME PLUS', 1, '8/01'),
            ('8/03 ME PLUS', 1, '8/03'),
            ('8/07 ME PLUS', 1, '8/07'),
            ('8/1 ME PLUS', 1, '8/1'),
            ('8/2 ME PLUS', 1, '8/2'),
            ('8/3 ME PLUS', 1, '8/3'),
            ('8/34 ME PLUS', 1, '8/34'),
            ('8/38 ME PLUS', 1, '8/38'),
            ('8/41 ME PLUS', 1, '8/41'),
            ('8/43 ME PLUS', 1, '8/43'),
            ('8/45 ME PLUS', 1, '8/45'),
            ('8/7 ME PLUS', 1, '8/7'),
            ('8/71 ME PLUS', 1, '8/71'),
            ('8/74 ME PLUS', 1, '8/74'),
            ('8/96 ME PLUS', 1, '8/96'),
            ('8/97 ME PLUS', 1, '8/97'),
            ('88/0 ME PLUS', 1, '88/0'),
            ('88/02 ME PLUS', 1, '88/02'),
            ('9/0 ME PLUS', 1, '9/0'),
            ('9/01 ME PLUS', 1, '9/01'),
            ('9/03 ME PLUS', 1, '9/03'),
            ('9/1 ME PLUS', 1, '9/1'),
            ('9/16 ME PLUS', 1, '9/16'),
            ('9/17 ME PLUS', 1, '9/17'),            
            ('9/3 ME PLUS', 1, '9/3'),
            ('9/31 ME PLUS', 1, '9/31'),
            ('9/38 ME PLUS', 1, '9/38'),
            ('9/7 ME PLUS', 1, '9/7'),            
            ('9/73 ME PLUS', 1, '9/73'),
            ('9/8 ME PLUS', 1, '9/8'),
            ('9/81 ME PLUS', 1, '9/81'),
            ('9/97 ME PLUS', 1, '9/97'),
            ('99/0 ME PLUS', 1, '99/0'),
            ('99/44 ME PLUS', 1, '99/44'),
            ('10/0 ME PLUS', 1, '10/0'),
            ('10/03 ME PLUS', 1, '10/03'),
            ('10/1 ME PLUS', 1, '10/1'),           
            ('10/16 ME PLUS', 1, '10/16'),
            ('10/3 ME PLUS', 1, '10/3'),
            ('10/31 ME PLUS', 1, '10/31'),
            ('10/38 ME PLUS', 1, '10/38'),
            ('10/8 ME PLUS', 1, '10/8'),
            ('10/86 ME PLUS', 1, '10/86'),
            ('10/95 ME PLUS', 1, '10/95'),
            ('10/96 ME PLUS', 1, '10/96'),
            ('10/97 ME PLUS', 1, '10/97'),
            ('12/0 ME PLUS Special Blonde', 1, '12/0'),
            ('12/03 ME PLUS Special Blonde', 1, '12/03'),
            ('12/07 ME PLUS Special Blonde', 1, '12/07'),
            ('12/1 ME PLUS Special Blonde', 1, '12/1'),
            ('12/11 ME PLUS Special Blonde', 1, '12/11'),
            ('12/16 ME PLUS Special Blonde', 1, '12/16'),
            ('12/17 ME PLUS Special Blonde', 1, '12/17'),
            ('12/22 ME PLUS Special Blonde', 1, '12/22'),
            ('12/61 ME PLUS Special Blonde', 1, '12/61'),
            ('12/81 ME PLUS Special Blonde', 1, '12/81'),
            ('12/89 ME PLUS Special Blonde', 1, '12/89'),
            ('12/96 ME PLUS Special Blonde', 1, '12/96'),

            ('/00 Relights', 2, '/00 CLEAR GLAZE'),
            ('/03 Relights', 2, '/03 NAT GOLD'),
            ('/18 Relights', 2, '/18 ASH PEARL'),
            ('/34 Relights', 2, '/34 GOLD RED'),
            ('/43 Relights', 2, '/43 RED GOLD'),
            ('/44 Relights', 2, '/44 INTENSE RED'),
            ('/47 Relights', 2, '/47 RED BROWN'),
            ('/56 Relights', 2, '/56 RED-VIOL VIOL'),
            ('/57 Relights', 2, '/57 RED-VIOL BRWN'),
            ('/74 Relights', 2, '/74 BROWN RED'),
            ('/86 Relights', 2, '/86 PEARL VIOL'),
            ('0/00 Color Touch Special Mix', 2, '0/00 CLEAR'),
            ('0/34 Color Touch Special Mix', 2, '0/34 GOLD RED'),            
            ('0/45 Color Touch Special Mix', 2, '0/45 RED RED-VIOL'),
            ('0/56 Color Touch Special Mix', 2, '0/56 RED-VIOLET VIOL'),
            ('0/68 Color Touch Special Mix', 2, '0/68 VIOL BLUE'), 
            ('0/88 Color Touch Special Mix', 2, '0/88 INTENSE BLUE'),
            ('2/0 Color Touch', 2, '2/0'),
            ('3/0 Color Touch', 2, '3/0 '),
            ('3/5 Color Touch', 2, '3/5 '),
            ('3/68 Color Touch', 2, '3/68 '),
            ('4/0 Color Touch', 2, '4/0 '),
            ('4/5 Color Touch', 2, '4/5 '),
            ('4/57 Color Touch', 2, '4/57 '),
            ('4/6 Color Touch', 2, '4/6 '),
            ('4/71 Color Touch', 2, '4/71 '),
            ('4/77 Color Touch', 2, '4/77 '),
            ('44/65 Color Touch', 2, '44/65 '),
            ('5/0 Color Touch', 2, '5/0 '),
            ('5/03 Color Touch', 2, '5/03 '),
            # ('5/1 Color Touch', 2, '5/1 '),
            ('5/3 Color Touch', 2, '5/3'),
            ('5/4 Color Touch', 2, '5/4 '),
            ('5/5 Color Touch', 2, '5/5 '),
            ('5/66 Color Touch', 2, '5/66 '),
            ('5/71 Color Touch', 2, '5/71 '),
            ('5/73 Color Touch', 2, '5/73'),
            ('5/75 Color Touch', 2, '5/75'),
            ('5/97 Color Touch', 2, '5/97 '),
            ('6/0 Color Touch', 2, '6/0 '),
            ('6/3 Color Touch', 2, '6/3 '),
            ('6/35 Color Touch', 2, '6/35 '),
            ('6/4 Color Touch', 2, '6/4 '),
            ('6/45 Color Touch', 2, '6/45 '),
            ('6/47 Color Touch', 2, '6/47 '),
            ('6/7 Color Touch', 2, '6/7 '),
            ('6/71 Color Touch', 2, '6/71 '),
            ('6/73 Color Touch', 2, '6/73 '),
            ('6/75 Color Touch', 2, '6/75'),
            ('6/77 Color Touch', 2, '6/77 '),
            ('66/45 Color Touch', 2, '66/45 '),
            ('7/0 Color Touch', 2, '7/0 '),
            ('7/03 Color Touch', 2, '7/03 '),
            ('7/1 Color Touch', 2, '7/1 '),
            ('7/3 Color Touch', 2, '7/3 '),
            ('7/4 Color Touch', 2, '7/4 '),
            ('7/43 Color Touch', 2, '7/43 '),
            ('7/47 Color Touch', 2, '7/47 '),
            ('7/7 Color Touch', 2, '7/7 '),
            ('7/71 Color Touch', 2, '7/71 '),
            ('7/73 Color Touch', 2, '7/73 '),
            ('7/75 Color Touch', 2, '7/75 '),
            ('7/86 Color Touch', 2, '7/86 '),
            ('7/89 Color Touch', 2, '7/89 '),
            ('7/97 Color Touch', 2, '7/97 '),
            ('77/45 Color Touch', 2, '77/45 '),
            ('8/0 Color Touch', 2, '8/0 '),
            ('8/01 Color Touch', 2, '8/01 '),
            ('8/03 Color Touch', 2, '8/03 '),
            ('8/3 Color Touch', 2, '8/3'),
            ('8/43 Color Touch', 2, '8/43 '),
            ('8/71 Color Touch', 2, '8/71 '),
            ('8/73 Color Touch', 2, '8/73'),
            ('8/81 Color Touch', 2, '8/81 '),
            ('9/0 Color Touch', 2, '9/0 '),
            ('9/01 Color Touch', 2, '9/01 '),
            ('9/03 Color Touch', 2, '9/03 '),
            ('9/16 Color Touch', 2, '9/16 '),
            ('9/3 Color Touch', 2, '9/3 '),
            ('9/73 Color Touch', 2, '9/73 '),
            ('9/75 Color Touch', 2, '9/75'),
            ('9/86 Color Touch', 2, '9/86 '),
            ('9/96 Color Touch', 2, '9/96 '),
            ('9/97 Color Touch', 2, '9/97 '),
            ('10/0 Color Touch', 2, '10/0 '),
            ('10/01 Color Touch', 2, '10/01 '),
            ('10/03 Color Touch', 2, '10/03 '),            
            ('10/1 Color Touch', 2, '10/1 '),
            ('10/3 Color Touch', 2, '10/3 '),
            ('10/6 Color Touch', 2, '10/6 '),
            ('10/73 Color Touch', 2, '10/73'),
            ('10/81 Color Touch', 2, '10/81 '),
            ('Clear Dust Instamatic', 2, 'CLEAR DUST'),
            ('Muted Mauve Instamatic', 2, 'MUTED MAUVE'),
            ('Ocean Storm Instamatic', 2, 'OCEAN STORM'),
            ('Pink Dream Instamatic', 2, 'PINK DREAM'),
            ('Smokey Amethyst Instamatic', 2, 'SMOKEY AMETHYST'),

            ('4/ Illumina', 3, '4/ Illumina'),
            ('5/ Illumina', 3, '5/ Illumina'),
            ('5/02 Illumina', 3, '5/02 Illumina'),
            ('5/35 Illumina', 3, '5/35 Illumina'),
            ('5/43 Illumina', 3, '5/43 Illumina'),
            ('5/7 Illumina', 3, '5/7 Illumina'),
            ('5/81 Illumina', 3, '5/81 Illumina'),
            ('6/ Illumina', 3, '6/ Illumina'),
            ('6/16 Illumina', 3, '6/16 Illumina'),
            ('6/19 Illumina', 3, '6/19 Illumina'),
            ('6/37 Illumina', 3, '6/37 Illumina'),
            ('6/76 Illumina', 3, '6/76 Illumina'),
            ('7/ Illumina', 3, '7/ Illumina'),
            ('7/3 Illumina', 3, '7/3 Illumina'),
            ('7/31 Illumina', 3, '7/31 Illumina'),
            ('7/35 Illumina', 3, '7/35 Illumina'),
            ('7/43 Illumina', 3, '7/43 Illumina'),
            ('7/7 Illumina', 3, '7/7 Illumina'),
            ('7/81 Illumina', 3, '7/81 Illumina'),
            ('8/ Illumina', 3, '8/ Illumina'),
            ('8/05 Illumina', 3, '8/05 Illumina'),
            ('8/1 Illumina', 3, '8/1 Illumina'),
            ('8/13 Illumina', 3, '8/13 Illumina'),
            ('8/37 Illumina', 3, '8/37 Illumina'),
            ('8/38 Illumina', 3, '8/38 Illumina'),
            ('8/69 Illumina', 3, '8/69 Illumina'),
            ('8/93 Illumina', 3, '8/93 Illumina'),
            ('9/ Illumina', 3, '9/ Illumina'),            
            ('9/03 Illumina', 3, '9/03 Illumina'),
            ('9/19 Illumina', 3, '9/19 Illumina'),
            ('9/43 Illumina', 3, '9/43 Illumina'),
            ('9/59 Illumina', 3, '9/59 Illumina'),
            ('9/60 Illumina', 3, '9/60 Illumina'),
            ('9/7 Illumina', 3, '9/7 Illumina'),
            ('Chrome Olive Opal-Essence', 3, 'Olive'),
            ('Platinum Lily Opal-Essence', 3, 'Lily'),
            ('Silver Mauve Opal-Essence', 3, 'Mauve'),
            ('Titanium Rose Opal-Essence', 3, 'Rose'),
            ('10/ Illumina', 3, '10/ Illumina'),
            ('10/05 Illumina', 3, '10/05 Illumina'),
            ('10/1 Illumina', 3, '10/1 Illumina'),
            ('10/36 Illumina', 3, '10/36 Illumina'),
            ('10/38 Illumina', 3, '10/38 Illumina'),
            ('10/69 Illumina', 3, '10/69 Illumina'),
            ('10/81 Illumina', 3, '10/81 Illumina'),
            ('10/93 Illumina', 3, '10/93 Illumina'),

            ('00/00 SF', 4, '00/00 Clear'),
            ('00/00 1000g SF', 4, '00/00 1000g SF'),
            ('00/66 SF', 4, '00/66 Violet'),
            ('00/89 SF', 4, '00/89 Blue'),
            ('04/0 SF', 4, '4/0 Natural Espresso'),
            ('04/07 SF', 4, '4/07'),
            ('04/12 SF', 4, '4/12 Cool Chia'),
            ('04/65 SF', 4, '4/65'),
            ('05/37 SF', 4, '5/37'),
            ('05/43 SF', 4, '5/43'),
            ('05/98 SF', 4, '5/98'),
            ('06/0 SF', 4, '6/0 Natural Brandy'),
            ('06/02 SF', 4, '6/02'),
            ('06/07 SF', 4, '6/07'),
            ('06/43 SF', 4, '6/43'),
            ('06/6 SF', 4, '6/6'),
            ('06/71 SF', 4, '6/71'),
            ('06/73 SF', 4, '6/73'),
            ('07/12 SF', 4, '7/12 Cool Mushroom'),
            ('07/13 SF', 4, '7/13'),
            ('07/34 SF', 4, '7/34'),
            ('07/59 SF', 4, '7/59'),
            ('07/75 SF', 4, '7/75'),
            ('07/81 SF', 4, '7/81'),
            ('08/0 SF', 4, '8/0 Natural Latte'),
            ('08/34 SF', 4, '8/34'),
            ('08/38 SF', 4, '8/38'),
            ('08/8 SF', 4, '8/8'),
            ('08/98 SF', 4, '8/98'),
            ('09/02 SF', 4, '9/02'),
            ('09/05 SF', 4, '9/05'),
            ('09/07 SF', 4, '9/07'),
            ('09/13 SF', 4, '9/13'),
            ('09/36 SF', 4, '9/36'),
            ('09/61 SF', 4, '9/61'),
            ('09/65 SF', 4, '9/65'),
            ('09/73 SF', 4, '9/73'),
            ('09/81 SF', 4, '9/81'),

            ('Color Post Treatment', 5, 'Color Post Service Treatment'),
            ('Wella Color ID', 5, 'Color ID'),

            ('1.9% Liter CT Developer', 6, '1.9% (6 Vol) Color Touch Developer 1ltr'),
            ('1.9% Gallon CT Developer', 6, '1.9% (6 Vol) Color Touch Developer 1gal'),
            ('4% Liter CT Developer', 6, '4% (13 Vol) Color Touch Developer 1ltr'),
            ('4% Gallon CT Developer', 6, '4% (13 Vol) Color Touch Developer 1gal'),
            ('4%+ Liter CT Developer', 6, '4%+ (13 Vol) Color Touch Developer 1ltr'),
            ('Blondor Freelights 20 Volume Developer', 6, '6% (20 Vol) Blondor Freelights Developer'),
            ('Blondor Freelights 30 Volume Developer', 6, '9% (30 Vol) Blondor Freelights Developer'),
            ('Blondor Freelights 40 Volume Developer', 6, '12% (40 Vol) Blondor Freelights Developer'),
            ('Shinefinity Brush Activator', 6, 'Brush & Bowl Activator'),
            ('Shinefinity Bottle Activator', 6, 'Bottle Activator '),
            ('Welloxon Pastel Developer', 6, '1.9% Pastel (6 Vol) Welloxon Perfect Developer '),
            ('Welloxon 10 Volume Developer', 6, '3% (10 Vol) Welloxon Perfect Developer'),
            ('Welloxon 20 Volume Developer', 6, '6% (20 Vol) Welloxon Perfect Developer'),
            ('Welloxon 30 Volume Developer', 6, '9% (30 Vol) Welloxon Perfect Developer'),
            ('Welloxon 40 Volume Developer', 6, '12% (40 Vol) Welloxon Perfect Developer'),
            ('Welloxon Gallon 20 Vol Developer', 6, 'Welloxon Gallon 20 Vol Developer'),

            ('/01 Medium Beige Blondor Toner', 7, '/01 Medium Beige'),
            ('/03 Lightest Natural Blondor Toner', 7, '/03 Lightest Natural'),
            ('/16 Lightest Pearl 5 MIN TONER', 7, '/16 Lightest Pearl 5 MIN TONER'),
            ('/16 Lightest Pearl Blondor Toner', 7, '/16 Lightest Pearl'),
            ('/18 Pale Platinum Blondor Toner', 7, '/18 Pale Platinum'),
            ('/19 Cool Base Breaker', 7, '/19 (Base Breaker)'),
            ('/36 Crystal Vanilla 5 MIN TONER', 7, '/36 Crystal Vanilla 5 MIN TONER'),
            ('/81 Pale Silver 5 MIN TONER', 7, '/81 Pale Silver 5 MIN TONER'),
            ('/81 Pale Silver Blondor Toner', 7, '/81 Pale Silver'),
            ('/86 Brass Kicker Blondor Toner', 7, '/86 Brass Kicker'),
            ('/96 Sienna Beige 5 MIN TONER', 7, '/96 Sienna Beige 5 MIN TONER'),
            ('/07 + Magma', 7, '/07+ Magma'),
            ('/17 Magma', 7, '/17 Magma'),
            ('/36 Magma', 7, '/36 Magma'),
            ('/39 + Magma', 7, '/39+ Magma'),
            ('/44 Magma', 7, '/44 Magma'),
            ('/65 Magma', 7, '/65 Magma'),
            ('/73 Magma', 7, '/73 Magma'),
            ('/89 Magma', 7, '/89 Magma'),
            ('/89 + Magma', 7, '/89+ Magma'),
            ('Limoncello Magma', 7, 'Limoncello (Magma)'),
            ('Blondor Freelights', 7, 'Freelights Powder'),
            # ('Blondor Lightener', 7, 'Blondor Multi Blonde Powder 800g'),
            ('Blondorplex Lightener', 7, 'BlondorPlex Multi Blonde Lightener'),
            ('Extra Cool Blonde', 7, 'Extra Cool Blonde Powder'),
            ('Soft Blonde Cream', 7, 'Soft Blonde Cream'),

            ('0/8 Color Fresh', 8, '0/8'),
            ('5/55 Color Fresh', 8, '5/55'),
            ('6/45 Color Fresh', 8, '6/45'),
            ('8/81 Color Fresh', 8, '8/81'),
            ('10/36 Color Fresh', 8, '10/36'),
            ('10/81 Color Fresh', 8, '10/81'),
            ('High Magenta Color Fresh', 8, 'High Magenta'),
            ('Hyper Coral Color Fresh', 8, 'Hyper Coral'),
            ('Infinite Orange Color Fresh', 8, 'Infinite Orange'),
            ('Neverseen Green Color Fresh', 8, 'Neverseen Green'),
            ('Next Red Color Fresh', 8, 'Next Red'),
            ('New Blue Color Fresh', 8, 'New Blue'),
            ('Nu-Dist Pink Color Fresh', 8, 'Nu-Dist Pink'),
            ('Pure Violet Color Fresh', 8, 'Pure Violet'),
            ('Super Petrol Color Fresh', 8, 'Super Petrol'),
            ('Tomorrow Clear Color Fresh', 8, 'Tomorrow Clear'),
            ('Ultra Purple Color Fresh', 8, 'Ultra Purple'),

            ('2/ Koleston XPRESS 10 MIN', 9, '2/ - 2/N'),
            ('3/ Koleston XPRESS 10 MIN', 9, '3/ - 3/N'),
            ('4/ Koleston XPRESS 10 MIN', 9, '4/ - 4/N'),
            ('5/ Koleston XPRESS 10 MIN', 9, '5/ - 5/N'),
            ('5/1 Koleston XPRESS 10 MIN', 9, '5/1 - 5/A'),
            ('5/37 Koleston XPRESS 10 MIN', 9, '5/37 - 5/GW'),
            ('6/ Koleston XPRESS 10 MIN ', 9, '6/ - 6/N'),
            ('7/ Koleston XPRESS 10 MIN', 9, '7/ - 7/N'),
            ('7/1 Koleston XPRESS 10 MIN', 9, '7/1 - 7/A'),
            ('7/37 Koleston XPRESS 10 MIN', 9, '7/37 - 7/GW'),
            ('8/ Koleston XPRESS 10 MIN', 9, '8/ - 8/N'),
            ('9/ Koleston XPRESS 10 MIN', 9, '9/ - 9/N'),
            ('10/ Koleston XPRESS 10 MIN', 9, '10/ - 10/N'),

            ('Blondor Blonde Seal Care', 10, 'Blonde Seal & Care'),
            ('Brilliance Shampoo', 10, 'Brilliance Shampoo'),
            ('Brilliance Conditioner', 10, 'Brilliance Conditioner'),
            ('Color Motion Pre-Color Spray', 10, 'Color Motion Pre-Color Spray'),
            ('Color Motion Scalp Protection Spray', 10, 'Color Motion Scalp Protection Spray'),
            ('Color Preserve', 10, 'Color Preserve'),
            ('Magma Sealer', 10, 'Magma Sealer'),
            ('Marula Oil Blend Scalp Primer', 10, 'Marula Oil Blend Scalp Primer'),
            ('Preguard Cream', 10, 'Preguard Cream'),
            ('Service Color Stain Remover', 10, 'Service Color Stain Remover'),
            ('Ultimate Repair Conditioner (BACKBAR)', 10, 'Ultimate Repair Conditioner (BACKBAR)'),
            ('Ultimate Repair Mask (BACKBAR)', 10, 'Ultimate Repair Mask (BACKBAR)'),
            ('Ultimate Repair Shampoo (BACKBAR)', 10, 'Ultimate Repair Shampoo (BACKBAR)'),
            ('Ultimate Repair STEP 3 (BACKBAR)', 10, 'Ultimate Repair STEP 3 (BACKBAR)'),
            ('Ultimate Repair STEP 4 (BACKBAR)', 10, 'Ultimate Repair STEP 4 (BACKBAR)'),
            ('Wella Barbicide Wipes', 10, 'Wella Barbicide Wipes'),
            ('Wella Eye Glasses Color Protector', 10, 'Wella Eye Glasses Color Protector'),
            ('Wella Reynolds 9x11 Foils 500 Count', 10, 'Wella Reynolds 9x11 Foils 500 Count'),
            ('Wellaplex Large Kit', 10, 'Wellaplex Large Kit'),
            ('Wellaplex No. 2', 10, 'Wellaplex No. 2'),
            ('Wellaplex No. 3', 10, 'Wellaplex No. 3'),
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
  
        db.session.add_all([o1, o2])

        print('Creating product orders...')

        po1 = ProductOrder(
            product_id=42,
            order_id=1,
            quantity=5
        )

        po2 = ProductOrder(
            product_id=188,
            order_id=1,
            quantity=4
        )

        po3 = ProductOrder(
            product_id=292,
            order_id=1,
            quantity=6
        )

        po4 = ProductOrder(
            product_id=42,
            order_id=2,
            quantity=4
        )

        po5 = ProductOrder(
            product_id=188,
            order_id=2,
            quantity=6
        )

        db.session.add_all([po1, po2, po3, po4, po5])

        db.session.commit()

        print('Database seeded.')