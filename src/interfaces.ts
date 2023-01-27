interface IListPost {
  listName: string;
  data: IDataItem[];
}

interface IDataItem {
  name: string;
  quantity: string;
}

interface IListComplete extends IListPost {
  id: number;
}

export { IListPost, IDataItem, IListComplete };
