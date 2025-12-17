# New Note In Single Page App Diagram

```mermaid
sequenceDiagram

    participant browser
    participant server


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The new note is represented in JSON format <br> specified in the Content-Type header <br> of the request
    server-->>browser: HTTP Status Code: 201 created

```
