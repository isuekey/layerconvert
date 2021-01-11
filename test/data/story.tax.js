
exports.rule = {
  taxRate:"consolidatedTaxRate",
  taxAmount:"invoiceTotalPriceTax",
  tax:"invoiceTotalTax", // invoiceTotalPriceTax * consolidatedTaxRate / (1 +consolidatedTaxRate)
  amountTaxFree:'invoiceTotalPrice', // invoiceTotalPriceTax - invoiceTotalTax.toFixed(2)
  bonusAmount:'discountAmount || 0',
  bonusTax:"(( discountAmount || 0 ) * consolidatedTaxRate / (1 + consolidatedTaxRate )).toFixed(2)",
  bonusAmountTaxFree:"( discountAmount || 0 ) - (( discountAmount || 0 ) * consolidatedTaxRate / (1 + consolidatedTaxRate )).toFixed(2)",
  realAmount:"invoiceTotalPriceTax + ( discountAmount || 0 )",
  realTax:"(( invoiceTotalPriceTax + ( discountAmount || 0 )) * consolidatedTaxRate / (1 + consolidatedTaxRate )).toFixed(2)",
  realAmountTaxFree:"( invoiceTotalPriceTax + ( discountAmount || 0 )) - (( invoiceTotalPriceTax + ( discountAmount || 0 )) * consolidatedTaxRate / (1 + consolidatedTaxRate )).toFixed(2)",
  relationFromUndefined:'count < 1',
  relationFromValue:'countValue < 1',
};

exports.data = {
  consolidatedTaxRate:0.09,
  invoiceTotalPriceTax: 1000000,
  invoiceTotalTax: 82568.81,
  invoiceTotalPrice: 917431.19,
  discountAmount: -200000,
  countValue:0
};

exports.result = {
  taxRate:0.09,
  taxAmount:1000000,
  tax:82568.81,
  amountTaxFree:917431.19,
  bonusAmount:-200000,
  bonusTax: '-16513.76',
  bonusAmountTaxFree:-183486.24,
  realAmount:800000,
  realTax:'66055.05',
  realAmountTaxFree:733944.95,
  relationFromUndefined: false,
  relationFromValue: true,
};

