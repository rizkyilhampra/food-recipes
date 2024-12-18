import { Button, Form, TextField } from '@/components/ui';
import React from 'react';

interface FormProps {
  data: { name: string };
  setData: (key: string, value: string) => void;
  errors: Record<string, string | undefined>;
  processing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const IngredientForm: React.FC<FormProps> = ({ data, setData, errors, processing, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} className="space-y-6">
      <TextField
        id="name"
        label="Name"
        type="text"
        value={data.name}
        placeholder="Name of the ingredient"
        className="mt-1"
        onChange={(v) => setData('name', v)}
        isRequired
        errorMessage={errors.name}
        autoFocus
        autoComplete="name"
      />
      <div className="flex items-center gap-4">
        <Button type="submit" isDisabled={processing}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
