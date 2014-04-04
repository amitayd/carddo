import json

from flask import Flask, request, abort, Response

from flask_crossdomain import crossdomain

from database import db_session, Flashcard, flashcard_row2dict_with_none_check
from suggestions import suggest_similar_phonetic_words

app = Flask(__name__)

def return_200_json_from_dict(data):
    js = json.dumps(data)
    resp = Response(js, status=200, mimetype='application/json')
    return resp

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route('/flashcard/word/<source_word>')
@crossdomain(origin='*', methods=['GET'], attach_to_all=True)
def get_flashcard(source_word):
    fc = Flashcard.query.filter(Flashcard.source_word == source_word).first()
    fc_dict = flashcard_row2dict_with_none_check(fc)
    return return_200_json_from_dict(fc_dict)

@app.route('/flashcard/random')
@crossdomain(origin='*', methods=['GET'], attach_to_all=True)
def random_flashcard():
    fc = Flashcard.get_random_flashcard()
    fc_dict = flashcard_row2dict_with_none_check(fc)
    return return_200_json_from_dict(fc_dict)

@app.route('/flashcard/all', methods=['GET'])
@crossdomain(origin='*', methods=['GET'], attach_to_all=True)
def all_flashcard():
    fcs = Flashcard.query.all()
    fcs_dicts = ([flashcard_row2dict(fc) for fc in fcs])
    return return_200_json_from_dict(fcs_dicts)

@app.route('/flashcard', methods=['POST'])
@crossdomain(origin='*', methods=['POST'], attach_to_all=True)
def create_or_update_flashcard():
    
    fc = Flashcard.query.filter(Flashcard.source_word == request.json['sourceWord']).first()

    if fc is None:
        new_fc = Flashcard(source_word=request.json['sourceWord'],
                       dest_word=request.json['destWord'],
                       association_image_url=request.json['associationImageUrl'],
                       association_text=request.json['associationText'])

        db_session.merge(new_fc)

    else:
       fc.dest_word = request.json['destWord']
       fc.association_image_url = request.json['associationImageUrl']
       fc.association_text = request.json['associationText']

    db_session.commit()

    return return_200_json_from_dict(request.json)

@app.route('/suggest/<word>', methods=['GET'])
@crossdomain(origin='*', methods=['GET'], attach_to_all=True)
def suggeset_similar_words(word):
    suggested_words = suggest_similar_phonetic_words(word)
    return return_200_json_from_dict(suggested_words)

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', 8088)