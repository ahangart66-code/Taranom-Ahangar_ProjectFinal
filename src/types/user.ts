export type PaymentInfo = {
  shaba_code?: string;
  debitCard_code?: string;
  accountIdentifier?: string;
};

export type UserProfile = {
  id: string | number;
  mobile: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  birthDate?: string;
  nationalCode?: string | number;
  payment?: PaymentInfo;
};

export type UpdateProfilePayload = {
  mobile: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  birthDate: string;
  nationalCode: string;
  payment: {
    shaba_code: string;
    debitCard_code: string;
    accountIdentifier: string;
  };
};

export type UpdateProfileResponse = {
  message: string;
  user?: UserProfile;
};

export type OrderPayload = {
  fullName: string;
  nationalCode: string;
  gender: 'male' | 'female';
  birthDate: string;
};
