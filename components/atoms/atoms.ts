import { atom } from "recoil";

export const ThisState = atom({
    key: 'ThisState',
    default: '',
  });

  export const ServicesState = atom<any>({
    key: 'ServicesState',
    default: [],
  });

  export const PriceState = atom({
    key: 'PriceState',
    default: 0,
  });

  export const StudentsState = atom({
    key: 'StudentsState',
    default: 0,
  });

  export const LocationState = atom<any>({
    key: 'LocationState',
    default: [],
  });

  export const ImageState = atom<any>({
    key: 'ImageState',
    default: [],
  });

  export const AccrState = atom({
    key: 'AccrState',
    default: '',
  });
