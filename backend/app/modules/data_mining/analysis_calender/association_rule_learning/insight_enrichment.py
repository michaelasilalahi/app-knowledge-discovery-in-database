import pandas as pd

def insight_enrichment(rules_df: pd.DataFrame, metadata_df: pd.DataFrame, original_df: pd.DataFrame) -> pd.DataFrame:

    if rules_df.empty or metadata_df.empty:
        print("DEBUG: Dataframe kosong, melewati enrichment.")
        return rules_df
    
    # buat lookup dictionary
    if not metadata_df.empty:
        metadata_lookup = metadata_df.set_index('Label').to_dict(orient='index')
    else:
        metadata_lookup = {}

    def capitalize(text):
        return str(text).title() if text else ""

    # mengambil riwayat pengeluaran
    def get_transaction_history(row):
        # mengambil jenis pengeluaran berdasarkan label antecedents dan consequents
        items_in_rule = [x.strip() for x in str(row['antecedents']).split(',')] + \
                        [x.strip() for x in str(row['consequents']).split(',')]
        
        relevant_tx = original_df[original_df['Label'].isin(items_in_rule)].copy()
        
        if 'Tanggal' in relevant_tx.columns:
            relevant_tx['temp_sort_date'] = pd.to_datetime(relevant_tx['Tanggal'], dayfirst=True, errors='coerce')
            relevant_tx = relevant_tx.sort_values(by='temp_sort_date', ascending=False)

        # list of dictionary/JSON
        transactions = []
        for _, tx in relevant_tx.iterrows():
            # format tanggal 1 Januari 2026
            if pd.notnull(tx['temp_sort_date']):
                date_string = tx['temp_sort_date'].strftime('%Y-%m-%d')
            else:
                date_string = str(tx['Tanggal'])
            
            transactions.append({
                "date": date_string,
                "type_of_expenditure": capitalize(tx['Jenis Pengeluaran']),
                "category": capitalize(tx['Kategori']),
                "label": capitalize(tx['Label']),
                "amount": int(tx['Nominal (IDR)']),
            })
        return transactions
    
    rules_df['related_transactions'] = rules_df.apply(get_transaction_history, axis=1)

    def get_item_details(items_str):
        items = [x.strip() for x in str(items_str).split(',')]
        details_list = []
        
        for item in items:
            data = metadata_lookup.get(item)
            if data:
                details_list.append({
                    "name": item,
                    "type_of_expenditure": data['Jenis Pengeluaran'],
                    "total_expense": int(data['Total Biaya']),
                    "transaction_count": int(data['Jumlah Unik'])
                })
            else:
                # fallback jika data tidak ada di metadata
                details_list.append({"name": item, "type_of_expenditure": "Unknown", "total_expense": 0, "transaction_count": 0})
        return details_list
    
    rules_df['items_breakdown'] = rules_df.apply(
        lambda row: get_item_details(row['antecedents']) + get_item_details(row['consequents']), 
        axis=1
    )

    # gnerate kalimat insight
    item_type_map = {row['Label']: row['Jenis Pengeluaran'] for _, row in metadata_df.iterrows()}

    def get_types(items_str):
        items = [x.strip() for x in items_str.split(',')]
        types = set()
        for item in items:
            types.add(item_type_map.get(item, "Umum"))
        return ", ".join(sorted(list(types)))
    
    rules_df['antecedent_types'] = rules_df['antecedents'].apply(get_types)
    rules_df['consequent_types'] = rules_df['consequents'].apply(get_types)

    def generate_sentence(row):
        antecedents = str(row['antecedents']).replace(',', ' dan')
        consequents = str(row['consequents']).replace(',', ' dan')
        consequent_types = str(row['consequent_types']).replace(',', ' dan')

        confidence = row['confidence']
        lift = row['lift']
        percentage = int(confidence * 100)
        
        if lift >= 2.0 and confidence >= 0.8:
            strength = "Bahaya pemborosan rutin."
            description = f"Data mencatat peluang sebesar {percentage} persen bahwa pembelian {antecedents} pasti akan membuat anda mengeluarkan uang lagi untuk {consequents}."
            advice = f"Sangat disarankan untuk menunda pembelian {antecedents} jika Anda ingin menghemat uang untuk {consequents}."
        elif lift >= 1.2 and confidence >= 0.5:
            strength = "Potensi pengeluaran ganda."
            description = f"Terlihat kecenderungan sebesar {percentage} persen di mana {antecedents} menjadi penyebab anda membeli {consequents}."
            advice = f"Pikirkan dua kali sebelum membeli {antecedents} karena barang ini sering memicu pengeluaran tambahan pada {consequents}."
        else:
            strength = "Sinyal kebiasaan baru."
            description = f"Ditemukan kemungkinan kecil sebesar {percentage} persen adanya hubungan belanja antara {antecedents} dan {consequents}."
            advice = "Jagalah pengeluaran ini agar tidak menjadi kebiasaan buruk yang merusak tabungan anda di kemudian hari."
        return f"{strength}\n{description}\n{advice}"
    
    rules_df['insight_enrichment'] = rules_df.apply(generate_sentence, axis=1)

    print("\n" + "="*60)
    print("   DEBUG: PENGECEKAN RIWAYAT TRANSAKSI (ENRICHMENT)")
    print("="*60)
    
    if not rules_df.empty:
        first_rule = rules_df.iloc[0] 
        print(f"Aturan Contoh: [{first_rule['antecedents']}] -> [{first_rule['consequents']}]")
        print(f"Insight: {first_rule['insight_enrichment'].splitlines()[0]}")
        
        history = first_rule['related_transactions']
        print(f"Jumlah Transaksi Terkait Ditemukan: {len(history)}")
        
        if history:
            print("\nPreview 3 Transaksi Teratas:")
            for i, tx in enumerate(history[:3]):
                print(f"  {i+1}. Tgl: {tx['date']} | Item: {tx['label']} | Rp {tx['amount']}")
        else:
            print("  WARNING: List transaksi kosong! Cek filter get_transaction_history.")
            
    print("="*60 + "\n")
    print(f"DEBUG: Berhasil memperkaya {len(rules_df)} rules dengan History & Metadata.")
    return rules_df