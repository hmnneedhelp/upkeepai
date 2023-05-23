"""empty message

Revision ID: bdffaf05ae13
Revises: a08f2d0c9efb
Create Date: 2023-05-23 20:41:50.791891

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bdffaf05ae13'
down_revision = 'a08f2d0c9efb'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "coordinate",
        sa.Column("unom", sa.Integer(), nullable=False,),
        sa.Column("latitude", sa.REAL(), nullable=True),
        sa.Column("longitude", sa.REAL(), nullable=True),
        sa.PrimaryKeyConstraint("unom"),
    )


def downgrade() -> None:
    op.drop_table("coordinate")
