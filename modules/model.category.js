const path = require("path");
const fs = require("fs");
const { v4 } = require("../uuid/index");
class ModelCategory {
  #cPath;
  #pPath;
  constructor() {
    this.#cPath = path.join(process.cwd(), "database", "categorys.json");
    this.#pPath = path.join(process.cwd(), "database", "products.json");
  }
  #read(fileName) {
    try {
      let categories = fs.readFileSync(fileName);
      categories = categories ? JSON.parse(categories) : [];
      return categories;
    } catch (error) {
      throw new Error(
        `File ni o'qishda xatolik yuz berdi ! ERROR = ${error.message}`
      );
    }
  }
  #getProductCount(categoryId) {
    try {
      const products = this.#read(this.#pPath);
      return products.reduce((acc, el) => {
        if (categoryId == el.categoryId) {
          return acc + el.count;
        } else {
          return acc;
        }
      }, 0);
    } catch (error) {
      return `Product countlarini hisoblashda hatolik yuz berdi ! ERROR = ${error}`;
    }
  }
  getCategory() {
    try {
      let productsOrCategories = this.#read(this.#cPath);
      if (productsOrCategories?.length) {
        return productsOrCategories.map((item) => {
          item.count = this.#getProductCount(item.categoryId);
          return item;
        });
      }
    } catch (error) {
      throw new Error(
        "Category larni count larini hisoblashda xatolik yuz berdi !"
      );
    }
  }
  addCategory(categoryName) {
    const categories = this.#read(this.#cPath);
    const regexCategory = new RegExp(categoryName, "gi");
      if (!isNaN((categoryName -0)))
        throw new Error(
          "Sizning kiritmoqchi bo'lgan categoriyingiz ismi yaroqsiz !"
        );
      if (categories.some((item) => regexCategory.test(item.categoryName)))
        throw new Error("Bu category Avvaldan mavjud");
      const category = {
        categoryName,
        categoryId: v4() + ""
      };
      categories.push(category)
      fs.writeFileSync(this.#cPath, JSON.stringify(categories, null, 4))
      return true
  }
}
module.exports = { ModelCategory };
