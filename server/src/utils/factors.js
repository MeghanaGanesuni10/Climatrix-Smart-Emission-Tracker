// Illustrative placeholders only. Replace with organization-approved, sourced factors.
export const FACTOR_VERSION='illustrative-2026-01';
const source='Illustrative software estimate; authoritative source not verified. Replace before formal reporting.';
export const factors={
  Electricity:{grid:{factor:0.45,unit:'kWh',label:'Grid electricity',source}},
  Fuel:{petrol:{factor:2.31,unit:'L',label:'Petrol',source},diesel:{factor:2.68,unit:'L',label:'Diesel',source},natural_gas:{factor:2.0,unit:'m³',label:'Natural gas',source}},
  Transportation:{car:{factor:0.18,unit:'km',label:'Car',source},bus:{factor:0.10,unit:'km',label:'Bus',source},motorcycle:{factor:0.09,unit:'km',label:'Motorcycle',source}},
  'Business Travel':{air:{factor:0.15,unit:'km',label:'Air',source},rail:{factor:0.035,unit:'km',label:'Rail',source},road:{factor:0.18,unit:'km',label:'Road',source}}
};
