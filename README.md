# conways-game-of-life
<h2>See it yourself!</h2>
<ol>
  <li>Clone</li>
  <li>Open in browser</li>
  <li>Thats it!</li>
 </ol>
 
 <h1>Cool.. Its a bunch of squares.. So whats going on here?</h1>
 <h2>Thats a great question! I'm glad I asked.</h2>

</br>
</br>

<p>
What you are seeing here is called "The Game Of Life", which is a type of "cellualr automata", something I find very interesting. You can read more about cellular automata <a href = 'http://mathworld.wolfram.com/CellularAutomaton.html' terget = "_blank"> here. </a>  It a grid that is made up of multiple "cells", each of which has its own "state", which will evolve 
  based on a few rules.
</p>

<h1>Okay, cool. So how does this work? What are the "rules"?</h1>
<p>Another great question.</p>
<p>Each one of these cells can have one of two states. Alive and dead (or just true and false) and each one of these cells can either 'live' or 'die' based on its neighboring cells(the ones that immedietely surround it)</p>
<br />
<p>The grid will of course have t have an inital state in which to evolve from, which in my example, starts out as having a 50% chance of starting out as alive(blue) or dead (gold). This is done with the expression Math.random > .5 upon the cells creation</p>
<br />
<p>After all the cells are created, thats where the "automation" starts. Each cell will look at its neigbors, count how many live (blue) cells that surround it, and updates its state based on the following rules</p>

<h3>If the cell is alive (blue)</h3>
<ul>
  <li>It stays alive(blue) if, and only if, the amount of live cells that surround it is 2 or 3(if a blue cell has 2 or 3 blue cells around it, it stays blue)</li>
  <li><IT dies(turns gold) if it has fewer than 2, or greater than three live(blue) cells around it</li>
</ul>
    <h3>If the cell is dead (yellow)</h3>
  <li>It becomes alive (blue) if it has exactly 3 live(blue) cells that surround it</li>
  <li>Otherwise, it dies(tuens blue)</li>
  
  <h1>But what about corners and edges? They dont have the same amount of neighbors as cells in the middle.</h1>
  <p>Good point. This was one of the problems I had in trying to get this to work. I had 2 options. I could either ignore cells that didnt exist (for example, a cell on the left hand side wont have a cell to its left, and a cell at the top wont have one above it.), or I could reach around to the other side of the grid(Which is what I did. Basically, I count the cell all the way to the right as the left neighbor of a cell all the way to the left. Essentially wrapping around to the other side(Think of a sphere)  <p>
  <p>I did this with the help of the modulo operator. See line 18 of the JS file to see what that looks like. </p>
  
