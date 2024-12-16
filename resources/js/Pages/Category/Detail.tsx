import { Header } from '@/components/Header';
import { Container } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { CategoryData } from '@/types';
import { Head } from '@inertiajs/react';

const Detail = ({ category }: { category: CategoryData }) => {
  return (
    <>
      <Head title={`Category: ${category.name}`} />
      <Header title={`Category: ${category.name}`} />

      <Container>
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p className="text-muted-fg">{category.description}</p>
          </div>
        </div>
      </Container>
    </>
  );
};

Detail.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Detail;
