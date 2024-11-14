#-----------------------
# 匯入模組
#-----------------------
from flask import Flask, render_template 

#-----------------------
# 匯入各個服務藍圖
#-----------------------
from services.product.app import product_bp

#-------------------------
# 產生主程式, 加入主畫面
#-------------------------
app = Flask(__name__)

#主畫面
@app.route('/')
def index():
    return render_template('index.html') 

#-------------------------
# 在主程式註冊各個服務
#-------------------------
app.register_blueprint(product_bp, url_prefix='/product')

#-------------------------
# 啟動主程式
#-------------------------
if __name__ == '__main__':
    app.run(debug=True)