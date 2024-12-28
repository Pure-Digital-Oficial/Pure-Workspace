export interface FormCreateUserProps {
  buttonTitle?: string;
  nameLabel?: string;
  nicknameLabel?: string;
  birthDateLabel?: string;
  onData?: (stepPosition: number) => void;
  showAlert?: (message: string, success: boolean) => void;
}
