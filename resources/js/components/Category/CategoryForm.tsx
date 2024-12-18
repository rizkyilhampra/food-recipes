import { Button, Form, TextField } from '@/components/ui';
import React from 'react';

interface CategoryFormProps {
  data: { name: string; description: string };
  setData: (key: string, value: string) => void;
  errors: Record<string, string | undefined>;
  processing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  data,
  setData,
  errors,
  processing,
  onSubmit
}) => {
  return (
    <Form onSubmit={onSubmit} className="space-y-6">
      <TextField
        id="name"
        label="Name"
        type="text"
        value={data.name}
        placeholder="Name of the category"
        className="mt-1"
        onChange={(v) => setData('name', v)}
        isRequired
        errorMessage={errors.name}
        autoFocus
        autoComplete="name"
      />
      <TextField
        id="description"
        type="text"
        label="Description"
        value={data.description}
        placeholder="Short description of the category"
        className="mt-1"
        onChange={(v) => setData('description', v)}
        isRequired
        errorMessage={errors.description}
        autoComplete="off"
      />

      <div className="flex items-center gap-4">
        <Button type="submit" isDisabled={processing}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CategoryForm;
