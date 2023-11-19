import pickle
from flask import Flask, jsonify
from flask import request
import pandas as pd

app = Flask(__name__)

@app.route('/slowLearnerClass', methods=["GET", "POST"])
def learnerClass():
    clt = pickle.load(open("save.pkl", "rb"))
    content = request.get_json()
    md=content['data']
    md=list(md)
    l=[md]
    print(l)
    df = pd.DataFrame(l)
    print(df)
    x = clt.predict(df)
    thisdict = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J"
    }
    print(x)
    classObtained = thisdict[x[0]]
    return jsonify(classObtained)

if __name__ == "__main__":
    app.run(port=12001, debug=True)