// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { TODO } from './services/Database.service';
import { Product } from 'renderer/types/product';
import { CategoryDocumentType } from 'renderer/types/category.type';
import { Order } from 'renderer/types/order.type';

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

  login: (user: Auth) => ipcRenderer.invoke('auth:login', user),
  register: (user: Auth) => ipcRenderer.invoke('auth:register', user),
  getUser: (username: string) => ipcRenderer.invoke('auth:getUser', username),
  insertProduct: (product: Product) =>
    ipcRenderer.invoke('product:insert', product),
  getProductByName: (name: string) =>
    ipcRenderer.invoke('product:getByName', name),
  getProductById: (id: number) =>
    ipcRenderer.invoke('product:getByName', id),
  getAllProducts: () => ipcRenderer.invoke('product:getAll'),
  getAllCategories: () => ipcRenderer.invoke('category:getAll'),
  createCategory: (category: CategoryDocumentType) =>
    ipcRenderer.invoke('category:create', category),

  createOrder: (order: Order) => ipcRenderer.invoke('order:create', order),
  updateOrder: (orderId: string, updatedOrder: any) =>
    ipcRenderer.invoke('order:update', orderId, updatedOrder),
  deleteOrder: (orderId: string) => ipcRenderer.invoke('order:delete', orderId),
  getAllOrder: () => ipcRenderer.invoke('order:getAll'),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
