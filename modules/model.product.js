const path = require("path");
const fs = require("fs");
const { v4 } = require("../uuid/index");
class ModelProduct {
  #cPath;
  #pPath;
  constructor() {
    this.#cPath = path.join(process.cwd(), "database", "categorys.json");
    this.#pPath = path.join(process.cwd(), "database", "products.json");
  }
  #read(fileName) {
    try {
      let productsOrCategories = fs.readFileSync(fileName, "utf-8");
      productsOrCategories = productsOrCategories
        ? JSON.parse(productsOrCategories)
        : [];
      return productsOrCategories;
    } catch (error) {
      throw new Error(
        `File ni o'qishda xatolik yuz berdi ! ERROR = ${error.message}`
      );
    }
  }
  #getCategoryName(categoryId){
    const categories = this.#read(this.#cPath)
    try{
      let find = categories.find((item) => item.categoryId == categoryId )
      if(find.categoryName){
        return find.categoryName
      }else{
        return false
      }
    } catch(error){
      throw new Error("CategoryName larni qaytarishda xatolik yuz berdi")
    }
  }
  #getToChekCategory(categoryId){
    let categories = this.#read(this.#cPath)
    const idx = categories.findIndex((item) => item.categoryId == categoryId)
    return idx !== -1 ? `${categories[idx].categoryName} da hozirda tovarlar mavjud emas`: "Bunday category mavjud emas"
  }
  getProducts(categoryId){
    let products = this.#read(this.#pPath)
    try{
      let result =  products?.filter((item) => {
        item.categoryName = this.#getCategoryName(item.categoryId) ? this.#getCategoryName(item.categoryId): "" 
        const condition = categoryId ? item.categoryId == categoryId : true
        delete item.categoryId
        return condition
      })
      if(!result.length){
        result = this.#getToChekCategory(categoryId)
      }
      return result
    }catch(error){
      throw new Error("Product larni qaytarishda xatolik yuz berdi")
    }
  }
  
  addProduct(productName, categoryId){
    try{
      let products = this.#read(this.#pPath)
      if(!productName || !categoryId) throw new Error("productName yoki categoryId kiritilmagan !")
      if(!this.#getCategoryName(categoryId)) throw new Error("Bunday categoryId mavjud emas !")
      const find = products.find((item) => item.productName.toLowerCase() == productName.toLowerCase())
      if(find){
        find.count = find.count + 1
        console.log(`${productName} ning counti oshirildi !`)
        fs.writeFileSync(this.#pPath, JSON.stringify(products, null, 4))

      }else{
        const product = {
          productName,
          productId: v4(),
          categoryId,
          count: 1
        }
        products.push(product)
        fs.writeFileSync(this.#pPath, JSON.stringify(products, null, 4))
        return true
      }
      
    }catch(error){
      throw new Error( error.message)
    }
    
  }
}
module.exports = { ModelProduct };
