import json

from flask import Flask, request, abort, Response

app = Flask(__name__)

@app.route('/flashcard/random', methods=['GET', 'POST'])
def random_flashcard():
    
    if request.method == 'GET':
        data = {'foo': 'lala'}

        js = json.dumps(data)

        resp = Response(js, status=200, mimetype='application/json')
        
        return resp

    elif request.method == 'POST':

        if request.headers['Content-Type'] != 'application/json':
            abort(415)

        return json.dumps(request.json)

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', 80)