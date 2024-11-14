# 匯入連結資料庫模組
import psycopg2

# PostgreSQL連線資訊
DB_HOST = "aws-0-us-west-1.pooler.supabase.com"
DB_NAME = "postgres"
DB_USER = "postgres.bafehtsunwividhxhhyi"
DB_PASSWORD = "C3tqix-cLtRKX4B"

# 建立資料庫連線
def get_connection():
    connection = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return connection