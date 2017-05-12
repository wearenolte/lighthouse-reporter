# Lighthouse Report

> Create automatic performance reports using <a href="https://webpagetest.org">webpagetest</a> and <a href="https://github.com/GoogleChrome/lighthouse>Lighthouse</a>

This small app allows you to integreate a performance report with <a href="https://www.hipchat.com/">HipChat</a>, so you can keep track how well your site is doing on performance.

## Environment variables

- `BASE`: The base URL where the site is running.
- `HIPCHAT_KEY`: The `key` or `token` to access to `Hipchat API`
- `WEB_PAGE_TEST_KEY`: Your webpagetest `key`.

## Requirements

- Node 7.x

## Usage.

Asumming your site is running at: http://localhost:8080.

To generate a new report you need to create a request for: 

- `http://localhost:8080/report/?hipchat={hipchat_room_id_or_room_name}&site={url_of_the_site_to_analize}`

This will send a notification to `{hipchat_room_id_or_room_name}` when the report has started. And
once the report has finished is going to send a request to: 

- `http://localhost:8080/verification/{hipchat_room_id_or_room_name}/?id={test_id}`

Where `{hipchat_room_id_or_room_name}` is provided by the initial report and `{test_id}` is send by
`webpagetest` after the test has finished.

Based on the score is going to send a new notification to the HipChat Room with the details and
total score of the report.
