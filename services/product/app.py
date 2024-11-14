# 匯入Blueprint模組
from flask import request, render_template
from flask import Blueprint
import os
import uuid

from utils import db, common

# 產生產品服務藍圖
product_bp = Blueprint('product_bp', __name__)

#--------------------------
# 在產品服務藍圖加入路由
#--------------------------
#****************************************************** 
#產品清單
@product_bp.route('/list')
def product_list(): 
    #取得資料庫連線 
    connection = db.get_connection() 
    
    #產生執行sql命令的物件, 再執行sql   
    cursor = connection.cursor()     
    cursor.execute('SELECT * FROM product order by prono')
    
    #取出資料
    data = cursor.fetchall()    
    print(data)
    #關閉資料庫連線    
    connection.close() 
    
    #渲染網頁  
    return render_template('product_list.html', data=data)

#****************************************************** 
#產品查詢表單
@product_bp.route('/read/form')
def product_read_form():
    return render_template('product_read_form.html') 


#產品查詢
@product_bp.route('/read', methods=['GET'])
def product_read():    
    #渲染網頁 product_read.html或not_found.html
    pass
    

#******************************************************     
#產品新增表單
@product_bp.route('/create/form')
def product_create_form():
    return render_template('product_create_form.html') 


#產品新增
@product_bp.route('/create', methods=['POST'])
def product_create():
    try:
        #取得其他參數
        prono = request.form.get('prono')
        proname = request.form.get('proname')
        price = request.form.get('price')
        stockamt = request.form.get('stockamt')
        
        
        #取得資料庫連線
        conn = db.get_connection()

        #將資料加入product表
        cursor = conn.cursor()
        cursor.execute("INSERT INTO product (prono, proname, price, stockamt) VALUES (%s, %s, %s, %s)",
                        (prono, proname, price, stockamt))
        conn.commit()
        conn.close()

        # 渲染成功畫面
        return render_template('create_success.html')
    except Exception as e:
        #印出錯誤原因
        print('-'*30)
        print(e)
        print('-'*30)
        
        # 渲染失敗畫面
        return render_template('create_fail.html')


#******************************************************     
#產品刪除表單
@product_bp.route('/delete/form')
def product_delete_form():
    return render_template('product_delete_form.html') 


#產品刪除確認
@product_bp.route('/delete/confirm', methods=['GET'])
def product_delete_confirm():
    #取得資料庫連線    
    connection = db.get_connection()  
    
    #取得執行sql命令的cursor
    cursor = connection.cursor()   
    
    #取得傳入參數, 執行sql命令並取回資料  
    prono = request.values.get('prono').strip()
      
    cursor.execute('SELECT * FROM product WHERE prono=%s', (prono,))
    data = cursor.fetchone()

    #關閉連線   
    connection.close()  
        
    #渲染網頁
    if data:
        return render_template('product_delete_confirm.html', data=data) 
    else:
        return render_template('not_found.html')
    
    
#產品刪除
@product_bp.route('/delete', methods=['POST'])
def product_delete():
    #渲染成功畫面delete_success.html或delete_fail.html
    pass 


#******************************************************    
#產品更改表單
@product_bp.route('/update/form')
def product_update_form():
    return render_template('product_update_form.html') 


#產品更改確認
@product_bp.route('/update/confirm', methods=['GET'])
def product_update_confirm():
    #取得資料庫連線    
    connection = db.get_connection()  
    
    #取得執行sql命令的cursor
    cursor = connection.cursor()   
    
    #取得傳入參數, 執行sql命令並取回資料  
    prono = request.values.get('prono').strip()
      
    cursor.execute('SELECT * FROM product WHERE prono=%s', (prono,))
    data = cursor.fetchone()

    #關閉連線   
    connection.close()  
        
    #渲染網頁
    if data:
        return render_template('product_update_confirm.html', data=data) 
    else:
        return render_template('not_found.html')
    
    
#產品更改
@product_bp.route('/update', methods=['POST'])
def product_update():
    #渲染成功畫面update_success.html或update_fail.html
    pass      