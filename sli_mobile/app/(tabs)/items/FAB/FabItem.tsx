import React from 'react';
import { FAB, Portal, useTheme } from 'react-native-paper';

interface FabPersoProps {
  showAddModal: () => void;
  showEmailModal: () => void;
  showEditItemModal: () => void;
  showAddItemModal: () => void;
}

const FabPerso: React.FC<FabPersoProps> = ({
  showAddModal,
  showEditItemModal,
  showAddItemModal
}) => {
  const [state, setState] = React.useState({ open: false });
  const theme = useTheme();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'account' : 'plus'}
        color={"white"}
        actions={[
          { icon: 'plus', onPress: showAddModal, color: theme.colors.primary },
          { icon: 'account-edit', label: 'Editer article', onPress: showEditItemModal, color: theme.colors.primary },
          { icon: 'account-plus', label: 'Ajouter article', onPress: showAddItemModal, color: theme.colors.primary },
        ]}
        onStateChange={onStateChange}
        fabStyle={{ backgroundColor: theme.colors.primary }}
      />
    </Portal>
  );
};

export default FabPerso;
