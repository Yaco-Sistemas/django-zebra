/*global jQuery, Stripe */

(function($) {
  $(function() {
    $("#id_card_number").parents("form").submit(function() {
      $('.payment-errors').hide();
      if ($("#id_card_number").is(":visible")) {
        var form = this;
        var card = {
          number:   $("#id_card_number").val(),
          expMonth: $("#id_card_expiry_month").val(),
          expYear:  $("#id_card_expiry_year").val(),
          cvc:      $("#id_card_cvv").val()
        };

        Stripe.createToken(card, function(status, response) {
          if (status === 200) {
            $("#id_last_4_digits").val(response.card.last4);
            $("#id_stripe_token").val(response.id);
            form.submit();
            $("button[type=submit]").attr("disabled","disabled").html("Submitting...");
          } else {
            $("button[type=submit]").attr("disabled",false);
            var $el = $("#" + response.error.param);
            $el.find('.helptext').hide();
            $el.find('.payment-errors').show().text(response.error.message);
          }
        });

        return false;
      }

      return true;
    });
  });
})(jQuery);