import { Header } from '@/components/Header';
import { buttonStyles, Card, Container, Link, Menu, Pagination, Table } from '@/components/ui';
import { AppLayout } from '@/Layouts';
import { CategoryData, PaginatedData } from '@/types';
import { cn } from '@/utils/classes';
import { Head, router, usePage } from '@inertiajs/react';
import { IconDotsHorizontal, IconLoader, IconPlus } from 'justd-icons';

const Index = () => {
  const { categories } = usePage<{ categories: PaginatedData<CategoryData> }>().props;

  const deleteCategory = (category: CategoryData) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    router.delete(route('categories.destroy', category), {
      preserveScroll: true
    });
  };

  return (
    <>
      <Head title="Category" />
      <Header title="List of Categories" />
      <Container className="">
        <div className="max-w-3xl space-y-6">
          <Link href={route('categories.create')} className={buttonStyles()}>
            <IconPlus />
            Create Category
          </Link>
          <Card>
            <Table aria-label="Categories">
              <Table.Header>
                <Table.Column id="name" isRowHeader>
                  Name
                </Table.Column>
                <Table.Column id="email" isRowHeader>
                  Description
                </Table.Column>
                <Table.Column />
              </Table.Header>
              <Table.Body
                items={categories.data}
                renderEmptyState={() => (
                  <div className="grid place-content-center p-10">
                    <IconLoader className="animate-spin" />
                  </div>
                )}
              >
                {(item) => (
                  <Table.Row id={item.id}>
                    <Table.Cell className="whitespace-nowrap">{item.name}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap">{item.description}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-end">
                        <Menu>
                          <Menu.Trigger className="px-5 py-2">
                            <IconDotsHorizontal />
                          </Menu.Trigger>
                          <Menu.Content aria-label="Actions" showArrow placement="left">
                            <Menu.Item href={route('categories.show', item)}>View</Menu.Item>
                            <Menu.Item href={route('categories.edit', item)}>Edit</Menu.Item>
                            <Menu.Separator />
                            <Menu.Item isDanger onAction={() => deleteCategory(item)}>
                              Delete
                            </Menu.Item>
                          </Menu.Content>
                        </Menu>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Card>
          <Pagination
            className={cn(
              'justify-center',
              categories.meta.last_page === categories.meta.current_page && 'invisible'
            )}
          >
            <Pagination.List>
              <Pagination.Item variant="first" href={categories.links.first} />
              <Pagination.Item
                variant="previous"
                href={categories.links.prev ?? undefined}
                isDisabled={categories.meta.current_page === 1}
              />
              <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border">
                <Pagination.Item variant="label">{categories.meta.current_page}</Pagination.Item>
                <Pagination.Item variant="separator" />
                <Pagination.Item className="text-muted-fg" variant="label">
                  {categories.meta.last_page}
                </Pagination.Item>
              </Pagination.Section>
              <Pagination.Item
                variant="next"
                href={categories.links.next ?? undefined}
                isDisabled={categories.meta.current_page === categories.meta.last_page}
              />
              <Pagination.Item variant="last" href={categories.links.last} />
            </Pagination.List>
          </Pagination>
        </div>
      </Container>
    </>
  );
};

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index;
