function PostReporter( request, reply ) {
  console.log(request);
  return reply({
    color: 'green',
    message: 'Request recived',
    notify: false,
    message_format: 'text',
  })
}

module.exports = PostReporter;
