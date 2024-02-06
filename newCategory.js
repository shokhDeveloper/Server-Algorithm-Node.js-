const [, , categoryName] = process.argv
const {ModelCategory} = require("./modules/model.category")

const Categories = new ModelCategory()

Categories.addCategory(categoryName) && console.log(`${categoryName} muvaffaqiyatli qo'shildi`)