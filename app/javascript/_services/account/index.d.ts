export = AccountService;
declare class AccountService {
  static fetchCurrent(): Promise<AccountService.Account>;
}
declare namespace AccountService {
  export interface Account {
    user?: string;
    staff_id?: string;
    first_name?: string;
    last_name?: string;
    county_code?: string;
    county_cws_code?: string;
    county_name?: string;
    roles?: string[];
    privileges?: string[];
  }
}
