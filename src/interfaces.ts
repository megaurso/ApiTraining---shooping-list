interface IListPost {
    listName: string
    data: IDataItem
}

interface IDataItem {
    map(arg0: (elem: IDataItem) => boolean): boolean[]
    name: string
    quantity:string 
}

interface IListComplete extends IListPost {
    id: number
}


export {IListPost,IDataItem,IListComplete}