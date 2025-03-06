import { Modal, Box, Typography } from "@mui/material";
import SecondaryButton from "../../components/buttons/SecondayButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { FormattedMessage } from "react-intl";

interface DeleteModalProps {
  open: boolean;
  onClose: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
  isDark: boolean;
  formattedTitle: React.ReactNode;
}

const DeleteModal = ({ open, onClose, onConfirm, isDark, formattedTitle }: DeleteModalProps) => (
  <Modal open={open} onClose={onClose}>
    <Box
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
      sx={{
        backgroundColor: isDark ? "#16181c" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      <Typography variant="h6" className="!mb-4">
        <FormattedMessage id="post.deleteConfirmation" />
      </Typography>
      <Typography className="!mb-4">{formattedTitle}</Typography>
      <div className="flex justify-end gap-4">
        <SecondaryButton onClick={onClose}>
          <FormattedMessage id="post.cancel" />
        </SecondaryButton>
        <PrimaryButton
          onClick={onConfirm}
          sx={{
            backgroundColor: "#ff0000",
            "&:hover": {
              backgroundColor: "#ff0000",
            },
          }}
        >
          <FormattedMessage id="post.delete" />
        </PrimaryButton>
      </div>
    </Box>
  </Modal>
);

export default DeleteModal;
