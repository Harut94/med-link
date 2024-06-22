// prod
export const BASE_URL = import.meta.env.BASE_API_URL || 'https://medlink.dev.ameriabank.am/';
//development
// export const BASE_URL = import.meta.env.BASE_API_URL || 'https://medlinktest.dev.ameriabank.am/';

export enum AppPaths {
  prescriptions = 'prescriptions',
  pharmacies = 'pharmacies',
  pharmacyOffers = 'pharmacyOffers',
  payment = 'payment',
  notFound = 'notFound',
}

export enum ApiUrls {
  api = 'api',
  prescription = 'prescription',
  getPrescriptions = 'getPrescriptions',
  medicament = 'medicament',
  generateOffers = 'generateOffers',
  request = 'request',
  book = 'book',
  getStatement = 'getStatement',
  downloadStatement = 'downloadStatement',
  common = 'common',
}

export enum Methods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  // DELETE = ' delete',
}

export const REQUIRED_MESSAGE = 'requiredField';
export const WRONG_FORMAT = 'wrongFormat';
