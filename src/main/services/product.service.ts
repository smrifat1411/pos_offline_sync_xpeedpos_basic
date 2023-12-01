import { Product } from 'renderer/types/product';
import { connect } from './Database.service';
import { CategoryDocumentType } from 'renderer/types/category.type';

export async function createProduct(
  product: Product,
): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    const db = connect();

    // Check if a product with the same name already exists
    const checkProduct = await getProductByName(product.name);

    if (checkProduct.success && checkProduct.data) {
      console.log('Product with the same name already exists.');
      return {
        success: false,
        error: 'Product with the same name already exists.',
      };
    }

    const insertProduct = {
      ...product,
      company: product.company || null,
      isDeleted: false,
    };

    const stm = db.prepare(
      `INSERT INTO products (name, category, sellingPrice, discount, discountable, buyingPrice, stockAmount, company)
      VALUES (@name, @category, @sellingPrice, @discount, @discountable, @buyingPrice, @stockAmount, @company)`,
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
    const newProduct = (await getProductById(newProductId)).data as Product;

    if (!newProduct) {
      console.error('Error retrieving the newly created product.');
      return {
        success: false,
        error: 'Error retrieving the newly created product.',
      };
    }

    console.log('Product created successfully.');
    return { success: true, data: newProduct };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Error creating product.' };
  }
}

export async function getProductByName(
  name: string,
): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM products WHERE name = @name');
    const product = stm.get({ name }) as Product | undefined;

    return { success: true, data: product, error: undefined };
  } catch (error) {
    console.error('Error getting product:', error);
    return { success: false, data: undefined, error: 'Error getting product.' };
  }
}

export async function searchProductsByName(
  partialName: string,
): Promise<{ success: boolean; data?: Product[]; error?: string }> {
  try {
    const db = connect();

    const stm = db.prepare(
      'SELECT * FROM products WHERE name LIKE @partialName',
    );
    const products = stm.all({ partialName: `%${partialName}%` }) as Product[];

    return { success: true, data: products, error: undefined };
  } catch (error) {
    console.error('Error searching products:', error);
    return {
      success: false,
      error: 'Error searching products.',
    };
  }
}

export async function getProductById(
  id: number,
): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    const db = connect();

    console.log('Attempting to fetch product with ID:', id);

    const stm = db.prepare(
      'SELECT * FROM products WHERE id = @id AND isDeleted = false',
    );

    const product = stm.get({ id }) as Product | undefined;

    if (product) {
      console.log('Product found:', product);
    } else {
      console.log('Product not found for ID:', id);
    }

    return { success: true, data: product, error: undefined };
  } catch (error) {
    console.error('Error getting product by ID:', error);
    return {
      success: false,
      data: undefined,
      error: 'Error getting product by ID.',
    };
  }
}

export async function getAllProducts(): Promise<{
  success: boolean;
  data?: Product[];
  error?: string;
}> {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM products WHERE isDeleted = false');

    const products = stm.all() as Product[];

    return { success: true, data: products, error: undefined };
  } catch (error) {
    console.error('Error getting all products:', error);
    return {
      success: false,
      data: undefined,
      error: 'Error getting all products.',
    };
  }
}

export async function updateProductById(
  id: number,
  updatedProductData: any,
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const db = connect();

    const updateFields = Object.keys(updatedProductData)
      .map((key) => `${key} = @${key}`)
      .join(', ');

    const stm = db.prepare(
      `UPDATE products
      SET ${updateFields}
      WHERE id = @id`,
    );

    const updateProduct = {
      id: id,
      ...updatedProductData,
    };

    await new Promise<void>((resolve, reject) => {
      try {
        stm.run(updateProduct);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    // Fetch the updated product data from the database
    const updatedProduct = db
      .prepare('SELECT * FROM products WHERE id = ?')
      .get(id);
    console.log('Product updated successfully.');
    return { success: true, data: updatedProduct };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Error updating product.' };
  }
}

export async function getAllCategories(): Promise<{
  success: boolean;
  data?: CategoryDocumentType[];
  error?: string;
}> {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM categories');
    const categories = stm.all() as CategoryDocumentType[];

    return { success: true, data: categories, error: undefined };
  } catch (error) {
    console.error('Error getting all categories:', error);
    return {
      success: false,
      data: undefined,
      error: 'Error getting all categories.',
    };
  }
}

export async function createCategory(
  category: CategoryDocumentType,
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = connect();

    // Check if a category with the same name already exists
    const checkCategory = await getCategoryByName(category.label);

    if (checkCategory.success && checkCategory.data) {
      console.log('Category with the same name already exists.');
      return {
        success: false,
        error: 'Category with the same name already exists.',
      };
    }

    const insertCategory = {
      ...category,
    };

    const stm = db.prepare(
      `INSERT INTO categories (label, value)
      VALUES (@label, @value)`,
    );

    stm.run(insertCategory);

    console.log('Category created successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: 'Error creating category.' };
  }
}

export async function getCategoryByName(
  label: string,
): Promise<{ success: boolean; data?: CategoryDocumentType; error?: string }> {
  try {
    const db = connect();

    const stm = db.prepare('SELECT * FROM categories WHERE label = @label');
    const category = stm.get({ label }) as CategoryDocumentType | undefined;

    return { success: true, data: category, error: undefined };
  } catch (error) {
    console.error('Error getting category:', error);
    return {
      success: false,
      data: undefined,
      error: 'Error getting category.',
    };
  }
}

export async function deleteProductById(
  id: number,
): Promise<{ success: boolean; data?: Product; error?: string }> {
  try {
    const db = connect();

    // Retrieve the product before deletion
    const productToDelete = await getProductById(id);
    if (!productToDelete.success || !productToDelete.data) {
      return {
        success: false,
        error: 'Product not found for deletion.',
      };
    }

    if (productToDelete.data.isDeleted) {
      return {
        success: false,
        error: 'Product is already deleted.',
      };
    }

    // Update isDeleted to true (soft delete)
    const stm = db.prepare(
      'UPDATE products SET isDeleted = true WHERE id = @id',
    );
    stm.run({ id });

    console.log('Product deleted successfully.');

    return { success: true, data: productToDelete.data };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Error deleting product.' };
  }
}
