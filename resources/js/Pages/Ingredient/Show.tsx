import { Header } from '@/components/Header';
import { Container } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { IngredientData } from '@/types';
import { Head } from '@inertiajs/react';

const Show = ({ ingredient }: { ingredient: IngredientData }) => {
  return (
    <>
      <Head title={`Category: ${ingredient.name}`} />
      <Header title={`Category: ${ingredient.name}`} />

      <Container>
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{ingredient.name}</h1>
          </div>
        </div>
      </Container>
    </>
  );
};

Show.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Show;
