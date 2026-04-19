import requests
import random
from faker import Faker
from datetime import datetime, timedelta

# curl -X POST "http://localhost:8000/insight/mining/execute/106862082435269258693?month=4&year=2026"

fake = Faker('id_ID')

# --- KONFIGURASI ---
BASE_URL = "http://localhost:8000"
USER_ID = "106862082435269258693"
TOTAL_DATA = 20

PAIRS = [
    (("Beras Premium 5kg", "Makanan"), ("Minyak Goreng 2L", "Makanan")),
    (("Token Listrik PLN", "Tagihan"), ("Iuran Air PDAM", "Tagihan")),
    (("Bensin Pertalite", "Transportasi"), ("Ganti Oli Motor", "Transportasi")),
    (("Obat Paracetamol", "Kesehatan"), ("Vitamin C Enervon", "Kesehatan")),
    (("Cicilan Motor", "Cicilan"), ("Tagihan BPJS Kesehatan", "Tagihan")),
    (("Sayur dan Lauk Pauk", "Makanan"), ("Bumbu Dapur", "Makanan")),
    (("Paket Data Telkomsel", "Paket Internet"), ("Pulsa Reguler", "Paket Internet"))
]

SINGLE_ITEMS = [
    ("Isi Ulang Galon Aqua", "Minuman"),
    ("Tiket KRL Commuter Line", "Transportasi"),
    ("SPP Anak Sekolah", "Pendidikan"),
    ("Setor Dana Darurat", "Darurat"),
    ("Investasi Reksadana Rutin", "Investasi"),
    ("Bayar Pajak Motor Tahunan", "Pajak"),
    ("Belanja Sayur Bulanan", "Makanan"),
    ("Obat Resep Dokter", "Kesehatan"),
    ("Langganan WiFi Indihome", "Tagihan")
]

def get_random_date_february_2026():
    start_date = datetime(2026, 4, 1)
    end_date = datetime(2026, 4, 30) 
    
    delta = end_date - start_date
    random_days = random.randrange(delta.days + 1)
    return (start_date + timedelta(days=random_days)).strftime("%Y-%m-%d")

def generate_rupiah_amount(category):
    # Logika harga disesuaikan untuk barang kebutuhan pokok
    if category == "Makanan":
        return random.randrange(20000, 150000, 5000)
    elif category == "Minuman":
        return random.randrange(5000, 25000, 1000) # Harga galon/air mineral
    elif category == "Tagihan":
        return random.randrange(100000, 500000, 10000)
    elif category == "Transportasi":
        return random.randrange(10000, 50000, 1000) # Bensin/KRL
    elif category == "Kesehatan":
        return random.randrange(20000, 150000, 5000)
    elif category == "Paket Internet":
        return random.randrange(50000, 150000, 5000)
    elif category == "Cicilan":
        return random.randrange(500000, 1500000, 50000)
    elif category == "Pendidikan":
        return random.randrange(200000, 1000000, 50000)
    elif category == "Investasi":
        return random.randrange(100000, 500000, 50000)
    elif category == "Pajak":
        return random.randrange(200000, 500000, 10000)
    elif category == "Darurat":
        return random.randrange(100000, 500000, 50000)
    else:
        return random.randrange(20000, 100000, 5000)

def seed_expenses():
    print(f"🚀 Memulai seeding data APRIL (Mengisi setiap tanggal untuk melewati threshold AI)...")
    success_count = 0

    for day in range(1, 31):
        transaction_date = f"2026-04-{day:02d}"

        daily_transactions = random.randint(1, 2)
        
        for _ in range(daily_transactions):
            if random.random() < 0.6:
                items_to_process = random.choice(PAIRS) 
            else:
                items_to_process = [random.choice(SINGLE_ITEMS)]

            for item_data in items_to_process:
                specific_name = item_data[0]
                enum_category = item_data[1]

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
                    resp = requests.post(f"{BASE_URL}/expenditure", json=payload)
                    
                    if resp.status_code in [200, 201]:
                        print(f"✅ Tgl: {transaction_date} | {specific_name:<30} | Rp{nominal:,}")
                        success_count += 1
                    else:
                        resp_retry = requests.post(f"{BASE_URL}/expenditure/", json=payload)
                        if resp_retry.status_code in [200, 201]:
                            print(f"✅ Tgl: {transaction_date} | {specific_name:<30} | Rp{nominal:,}")
                            success_count += 1
                        else:
                            print(f"❌ Gagal di tgl {transaction_date}: {resp.text}")
                except Exception as e:
                    print(f"❌ Error: {e}")

    print("="*65)
    print(f"🎉 Selesai! {success_count} data transaksi 'Keinginan' berhasil dimasukkan.")
    print(f"💡 Karena tanggal 1-30 penuh terisi, AI PASTI akan berhasil menganalisis data ini.")

if __name__ == "__main__":
    seed_expenses()