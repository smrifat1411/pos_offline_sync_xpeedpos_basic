/* eslint global-require: off, no-console: off, promise/always-return: off */

import { BrowserWindow, app, ipcMain, shell } from 'electron';
import path from 'path';
import { CategoryDocumentType } from 'renderer/types/category.type';
import { Product } from 'renderer/types/product';
import MenuBuilder from './menu';
import { getAllUsers, getUser, login, register } from './services/Auth.service';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  getOrdersByPeriod,
  getTotalItemsCount,
  updateOrderById,
} from './services/Order.service';
import {
  createCategory,
  createProduct,
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductByName,
  searchProductsByName,
  updateProductById,
} from './services/product.service';
import { encodeImageToBase64, resolveHtmlPath } from './util';
import {
  Expense,
  createExpense,
  getExpensesByPeriod,
} from './services/expense.service';
import {
  createCustomer,
  getCustomerDetails,
  updateCustomerById,
} from './services/customer.service';
const fs = require('fs');

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open URLs in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
const printOptions = {
  silent: false,
  printBackground: true,
  color: true,
  margin: {
    marginType: 'printableArea',
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: 'Page header',
  footer: 'Page footer',
};

ipcMain.handle('printOrPreviewComponent', async (_, { url, isPreview }) => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  let win: BrowserWindow | null = new BrowserWindow({
    show: false,
    title: isPreview ? 'Print Preview' : 'Print Document',
    autoHideMenuBar: true,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  win.once('ready-to-show', () => {
    if (win && isPreview) {
      win.webContents
        .printToPDF(printOptions)
        .then((data) => {
          const base64Data = data.toString('base64');
          const previewUrl = 'data:application/pdf;base64,' + base64Data;

          win?.once('ready-to-show', () => {
            if (win) {
              win.show();
            }
          });

          win?.once('page-title-updated', (e) => e.preventDefault());
          win?.once('closed', () => {
            if (win) {
              win = null;
            }
          });

          win?.loadURL(previewUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (win) {
      win.webContents.print({}, (success, failureReason) => {
        console.log('Print Initiated in Main...');
        if (!success) {
          console.log(failureReason);
        }
      });
    }
  });
  const dataUrl = `data:text/html;charset=UTF-8,${encodeURIComponent(url)}`;

  await win.loadURL(dataUrl);

  return isPreview ? 'shown preview window' : 'shown print dialog';
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('product:insert', async (_, product: Product) => {
      return await createProduct(product);
    });

    ipcMain.handle('product:getByName', async (_, name: string) => {
      return await getProductByName(name);
    });
    ipcMain.handle('product:getById', async (_, id: number) => {
      return await getProductById(id);
    });
    ipcMain.handle(
      'product:updateById',
      async (_, id: number, data: Product) => {
        return await updateProductById(id, data);
      },
    );
    ipcMain.handle('product:getAll', async () => {
      return await getAllProducts();
    });
    ipcMain.handle('category:getAll', async () => {
      return await getAllCategories();
    });
    ipcMain.handle(
      'category:create',
      async (_, category: CategoryDocumentType) => {
        return await createCategory(category);
      },
    );
    ipcMain.handle('order:create', async (_, order) => {
      return await createOrder(order);
    });

    ipcMain.handle('order:update', async (_, orderId, updatedOrder) => {
      return await updateOrderById(orderId, updatedOrder);
    });

    ipcMain.handle('order:delete', async (_, orderId) => {
      return await deleteOrder(orderId);
    });
    ipcMain.handle(
      'order:getAll',
      async (_, page, pageSize, sortBy, sortOrder) => {
        return await getAllOrders(page, pageSize, sortBy, sortOrder);
      },
    );
    ipcMain.handle('order:getById', async (_, id: number) => {
      return await getOrderDetails(id);
    });
    ipcMain.handle('auth:login', async (_, user: Auth) => {
      return await login(user);
    });
    ipcMain.handle('auth:register', async (_, user: User) => {
      return await register(user);
    });
    ipcMain.handle('auth:getUser', async (_, username: string) => {
      return await getUser(username);
    });
    ipcMain.handle('order:getByPeriod', async (_, period: string) => {
      return await getOrdersByPeriod(period);
    });
    ipcMain.handle('expense:createExpense', async (_, expenseData: Expense) => {
      return await createExpense(expenseData);
    });
    ipcMain.handle('auth:getAllUsers', async () => {
      return await getAllUsers();
    });
    // Expense
    ipcMain.handle('expense:getExpensesByPeriod', async (_,  period, page, pageSize, filterField, filterValue, sortOrder ) => {
      return await getExpensesByPeriod(period, page, pageSize, filterField, filterValue, sortOrder);
    });
    // Customer

    ipcMain.handle('customer:create', async (_, customer) => {
      return await createCustomer(customer);
    });

    ipcMain.handle('customer:getById', async (_, id) => {
      return await getCustomerDetails(id);
    });

    ipcMain.handle('customer:updateById', async (_, id, updatedData) => {
      return await updateCustomerById(id, updatedData);
    });

    ipcMain.handle('getTotalItemsCount', async (_, tableName: string) => {
      return await getTotalItemsCount(tableName);
    });
    ipcMain.handle('searchProductByName', async (_, searchString: string) => {
      return await searchProductsByName(searchString);
    });

    createWindow();

    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
