# General commentary from author (Katrine)

# General feedback

- I know that personal reasons seem like a cheat to do less of a good job on this test, however, I believe that the code that I am handing in is somewhat representative of my skills. I have a 5 week old baby, so I have tried to do the best within the time limit I set for myself. I decided to do several changes to the original script.js (now todoController.js) so that it does not use the backend. The reason for this is that it took a lot of time to set up mySQL on my mac and get the backend up and running. i believe that there would be few tweaks in the code that would make it compatible with the backend, and therefore I chose not to do it and focus on the rest of the code.

- The delete method should also update the orderID. If I had the time, I would run through the list every time a todo is deleted, and call changeOrder().

- When an item is checked, you can no longer change the orderID, I did not see any comment on this in the existing code, and therefore I left it as it is.

- As earlier mentioned, I used too much time trying to get the backend up and running and therefore decided not to use it, but one big change I would have liked to do is to better use the existing functions for the change-order task. I did a lazy version where I did not use the already written code to it’s full potential. This is something I would have liked to change.

- I know that the text wanted one (main) js-file, but I wanted TodoList and Todo to be in separate files. For simplicity, I could have just added these in the todoController, but I think it's more neat to have it separate. This is to make it explicit with the folder structure (to have these under the folder “Model”), also I did not want to add the classes to the script.js-file because it makes the code less readable. Also, it does not scale well.

- scss: I primarily use scss when I code, but I did not use any time on it on this test. I will have to install scss transpiler and I will probably do that through a webpack build step.

- The index.html renders the view, but I decided to keep it separate from the View-folder because the file is not explicit View.

# Developer test

Implementation of a simple To-Do list as a web application, using HTML5 on the frontend and any technology on the backend side. The application allows you to add, view and mark as done various tasks. For backend - write a simple API script in PHP, NodeJS or any other language.

## Functionality

The application displays a list of tasks to be performed. Tasks are divided into _done_ and _to be done_.

- Tasks _done_ are crossed out and are marked in color (`#9eb2c0`) and the check box on the left is marked.
- Tasks _to-do_ are marked with a color (`#2e3641`) and an unchecked check box on the left.
    - A field with the possibility of adding a new task is always displayed under the task list. The new task is always _to-do_.
- After adding a new task, it is added above the field for adding a new task. A field with the option of adding a new task is always at the very bottom of the list.
- You cannot add a task without entering the title (validation should be on the `frontend` and` backend` sides).
- Each task can be deleted by clicking on the trash can icon.
- You can change order of tasks by moving them with _drag & drop_.

## Frontend

Applications design:

![Application Layout](https://raw.githubusercontent.com/qunabu/junior-recruitment-task/master/assets/to-do-list.png)

- In `assets` folder is a `PSD` photoshop file with application design.
- Application should be written as `Single Page Application`, one HTML5 file with one main `CSS` file and one main `JavaScript` file.
- Communication between Frontend and Backend should be made in the background, without reloading the page, preferably using `AJAX`.
- Application style should be build with `CSS preprocessor`, preferably `SCSS`.
- Application logic should be divided with `Model-View-Controller` or `Model-View-Whatever` architecture.
- Please do not use any JS libraries, or use them with minimal ammount. We prefer `Vanilla JS`.
- Font that needs to be used is [Lato](https://www.google.com/fonts#UsePlace:use/Collection:Lato), by [Łukasz Dziedzic](http://www.lukaszdziedzic.eu/), in Normal and Bold versions. Please use this version - [Google Fonts](https://www.google.com/fonts#UsePlace:use/Collection:Lato).

## Backend [Optional]

- API should be written according to the REST specification. All queries and responses are sent in JSON format, if there is no error, the response code is 200, if there is an error of 400 and an array with errors.
- There will be no user service or authentication - each person has access to creating, reading, updating and deleting.
- You can use https://todo-backend-express.herokuapp.com if You wish to skip `Backend` development. List of endpoints can be found here: https://github.com/dtao/todo-backend-express/blob/master/server.js.

## Misc

- `Frontend` needs to be available in `to-do-list/frontend` for example `http://localhost/to-do-list/frontend`.
- `Backend` needs to be available in `to-do-list/backend` for example `http://localhost/to-do-list/backend` (You can use https://todo-simple-api.herokuapp.com/).
- The code should be **readable and described** by comments, JavaScript according to [documentationjs](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md), PHP according to [phpdoc](https://docs.phpdoc.org/3.0/guide/getting-started/your-first-set-of-documentation.html#your-first-set-of-documentation) and other languages according to the selected specification.
- We leave the application in the development version, we do not minify the files, we do not compress them, we do not combine them, etc.
- Please attach instructions on how to run the application.

## Good luck

### Copyrights

Graphic design is a rewritten version of [To Do List (PSD)](https://www.behance.net/gallery/10852567/To-Do-List-(PSD) by [Marijan Petrovski](https://www.behance.net/psdchat).

The task is distributed under a license [MIT](https://opensource.org/licenses/MIT).
