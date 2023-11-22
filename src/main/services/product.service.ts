import { Product } from 'renderer/types/product';
import { connect } from './Database.service';
import { CategoryDocumentType } from 'renderer/types/category.type';

export async function createProduct(product: Product): Promise<Product | null> {
  try {
    const db = connect();

    // Check if a product with the same name already exists
    const checkProduct = getProductByName(product.name);

    if (checkProduct) {
      console.log('Product with the same name already exists.');
      return null;
    }

    const insertProduct = {
      ...product,
    };

    const stm = db.prepare(
      `INSERT INTO products (name, category, sellingPrice, discount, discountable, buyingPrice,stockAmount)
      VALUES (@name, @category,  @sellingPrice, @discount, @discountable,@buyingPrice, @stockAmount)`,
    );

    // Use await with a Promise for the synchronous SQLite operation
    const result: { lastInsertRowid: number } = await new Promise(
      (resolve, reject) => {
        try {
          const runResult = stm.run(insertProduct);
          // Explicitly cast lastInsertRowid to number
          resolve({ lastInsertRowid: Number(runResult.lastInsertRowid) });
        } catch (error) {
          reject(error);
        }
      },
    );

    // Retrieve the newly created product from the database by ID
    const newProductId = result.lastInsertRowid;

    // Use await with getProductById to ensure it completes before proceeding
    const newProduct = await getProductById(newProductId);

    if (!newProduct) {
      console.error('Error retrieving the newly created product.');
      return null;
    }

    console.log('Product created successfully.');
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
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
export function getProductById(id: number | bigint): Product | undefined {
  try {
    const db = connect();

    console.log('Attempting to fetch product with ID:', id);

    const stm = db.prepare('SELECT * FROM products WHERE id = @id');
    const product = stm.get({ id: Number(id) }) as Product | undefined;

    if (product) {
      console.log('Product found:', product);
    } else {
      console.log('Product not found for ID:', id);
    }

    return product;
  } catch (error) {
    console.error('Error getting product by ID:', error);
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

export async function updateProductById(id: number, updatedProductData: Product): Promise<void> {
  try {
    const db = connect();

    const updateProduct = {
      id: id,
      ...updatedProductData,
    };

    const stm = db.prepare(
      `UPDATE products
      SET name = @name, category = @category, sellingPrice = @sellingPrice, discount = @discount, discountable = @discountable, buyingPrice = @buyingPrice, stockAmount = @stockAmount
      WHERE id = @id`,
    );

    await new Promise<void>((resolve, reject) => {
      try {
        stm.run(updateProduct);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    console.log('Product updated successfully.');
  } catch (error) {
    console.error('Error updating product:', error);
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

export function getCategoryByName(
  label: string,
): CategoryDocumentType | undefined {
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
