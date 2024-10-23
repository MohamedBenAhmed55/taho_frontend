import React, { useEffect, useState } from 'react';
import { getReports, Report } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [reports, setReports] = useState<Report[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedReports = await getReports();
                setReports(fetchedReports);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Reports Dashboard</h1>
            {/* Add New Report button */}
            < Button
                onClick={() => navigate('/reports/new')}
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add New Report
            </Button>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                    <Card key={report.id} className="shadow-lg">
                        <CardHeader>
                            <CardTitle>{report.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{report.summary}</p>
                            <p className="mt-2 text-sm text-gray-600">Evaluation: {report.evaluation}</p>
                        </CardContent>
                        <CardFooter>
                            {/* Link to the Report Details page */}
                            <Button onClick={() => navigate(`/reports/${report.id}`)} variant="outline">
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
