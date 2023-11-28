// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { TODO } from './services/Database.service';
import { Product } from 'renderer/types/product';
import { CategoryDocumentType } from 'renderer/types/category.type';
import { Order } from 'renderer/types/order.type';
import { Expense } from 'renderer/types/expense.type';
import { Customer } from 'renderer/types/customer.type';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },

  printOrPreviewComponent: async (url: string, isPreview: boolean) => {
    return ipcRenderer.invoke('printOrPreviewComponent', { url, isPreview });
  },

  insertProduct: (product: Product) =>
    ipcRenderer.invoke('product:insert', product),
  getProductByName: (name: string) =>
    ipcRenderer.invoke('product:getByName', name),
  getProductById: (id: number) => ipcRenderer.invoke('product:getByName', id),
  updateProductById: (productId: number, updatedproduct: any) =>
    ipcRenderer.invoke('product:updateById', productId, updatedproduct),
  getAllProducts: () => ipcRenderer.invoke('product:getAll'),
  getAllCategories: () => ipcRenderer.invoke('category:getAll'),
  createCategory: (category: CategoryDocumentType) =>
    ipcRenderer.invoke('category:create', category),

  createOrder: (order: Order) => ipcRenderer.invoke('order:create', order),
  updateOrder: (orderId: string, updatedOrder: any) =>
    ipcRenderer.invoke('order:update', orderId, updatedOrder),
  deleteOrder: (orderId: string) => ipcRenderer.invoke('order:delete', orderId),
  getAllOrder: (
    page?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ) => ipcRenderer.invoke('order:getAll', page, pageSize, sortBy, sortOrder),

  getOrderById: (id: number) => ipcRenderer.invoke('order:getById', id),
  login: (user: Auth) => ipcRenderer.invoke('auth:login', user),
  register: (user: Auth) => ipcRenderer.invoke('auth:register', user),
  getUser: (username: string) => ipcRenderer.invoke('auth:getUser', username),
  getOrderByPeriod: (period: string) =>
    ipcRenderer.invoke('order:getByPeriod', period),
  createExpense: (data: Expense) =>
    ipcRenderer.invoke('expense:createExpense', data),

  getAllUsers: () => ipcRenderer.invoke('auth:getAllUsers'),
  getAllExpensesByPeriod: (period: string) =>
    ipcRenderer.invoke('expense:getExpensesByPeriod', period),
  generateReciept: (data: any) =>
    ipcRenderer.invoke('generateHtmlContent', data),

  createCustomer: (customer: Customer) =>
    ipcRenderer.invoke('customer:create', customer),
  getCustomerById: (id: number) => ipcRenderer.invoke('customer:getById', id),

  getTotalItemsCount: (tableName: string) =>
    ipcRenderer.invoke('getTotalItemsCount', tableName),

  updateCustomerById: (customerId: number, updatedData: Customer) =>
    ipcRenderer.invoke('customer:updateById', customerId, updatedData),
  searchProductByname: (searchString: string) =>
    ipcRenderer.invoke('searchProductByName', searchString),
};
contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
