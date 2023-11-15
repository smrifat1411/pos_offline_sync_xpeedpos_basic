export interface Table {
  capacity: number;
  tableName: string;
  status?: string;
  isOnline?: boolean;
}

export interface RxDBTableDocument{
  _data: Table;
}
