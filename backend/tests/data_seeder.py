import requests
import random
from faker import Faker
from datetime import datetime, timedelta

# curl -X POST "http://localhost:8000/insight/mining/execute/106862082435269258693?month=0&year=2026"

fake = Faker('id_ID')

# --- KONFIGURASI ---
BASE_URL = "http://localhost:8000"
USER_ID = "106862082435269258693"
TOTAL_DATA = 20

PAIRS = [
    (("Beras Premium 5kg", "Bahan Makanan"), ("Minyak Goreng 2L", "Bahan Makanan")),
    (("Token Listrik PLN", "Tagihan"), ("Iuran Air PDAM", "Tagihan")),
    (("Bensin Pertalite", "Transportasi"), ("Biaya Parkir Bulanan", "Transportasi")),
    (("Sabun Mandi Lifebuoy", "Kebutuhan Rumah"), ("Shampoo Pantene", "Kebutuhan Rumah")),
    (("Sayur Bayam", "Bahan Makanan"), ("Tempe Papan", "Bahan Makanan")),
    (("Popok Bayi", "Kebutuhan Rumah"), ("Tisu Basah", "Kebutuhan Rumah")),
    (("Obat Paracetamol", "Kesehatan"), ("Vitamin C Enervon", "Kesehatan"))
]

SINGLE_ITEMS = [
    ("Netflix Premium", "Hiburan Digital"),
    ("Spotify Family", "Hiburan Digital"),
    ("Bensin Pertalite", "Transportasi"),
    ("Gojek ke Kantor", "Transportasi"),
    ("Token Listrik", "Tagihan"),
    ("Paket Data Telkomsel", "Paket Internet"),
    ("Obat Flu", "Kesehatan"),
    ("Uang SPP", "Pendidikan")
]

def get_random_date_february_2026():
    """
    Generate tanggal valid Februari 2026 (Tgl 1 - 28)
    """
    start_date = datetime(2026, 2, 1)
    end_date = datetime(2026, 2, 28) 
    
    delta = end_date - start_date
    random_days = random.randrange(delta.days + 1)
    return (start_date + timedelta(days=random_days)).strftime("%Y-%m-%d")

def generate_rupiah_amount(category):
    """
    Logika harga berdasarkan kategori Enum agar masuk akal.
    """
    if category == "Bahan Makanan":
        return random.randrange(15000, 150000, 500)
    elif category == "Tagihan":
        return random.randrange(50000, 500000, 1000)
    elif category == "Transportasi":
        return random.randrange(10000, 200000, 1000)
    elif category == "Kesehatan":
        return random.randrange(20000, 300000, 5000)
    elif category == "Kebutuhan Rumah":
        return random.randrange(15000, 100000, 1000)
    else:
        return random.randrange(20000, 100000, 5000)

def seed_expenses():
    print(f"🚀 Memulai seeding {TOTAL_DATA} data FEBRUARI (Menggunakan Enum)...")
    success_count = 0

    for i in range(TOTAL_DATA):
        transaction_date = get_random_date_february_2026()
        
        if random.random() < 0.7:
            items_to_process = random.choice(PAIRS) 
        else:
            items_to_process = [random.choice(SINGLE_ITEMS)]

        for item_data in items_to_process:
            specific_name = item_data[0] # Contoh: "Nasi Goreng"
            enum_category = item_data[1] # Contoh: "Makanan"

            # Generate harga yang masuk akal sesuai kategori
            nominal = generate_rupiah_amount(enum_category)
            
            payload = {
                "user_id": USER_ID,
                "date": transaction_date,
                "type_of_expenditure": specific_name, 
                "label": enum_category, 
                "category": "Kebutuhan", 
                "amount": nominal
            }

            try:
                resp = requests.post(f"{BASE_URL}/expenses/", json=payload)
                if resp.status_code in [200, 201]:
                    print(f"✅ Input: {specific_name:<25} | Kat: {enum_category:<15} | Tgl: {transaction_date}")
                    success_count += 1
                else:
                    print(f"❌ Gagal: {resp.text}")
            except Exception as e:
                print(f"❌ Error: {e}")

    print("="*50)
    print(f"🎉 Selesai! {success_count} data Februari berhasil masuk.")

if __name__ == "__main__":
    seed_expenses()