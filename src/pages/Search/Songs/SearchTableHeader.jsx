import TableHeader, { TableHeaderComponents } from '../../../components/SongsTable/header';

export const SearchTableHeader = () => {
  return (
    <TableHeader
      fields={[
        TableHeaderComponents.Index,
        TableHeaderComponents.Title,
        TableHeaderComponents.Artists,
        TableHeaderComponents.Space,
      ]}
    />
  );
};
