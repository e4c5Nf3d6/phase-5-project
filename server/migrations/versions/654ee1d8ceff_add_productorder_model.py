"""add ProductOrder model

Revision ID: 654ee1d8ceff
Revises: 3650d59215ac
Create Date: 2024-04-22 14:18:39.487805

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '654ee1d8ceff'
down_revision = '3650d59215ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product_orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], name=op.f('fk_product_orders_order_id_orders')),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_product_orders_product_id_products')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product_orders')
    # ### end Alembic commands ###
