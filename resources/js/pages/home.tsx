import { AppLayout } from '@/layouts/app-layout';
import { UserData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Header } from 'components/header';
import { IconDotsVertical, IconLoader } from 'justd-icons';
import { useState } from 'react';
import { Card, Container, Menu, Pagination, SearchField, Table } from 'ui';

interface Links {
  prev: string;
  next: string;
  first: string;
  last: string;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<object>;
  path: string;
  per_page: number;
  to: number;
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
};

export default function Home() {
  const { data: users, meta, links } = usePage<PageProps>().props.users;
  const [search, setSearch] = useState(usePage<PageProps>().props.search || '');

  const handleSearch = (value: string) => {
    setSearch(value);
    router.get(
      route('home'),
      { search: value },
      {
        preserveState: true,
        replace: true
      }
    );
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
          <Table aria-label="Movies">
            <Table.Header>
              <Table.Column id="name" isRowHeader>
                Name
              </Table.Column>
              <Table.Column id="email" isRowHeader>
                Email
              </Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body
              items={users}
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
            <Pagination.Item variant="first" href={links.first} />
            <Pagination.Item
              variant="previous"
              href={links.prev}
              isDisabled={meta.current_page === 1}
            />
            <Pagination.Section aria-label="Pagination Segment" className="rounded-lg border">
              <Pagination.Item variant="label">{meta.current_page}</Pagination.Item>
              <Pagination.Item variant="separator" />
              <Pagination.Item className="text-muted-fg" variant="label">
                {meta.last_page}
              </Pagination.Item>
            </Pagination.Section>
            <Pagination.Item
              variant="next"
              href={links.next}
              isDisabled={meta.current_page === meta.last_page}
            />
            <Pagination.Item variant="last" href={links.last} />
          </Pagination.List>
        </Pagination>
      </Container>
    </>
  );
}

Home.layout = (page: any) => <AppLayout children={page} />;
