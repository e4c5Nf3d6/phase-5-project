from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Location, Category

if __name__ == '__main__':

    with app.app_context():

        print('Deleting records...')
        User.query.delete()
        Location.query.delete()
        Category.query.delete()

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

        db.session.commit()

        print('Database seeded.')