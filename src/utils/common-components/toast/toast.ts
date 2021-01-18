import { ToastContainer } from "react-toastr";

const timeout: number = 4000;

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
        timeOut: timeout,
      }
    );
}

export function ShowErrorToast(container: ToastContainer): void {
  container &&
    container.error("Error", {
      closeButton: true,
      tapToDismiss: true,
      timeOut: timeout,
    });
}

export function ShowSuccessUProfileToast(container: ToastContainer): void {
  console.log(container);

  container &&
    container.error("Profile has been updated successfully.", {
      closeButton: true,
      tapToDismiss: true,
      timeOut: timeout,
    });
}

export function ShowErrorUProfileToast(container: ToastContainer): void {
  container &&
    container.error("Error updating profile", {
      closeButton: true,
      tapToDismiss: true,
      timeOut: timeout,
    });
}
