export type CompanyDetails = {
  Name: string;
  Address?: string;
  Email?: string;
  Logo?: string;
  Telephone?: string;
  Fax?: string;
  Website?: string;
  MedicalInformationFax?: string;
  MedicalInformationDirectLine?: string;
  MedicalInformationEmail?: string;
  CustomerCareDirectLine?: string;
  OutOfHoursTelephone?: string;
  OutOfHoursContact?: string;
  AdverseEventReportingEmail?: string;
  AdverseEventReportingTelephone?: string;
  StockAvailability?: string;
  DrugSafetyEmail?: string;
};

export type AllCompanyDetails = {
  companies: CompanyDetails[];
};


export const titleToPropertyMap: { [key: string]: keyof CompanyDetails } = {
  'address': 'Address',
  'telephone': 'Telephone',
  'fax': 'Fax',
  'e-mail': 'Email',
  'www': 'Website',
  'medical information direct line': 'MedicalInformationDirectLine',
  'medical information e-mail': 'MedicalInformationEmail',
  'out of hours telephone': 'OutOfHoursTelephone',
  'out of hours contact': 'OutOfHoursContact',
  'adverse event reporting email': 'AdverseEventReportingEmail',
  'adverse event reporting telephone': 'AdverseEventReportingTelephone',
  'stock availability': 'StockAvailability',
  'drug safety e-mail': 'DrugSafetyEmail',
  'customer care direct line': 'CustomerCareDirectLine',
  'medical information fax': 'MedicalInformationFax',
};