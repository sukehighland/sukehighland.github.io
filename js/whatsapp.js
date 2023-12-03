$(document).ready(function() {
  $("#add_message").change(function() {
    if (this.checked) {
      $("#message_field").removeClass("d-none");
    } else {
      $("#message_field").addClass("d-none");
    }
  });
});
