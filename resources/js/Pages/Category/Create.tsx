import CategoryForm from '@/components/Category/CategoryForm';
import { Header } from '@/components/Header';
import LinkBack from '@/components/LinkBack';
import { Card, Container } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

const Create = () => {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    description: ''
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('categories.store'), {
      preserveScroll: true
    });
  };

  return (
    <>
      <Head title="Create Category" />
      <Header title="Create Category" />
      <Container>
        <LinkBack href={route('categories.index')} />
        <div className="max-w-3xl space-y-6">
          <Card>
            <Card.Header>
              <Card.Title>Create a new category</Card.Title>
              <Card.Description>Create a new category of your recipes.</Card.Description>
            </Card.Header>
            <Card.Content>
              <CategoryForm
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
