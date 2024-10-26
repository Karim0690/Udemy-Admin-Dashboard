export interface IReturnedData {
    isSuccess: boolean,
    message:string,
      entity: {
        category: {
            id: number,
            name: string,
           
          },
          specificationsDtos: {
              id: number,
              name: string
            }[] 
      }
  }
  