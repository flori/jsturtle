# JSTurtle - Turtle Graphics System

Welcome to **JSTurtle**, an interactive drawing system inspired by the Logo
programming language. This repository offers a JavaScript implementation of
turtle graphics, enabling users to create intricate geometric patterns,
fractals, and artistic designs through simple yet powerful commands.

With **JSTurtle**, you can control a "turtle" that draws on a canvas as it
moves across the screen. The turtle responds to a variety of commands:

- Move forward or backward (`forward()` / `back()`)
- Turn left or right (`left()` / `right()`)
- Change pen color (`setPenColor()`) and adjust pen size (`setPenSize()`)
- Create filled shapes using `fillBegin()`, `fillEnd()`, or `fill()`
- Reset the turtle's position to the center with `home()`
- Control the visibility of the turtle cursor (show/hide)
- Clear the canvas entirely with `clearScreen()`

Additionally, **JSTurtle** supports creating complex patterns through loops
(`repeat()`), conditional commands, and even infinite execution (`forever()`).
This makes it ideal for generating intricate designs like fractals, geometric
shapes, and artistic patterns.

### Running Demo Patterns

1. **Live Demo**: Try out JSTurtle live at [https://flori.github.io/jsturtle](https://flori.github.io/jsturtle).
   It's a hands-on way to explore and create your own designs right in your browser!

2. **Using the Dropdown Menu**:
   - Select a pattern from the menu (e.g., Koch snowflake).
   - Adjust the depth parameter for complexity.
   - The drawing will begin automatically upon selection.

3. **Interactive Commands**:
   - Open the browser's developer console using one of these keyboard shortcuts:
     - **Chrome**: `Ctrl + Shift + I` or `Cmd + Option + I`
     - **Firefox**: `Ctrl + Shift + C` or `Cmd + Option + C`
     - **Safari**: `Shift + Command + C`
   - Enter commands like `forward(50); right(90);` to control the turtle interactively.
   - Call `allCommands()` to list available commands.
   - For instance, you can create an orange triangle with just a few lines:
     ```javascript
     // Clear the canvas and reset the turtle's state
     clearScreen();

     // Set pen color to red
     setPenColor('orange');

     // Draw an orange triangle
     forward(100); // Move forward by 100 units
     right(120);   // Turn right by 120 degrees
     forward(100); // Move forward again
     right(120);   // Turn right another 120 degrees
     forward(100); // Complete the triangle

     // Reset the turtle's position and heading
     home();
     ```
     Explore, experiment, and have fun creating your own unique patterns!

## Feature Overview

### Setting Up Turtle Graphics

To initialize JSTurtle, ensure your HTML file includes the necessary script:

```html
<script type="text/javascript" src="turtle.js"></script>
```

Then follow these steps:

1. **Include Required Files**:
   - Make sure `turtle.js` is correctly referenced in your HTML.

2. **Initialize the Turtle Graphics System**:
   ```javascript
   var t = new TurtleGraphics({
     screenId:   'screen', // ID of the div element that should contain the screen canvas.
     width:      800,     // Canvas width in pixels
     height:     600,     // Canvas height in pixels
     turtleSize: 16        // Size of the turtle cursor
   });
   t.injectCommands(self); // Makes commands available globally
   ```

3. **Interact with Commands**:
   - Open your browser's developer console.
   - Enter commands like `forward(50); right(90);` directly into the console to control the turtle.

### Core Functionality

1. `allCommands()`
- **Description**: Lists all available commands.
- **Arguments**: None
- **Example**: `allCommands();`

2. `arc(radius, angle)`
- **Description**: Draws an arc with the specified radius and degree measurement.
- **Arguments**:
  - `radius` (number): The radius of the arc.
  - `angle` (number): The angle of the arc in degrees.
- **Example**: `arc(50, 90);` draws a quarter-circle.

3. `back(distance)` or `bk(distance)`
- **Description**: Moves the turtle backward by the specified distance.
- **Arguments**:
  - `distance` (number): The distance to move backward.
- **Example**: `bk(50);` moves the turtle back 50 units.

4. `centrePos()`
- **Description**: Sets the turtle's position to the center of the canvas.
- **Arguments**: None
- **Example**: `centrePos();`

5. `clean()`
- **Description**: Clears the drawing and resets the turtle's state.
- **Arguments**: None
- **Example**: `clean();`

6. `clearScreen()`
- **Description**: Clears the canvas.
- **Arguments**: None
- **Example**: `clearScreen();`

7. `distance(pos1, pos2)`
- **Description**: Calculates the distance between two points.
- **Arguments**:
  - `pos1` (array): The first point's coordinates [x, y].
  - `pos2` (array): The second point's coordinates [x, y].
- **Example**: `distance([0, 0], [50, 50]);`

8. `forward(distance)` or `fd(distance)`
- **Description**: Moves the turtle forward by the specified distance.
- **Arguments**:
  - `distance` (number): The distance to move forward.
- **Example**: `fd(100);` moves the turtle forward 100 units.

9. `fill(function())`
- **Description**: Creates a filled shape by defining a path within the provided function.
- **Arguments**:
  - `function()` (function): A function containing drawing commands to define the shape's path.
- **Example**: 
```javascript
fill(function() {
  forward(50);
  right(90);
  forward(50);
  right(90);
});
```

10. `fillBegin()`
- **Description**: Begins filling a shape.
- **Arguments**: None
- **Example**: `fillBegin();`

11. `fillEnd()`
- **Description**: Ends filling a shape.
- **Arguments**: None
- **Example**: `fillEnd();`

12. `forever(function())`
- **Description**: Repeats a block of commands indefinitely.
- **Arguments**:
  - `function()` (function): The function containing the commands to repeat.
- **Example**: 
```javascript
forever(function() {
  forward(50);
  right(90);
});
```

13. `heading()`
- **Description**: Returns the turtle's current heading in degrees.
- **Arguments**: None
- **Example**: `console.log(heading());` logs the current heading.

14. `hideTurtle()` or `ht()`
- **Description**: Hides the turtle from view.
- **Arguments**: None
- **Example**: `hideTurtle();`

15. `home()`
- **Description**: Resets the turtle to its initial position and heading.
- **Arguments**: None
- **Example**: `home();`

16. `isPenDown()`
- **Description**: Checks if the pen is currently down (drawing).
- **Arguments**: None
- **Example**: `console.log(isPenDown());` logs whether the pen is down.

17. `isPenUp()`
- **Description**: Checks if the pen is currently up (not drawing).
- **Arguments**: None
- **Example**: `console.log(isPenUp());` logs whether the pen is up.

18. `left(degrees)` or `lt(degrees)`
- **Description**: Turns the turtle left by the specified number of degrees.
- **Arguments**:
  - `degrees` (number): The angle to turn left.
- **Example**: `left(90);` turns the turtle 90 degrees to the left.

19. `maxPos()`
- **Description**: Sets the maximum position for the turtle, preventing it from drawing outside the canvas.
- **Arguments**: None
- **Example**: `maxPos();`

20. `originPos()`
- **Description**: Sets the turtle's position to the origin (0, 0).
- **Arguments**: None
- **Example**: `originPos();`

21. `penColor(color)` or `pc(color)`
- **Description**: Changes the pen color.
- **Arguments**:
  - `color` (string or array): The new pen color (e.g., '#ff0000' for red, or [255, 0, 0]).
- **Example**: `penColor('red');`

22. `penDown()` or `pd()`
- **Description**: Starts drawing.
- **Arguments**: None
- **Example**: `penDown();`

23. `penUp()` or `pu()`
- **Description**: Stops drawing and lifts the pen.
- **Arguments**: None
- **Example**: `penUp();`

24. `random(max, min)`
- **Description**: Generates a random number within the specified range.
- **Arguments**:
  - `max` (number): The maximum value (optional).
  - `min` (number): The minimum value (optional).
- **Example**: `random(100);` generates a number between 0 and 100.

25. `repeat(times, function())`
- **Description**: Executes a block of commands a specified number of times.
- **Arguments**:
  - `times` (number): The number of times to repeat the commands.
  - `function()` (function): The function containing the commands to repeat.
- **Example**: 
```javascript
repeat(3, function() {
  forward(50);
  right(120);
});
```

26. `right(degrees)` or `rt(degrees)`
- **Description**: Turns the turtle right by the specified number of degrees.
- **Arguments**:
  - `degrees` (number): The angle to turn right.
- **Example**: `right(90);` turns the turtle 90 degrees to the right.

27. `setBG(color)` or `setBackground(color)`
- **Description**: Changes the background color of the canvas.
- **Arguments**:
  - `color` (string or array): The new background color (e.g., '#ff0000' for red, or [255, 0, 0]).
- **Example**: `setBG('blue');`

28. `setH(degrees)` or `setHeading(degrees)`
- **Description**: Sets the turtle's heading to the specified number of degrees.
- **Arguments**:
  - `degrees` (number): The new heading in degrees.
- **Example**: `setHeading(0);` sets the turtle facing east.

29. `setLineCap(style)`
- **Description**: Sets the line cap style for drawing lines.
- **Arguments**:
  - `style` (string): The line cap style ('round', 'square', or 'butt').
- **Example**: `setLineCap('round');`

30. `setPenColor(color)` or `setPC(color)`
- **Description**: Changes the pen color.
- **Arguments**:
  - `color` (string or array): The new pen color (e.g., '#ff0000' for red, or [255, 0, 0]).
- **Example**: `setPenColor('green');`

31. `setPenSize(size)`
- **Description**: Adjusts the thickness of the drawn lines.
- **Arguments**:
  - `size` (number): The new pen size in pixels.
- **Example**: `setPenSize(5);` sets the pen width to 5 pixels.

32. `setPos(position)`
- **Description**: Sets the turtle's position to the specified coordinates.
- **Arguments**:
  - `position` (array): The new coordinates [x, y].
- **Example**: `setPos([100, 100]);` moves the turtle to (100, 100).

33. `showTurtle()` or `st()`
- **Description**: Makes the turtle visible on the screen.
- **Arguments**: None
- **Example**: `showTurtle();`

34. `state()`
- **Description**: Returns the current state of the turtle (position, heading, etc.).
- **Arguments**: None
- **Example**: `console.log(state());` logs the current state.

35. `towards(position)`
- **Description**: Determines the heading towards a target position.
- **Arguments**:
  - `position` (array): The target coordinates [x, y].
- **Example**: `towards([100, 100]);` sets the heading towards (100, 100).

36. `xCor()`
- **Description**: Returns the turtle's x-coordinate.
- **Arguments**: None
- **Example**: `console.log(xCor());` logs the current x position.

37. `yCor()`
- **Description**: Returns the turtle's y-coordinate.
- **Arguments**: None
- **Example**: `console.log(yCor());` logs the current y position.

38. **`isTurtleHidden()`**
- **Description**: Checks if the turtle is hidden.
- **Arguments**: None
- **Example**: `console.log(isTurtleHidden());` logs whether the turtle is hidden.

39. **`isTurtleShown()`**
- **Description**: Checks if the turtle is visible.
- **Arguments**: None
- **Example**: `console.log(isTurtleShown());` logs whether the turtle is shown.

40. **`maxX()`**
- **Description**: Returns the maximum x-coordinate of the canvas.
- **Arguments**: None
- **Example**: `console.log(maxX());` logs the maximum x value.

41. **`maxY()`**
- **Description**: Returns the maximum y-coordinate of the canvas.
- **Arguments**: None
- **Example**: `console.log(maxY());` logs the maximum y value.

42. **`pos()`**
- **Description**: Returns the current position of the turtle as an array `[x, y]`.
- **Arguments**: None
- **Example**: `console.log(pos());` logs the current position.

43. **`setState(state)`**
- **Description**: Sets the turtle's state (position and heading) from an array.
- **Arguments**:
  - `state` (array): The new state `[position, heading]`.
- **Example**: `setState([[100, 100], 90]);` sets position to (100, 100) and heading to 90 degrees.

44. **`setTurtleColor(color)`**
- **Description**: Changes the turtle's color.
- **Arguments**:
  - `color` (string or array): The new turtle color.
- **Example**: `setTurtleColor('blue');` changes the turtle to blue.

45. **`setX(x)`**
- **Description**: Sets the x-coordinate of the turtle's position.
- **Arguments**:
  - `x` (number): The new x-coordinate.
- **Example**: `setX(100);` sets the x-position to 100.

46. **`setXY(x, y)`**
- **Description**: Sets both x and y coordinates of the turtle's position.
- **Arguments**:
  - `x` (number): The new x-coordinate.
  - `y` (number): The new y-coordinate.
- **Example**: `setXY(100, 200);` sets the position to (100, 200).

47. **`setY(y)`**
 - **Description**: Sets the y-coordinate of the turtle's position.
 - **Arguments**:
   - `y` (number): The new y-coordinate.
 - **Example**: `setY(200);` sets the y-position to 200.

48. **`show()`**
 - **Description**: Displays messages in the console.
 - **Arguments**: Any number of arguments to display.
 - **Example**: `show("Hello, World!");` logs "Hello, World!" to the console.

## License

This project is open-source and distributed under the [MIT License](LICENSE).
