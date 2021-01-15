import { ToastContainer } from "react-toastr";

export function ShowSuccessToast(
  fav: boolean,
  container: ToastContainer
): void {
  container &&
    container.success(
      `This profile ${
        fav ? "removed from favorite" : "added to favorite"
      }  list successfully.`,
      "Success",
      {
        closeButton: true,
        tapToDismiss: true,
        timeOut: 4000,
      }
    );
}

export function ShowErrorToast(container: ToastContainer): void {
  container &&
    container.error("Error", {
      closeButton: true,
      tapToDismiss: true,
      timeOut: 4000,
    });
}
