import { Header } from '@/components/Header';
import IngredientForm from '@/components/Ingredient/IngredientForm';
import LinkBack from '@/components/LinkBack';
import { Card, Container } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { IngredientData } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const Edit = ({ ingredient }: { ingredient: IngredientData }) => {
  const { data, setData, put, errors, processing } = useForm({
    name: ingredient.name
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('ingrediets.update', ingredient.id), {
      preserveScroll: true
    });
  };

  return (
    <>
      <Head title={`Edit ingredient: ${ingredient.name}`} />
      <Header title={`Edit ingredient: ${ingredient.name}`} />
      <Container>
        <LinkBack href={route('ingredients.index')} />
        <div className="max-w-3xl space-y-6">
          <Card>
            <Card.Header>
              <Card.Title>Edit ingredient</Card.Title>
              <Card.Description>Edit the details of the ingredient.</Card.Description>
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

Edit.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Edit;
