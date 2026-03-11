import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { TrackCard } from './GridCards';

export function GridItemComponent(props) {
  
  const { item, onClick } = props;
  
  if (item._id) {
    return <TrackCard item={item} onClick={onClick} />;
  }
  
  return null;
}

export function GridItemList(props) {
  const { onItemClick } = props;
  const { items, title } = props;
  
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
          .filter((i) => i)
          .map((item) => {
            return (
              <div key={item._id}>
                <GridItemComponent
                  item={item}
                  onClick={onItemClick ? () => onItemClick(item) : undefined}
                />
              </div>
            );
          })} 
      </div>
    </div>
  );
}
