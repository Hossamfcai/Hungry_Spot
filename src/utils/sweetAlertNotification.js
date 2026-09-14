import Swal from "sweetalert2";

export const Notification = (headerMessage, meessage, icon) => {
  Swal.fire({
    title: headerMessage,
    text: meessage,
    icon: icon,
    timer: 2000, // Closes after 1 second (1000ms)
    timerProgressBar: true,
    showConfirmButton: false, // Hides the OK button
    background: "var(--color-surface-container)", // #1f1f22
    color: "var(--color-on-surface)", // #e4e1e6
    iconColor: "var(--color-primary)", // #ffb77d
    customClass: {
      popup: "custom-swal-popup",
      title: "custom-swal-title",
      htmlContainer: "custom-swal-text",
      timerProgressBar: "custom-swal-progress",
    },
  });
};
