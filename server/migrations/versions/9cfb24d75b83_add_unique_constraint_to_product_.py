"""add unique constraint to Product phorest_name

Revision ID: 9cfb24d75b83
Revises: 654ee1d8ceff
Create Date: 2024-05-03 07:29:22.982789

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9cfb24d75b83'
down_revision = '654ee1d8ceff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('products')

    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('phorest_name', sa.String(), nullable=True),
    sa.Column('vish_name', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name=op.f('fk_products_category_id_categories')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('phorest_name')
    )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('products')

    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('phorest_name', sa.String(), nullable=True),
    sa.Column('vish_name', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name=op.f('fk_products_category_id_categories')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    # ### end Alembic commands ###