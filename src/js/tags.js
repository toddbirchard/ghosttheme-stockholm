$(document).ready(function() {
  var tags = {
    nodejs: '<i class="fab fa-node-js"></i>',
    aws: '<i class="fab fa-aws"></i>',
    python: '<i class="fab fa-python"></i>',
    django: '<i class="fab fa-python"></i>',
    nosql: '<i class="fab fa-envira"></i>',
    apis: '<i class="fab fa-hubspot"></i>',
    frontend: '<i class="far fa-code"></i>',
    data: '<i class="fas fa-chart-pie"></i>',
    mysql: '<i class="fas fa-database"></i>',
    javascript: '<i class="fab fa-js-square"></i>',
    roundup: '<i class="fas fa-undo-alt"></i>',
    excel: '<i class="fal fa-table"></i>',
    devops: '<i class="fas fa-server"></i>',
    pandas: '<i class="fas fa-database"></i>',
    datascience: '<i class="fas fa-flask"></i>',
    tableau: '<i class="far fa-asterisk"></i>',
    googlecloud: '<i class="fab fa-google"></i>',
    sql: '<i class="fas fa-database"></i>',
    statistics: '<i class="far fa-chart-bar"></i>',
    flask: '<i class="fab fa-affiliatetheme"></i>'
  };

  for (var key in tags) {
    $('.' + key).find('i').replaceWith( tags[key] );
  }
});
