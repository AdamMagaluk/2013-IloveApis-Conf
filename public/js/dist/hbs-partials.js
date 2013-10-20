this["Templates"] = this["Templates"] || {};

this["Templates"]["tweet"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"root standalone-tweet ltr twitter-tweet not-touch\" dir=\"ltr\" data-dt-months=\"Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec\" data-dt-full=\"%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}\" data-dt-am=\"AM\" data-dt-pm=\"PM\" id=\"twitter-widget-1\" lang=\"en\" data-twitter-event-id=\"0\">\n  <blockquote class=\"tweet subject expanded h-entry\">\n    <div class=\"header h-card p-author\">\n    <a class=\"u-url profile\" href=\"https://twitter.com/"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.screen_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" aria-label=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " (screen name: "
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.screen_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\">\n      <img class=\"u-photo avatar\" alt=\"\" src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.profile_image_url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <span class=\"full-name\">\n      <span class=\"p-name customisable-highlight\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </span>\n    <span class=\"p-nickname\" dir=\"ltr\">@<b>"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.screen_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></span>\n    </a>\n    </div>\n    <div class=\"content e-entry-content\">\n      <p class=\"e-entry-title\">";
  if (stack2 = helpers.text) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.text; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</p>\n      <div class=\"dateline\">\n        <time pubdate=\"\" class=\"dt-updated\" title=\"";
  if (stack2 = helpers.date) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.date; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">";
  if (stack2 = helpers.date) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.date; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</time>\n      </div>\n    </div>\n  </blockquote>\n</div>";
  return buffer;
  });