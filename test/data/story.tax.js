
exports.rule = {
  taxRate:"consolidatedTaxRate",
  taxAmount:"invoiceTotalPriceTax",
  tax:"invoiceTotalTax", // invoiceTotalPriceTax * consolidatedTaxRate / (1 +consolidatedTaxRate)
  amountTaxFree:'invoiceTotalPrice', // invoiceTotalPriceTax - invoiceTotalTax.toFixed(2)
  bonusAmount:'discountAmount || 0',
  bonusTax:"( discountAmount || 0 ) * consolidatedTaxRate / (1 + consolidatedTaxRate )",
  bonusAmountTaxFree:"( discountAmount || 0 ) - (( discountAmount || 0 ) * consolidatedTaxRate / (1 + consolidatedTaxRate )).toFixed(2)",
  realAmount:"invoiceTotalPriceTax + ( discountAmount || 0 )",
  realTax:"( invoiceTotalPriceTax + ( discountAmount || 0 )) * consolidatedTaxRate / (1 + consolidatedTaxRate )",
  realAmountTaxTree:"( invoiceTotalPriceTax + ( discountAmount || 0 )) - (( invoiceTotalPriceTax + ( discountAmount || 0 )) * consolidatedTaxRate / (1 + consolidatedTaxRate )).toFixed(2)",
};

exports.data = {
  consolidatedTaxRate:0.09,
  invoiceTotalPriceTax: 1000000,
  invoiceTotalTax: 82568.81,
  invoiceTotalPrice: 917431.19,
  discountAmount: -200000,
};

exports.result = {
  taxRate:0.09,
  taxAmount:1000000,
  tax:82568.81,
  amountTaxFree:917431.19,
  bonusAmount:-200000,
  bonusTax: -16513.761467889908,
  bonusAmountTaxFree:-183486.24,
  realAmount:800000,
  realTax:66055.04587155963,
  realAmountTaxTree:733944.95,
};

