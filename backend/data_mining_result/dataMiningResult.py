from sqlalchemy import Column, Integer, Numeric, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class DataMiningResult(Base):
    __tablename__ = "data_mining_result"

    id = Column(Integer, primary_key=True, index=True)
    setting_id = Column(Integer, ForeignKey("analysis_setting.id", ondelete="CASCADE"), nullable=False)

    antecedents = Column(Text, nullable=False)
    consequents = Column(Text, nullable=False)
    antecedent_support = Column(Numeric, nullable=False) 
    consequent_support = Column(Numeric, nullable=False)
    support = Column(Numeric, nullable=False)
    confidence = Column(Numeric, nullable=False)
    lift = Column(Numeric, nullable=False)
    leverage = Column(Numeric, nullable=False)      
    conviction = Column(Numeric, nullable=True)

    rule_name = Column(Text, nullable=False)
    insight_enrichment = Column(Text, nullable=False)

    setting = relationship("SettingAnalysis", backref="mining_results")