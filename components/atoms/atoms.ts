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
    default: '',
  });

  export const StudentsState = atom({
    key: 'StudentsState',
    default: '',
  });

  export const LocationState = atom({
    key: 'LocationState',
    default: '',
  });

  export const ImageState = atom({
    key: 'ImageState',
    default: '',
  });

  export const AccrState = atom({
    key: 'AccrState',
    default: '',
  });
