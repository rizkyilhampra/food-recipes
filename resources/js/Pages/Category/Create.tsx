import { Header } from '@/components/Header';
import LinkBack from '@/components/LinkBack';
import { Button, Card, Container, Form, TextField } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { Head, useForm } from '@inertiajs/react';

const Create = () => {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    description: ''
  });

  const submit = (e: { preventDefault: () => void }) => {
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
              <Card.Description>Create a new category for your recipes.</Card.Description>
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

Create.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Create;
