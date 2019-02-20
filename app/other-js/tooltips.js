//Enable Bootstrap tooltips
$(document).ready(function() {
  $("body").tooltip({
    selector: "[data-toggle='tooltip']",
    placement: "auto",
    trigger: "hover",
    delay: {
      show: 1000,
      hide: 0
    }
  });
});