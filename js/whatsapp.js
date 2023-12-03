$(document).ready(function() {
  // Update hidden field on any change in input and select elements
  $("#name, #nomorhp, #datetime, #select1, #message").on("change input", function() {
    var text = "Halo, saya ingin memesan meja untuk " + $("#select1").val() + " orang pada tanggal " + $("#datetime").val() + ". Nama saya " + $("#name").val() + " dan nomor telepon saya " + $("#nomorhp").val();
    if ($("#message").val()) {
      text += ". Pesan tambahan: " + $("#message").val();
    }
    $("#pre-filled-text").val("text=" + encodeURIComponent(text));
  });
});
