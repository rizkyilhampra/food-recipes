import { Header } from '@/components/Header';
import LinkBack from '@/components/LinkBack';
import { Button, Card, Container, Form, TextField } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { CategoryData } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const Edit = ({ category }: { category: CategoryData }) => {
  const { data, setData, put, errors, processing } = useForm({
    name: category.name,
    description: category.description
  });

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    put(route('categories.update', category), {
      preserveScroll: true
    });
  };

  return (
    <>
      <Head title={`Edit Category: ${category.name}`} />
      <Header title={`Edit Category: ${category.name}`} />
      <Container>
        <LinkBack href={route('categories.index')} />
        <div className="max-w-3xl space-y-6">
          <Card>
            <Card.Header>
              <Card.Title>Edit Category</Card.Title>
              <Card.Description>Edit the details of the category.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Form onSubmit={submit} className="space-y-6">
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
                  autoComplete="email"
                />

                <div className="flex items-center gap-4">
                  <Button type="submit" isDisabled={processing}>
                    Save
                  </Button>
                </div>
              </Form>
            </Card.Content>
          </Card>
        </div>
      </Container>
    </>
  );
};

Edit.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Edit;
