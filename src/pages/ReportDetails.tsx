import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getReportById } from '../services/api'; // API call for individual report
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

function ReportDetails() {
  const { id } = useParams<{ id: string }>(); // Fetch the report id from URL
  const { data: report, isLoading, error } = useQuery(['report', id], () => getReportById(Number(id)));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching report details.</p>;

  return (
    <div className="p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{report?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{report?.content}</p> {/* Show full report content */}
          <p className="mt-4 text-sm">Evaluation: {report?.evaluation}</p>
          {/* Generated topics from ChatGPT */}
          <h3 className="mt-4 font-semibold">Re-evaluation Topics</h3>
          
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportDetails;
