export interface ISpecificCategory {
    entities:
        {
          id: number,
          name: string , 
          value?:string|null
        }[],
      count: number
}
