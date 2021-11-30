import IDocument from '../../models/Document';

export default interface GallerySideMenuProps {
  show: boolean;
  editButtonOnPressHandler: () => void;
  shareButtonOnPressHandler: () => void;
  deleteButtonOnPressHandler: () => void;
}
