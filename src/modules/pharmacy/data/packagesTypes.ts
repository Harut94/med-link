import { type PharmacyFields } from './pharmacyEnums.ts';

export interface IPrescription {
  [PharmacyFields.documentId]: string;
  [PharmacyFields.strength]: number;
  [PharmacyFields.name]: string;
  [PharmacyFields.description]: string;
  [PharmacyFields.quantity]: number;
  [PharmacyFields.mainIngredient]: string;
  [PharmacyFields.type]: string;
  [PharmacyFields.validationDate]: string;
  [PharmacyFields.validFrom]: string;
  [PharmacyFields.dosageForm]: string;
  [PharmacyFields.brands]: string[];
}

export interface IPharmacies {
  [PharmacyFields.label]: string;
  [PharmacyFields.latitude]: number;
  [PharmacyFields.longitude]: number;
  [PharmacyFields.branch]: {
    [PharmacyFields.address]: string;
    [PharmacyFields.code]: string;
    [PharmacyFields.latitude]: string;
    [PharmacyFields.longitude]: number;
    [PharmacyFields.longitude]: number;
    [PharmacyFields.name]: string;
    [PharmacyFields.pharmacy]: string;
    [PharmacyFields.pharmacyId]: number;
    [PharmacyFields.workingHours]: string;
  };
  [PharmacyFields.medicaments]: IMedicament[];
}

export interface IMedicament {
  [PharmacyFields.code]: string;
  [PharmacyFields.description]: {
    [PharmacyFields.arm]: string;
    [PharmacyFields.eng]: string;
    [PharmacyFields.rus]: string;
  };
  [PharmacyFields.documentId]: number;
  [PharmacyFields.name]: {
    [PharmacyFields.arm]: string;
    [PharmacyFields.eng]: string;
    [PharmacyFields.rus]: string;
  };
  [PharmacyFields.price]: number;
  [PharmacyFields.producer]: {
    [PharmacyFields.arm]: string;
    [PharmacyFields.eng]: string;
    [PharmacyFields.rus]: string;
  };
}

export interface IOffer {
  [PharmacyFields.documentId]: string;
  [PharmacyFields.quantity]: number;
  [PharmacyFields.brands]: string[];
}

export interface IBookResponse {
  [PharmacyFields.success]: boolean;
  [PharmacyFields.message]: string;
  [PharmacyFields.bookingPaymentUrl]: string;
}

export interface IBook {
  [PharmacyFields.pharmacyId]: number;
  [PharmacyFields.branchCode]: string;
  [PharmacyFields.address]: string;
  [PharmacyFields.medicaments]: {
    [PharmacyFields.name]: string;
    [PharmacyFields.description]: string;
    [PharmacyFields.price]: number;
    [PharmacyFields.quantity]: number;
    [PharmacyFields.documentId]: number;
  }[];
}

export interface IStatement {
  [PharmacyFields.medicaments]: { [PharmacyFields.name]: string; [PharmacyFields.description]: string }[];
  [PharmacyFields.paymentDetails]: {
    [PharmacyFields.status]: number;
    [PharmacyFields.address]: string;
    [PharmacyFields.pharmacy]: string;
    [PharmacyFields.price]: number;
    [PharmacyFields.date]: string;
    [PharmacyFields.requestId]: number;
    [PharmacyFields.approvalCode]: string;
  };
}

export interface IPharmacy {
  [PharmacyFields.arm]: string;
  [PharmacyFields.eng]: string;
  [PharmacyFields.rus]: string;
}
