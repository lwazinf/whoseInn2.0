import { atom } from "recoil"

export const ThisState = atom({
    key: 'ThisState',
    default: 'auth',
  })

  export const ServicesState = atom<any>({
    key: 'ServicesState',
    default: [],
  })

  export const NameState = atom({
    key: 'NameState',
    default: '',
  })

  export const CategoryState = atom({
    key: 'CategoryState',
    default: '',
  })

  export const LocationState = atom<any>({
    key: 'LocationState',
    default: {},
  })

  export const ImageState = atom<any>({
    key: 'ImageState',
    default: [],
  })

  export const DescState = atom({
    key: 'DescState',
    default: '',
  })

  export const NotifState = atom({
    key: 'NotifState',
    default: '',
  })

  export const CacheState = atom({
    key: 'CacheState',
    default: [],
  })

  export const FocusState = atom({
    key: 'FocusState',
    default: {},
  })

  export const FocusImageState = atom({
    key: 'FocusState',
    default: '',
  })

  export const MapState = atom({
    key: 'MapState',
    default: false,
  })

  export const OpenState = atom({
    key: 'OpenState',
    default: false,
  })

  export const IsSignInState = atom({
    key: 'IsSignInState',
    default: false,
  })

  export const HoverState = atom({
    key: 'HoverState',
    default: '',
  })

  export const DeleteState = atom({
    key: 'DeleteState',
    default: '',
  })
  