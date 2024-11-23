# 9/14/24 GitHub assignment
- It's easiest to just use the GitHub lens in VS Code, since it lets you compare both versions. 
- Github README files use markdown in their formatting—just like discord!
- make sure you pull before starting to make changes, otherwise you won't be working with the most up-to-date version.
- Make sure you push frequently, so you don't worry so much about losing your work.

# 9/24/24 HTML
- Images are added with img src="" with no closing tag
- links are added with a href="" /a
- DON'T forget the closing brackets
- h1, h2, h3, h4 are similar to the hastags in markdown
- span lets you adjust individual text without adding stuff
- p is a paragraph
- header/footer

# 10/3/24 CSS
## animations
Animations are done using @keyframes animationname{}. You set where it should be at 0% and then 100%, and tell it to transform (2d or 3d). You can also add where it should be in the middle if you want the animation to be particularly complicated.
**Other things to note:**
 - animation duration
 - animation delay
 - ease-in/ease-out/ other effects that you can google

## Spacing
There are a number of different units used to space things out:
 - Pixels (px): these are static. They do not change regardless of the size of the screen or font.
 - Em (as in element): these are relative. They change based on the size of the font of whatever the nearest element with a defined font size is. These are particularly useful for padding and margins
    - 1 em is equal to the font size, 2 em is twice the font size, etc.
 - Rem (Root element): these are also relative, but to the HTMl font size, rather than the nearest.. If you change the root font size, the size of 1 Rem will also change. also good for padding and margins.
 - Percent(%): These are relative to the size of the parent container. Good for animations or having a box take up half the screen, and so on.
 - Vh and VW (viewpoint height and width): These are a percentage out of 100 of the viewpoint height and width, respectively. Different devices can interpret vh and vw differently, so be careful with these.
 - ch scales based on the width of the 0 character of the font. This is useful for setting maximum charachter widths/ settings.

# 10/21/24 Flexbox rules
## Parent Container (flex container)
-  display creates a flex container, which is the parent container of the elements (display: flex)
- main axis shows the primary direction they are ordered, is set by flex-direction. default is horizontal, left to right
- flex-wrap adjusts whether the items will display on one line or multiple ( nowrap: one line; wrap: multiple lines overflow beneath; wrap-reverse: multiple lines overflow above)
- flex-flow: both flex-direction and flex-wrap together
- justify-content defines how items are distributed
   - flex-start: items aligned to the start (left for normal row)
   - flex-end: items aligned to the end (bottom for normal column)
   - center: items are centered
   - space-between: items are evenly distributed with no margins on the sides
   - space-around: items are almost evenly distributed (one unit surrounds each item, so the sides have one unit but two units between items)
   - space-evenly: items are evennly spaced
- align-content: adjusts how items are spaced on the cross-axis (justify affects teh main-axis)
   - only affects multi-line containers
- gap controls space between flex items (only between, not edges)

## Children (flex items)
- order controls the order items appear in the container, default follows source order
- flex-grow defines ability for an item to grow 
   - unitless value serves as what proportion it gets, all children are 1 then all grow equally, if one is set to 2, it grows twice as fast as the others, etc
- flex-shrink definies ability for an item to shrink
- flex-basis is the default size before remaining space is distributed
- flex is shorthand for the above 3
- align-self overrides parent aligment


# 10/21/24 Exam Notes
In the following code, what does the link element do?
 - link is used to add external resources
    - ex: link href = "something.css" rel = "stylesheet"

In the following code,  what does a div tag do?
 - div tags are used for dividing up code, mostly for styling or organization
 - for text, a div exists on its own line, whereas the p tag will add an extra newline

In the following code, what is the difference between the #title and .grid selector?
 - hashtags refer to an id, whereas dots refer to a class


In the following code, what is the difference between padding and margin?
 - padding creates a space between the content (text) and the border
 - margin creates space outside the border between adjacent elements

Given this HTML and this CSS how will the images be displayed using flex?
 - see flexbox rules


What does the following padding CSS do?
- padding shorthand values
   - padding: top, right, bottom, left
   - padding: top, left/right, bottom
   - padding: top/bottom, left/right
   - padding: all

What does the following code using arrow syntax function declaration do?
- FunctionName = () => {
   statements here;
   return returnValue;
}
- FunctionName = () => returnValue;
   - same as: FunctionName = function() {return returnValue}
   - only possible if the function has only one statement
- FunctionName = (parameter1, parameter2) => returnValue + parameter1 + parameter2;
   - parameters go inside the parentheses
   - since there is only one statement, we can still skip writing return
- FunctionName = parameter => returnValue + parameter;

What does the following code using map with an array output?
- map() operates a function on every value in an array and returns it as another array

What does the following code output using getElementByID and addEventListener?
- document.getElementByID returns an element by its ID (shocking!)
   - returns null if it doesn't exist
   - returns the first element with the id
      - ids *should* be unique though
- document.addEventListener attaches an event handler to a document
   - good for buttons or hover behavior
   - mouseover/ mouseout: mouse enters/leaves element
   - click: clicked on element
   - mousemove: when the mouse moves

What does the following line of Javascript do using a # selector?
 - document.querySelector ("#"), most likely
   - returns the first element that has an id
   - throws syntax err if selector is invalid

Which of the following are true? (mark all that are true about the DOM)
- JavaScript can change all HTML elements and attributes on a page
- JavaScript can change all the CSS styles in a page
- Javascript can add and remove HTML elements and attributes
- Javascript can create new HTML events on a page
- DOM stands for Document Object Model
   - represents the model as a tree of objects
- DOM defines:
   - html elements as objects
   - properties of all HTML elements
   - methods to access all HTML elements
   - events for all HTML elements
- HTML DOM is a standard for how to get, change, add, or delete HTML elements

By default, the HTML span element has a default CSS display property value of: 
 - inline

How would you use CSS to change all the div elements to have a background color of red?
div{
   background-color: red;
}

How would you display an image with a hyperlink in HTML?
 -a href= "link">img src="image.png"></a>

In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
1) content
2) padding
3) border
4) margin

Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?

color: green (for whatever you can use an id or a class)

What will the following code output when executed using a for loop and console.log?
have to see it

How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
- document.getELementById("byu").style.color= "green"

What is the opening HTML tag for aparagraph, ordered list, unordered list, second level heading, first level heading, third level heading?
1) p>
2) li>
3) ul>
4) h2>
5) h1>
6) h3>

How do you declare the document type to be html?
!DOCTYPE html>

What is valid javascript syntax for if, else, for, while, switch statements?
   if (condition) {
      // code to be executed if condition is true
   } else {
      // code to be executed if condition is false
   }

   for (let i = 0; i < 10; i++) {
    // code to be executed for each iteration
}

let i = 0;
while (i < 10) {
    // code to be executed as long as condition is true
    i++;
}

switch (expression) {
    case value1:
        // code to be executed if expression === value1
        break;
    case value2:
        // code to be executed if expression === value2
        break;
    default:
        // code to be executed if expression doesn't match any case
}

What is the correct syntax for creating a javascript object?
   let person = {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      fullName: function() {
         return this.firstName + " " + this.lastName;
      }
   };

alternatively:

   let person = new Object();
   person.firstName = "John";
   person.lastName = "Doe";
   person.age = 30;
   person.fullName = function() {
      return this.firstName + " " + this.lastName;
   };


Is it possible to add new properties to javascript objects?
- yes

If you want to include JavaScript on an HTML page, which tag do you use?
- script src="script.js"

Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
   document.getElementById("myElement").textContent = "New Text";
OR:
   document.getElementById("myElement").innerHTML = "New Text";


Which of the following correctly describes JSON?
- JSON stands for JavaScript Object Notation
- lightweight data-interchange format
- plain text written in JavaScript object notation
- used to send data between computers
- language independent
   - even though it is derived from JavaScript notation, the format is text only
- example string:
   - '{"name":"John", "age":30, "car":null}'

What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
- chmod: change file permissions
- pwd: print working directory (tells you what directory you're in)
- ls: lists files in the directory
- vim: opens a file in vim
- nano: opens nano (linux command line text editor)
- mkdir: creates a directory
- mv: moves a file from one directory to another
- man: displays manual pages for commands (kind of like help?)
- ssh: secure shell; lets you connect to your server and change it
- ps:  prints currently running processes
- wget: web get; downloads files from the web (http,https, ftp protocols)
- sudo : super user do; runs as root user

Which of the following console command creates a remote shell session?
- ssh

Which of the following is true when the -la parameter is specified for the ls console command?
- lists permissions, ownership, time edited 
- verbose; list all

Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
- root domain: bozo.click
- top domain: .click
- subdomain: banana.fruit

Is a web certificate is necessary to use HTTPS.
- yes
Can a DNS A record can point to an IP address or another A record.
- no, A records point to IP addresses. they map domain names to IPv4

Port 443, 80, 22 is reserved for which protocol?
- 443:  HTTPS
- 80: HTTP
- 22: SSH

What will the following code using Promises output when executed?
- have to see the code first

#11/2/24 Vite
to create a vite project:
```
npm create vite@latest projectName -- --template react
cd demoVite
npm install
npm run dev
```
