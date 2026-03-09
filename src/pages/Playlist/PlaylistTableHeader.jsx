import TableHeader, { TableHeaderComponents } from '../../components/SongsTable/header';

export const PlaylistTableHeader = () => {
  return (
    <TableHeader
      view={true}
      fields={[
        TableHeaderComponents.Index,
        TableHeaderComponents.Title,
        TableHeaderComponents.Artists,
        TableHeaderComponents.Space,
      ]}
    />
  );
};
