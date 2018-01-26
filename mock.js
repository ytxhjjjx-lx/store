var Mock = require('mockjs')
var fs = require('fs')

var data = Mock.mock({
    'categories|4': [
        {
            'id|+1': 1,
            // 分类的名称
            'name': '@cword(3, 5)'
        }
    ],
    'products|40-60': [
        {
            'id|+1': 1,
            // 该商品所对应的分类
            'categoryId|1-4': 10,
            // 商品的名称
            'name': '@cword(3, 6)',
            // 商品的描述
            'dec': '@csentence()',
            // 商品的价格
            'price|100-999.1': 10
        }
    ],
    'carts': []
})

fs.writeFile('db.json', JSON.stringify(data, null, 2), function () {
    console.log('写入成功')
})