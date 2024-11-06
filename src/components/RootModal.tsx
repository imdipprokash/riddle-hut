import {ReactNode, useEffect} from 'react';
import RootSiblingsManager from 'react-native-root-siblings';

export const showModal = (renderModal: any) => {
  let rootNode: any;

  if (rootNode) {
    rootNode?.destroy();
    rootNode = null;
  }

  const onClose = () => {
    rootNode?.destroy();
    rootNode = null;
  };
  rootNode = new RootSiblingsManager(renderModal(onClose));
  return onClose;
};
