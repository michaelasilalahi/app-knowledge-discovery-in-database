from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from app.modules.expenditure.models import Expenditure

def get_visualization_off_all_time(db: Session, user_id: str, month: int, year: int):

    # query database (group by date & category)
    results = db.query(
        Expenditure.date,
        Expenditure.category,
        func.sum(Expenditure.amount)
    ).filter(
        Expenditure.user_id == user_id,
        extract('month', Expenditure.date) == month,
        extract('year', Expenditure.date) == year
    ).group_by(
        Expenditure.date, 
        Expenditure.category
    ).order_by(
        Expenditure.date
    ).all()

    # processing data (merging needs & wants)
    data_map = {}

    for row in results:

        expense_date, category, total_amount = row
        key = str(expense_date)
        label = str(expense_date.day) 

        if key not in data_map:

            data_map[key] = {
                "date_label": label, 
                "timestamp": key,     
                "amount_needs": 0,
                "amount_wants": 0
            }

        amount = int(total_amount) if total_amount else 0
        
        if category == "Kebutuhan":

            data_map[key]["amount_needs"] += amount

        elif category == "Keinginan":

            data_map[key]["amount_wants"] += amount
    
    # convert map ke list dan urutkan berdasarkan tanggal
    final_data = list(data_map.values())
    final_data.sort(key=lambda x: x['timestamp'])

    return {"data": final_data}