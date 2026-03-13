import { memo, useCallback, useMemo } from 'react';
import { Dropdown } from 'antd';
import { DeleteIcon, EditIcon } from '../Icons';


export const PlayListActionsWrapper = memo((props) => {
  const { children, playlist } = props;

  // const dispatch = useAppDispatch();
  // const userId = useAppSelector((state) => state.auth.user.user_info.id);
  
  // const canEdit = useMemo(() => userId === playlist.created_by_id, [userId, playlist.created_by_id]);
  
  const handleUserValidation = useCallback(
    (button) => {
      if (!userId) {
        dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
        return false;
      }
      return true;
    },
    []
  );

  const items = useMemo(() => {
    const items = [];

    items.push(
        {
          label: 'Chỉnh sửa thông tin',
          key: 1,
          icon: <EditIcon />,
          onClick: () => {

          },
        },
        {
          label: 'Xóa danh sách phát',
          key: '2',
          icon: <DeleteIcon />,
          onClick: () => {

          },
        },
        {
          type: 'divider',
        }
      );
    return items;
  }, [  handleUserValidation,, playlist, props]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});
