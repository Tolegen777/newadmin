export interface ICategory{
    id:number;
    name:string;
    children:IChildCategory[]
}

export interface IChildCategory {
    id:number;
    name:string;
    children:ISecondChildCategory[]
}

export interface ISecondChildCategory {
    id:number
    name:string
    children:Array<{
        id:number,
        name:string
    }>
}