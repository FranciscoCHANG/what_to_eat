from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World! 這是一個簡單的餐廳搜尋網站。"

if __name__ == '__main__':
    app.run(debug=True)
