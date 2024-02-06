const {ModelProduct} = require("./modules/model.product")
const [, , productName, categoryId] = process.argv
const newProduct = new ModelProduct()
newProduct.addProduct(productName, categoryId) && console.log(`${productName} muvaffaqiyatli ${categoryId} ga qo'shildi`)