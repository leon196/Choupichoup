# [Play]  
# Game Dev Story

![boids debug view][boids debug view]

The first idea for a game concept was a system of floating entities.  
Entities was following a bigger entity with a concept, a moral symbol or a social subject.  
I've remembered about a class by **Alain Lioret** about the IA behavior called boids or flocking,  
and I really wanted to develop further this algorithm : [boids pseudocode]

![Original idea][Original idea]

![Ludum Dare logo][Ludum Dare logo]

Later, the [Ludum Dare] #33 was starting soon, the [warmup weekend] was open.  
I decided to code early on the boids engine, so I could have time to make more illustrations  
I finally made a boids prototype that could display a message and had collisions  
([boids prototype]) ([demo video]) ([prototype source])

![boids engine prototype][boids engine prototype]

Then ! The game jam start and I'm starting to have a new idea :  
Like in horizontal scroller, you control the character's thoughts,  
and have to avoid rectangular signs. The game would take place in a subway for example,  
and the signs would be oppressive ads like the movie *They Live*.  
You would had to collect letter on the road to discover a message a the end of the level.

![Another idea][Another idea]

But I was in vacation at the country-side,  
and I already work all the week at the office, coding iPhone apps and Oculus 360 players.  ([where I work])  
So after failing at rewriting a rectangular collision system (something already done in the past!)  
I focused on the actual game mechanic and was inspired by [Osmos]  
Big bubbles can absorb little ones. Absorbing make the bubble grow and split when too large.  

![gifs prototype divisions][gifs prototype divisions]

I've quickly saw that the rhythm and the speed of the boids did not fit with a relaxed puzzle game.  
And there was no real balance of anything so the bubbles was multiplying themselves indefinitely.  
So no more growing and shrinking, just absorption and resorption.  

![another gif prototype][another gif prototype]

The theme of Ludum Dare #33 was You are the monster,  
so I've tried something with sad and depressing thoughts.  
I've tried an aesthetic of black and white with inspirations like  
Idées Noires of Franquin or the stories of Robert Crumb and Gotlib.  

![Franquin][Franquin]![Crumb][Crumb]![Gotlib][Gotlib]

But then the time runs out like wooow! And the 72h of game jam was over.  
So I accepted to not finish it, because the real thing was the Oujevipo Contest #2.  
([my submission for Ludum Dare #33])

![LDJam version gif 1][LDJam version gif 1]

    
[Ludum Dare]: <http://ludumdare.com/compo/about-ludum-dare/>
[warmup weekend]: <http://ludumdare.com/compo/2015/08/13/warmup-weekend-for-ludum-dare-33/>
[Play]: <http://leon.itch.io/choupichoup>
[boids pseudocode]: <http://www.kfish.org/boids/pseudocode.html>
[boids prototype]: <http://leon196.github.io/Boids/>
[demo video]: <https://youtu.be/s-yLMrPfK4c>
[prototype source]: <https://github.com/leon196/Choupichoup/tree/fbe9272b0a22967af8b4b49a69038714329f8fa2>
[where I work]: <http://www.dvmobile.fr/>
[Osmos]: <http://www.osmos-game.com/>
[my submission for Ludum Dare #33]: <http://ludumdare.com/compo/ludum-dare-33/?action=preview&uid=11872>
[boids engine prototype]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/letter.gif (boids engine prototype)
[boids debug view]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/debugview.gif (boids debug view)
[Ludum Dare logo]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/LDLogo2015.png (Ludum Dare)
[Original Idea]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/originalIdea.jpg (Original idea)
[Another idea]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/scroller.jpg (Another idea)
[gifs prototype divisions]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/division.gif (Divisions)
[another gif prototype]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/6d.gif (Another gif)
[Franquin]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/idees_noires.gif (Franquin)
[Crumb]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/kafka15.jpg (Robert Crumb)
[Gotlib]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/Gotlib_Newton_Popart.jpg (Gotlib)
[LDJam version gif 1]: https://raw.githubusercontent.com/leon196/Choupichoup/master/notes/10d.gif (LDJam version gif 1)