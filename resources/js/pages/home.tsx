import { AppLayout } from '@/layouts/app-layout';
import { UserData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Header } from 'components/header';
import { IconDotsVertical, IconLoader } from 'justd-icons';
import { useState } from 'react';
import { SortDescriptor } from 'react-aria-components';
import { Card, Container, Menu, Pagination, SearchField, Table } from 'ui';

interface Links {
  prev: string;
  next: string;
  first: string;
  last: string;
}

interface Meta {
  current_page: number;
  last_page: number;
  total: number;
}

interface UsersProps {
  data: UserData[];
  meta: Meta;
  links: Links;
}

type PageProps = {
  users: UsersProps;
  search: string;
  sort: string;
  order: 'ascending' | 'descending';
};

const Home = () => {
  const { users, search: initialSearch, sort, order } = usePage<PageProps>().props;
  const [search, setSearch] = useState(initialSearch);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: sort,
    direction: order
  });

  const updateRoute = (params: Record<string, string>) => {
    router.get(route('home'), params, { preserveState: true, replace: true });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateRoute({
      search: value,
      sort: String(sortDescriptor.column),
      order: sortDescriptor.direction
    });
  };

  const handleSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    updateRoute({ sort: String(descriptor.column), order: descriptor.direction, search });
  };

  return (
    <>
      <Head title="Welcome to Laravel" />
      <Header title="Inertia Typescript" />
      <Container>
        <SearchField
          name="name"
          type="text"
          placeholder="Search..."
          className="items-start mb-6"
          onChange={handleSearch}
          value={search}
        />
        <Card>
          <Table aria-label="Users" sortDescriptor={sortDescriptor} onSortChange={handleSortChange}>
            <Table.Header>
              <Table.Column id="name" isRowHeader allowsSorting>
                Name
              </Table.Column>
              <Table.Column id="email" isRowHeader>
                Email
              </Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body
              items={users.data}
              renderEmptyState={() => (
                <div className="grid place-content-center p-10">
                  <IconLoader className="animate-spin" />
                </div>
              )}
            >
              {(item) => (
                <Table.Row id={item.id}>
                  <Table.Cell className="whitespace-nowrap">{item.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{item.email}</Table.Cell>
                  <Table.Cell>
                    <div className="flex justify-end">
                      <Menu>
                        <Menu.Trigger>
                          <IconDotsVertical />
                        </Menu.Trigger>
                        <Menu.Content aria-label="Actions" showArrow placement="left">
                          <Menu.Item>View</Menu.Item>
                          <Menu.Item>Edit</Menu.Item>
                          <Menu.Separator />
                          <Menu.Item isDanger>Delete</Menu.Item>
                        </Menu.Content>
                      </Menu>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card>
        <Pagination className="mt-6">
          <Pagination.List>
            <Pagination.Item variant="first" href={users.links.first} />
            <Pagination.Item
              variant="previous"
              href={users.links.prev}
              isDisabled={users.meta.current_page === 1}
            />
            <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border">
              <Pagination.Item variant="label">{users.meta.current_page}</Pagination.Item>
              <Pagination.Item variant="separator" />
              <Pagination.Item className="text-muted-fg" variant="label">
                {users.meta.last_page}
              </Pagination.Item>
            </Pagination.Section>
            <Pagination.Item
              variant="next"
              href={users.links.next}
              isDisabled={users.meta.current_page === users.meta.last_page}
            />
            <Pagination.Item variant="last" href={users.links.last} />
          </Pagination.List>
        </Pagination>
      </Container>
    </>
  );
};

Home.layout = (page: any) => <AppLayout>{page}</AppLayout>;

export default Home;
