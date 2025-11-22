export interface AccountDetails {
  accountId:               string;
  balance:                 number;
  currentPage:             number;
  totalPages:              number;
  pageSize:                number;
  accountOperationDTOList: AccountOperationDTO[];
}

export interface AccountOperationDTO {
  id:            number;
  operationDate: Date;
  type:          string;
  amount:        number;
  description:   string;
}
