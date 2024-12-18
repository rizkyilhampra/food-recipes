import CategoryForm from '@/components/Category/CategoryForm';
import { Header } from '@/components/Header';
import LinkBack from '@/components/LinkBack';
import { Card, Container } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { CategoryData } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const Edit = ({ category }: { category: CategoryData }) => {
  const { data, setData, put, errors, processing } = useForm({
    name: category.name,
    description: category.description
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('categories.update', category.id), {
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

Edit.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Edit;
