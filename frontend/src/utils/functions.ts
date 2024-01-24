import { round } from "lodash";

export const calcAvarage = (arr: any) => {
    const result =  arr.reduce((a: number, b: number) => a + b, 0) / arr.length ;
    return round(result, 2);

  };
  
  export const getByArrayNumber = (arr: any, keys: string[]) => {
    return arr.map((item: any) => {
        const value = keys.reduce((acc, key) => acc[key], item);
        return parseInt(value, 10); 
    });
};

export const getByArrayBoolean = (arr: any, keys: string[]) => {
  return arr.map((item: any) => {
      const value = keys.reduce((acc, key) => acc[key], item);
      return value;
    });
};


