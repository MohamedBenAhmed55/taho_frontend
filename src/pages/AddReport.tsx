import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createReport, Report } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';

type ReportFormData = Omit<Report, 'id' | 'createdAt'>;

function AddReport() {
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormData>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(createReport, {
    onSuccess: () => {
      queryClient.invalidateQueries('reports');
      navigate('/');
    },
  });

  const onSubmit = (data: ReportFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Report</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create a new report</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Form fields for title, summary, content, and evaluation */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Title</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full p-2 border rounded"
                placeholder="Report title"
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Summary</label>
              <textarea
                {...register('summary', { required: 'Summary is required' })}
                className="w-full p-2 border rounded"
                placeholder="Summary of the report"
              />
              {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Content</label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                className="w-full p-2 border rounded"
                placeholder="Full report content"
              />
              {errors.content && <p className="text-red-500">{errors.content.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Evaluation</label>
              <select
                {...register('evaluation', { required: 'Evaluation is required' })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select evaluation</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
                <option value="Needs Review">Needs Review</option>
              </select>
              {errors.evaluation && <p className="text-red-500">{errors.evaluation.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default AddReport;
