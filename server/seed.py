from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Location, Category, Product, Order

if __name__ == '__main__':

    with app.app_context():

        print('Deleting records...')
        User.query.delete()
        Location.query.delete()
        Category.query.delete()
        Product.query.delete()
        Order.query.delete()

        fake = Faker()

        print('Creating users...')

        users=[]
        usernames = []

        maria = User(username='Maria', admin=True)
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

        me = Category(name='ME+')
        color_touch = Category(name='Color Touch')
        illumina = Category(name='Illumina')
        shinefinity = Category(name='Shinefinity')

        db.session.add_all([me, color_touch, illumina, shinefinity])

        print('Creating products...')

        p1 = Product(
            name='6/0 ME+',
            category_id=1,
            phorest_name='6/0 MT+',
            vish_name='6/0'
        )

        p2 = Product(
            name='6/0 CT',
            category_id=2,
            phorest_name='6/0 CT',
            vish_name='6/0 '
        )

        p3 = Product(
            name='6/ Illumina',
            category_id=3,
            phorest_name='6/ Illumina',
            vish_name='6/ Illumina'
        )

        p4 = Product(
            name='06/0 SF',
            category_id=4,
            phorest_name='06/0 SF',
            vish_name='06/0'
        )

        db.session.add_all([p1, p2, p3, p4])

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

        db.session.commit()

        print('Database seeded.')