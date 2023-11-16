import { Product } from 'renderer/types/product';
import { connect } from './Database.service';
import { CategoryDocumentType } from 'renderer/types/category.type';

export function createProduct(product: Product): boolean {
  try {
    const db = connect();

    // Check if a product with the same name already exists
    const checkProduct = getProductByName(product.name);

    if (checkProduct) {
      console.log('Product with the same name already exists.');
      return false;
    }

    const insertProduct = {
      ...product,
    };

    const stm = db.prepare(
      `INSERT INTO products (name, price)
      VALUES (@name, @price)`,
    );

    stm.run(insertProduct);

    console.log('Product created successfully.');
    return true;
  } catch (error) {
    console.error('Error creating product:', error);
    return false;
  }
}

export function getProductByName(name: string): Product | undefined {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM products WHERE name = @name');
    const product = stm.get({ name }) as Product | undefined;

    return product;
  } catch (error) {
    console.error('Error getting product:', error);
    return undefined;
  }
}

export function getAllProducts(): Product[] {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM products');
    const products = stm.all() as Product[];

    return products;
  } catch (error) {
    console.error('Error getting all products:', error);
    return [];
  }
}

export function getAllCategories(): CategoryDocumentType[] {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM categories');
    const categories = stm.all() as CategoryDocumentType[];

    return categories;
  } catch (error) {
    console.error('Error getting all products:', error);
    return [];
  }
}
export function createCategory(category: CategoryDocumentType): boolean {
  try {
    const db = connect();

    // Check if a category with the same name already exists
    const checkCategory = getCategoryByName(category.label);

    if (checkCategory) {
      console.log('Category with the same name already exists.');
      return false;
    }

    const insertCategory = {
      ...category,
    };

    const stm = db.prepare(
      `INSERT INTO categories (label,value)
      VALUES (@label, @value)`,
    );

    stm.run(insertCategory);

    console.log('Category created successfully.');
    return true;
  } catch (error) {
    console.error('Error creating category:', error);
    return false;
  }
}

export function getCategoryByName(label: string): CategoryDocumentType | undefined {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM categories WHERE label = @label');
    const category = stm.get({ label }) as CategoryDocumentType | undefined;

    return category;
  } catch (error) {
    console.error('Error getting category:', error);
    return undefined;
  }
}
