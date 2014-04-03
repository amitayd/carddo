from sqlalchemy import Integer, Column, String
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.expression import func

engine = create_engine('sqlite:///flashcard.db', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

class Flashcard(Base):

    __tablename__ = 'flashcard'

    id = Column(Integer, primary_key=True)
    source_word = Column(String(25), unique=True)
    dest_word = Column(String(25))
    association_image_url = Column(String(2000))
    association_text = Column(String(140))
    
    def __init__(self, source_word, dest_word, association_image_url, association_text):
        self.source_word = source_word
        self.dest_word = dest_word
        self.association_image_url = association_image_url
        self.association_text = association_text

    def __repr__(self):
        return '<Flashcard {} {} {} {}>'.format(self.source_word, self.dest_word, self.association_image_url, self.association_text)

    @staticmethod
    def get_random_flashcard():
        return Flashcard.query.order_by(func.random()).first()

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == '__main__':
    init_db()