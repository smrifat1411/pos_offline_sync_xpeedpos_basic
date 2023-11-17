/* eslint global-require: off, no-console: off, promise/always-return: off */

import { BrowserWindow, app, ipcMain, shell } from 'electron';
import path from 'path';
import { CategoryDocumentType } from 'renderer/types/category.type';
import { Product } from 'renderer/types/product';
import MenuBuilder from './menu';
import { getUser, login, register } from './services/Auth.service';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from './services/Order.service';
import {
  createCategory,
  createProduct,
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductByName,
} from './services/product.service';
import { resolveHtmlPath } from './util';

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
    marginType: "printableArea",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: "Page header",
  footer: "Page footer",
};

ipcMain.handle('printOrPreviewComponent', async (_, { url, isPreview }) => {
  let win: BrowserWindow | null = new BrowserWindow({
    show: false,
    title: isPreview ? 'Print Preview' : 'Print Document',
    autoHideMenuBar: true,
  });

  win.once('ready-to-show', () => {
    if (win && isPreview) {
      win.webContents.printToPDF(printOptions).then((data) => {
        const buf = Buffer.from(data);
        const base64Data = buf.toString('base64');
        const previewUrl = 'data:application/pdf;base64,' + base64Data;

        win?.once('ready-to-show', () => {
          if (win) {
            win.show();
          }
        });

        win?.once('page-title-updated', (e) => e.preventDefault());
        win?.once('closed', () => {
          if (win) {
            win = null; // This line is not needed
          }
        });

        win?.loadURL(previewUrl);
      }).catch((error) => {
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

  await win.loadURL(url);

  return isPreview ? 'shown preview window' : 'shown print dialog';
});



app
  .whenReady()
  .then(() => {
    ipcMain.handle('auth:login', async (_, user: any) => {
      // Replace 'any' with the actual type for 'Auth'
      return login(user);
    });
    ipcMain.handle('auth:register', async (_, user: any) => {
      // Replace 'any' with the actual type for 'Auth'
      return register(user);
    });
    ipcMain.handle('auth:getUser', async (_, username: string) => {
      return getUser(username);
    });
    ipcMain.handle('product:insert', async (_, product: Product) => {
      const createdProduct = await createProduct(product);
      return createdProduct;
    });

    ipcMain.handle('product:getByName', async (_, name: string) => {
      return getProductByName(name);
    });
    ipcMain.handle('product:getById', async (_, id: number) => {
      return getProductById(id);
    });
    ipcMain.handle('product:getAll', async () => {
      return getAllProducts();
    });
    ipcMain.handle('category:getAll', async () => {
      return getAllCategories();
    });
    ipcMain.handle(
      'category:create',
      async (_, category: CategoryDocumentType) => {
        return createCategory(category);
      },
    );
    ipcMain.handle('order:create', async (_, order) => {
      return createOrder(order);
    });

    ipcMain.handle('order:update', async (_, orderId, updatedOrder) => {
      return updateOrder(orderId, updatedOrder);
    });

    ipcMain.handle('order:delete', async (_, orderId) => {
      return deleteOrder(orderId);
    });
    ipcMain.handle('order:getAll', async () => {
      return getAllOrders();
    });

    createWindow();

    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
