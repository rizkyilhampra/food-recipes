import { Header } from '@/components/Header';
import IngredientForm from '@/components/Ingredient/IngredientForm';
import LinkBack from '@/components/LinkBack';
import { Card, Container } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

const Create = () => {
  const { data, setData, post, errors, processing } = useForm({
    name: ''
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('ingredients.store'), {
      preserveScroll: true
    });
  };

  return (
    <>
      <Head title="Create Ingredient" />
      <Header title="Create Ingredient" />
      <Container>
        <LinkBack href={route('ingredients.index')} />
        <div className="max-w-3xl space-y-6">
          <Card>
            <Card.Header>
              <Card.Title>Create a new ingredient</Card.Title>
              <Card.Description>Create a new ingredient for your recipes.</Card.Description>
            </Card.Header>
            <Card.Content>
              <IngredientForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={submit}
              />
            </Card.Content>
          </Card>
        </div>
      </Container>
    </>
  );
};

Create.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Create;
