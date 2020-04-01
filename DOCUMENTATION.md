# How to run

## Frontend
Simply move the contents from the frontend directory to the root of your
HTTP/WWW directory.

## Backend
Steps:
=====
- Move backend directory to a destination in your HTTP directory. Configure however you wish it to be
accessible (ie. backend.todo-app.com)
- Update ``backend/config.example.php`` with DB information
- Update ``backend/config.example.php`` with location to backend api.php
- Rename ``backend/config.example.php`` to ``backend/config.php``
- Import todoList.sql to MySQL via ``mysql -u USERNAME -p DATABASE NAME < backend/todoList.sql`` (You will be prompted for your MySQL password)
