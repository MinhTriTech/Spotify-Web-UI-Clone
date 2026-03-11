import { memo } from 'react';

import { GridItemList } from '../../../components/Lists/list';

const UsersSearchSection = memo((props) => {
  const { users } = props;

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={users}
        />
      </div>
    </div>
  );
});

export default UsersSearchSection;
