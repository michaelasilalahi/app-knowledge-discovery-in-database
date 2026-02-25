# backend/
# ├── app/
# │   ├── core/                   # Konfigurasi global
# │   │   ├── config.py           # Env variables (Pydantic Settings)
# │   │   ├── security.py         # JWT, Password hashing
# │   │   └── database.py         # SQLAlchemy engine & session setup
# │   │
# │   ├── modules/                # Logika bisnis berdasarkan fitur (Domain)
# │   │   ├── setting_analysis/
# │   │   │   ├── router.py       # Endpoint API
# │   │   │   ├── service.py      # Logika Bisnis (The Brain)
# │   │   │   ├── schemas.py      # Pydantic models (Request/Response)
# │   │   │   └── models.py       # SQLAlchemy Models (Table Definition)
# │   │   │
# │   │   ├── data_mining/
# │   │   │   ├── router.py
# │   │   │   ├── service.py      # Algoritma mining (Apriori, dll)
# │   │   │   ├── schemas.py
# │   │   │   ├── models.py
# │   │   │   └── utils.py        # Helper khusus mining (preprocessing)
# │   │   │
# │   │   └── expenses/
# │   │       ├── router.py
# │   │       ├── service.py
# │   │       ├── schemas.py
# │   │       └── models.py
# │   │
# │   ├── utils/                  # Helper global (formatting, logging)
# │   │   └── date_helper.py
# │   │
# │   └── main.py                 # Entry point (Inisialisasi FastAPI)
# │
# ├── tests/                      # Unit testing & Integration testing
# ├── .env                        # Variabel rahasia
# ├── requirements.txt
# └── alembic/                    # Database Migrations (Opsional tapi Pro)