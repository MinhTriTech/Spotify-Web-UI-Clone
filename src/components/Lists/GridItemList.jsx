import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { TrackCard, ArtistCard } from './GridCards';

export function GridItemComponent(props) {
  const { item } = props;

  if (item._id && item.username) {
    return <ArtistCard item={item} />;
  }

  return <TrackCard item={item} />;
}

export function GridItemList(props) {
  const { items, title = 'Danh sách phát' } = props;
  
  return (
    <div>
      <Flex justify='space-between' align='center'>
        <div>
          {title ? (
              <Link style={{ textDecoration: 'underline' }}>
                <h1 className='playlist-header'>{title}</h1>
              </Link>
          ) : null}
        </div>
      </Flex>

      <div
        className='playlist-grid'
        style={
          props.multipleRows
            ? {
                gridTemplateRows: 'unset',
              }
            : undefined
        }
      >
        {(items || [])
          .filter(Boolean)
          .map((item, index) => {
            return (
              <div key={item._id} style={{ position: 'relative' }}>
                <GridItemComponent
                  item={item}
                />
              </div>
            );
          })} 
      </div>
    </div>
  );
}

export default GridItemList;