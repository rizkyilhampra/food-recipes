import { Header } from '@/components/Header';
import { buttonStyles, Card, Container, Link, Menu, Pagination, Table } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { IngredientData, PaginatedData } from '@/types';
import { cn } from '@/utils/classes';
import { Head, router, usePage } from '@inertiajs/react';
import { IconDotsHorizontal, IconLoader, IconPlus } from 'justd-icons';

const Index = () => {
  const { ingredients } = usePage<{ ingredients: PaginatedData<IngredientData> }>().props;

  console.log(ingredients);

  const deleteIngredient = (ingredient: IngredientData) => {
    if (!confirm('Are you sure you want to delete this ingredient?')) return;

    router.delete(route('ingredients.destroy', ingredient), {
      preserveScroll: true
    });
  };

  return (
    <>
      <Head title="Ingredient" />
      <Header title="List of Ingredients" />
      <Container className="">
        <div className="max-w-3xl space-y-6">
          <Link href={route('ingredients.create')} className={buttonStyles()}>
            <IconPlus />
            Create Ingredient
          </Link>
          <Card>
            <Table aria-label="Ingredients">
              <Table.Header>
                <Table.Column id="i" isRowHeader>
                  #
                </Table.Column>
                <Table.Column id="name" isRowHeader>
                  Name
                </Table.Column>
                <Table.Column id="updated_at" isRowHeader>
                  Updated at
                </Table.Column>
                <Table.Column />
              </Table.Header>
              <Table.Body
                items={ingredients.data}
                renderEmptyState={() => (
                  <div className="grid place-content-center p-10">
                    <IconLoader className="animate-spin" />
                  </div>
                )}
              >
                {ingredients.data.map((item, index) => (
                  <Table.Row key={item.id} id={item.id}>
                    <Table.Cell className="whitespace-nowrap">
                      {ingredients.meta.from + index}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">{item.name}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap">{item.updated_at}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-end">
                        <Menu>
                          <Menu.Trigger className="px-5 py-2">
                            <IconDotsHorizontal />
                          </Menu.Trigger>
                          <Menu.Content aria-label="Actions" showArrow placement="left">
                            <Menu.Item href={route('ingredients.show', item)}>View</Menu.Item>
                            <Menu.Item href={route('ingredients.edit', item)}>Edit</Menu.Item>
                            <Menu.Separator />
                            <Menu.Item isDanger onAction={() => deleteIngredient(item)}>
                              Delete
                            </Menu.Item>
                          </Menu.Content>
                        </Menu>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
          <Pagination
            className={cn('justify-center', ingredients.meta.last_page === 1 && 'invisible')}
          >
            <Pagination.List>
              <Pagination.Item variant="first" href={ingredients.links.first} />
              <Pagination.Item
                variant="previous"
                href={ingredients.links.prev ?? undefined}
                isDisabled={ingredients.meta.current_page === 1}
              />
              <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border">
                <Pagination.Item variant="label">{ingredients.meta.current_page}</Pagination.Item>
                <Pagination.Item variant="separator" />
                <Pagination.Item className="text-muted-fg" variant="label">
                  {ingredients.meta.last_page}
                </Pagination.Item>
              </Pagination.Section>
              <Pagination.Item
                variant="next"
                href={ingredients.links.next ?? undefined}
                isDisabled={ingredients.meta.current_page === ingredients.meta.last_page}
              />
              <Pagination.Item variant="last" href={ingredients.links.last} />
            </Pagination.List>
          </Pagination>
        </div>
      </Container>
    </>
  );
};

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index;
