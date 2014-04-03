import json

from flask import Flask, request, abort, Response

from database import db_session, Flashcard

app = Flask(__name__)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route('/flashcard/random', methods=['GET', 'POST'])
def random_flashcard():
    
    if request.method == 'GET':
        fc = Flashcard.get_random_flashcard()
         
        if fc is None:
            data = {}
        else:

            data = {
                    'sourceWord': fc.source_word,
                    'destWord': fc.dest_word,
                    'associationImageUrl': fc.association_image_url,
                    'associationText': fc.association_text
            }

        js = json.dumps(data)

        resp = Response(js, status=200, mimetype='application/json')
        
        return resp

    elif request.method == 'POST':

        if request.headers['Content-Type'] != 'application/json':
            abort(415)


        fc = Flashcard(source_word=request.json['sourceWord'],
                       dest_word=request.json['destWord'],
                       association_image_url=request.json['associationImageUrl'],
                       association_text=request.json['associationText'])

        db_session.add(fc)
        db_session.commit()

        return json.dumps(request.json)

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', 80)