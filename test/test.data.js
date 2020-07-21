
const upstreamData = {
  // data:'value',
  aNumber:1,
  bString:"123",
  order:{
    price:1230.55,
    goods:'手机',
    quantity:1,
    tax:0,
  },
  orderList:[
    { price:123, goods:'皮萨', quantity:1 },
    { price:13, goods:'毛巾', quantity:2 },
    { price:4.99, goods:'苹果', quantity:1.5, unit:'斤' },
  ]
};

const downRule = {
  // "targetKey":"upstreamRule",
  id:'aNumber',
  serial:'bString',
  bill: {
    [Symbol.for('scope')]:"order",
    priceBase:'price',
    goodsName:'goods',
    quantity:'quantity',
    amount:'price * quantity',
    tax:'price * quantity * (taxRate || 0.05)'
  },
  orders: {
    [Symbol.for('scope')]:"orderList",
    [Symbol.for('type')]:"array",
    amount:'price * quantity',
  },
  finish:'[append, serial].join("-")',
  billQuantity:'order.quantity'
};

const base = {
  append:'append'
};

const expected = {
  id:1,
  serial:'123',
  order:{
    price:1230.55,
    goods:'手机',
    quantity:1,
    tax:0,
  },
  orderList:[
    { price:123, goods:'皮萨', quantity:1 },
    { price:13, goods:'毛巾', quantity:2 },
    { price:4.99, goods:'苹果', quantity:1.5, unit:'斤' },
  ],
  bill: {
    price:1230.55,
    goods:'手机',
    quantity:1,
    priceBase:1230.55,
    goodsName:'goods',
    amount:1230.55,
    tax:61.5275
  },
  orders:[
    { price:123, goods:'皮萨', quantity:1, amount:123 },
    { price:13, goods:'毛巾', quantity:2, amount:26 },
    { price:4.99, goods:'苹果', quantity:1.5, unit:'斤', amount:7.485 },
  ],
  append:'append',
  finish:'append-123',
  orderQuantity:1
};

const down = {
  upstream:upstreamData, downRule, base, expected
};

const upstreamRule = {
};

const upstream = {
  upstreamRule
};

module.exports= {
  down,
  upstream
};

