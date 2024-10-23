import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', 
});

export class Report {
    constructor(
        public id: number | null,  
        public title: string,
        public summary: string,
        public content: string,
        public evaluation: string,
        public createdAt: Date | null  
    ) {}
}

// Function to get a list of all reports
export const getReports = async (): Promise<Report[]> => {
    const response = await api.get<Report[]>('/reports');
    return response.data;
};

// Function to get a report by its ID
export const getReportById = async (id: number): Promise<Report> => {
    const response = await api.get<Report>(`/reports/${id}`);
    return response.data;
};

// Function to create a new report (POST request)
export const createReport = async (report: Omit<Report, 'id' | 'createdAt'>): Promise<Report> => {
    const response = await api.post<Report>('/reports', report);
    return response.data;
};
