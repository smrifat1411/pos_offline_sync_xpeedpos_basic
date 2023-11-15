export interface Salary {
    _id?: number;
    employeeName?: string;
    salaryForThatMonth?: string;
    salaryAmount?: number;
    isOnline?: boolean;
}

export interface RxSalary {
    _data: Salary;
}