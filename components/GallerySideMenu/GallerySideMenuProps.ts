import IDocument from '../../models/Document';

export default interface GallerySideMenuProps {
  show: boolean;
  editButtonOnPressHandler: () => void;
  reloadButtonOnPressHandler: () => void;
  shareButtonOnPressHandler: () => void;
  deleteButtonOnPressHandler: () => void;
}
