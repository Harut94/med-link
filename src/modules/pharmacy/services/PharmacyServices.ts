import { request } from '../../../services/RequestService.ts';
import { ApiUrls, Methods } from '../../../constants/constants.ts';
import {
  type IBook,
  type IBookResponse,
  type IOffer,
  type IPharmacies,
  type IPrescription,
  type IStatement,
} from '../data/packagesTypes.ts';
import { type DictionaryTypes } from '../data/dictionaryEnum.ts';
import { type IDictionary } from '../data/dictionaryTypes.ts';

export const getPrescriptionsService = (token: string): Promise<{ data: IPrescription[] }> =>
  request(Methods.GET, `/${ApiUrls.api}/${ApiUrls.prescription}/${ApiUrls.getPrescriptions}?code=${token}`);

export const getPharmaciesService = (offer: IOffer[]): Promise<{ data: IPharmacies[] }> =>
  request(Methods.POST, `/${ApiUrls.api}/${ApiUrls.medicament}/${ApiUrls.generateOffers}`, { data: offer });

export const bookService = (data: IBook): Promise<{ data: IBookResponse }> =>
  request(Methods.POST, `/${ApiUrls.api}/${ApiUrls.request}/${ApiUrls.book}`, { data });

export const getStatementService = (requestId: string): Promise<{ data: IStatement }> =>
  request(Methods.GET, `/${ApiUrls.api}/${ApiUrls.request}/${ApiUrls.getStatement}?requestId=${requestId}`);

export const downloadStatementFileService = (
  requestId: number,
): Promise<{ data: Blob; headers?: Record<string, string> }> =>
  request(Methods.GET, `/${ApiUrls.api}/${ApiUrls.request}/${ApiUrls.downloadStatement}?requestId=${requestId}`, {
    responseType: 'blob',
  });

export const getDictionaryService = (
  language: number,
  dictionaryType: DictionaryTypes,
): Promise<{ data: IDictionary[] }> =>
  request(Methods.GET, `/${ApiUrls.api}/${ApiUrls.common}/${`get${dictionaryType}`}?language=${language}`);
