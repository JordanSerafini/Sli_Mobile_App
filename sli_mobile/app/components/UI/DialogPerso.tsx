import * as React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';

interface DialogPersoProps {
    visible: boolean;
    hideDialog: () => void;
    }

const DialogPerso = ({ visible, hideDialog }: DialogPersoProps) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={hideDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogPerso;
