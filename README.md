1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer:
getElementById() is used to select an element by its unique id. Since an id should only belong to one element, this method returns a single element. If the element does not exist, it returns null. On the other hand, getElementsByClassName() is used to select multiple elements with the same class name. It returns an HTMLCollection that updates automatically when changes happen in the DOM. querySelector() is more flexible because it uses CSS selectors. It returns only the first matching element. querySelectorAll() also uses CSS selectors, but instead of returning a single element, it returns all matching elements as a NodeList. Unlike HTMLCollection, the NodeList returned by querySelectorAll() does not automatically update when the DOM changes.


2. How do you create and insert a new element into the DOM?
Answer:
To create and insert a new element into the DOM, JavaScript first creates the element using document.createElement(). After creating the element, content such as text, classes, or attributes can be added. Finally, the element is inserted into the webpage using methods like appendChild(), append(), or prepend(). This process allows developers to dynamically add content to a webpage without reloading it.


3. What is Event Bubbling and how does it work?
Answer: 
Event Bubbling is a process in JavaScript where an event starts from the target element and then moves upward through its parent elements. For example, if a button is placed inside a div and the button is clicked, the event first happens on the button and then bubbles up to the div, body, and document. This behavior allows parent elements to respond to events triggered by their child elements.If the child button is clicked, both messages will appear in the console because the event moves upward from the child element to the parent element.


4. What is Event Delegation in JavaScript? Why is it useful?
Answer: 
Event Delegation is a technique in JavaScript where an event listener is added to a parent element instead of adding separate listeners to multiple child elements. This works because of event bubbling. When a child element triggers an event, the parent element can catch and handle it. Event Delegation is useful because it reduces the number of event listeners, improves performance, and makes the code easier to manage. It is especially helpful when elements are added dynamically after the page has already loaded.


5. What is the difference between preventDefault() and stopPropagation() methods?
Answer:
preventDefault() and stopPropagation() are both event methods in JavaScript, but they work differently. The preventDefault() method stops the browser’s default behavior from happening. For example, it can stop a form from submitting or prevent a link from opening another page. However, it does not stop the event from bubbling to parent elements. On the other hand, stopPropagation() prevents the event from moving upward through parent elements, which means event bubbling stops. However, it does not block the browser’s default behavior.